import {useState} from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useResetPassword from "../../features/authentication/useResetPassword";
import AuthLayout from "../../layouts/AuthLayout";
import Fields from "../../ui/Fields";

export default function UpdatePassword(){
    const [showPassword, setShowPassword] = useState(false);
    const {loading, resetPassword} = useResetPassword();
    const {
            register,
            handleSubmit,        
            formState: { errors },
        } = useForm();

    const onSubmit = async (data)=>{
        if(!data.password) return;
        if(data.password !== data.confirmPassword){
            toast.error("Passwords do not match!");
            return;
        }
        const password = data?.password;
        await resetPassword(password)
    }  

    return (
        <AuthLayout>
            <main className="flex lg:items-center justify-center">
                <section className="bg-white py-3 lg:py-8 px-6 lg:px-12 space-y-3 lg:space-y-5.5 w-11/12 lg:w-150 h-fit m-auto">
                    <div className="text-center space-y-1">
                        <h2 className="text-xl font-medium text-primary">
                            Reset Password
                        </h2>
                        <p className="text-gray-600">
                            Choose a new password password(with at least a symbol(@, #...))
                        </p>    
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-10">            
                        
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
                            setShowPassword={setShowPassword}
                        />

                        <Fields
                            forTag="confirmPassword"
                            labelName="Confirm Password"
                            validation={{
                                value: /^(?=.*[!@#$%^&*]).{8,}$/, // at least 8 chars, 1 symbol
                                message:
                                "Password must be at least 8 characters with at least 1 symbol",
                            }}
                            placeholder="********"
                            type={showPassword ? "text" : "password"}
                            errorMessage="Confirm Password is required"
                            errors={errors}
                            register={register}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />

                        
                                

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary font-medium text-white rounded-lg py-3 mb-3 cursor-pointer hover:shadow transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-gray-300"
                            disabled={loading}
                        >
                            {loading && <SpinnerMini />}
                            <span>Reset Password</span>
                        </button>
                    </form>
                </section>
            </main>
        </AuthLayout> 
    )
};