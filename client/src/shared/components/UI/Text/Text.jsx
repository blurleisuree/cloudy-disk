function Text({className, children}) {
  return (
    <p className={`${className} text-md text-gray-500 font-medium`}>
      {children}
    </p>
  )
}

export default Text
