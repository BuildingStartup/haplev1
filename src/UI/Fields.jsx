import { FaEye, FaEyeSlash } from "react-icons/fa";
import { VscError } from "react-icons/vsc";

export default function Fields({
  labelName,
  forTag,
  errorMessage,
  placeholder,
  register,
  errors,
  type,
  validation,
  onChange,
  prefix,
  showPassword,
  setShowPassword,
  autocomplete,
  //   icon,
}) {
  return (
    <div className="flex flex-col gap-1 lg:gap-2 relative">
      <label htmlFor={forTag} className="text-neutral-600">
        {labelName}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-100 pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          id={forTag}
          type={type}
          autoComplete={autocomplete}
          {...register(forTag, {
            required: errorMessage,
            pattern: validation,
          })}
          required
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-2 lg:px-4 py-2 lg:py-3.5 ring ring-neutral-500 rounded lg:rounded-lg outline-none focus:ring focus:ring-primary transition-all duration-200 ${prefix ? "pl-14" : ""}`}
        />
      </div>
      {errors[forTag] && (
        <div className="text-secondary-300 bg-red-50 p-1.5 rounded flex items-center gap-1">
          <VscError />
          <span>{errors[forTag].message}</span>
        </div>
      )}
      {forTag === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-8 lg:top-10 text-gray-400"
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      )}
    </div>
  );
}
