import { VscError } from "react-icons/vsc";
import Fields from "../../ui/Fields";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useCategories from "../categories/useCategories";
import useSignUp from "../authentication/useSignUp";
import SpinnerMini from "../../ui/SpinnerMini";

function SignUpForm() {
  const { loading: signupLoading, handleSignUp } = useSignUp();
  const { categories, getAllCategories, loading:categoryLoading } = useCategories();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
      } = useForm({
        defaultValues: {
          mode: "",
          categories: [],
        },
      });   
    const currentMode = watch("mode");
    const selectedCategories = watch("categories") || [];   
    const [showPassword, setShowPassword] = useState(false);
     //   const whatsappDigits = (data.whatsapp || "").replace(/\D/g, "").slice(0, 10);

   
    // Filter categories based on current mode
    const products = Array.isArray(categories)
      ? categories.filter((cat) => cat?.catalog === "products")
      : [];
    const services = Array.isArray(categories)
      ? categories.filter((cat) => cat?.catalog === "services")
      : [];

    // Get current category list based on mode
    const currentCategories = currentMode === "product" ? products : services;

    // Helper function to get category ID by name
    const getCategoryIdByName = (name) => {
      const category = currentCategories.find((cat) => cat.name === name);
      return category?.id;
    };


    useEffect(() => {
      getAllCategories();
    }, []);

    const onSubmit = (data) => {
      if (!data.email || !data.password) return;
  
      const whatsappDigits = (data.whatsapp || "")
        .replace(/\D/g, "")
        .slice(0, 10);
  
      handleSignUp({
        email: data.email,
        password: data.password,
        profileData: {
          ...data,
          whatsapp: `+234${whatsappDigits}`,
          categories: data.categories[0],
        }, // pass the form data with category as UUID
        onSuccess: () => {
          console.log("Sign up and profile creation successful!");
        },
        onError: (error) => {
          console.error("Sign up error:", error);
        },
      });
    }

    const handleToggle = (categoryName) => {
      const categoryId = getCategoryIdByName(categoryName);
      if (!categoryId) return;
  
      const next = selectedCategories.includes(categoryId) ? [] : [categoryId];
      setValue("categories", next);
    };
    
    const handleWhatsAppChange = (value) => {
      const cleanedNumber = value.replace(/\D/g, "").slice(0, 10);
      setValue("whatsapp", cleanedNumber);
    };

    if(categoryLoading) return <p>loading...</p>
    return (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 lg:space-y-5.5"
        >
          {/* Business Name */}
          <Fields
            register={register}
            labelName="Business Name"
            forTag="businessName"
            errors={errors}
            errorMessage="Business Name is Required"
            placeholder="DesignByJoel"
            type="text"
          />

          {/* Description */}
          <Fields
            register={register}
            labelName="Description"
            forTag="description"
            errors={errors}
            errorMessage="Description is Required"
            placeholder="What buyers will know about you"
            type="text"
          />

          {/* Mode Toggle */}
          <div className="space-y-3">
            <div>
                <label htmlFor="categories" className="text-gray-700 font-medium">
                Select Categories
                </label>
            </div>
            <div className="flex gap-4 lg:gap-13.5 justify-between ">
              <button
                type="button"
                onClick={() => {
                  setValue("mode", "product");
                  setValue("categories", []);
                }}
                className={`flex-1 p-1.5 lg:p-2.5 rounded-lg  cursor-pointer ${currentMode === "product"
                    ? "bg-primary-light/17 text-primary-light font-medium ring ring-primary"
                    : "bg-white ring ring-neutral-100 text-neutral-100"
                  }`}
              >
                Products
              </button>

              <button
                type="button"
                onClick={() => {
                  setValue("mode", "service");
                  setValue("categories", []);
                }}
                className={`flex-1 p-1.5 lg:p-2.5 rounded-lg  cursor-pointer ${currentMode === "service"
                    ? "bg-primary-light/17 text-primary-light font-medium ring ring-primary"
                    : "bg-white ring ring-neutral-100 text-neutral-100"
                  }`}
              >
                Services
              </button>
            </div>

            {/* Category Multi Select */}
            {currentMode && (
              <div className="mt-2 lg:mt-7 space-y-2">
                <input
                  type="hidden"
                  {...register("categories", {
                    validate: (val) =>
                      val.length > 0 || "Select at least one category",
                  })}
                />
                <div className="flex lg:justify-center flex-wrap gap-3 p-1">
                  {currentCategories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleToggle(category.name)}
                      className={`text-center text-gray-400 rounded-xl ring ring-gray-300 px-6 py-1 transition-all cursor-pointer ${selectedCategories.includes(category.id)
                          ? "bg-primary-light/17 text-primary font-medium ring-1 ring-primary-light"
                          : "bg-white ring-gray-200 text-neutral-100"
                        }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
                {errors.categories && (
                  <div className="text-secondary-300 text-sm bg-red-50 p-2 rounded flex items-center gap-1">
                    <VscError />
                    <span>{errors.categories.message}</span>
                  </div>
                )}
              </div>
            )}

            {/* For email */}
            <Fields
              forTag="email"
              labelName="Email Address"
              validation={{
                value: /^[^\s@]+@[^\s@]+\.(com)$/i,
                message: "Enter a valid email",
              }}
              placeholder="joel@gmail.com"
              type="email"
              errorMessage="Email is required"
              errors={errors}
              register={register}
              autocomplete="email"
            />
            {/* Contact Info */}

            <Fields
              forTag="whatsapp"
              labelName="WhatsApp Number"
              validation={{
                value: /^\d{10}$/,
                message: "Enter 10 digits after +234",
              }}
              placeholder="9012345678"
              type="tel"
              errorMessage="Enter a valid WhatsApp number"
              errors={errors}
              register={register}
              prefix="+234"
            onChange={(e) => handleWhatsAppChange(e.target.value)}
            />

            {/* PassWord */}

            <Fields
              forTag="password"
              labelName="Password"
              validation={{
                value: /^(?=.*[!@#$%^&*]).{8,}$/, // at least 8 chars, 1 symbol
                message:
                  "Password must be at least 8 characters with at least 1 symbol",
              }}
              placeholder="********"
              type={showPassword ? "text" : "password"}
              errorMessage="Password is required"
              errors={errors}
              register={register}
              showPassword={showPassword}
              autocomplete="new-password"
              setShowPassword={setShowPassword}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full font-medium text-white rounded-lg py-3 mb-1 cursor-pointer hover:shadow transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-neutral-100/70 bg-linear-to-r from-primary to-primary-light"
            disabled={signupLoading}
            >    
              {signupLoading && <SpinnerMini />}          
              <span>Create Seller Account</span>
            </button>
          </div>
        </form>
    )
}

export default SignUpForm
