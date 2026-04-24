import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Fields from "../UI/Fields";
export default function SignUp() {
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
  const products = [
    "Food",
    "Clothes",
    "Shoes",
    "Accessories",
    "Crotchet",
    "Perfumes",
    "Gift Packages",
    "Skincare",
  ];

  const services = [
    "Make-up",
    "Nail Tech",
    "Photographing",
    "Graphic design",
    "Web design",
  ];
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log("Final Seller Data:", data);
    navigate("/SellersProfile");
  };
  // Filter categories based on current mode
  // const products = Array.isArray(categories)
  //   ? categories.filter((cat) => cat?.catalog === "products")
  //   : [];
  // const services = Array.isArray(categories)
  //   ? categories.filter((cat) => cat?.catalog === "services")
  //   : [];

  // Get current category list based on mode
  const currentCategories = currentMode === "product" ? products : services;

  // Helper function to get category ID by name
  // const getCategoryIdByName = (name) => {
  //   const category = currentCategories.find((cat) => cat.name === name);
  //   return category?.id;
  // };

  const handleToggle = (cat) => {
    const next = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];

    setValue("categories", next);
  };
  return (
    <section>
      <div className="flex items-end bg-white pt-5 px-6 justify-between text-base">
        <img src="./Logo.png" alt="Haple Logo" className="w-17 object-cover" />
        <div className="flex gap-3">
          <p>Have an account?</p>
          <Link to="/login" className="text-[#0050CB] font-semibold">
            Log in
          </Link>
        </div>
      </div>
      <main className="sm:bg-white sm:w-8/12 sm:mx-auto sm:shadow-md sm:py-5 sm:px-6 sm:my-10">
        <div className="text-center sm:text-left space-y-2 mt-7 mx-1">
          <h2 className="font-semibold text-primary text-3xl">
            Start Selling Your Student Talent
          </h2>
          <p className="text-gray-600 text-base">
            Join the trusted community of student-run businesses on campus.
            Create your seller account to get started.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-7 mb-3 mx-3 sm:mx-0 mt-4"
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
          <div className="space-y-4">
            <label htmlFor="categories" className="text-gray-700 font-medium">
              Select Categories
            </label>
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={() => {
                  setValue("mode", "product");
                  setValue("categories", []);
                }}
                className={`flex-1 px-4 py-3 rounded-lg  cursor-pointer ${
                  currentMode === "product"
                    ? "bg-[#0066FF]/30 text-[#0066FF] font-medium ring-1 ring-[#0066FF]"
                    : "bg-white ring ring-gray-300 text-gray-600"
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
                className={`flex-1 px-4 py-3 rounded-lg  cursor-pointer ${
                  currentMode === "service"
                    ? "bg-[#0066FF]/30 text-[#0066FF] font-medium ring-1 ring-[#0066FF]"
                    : "bg-white ring ring-gray-300 text-gray-600"
                }`}
              >
                Services
              </button>
            </div>

            {/* Category Multi Select */}
            {currentMode && (
              <div className="space-y-2">
                <input
                  type="hidden"
                  {...register("categories", {
                    validate: (val) =>
                      val.length > 0 || "Select at least one category",
                  })}
                />
                <div className="flex flex-wrap gap-3 p-1">
                  {currentCategories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleToggle(category.name)}
                      className={`text-center text-gray-400 rounded-xl ring ring-gray-300 px-6 py-1 transition-all cursor-pointer ${
                        selectedCategories.includes(category.id)
                          ? "bg-[#0066FF]/30 text-[#0066FF] font-medium ring-1 ring-[#0066FF]"
                          : "bg-white border-gray-200 text-gray-600"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
                {errors.categories && (
                  <div className="text-red-600 text-sm bg-red-50 p-2 rounded flex items-center gap-1">
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
              // onChange={(e) => handleWhatsAppChange(e.target.value)}
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
              className="w-full font-medium text-white rounded-lg py-3 mb-1 cursor-pointer hover:shadow transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-gray-300 bg-gradient-to-r from-[#0050CB] to-[#0066FF]"
              // disabled={loading}
            >
              <span>Create Seller Account</span>
            </button>
          </div>
        </form>

        <p className="text-center text-[#424656] mb-3">
          Already have an account?{" "}
          <Link to="/signIn" className="text-[#0050CB] font-medium">
            Sign in
          </Link>
        </p>
      </main>
    </section>
  );
}
