function Btn({ children, className, handleClick }) {
  return (
    <div
      onClick={handleClick}
      className={`${className} rounded-xl font-semibold hover:bg-blue-100 transition bg-transparent border-primary-color cursor-pointer border-2 inline-block text-primary-color`}
    >
      {children}
    </div>
  );
}

export default Btn;
