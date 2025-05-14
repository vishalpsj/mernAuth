import React, { useContext, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axiox from "axios";
import { toast } from 'react-toastify';
import NavbarForRegister from '../components/NavBarForRegister';

const Login = () => {

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext)
  const navigate = useNavigate()
  const [status, setStatus] = useState("Sign Up")
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      axiox.defaults.withCredentials = true;

      if (status === "Sign Up") {
        const { data } = await axiox.post(backendUrl + '/api/auth/register', { name, email, password })
        if (data.success) {
          setIsLoggedIn(true)
          getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }

      } else {
        const { data } = await axiox.post(backendUrl + '/api/auth/login', { email, password })
        if (data.success) {
          setIsLoggedIn(true)
          getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }
      } 
     } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
      }
    }

  return (
      <>
        <NavbarForRegister />
        <div className='flex justify-center items-center h-screen m-5 '>
          <div className='bg-[#9ddf85] w-full max-w-[450px] flex flex-col gap-5 items-center py-5 rounded-xl '>

            <div className='flex flex-col gap-1 items-center'>
              <h1 className='text-4xl font-bold text-lime-700'>{status === "Sign Up" ? "Create account" : "Login"}</h1>
              <h3 className='text-lg '> {status === "Sign Up" ? "Create new account" : "Login to your account"} </h3>
            </div>

            <form
              onSubmit={handleFormSubmit}
              className='flex flex-col gap-2 w-full px-10'>
              {status === "Sign Up" && (
                <div
                  className='flex gap-2 items-center text-black/70 bg-[#659853] px-3 py-1 rounded-md'>
                  <FaUser />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Fullname'
                    required
                    className='outline-0 px-2 text-black w-full' />
                </div>)}


              <div
                className='flex gap-2 items-center text-black/70 bg-[#659853] px-3 py-1 rounded-md'>
                <IoMdMail />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder='Email'
                  required
                  className='outline-0 px-2 text-black w-full' />
              </div>

              <div
                className='flex gap-2 items-center text-black/70 bg-[#659853] px-3 py-1 rounded-md'>
                <RiLockPasswordFill />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className='outline-0 px-2 text-black w-full' />
              </div>

              {status === "Login" && (<p
                onClick={() => navigate('/reset-password')}
                className='text-blue-600 text-sm cursor-pointer'>
                Forgot password?
              </p>)}

              <button className='bg-gradient-to-r from-lime-700 to bg-lime-900 py-1 text-white/80 font-bold rounded-md hover:rounded-2xl transition-all duration-150 ease-linear cursor-pointer mt-5'>{status}</button>
            </form>

            {status === "Sign Up" ? (<p
              className='flex gap-1 text-shadow-md text-sm'>
              Already have account?
              <span
                onClick={() => setStatus('Login')}
                className='text-blue-700 underline cursor-pointer'>
                Login
              </span>
            </p>)
              : (
                <p
                  className='flex gap-1 text-shadow-md text-sm'>
                  Don't have account?
                  <span
                    onClick={() => setStatus('Sign Up')}
                    className='text-blue-700 underline cursor-pointer'>
                    Sign Up
                  </span>
                </p>)}
          </div>
        </div>
      </>
    )
  }

  export default Login