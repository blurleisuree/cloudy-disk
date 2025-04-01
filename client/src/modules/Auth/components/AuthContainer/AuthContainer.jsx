import { Outlet } from "react-router"

function AuthContainer() {
  return (
    <div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-80 self-center">
      <Outlet />
    </div>
  )
}

export default AuthContainer
