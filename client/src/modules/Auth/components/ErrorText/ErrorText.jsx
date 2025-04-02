function ErrorText({ children, className }) {
  return <p className={`${className} text-red-600`}>{children}</p>;
}

export default ErrorText;
