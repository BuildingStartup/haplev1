import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Fields from "../UI/Fields";
import { GoArrowLeft } from "react-icons/go";
export default function Login() {
  const [fieldData, setFieldData] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mode: "",
      categories: [],
    },
  });
  const onSubmit = (data) => {
    setFieldData(data);
  };
  console.log(fieldData, errors);
  return (
    <section className="min-h-screen">
      <div className="flex items-end bg-white pt-5 px-6 justify-between text-base">
        <img src="./Logo.png" alt="Haple Logo" className="w-17 object-cover" />
        <p className="text-[#0050CB]">Help</p>
      </div>

      <main
        className=" mx-4 my-5 sm:grid sm:grid-cols-[1fr_1.1fr] sm:bg-white sm:mx-auto sm:w-11/12 lg:w-8/12 sm:rounded-2xl sm:shadow-md
        "
      >
        {/* Login Image */}
        <div className="hidden sm:block sm:max-h-[550px] relative">
          <img
            src="./Login-Image.png"
            className="w-full h-full object-cover rounded-l-2xl"
            alt=""
          />
          <div
            className="w-11/12 bg-white rounded-2xl p-4 absolute
          left-1/2 -translate-x-1/2
          bottom-3"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#006D2F] p-4 rounded-full">
                <img className="" src="./Login-icon.png" alt="" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold">Campus Verified</p>
                <p className="text-xs">Exclusive to University Students</p>
              </div>
            </div>
            <p className="text-sm mt-3 text-center">
              "The safest way to buy and sell textbooks on campus."
            </p>
          </div>
        </div>
        <div className="sm:block sm:mx-5 lg:mx-9 mx-3 sm:my-10">
          <div className="flex items-center gap-2 cursor-pointer pb-3 sm:mt-3 sm:hidden">
            <GoArrowLeft className="text-2xl text-gray-600 cursor-pointer" />
            <span className="text-gray-600">Back</span>
          </div>
          <div className="sm:text-left text-center md:mt-2">
            <h2 className="text-[#191C1D] font-bold text-2xl uppercase  pb-1 sm:text-3xl lg:text-4xl">
              Welcome Back
            </h2>
            <p className=" text-[#424656] text-base">
              Log in to your Haple account
            </p>
          </div>
          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
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
            />
            <Fields
              labelName="Password"
              forTag="password"
              errorMessage="Password is required"
              validation={{
                value: /^(?=.*[!@#$%^&*]).{8,}$/, // at least 8 chars, 1 symbol
                message:
                  "Password must be at least 8 characters with at least 1 symbol",
              }}
              setShowPassword={setShowPassword}
              showPassword={showPassword}
              register={register}
              errors={errors}
              type={showPassword ? "text" : "password"}
            />

            <Link className="text-[#0066FF] font-semibold" to="/password-reset">
              Forgot Password
            </Link>

            <button
              type="submit"
              className="bg-[#0066FF] text-white text-center w-full py-3 rounded-2xl text-lg"
            >
              Log In
            </button>
            <p className="text-sm text-center">
              Don't have an account?{" "}
              <span className="text-[#0066FF] font-bold">Sign up</span>
            </p>
          </form>
        </div>
      </main>
    </section>
  );
}
