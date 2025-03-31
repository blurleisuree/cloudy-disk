function Input({
  label,
  type = "text",
  register = function () {},
  errors,
  name,
  placeholder,
}) {
  return (
    <div className="mb-4" htmlFor={name}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-primary-color hover:border-primary-color duration-200"
        type={type}
        name={name}
        placeholder={placeholder}
        {...register(name)}
      />
      {errors && (
        <span className="text-base text-red-600">{errors.message}</span>
      )}
    </div>
  );
}

export default Input;
