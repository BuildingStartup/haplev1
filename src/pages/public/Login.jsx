import AuthLayout from "../../layouts/AuthLayout";
import LoginForm from "../../features/authentication/LoginForm";
import { Link } from "react-router-dom";
export default function Login() {
  
  
  return (
    <AuthLayout>
      <main
        className="flex lg:items-center justify-center"
      >
        
        <section className="flex w-full px-3 lg:px-0 lg:w-fit lg:justify-center lg:shadow-md rounded-2xl">

        {/* Login Image */}
        <div className="flex-1 hidden lg:block relative">
          <img
            src="./Login-Image.png"
            className="w-full h-full object-cover rounded-l-2xl"
            alt="login image"
          />
          <div
            className="w-80 bg-white/80 backdrop-blur-md rounded-2xl py-6 px-2 space-y-3 absolute translate-x-4.5 bottom-5"
          >
            <div className="flex items-center gap-2">
              <div className="bg-secondary-400 w-6 h-6 rounded-full flex items-center justify-center">
                <img className="w-2.5" src="./Login-icon.png" alt="verified" />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold">Campus Verified</p>
                <p className="text-xs">Exclusive to University Students</p>
              </div>
            </div>

            <p className="text-center">
              "The safest way to buy and sell textbooks on campus."
            </p>
          </div>
        </div>

        <div className="flex-1 bg-white space-y-1 lg:space-y-3 rounded-lg lg:rounded-r-2xl px-4 py-10 shadow-md lg:shadow-none lg:p-10">          
          <div className="text-center lg:text-left space-y-0.5 lg:space-y-1 mb-3 lg:mb-7">
            <h1 className="text-stroke-100 font-bold text-2xl lg:text-3xl capitalize">
              Welcome Back
            </h1>
            <p className=" text-neutral-100 text-xs lg:text-sm">
              Log in to your Haple account
            </p>
          </div>
          {/* Login Form */}
          <LoginForm />
          <p className="text-center text-neutral-100 text-xs mt-4">
              Don't have an account?{" "}
              <Link to="/signUp">
                <span className="text-primary font-medium hover:underline">Sign up</span>
              </Link>
          </p>
        </div>
        </section>

      </main>
    </AuthLayout>
  );
}
