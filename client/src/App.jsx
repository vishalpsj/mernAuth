import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import EmailVerify from "./pages/EmailVerify"
import ResetPassword from "./pages/ResetPassword"
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
    {
        path : "/",
        element : <Home />
    },
    {
        path : "/login",
        element : <Login />
    },
    {
        path : "/email-verify",
        element : <EmailVerify />
    },
    {
        path : "/reset-password",
        element : <ResetPassword />
    },


])


const App = () => {
    return (
        <>
        <ToastContainer />
        <RouterProvider router={router} />
        </>
    )
}

export default  App;