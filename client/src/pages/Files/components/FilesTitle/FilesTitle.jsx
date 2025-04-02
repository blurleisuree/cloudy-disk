function FilesTitle({children, className}) {
  return (
    <h1 className={`${className} text-3xl font-medium text-gray-700 mx-12`}>
      {children}
    </h1>
  )
}

export default FilesTitle
