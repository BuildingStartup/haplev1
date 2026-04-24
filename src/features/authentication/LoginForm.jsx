import { Link } from "react-router-dom"
import Fields from "../../ui/Fields"
import { useForm } from "react-hook-form";
import { useState } from "react";
import useLogin from "../authentication/useLogin";
import SpinnerMini from "../../ui/SpinnerMini";


function LoginForm() {
    
    const {loading, error: loginError, loginSeller} = useLogin();
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

    const onSubmit = (data)=>{
      if(!data.email || !data.password) return;
      const email = data?.email;
      const password = data?.password;
      loginSeller({email, password})
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3 lg:space-y-4">
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
              className="mt-3 lg:mt-6 bg-primary text-white w-full py-2 lg:py-3 rounded lg:rounded-xl text-sm font-medium shadow-lg flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-neutral-100/70"
              disabled={loading}
            > 
              {loading && <SpinnerMini />}
              <span>Log in</span>
            </button>           
          </form>
    )
}

export default LoginForm
