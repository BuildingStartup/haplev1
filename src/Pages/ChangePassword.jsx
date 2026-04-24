import { useForm } from "react-hook-form";
import Fields from "../UI/Fields";
import { useState } from "react";
export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [retypePassword, setRetypePassword] = useState(false);
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
  return (
    <section>
      <div className="flex items-end bg-white pt-5 px-6 justify-between text-base">
        <img src="./Logo.png" alt="Haple Logo" className="w-17 object-cover" />
        <p className="text-[#0050CB]">Help</p>
      </div>
      <main className="mx-4 mt-6 sm:bg-white sm:mx-auto sm:w-10/12 sm:rounded-2xl sm:shadow-md sm:py-10 sm:px-15">
        <div className="text-center space-y-1 sm:text-left">
          <h2 className="text-[#0066FF] text-2xl font-semibold sm:mb-10">
            Enter new Password
          </h2>
          {/* <p>Fill in your email to reset the link</p> */}
        </div>
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="space-y-5 sm:space-y-10 mt-3"
        >
          <div className="space-y-5">
            <Fields
              labelName="New Password"
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
              placeholder="Enter your Password"
            />
            <Fields
              labelName="Retype Password"
              forTag="password"
              errorMessage="Password is required"
              validation={{
                value: /^(?=.*[!@#$%^&*]).{8,}$/, // at least 8 chars, 1 symbol
                message:
                  "Password must be at least 8 characters with at least 1 symbol",
              }}
              setShowPassword={setRetypePassword}
              showPassword={retypePassword}
              register={register}
              errors={errors}
              type={retypePassword ? "text" : "password"}
              placeholder="Retype Password"
            />
          </div>

          <button
            type="submit"
            className="bg-[#0066FF] text-white text-center w-full py-3 rounded-2xl text-lg"
          >
            Change Password
          </button>
        </form>
      </main>
    </section>
  );
}
