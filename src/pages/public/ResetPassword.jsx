import { useForm } from "react-hook-form";
import Fields from "../../ui/Fields";
import AuthLayout from "../../layouts/AuthLayout";
import SpinnerMini from "../../ui/SpinnerMini";
import useForgotPassword from "../../features/authentication/useForgotPassword";


export default function ResetPassword() {
  const {loading, ForgotPassword: resetLink} = useForgotPassword(); 
    const {
            register,
            handleSubmit,        
            formState: { errors },
          } = useForm();

    const onSubmit = (data)=>{
        if(!data.email) return;
        const email = data?.email;
        resetLink(email);
      }
  return (         
    <AuthLayout>
      <main className="flex lg:items-center justify-center">
        <section className="bg-white py-3 lg:py-8 px-6 lg:px-12 space-y-3 lg:space-y-5.5 w-11/12 lg:w-150 h-fit m-auto">
      
            <div className="text-center space-y-1">
            <h2 className="text-lg lg:text-xl font-medium text-primary">
                Forgot Password
            </h2>
            <p className="text-gray-600">
                Fill in your email to reset password
            </p>    
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-10">            

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
            />

            
                       

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-primary font-medium text-white rounded-lg py-2 lg:py-3 mb-1 lg:mb-3 cursor-pointer hover:shadow transition-all duration-200 flex items-center justify-center gap-1 lg:gap-2 disabled:cursor-not-allowed disabled:bg-gray-300"
                disabled={loading}
                >
                {loading && <SpinnerMini />}
                <span>Send Reset Link</span>
            </button>
          </form> 
      </section>
      </main>
    </AuthLayout>
  );
}
