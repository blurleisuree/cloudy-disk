function NavText({children, className, onClick}) {
  return (
    <p onClick={onClick} className={`${className} block underline underline-offset-2 cursor-pointer`}>
    {children}  
    </p>
  )
}

export default NavText
