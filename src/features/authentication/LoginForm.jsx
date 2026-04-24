import { Link } from "react-router-dom"
import Fields from "../../ui/Fields"
import { useForm } from "react-hook-form";
import { useState } from "react";


function LoginForm({onSubmit}) {
    
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
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <Fields
                forTag="email"
                labelName="Email"
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
                placeholder="*********"
                setShowPassword={setShowPassword}
                showPassword={showPassword}
                register={register}
                errors={errors}
                type={showPassword ? "text" : "password"}
              />
            </div>

            <Link
              className="text-primary flex justify-end mt-1"
              to="/password-reset"
            >
              <p>Forgot Password?</p>
            </Link>

            <button
              type="submit"
              className="mt-6 bg-primary text-white w-full py-3 rounded-xl text-base font-medium shadow-lg"
            >
              Log In
            </button>           
          </form>
    )
}

export default LoginForm
