import { useForm } from "react-hook-form";
import Fields from "../UI/Fields";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
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
  const onSubmit = () => {
    navigate("/new-password");
  };
  return (
    <section>
      <div className="flex items-end bg-white pt-5 px-6 justify-between text-base">
        <img src="./Logo.png" alt="Haple Logo" className="w-17 object-cover" />
        <p className="text-[#0050CB]">Help</p>
      </div>
      <main className="mx-4 mt-6 sm:bg-white sm:mx-auto sm:w-10/12 sm:rounded-2xl sm:shadow-md sm:py-10 sm:px-15">
        <div className="text-center space-y-1 sm:text-left">
          <h2 className="text-[#0066FF] text-2xl font-semibold sm:mb-10">
            Reset Password
          </h2>
          {/* <p>Fill in your email to reset the link</p> */}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 sm:space-y-10 mt-3"
        >
          <div className="relative">
            <Fields
              forTag="email"
              labelName="Email"
              validation={{
                value: /^[^\s@]+@[^\s@]+\.(com)$/i,
                message: "Enter a valid email",
              }}
              placeholder="Enter your email"
              type="email"
              errorMessage="Email is required"
              errors={errors}
              register={register}
            />
            <div>
              <img
                className="absolute right-3 top-11 text-gray-400"
                src="./email-icon.png"
                alt=""
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#0066FF] text-white text-center w-full py-3 rounded-2xl text-lg"
          >
            Reset Password
          </button>
        </form>
      </main>
    </section>
  );
}
