import React, { useContext } from 'react'
import LoginButton from './LoginButton'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'


const Navbar = () => {
    const navigate = useNavigate()
    const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext)

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;

            const { data } = await axios.post(backendUrl + '/api/auth/logout');
            data.success && setIsLoggedIn(false)
            data.success && setUserData(false)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const sendVerificationOtp = async () => {
        try {
            axios.defaults.withCredentials = true;

            const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp')

            if (data.success) {
                navigate('/email-verify')
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <>
            <nav className="fixed top-0 w-full px-15 py-5 flex justify-between items-center">
                <span
                    onClick={() => navigate('/')}
                    className='text-[#659853] text-2xl font-bold cursor-pointer hover:text-white/70 transition-all duration-150 ease-linear'>Heltron</span>

                {userData ? <div className='bg-lime-900 rounded-full h-10 w-10 flex justify-center items-center text-white/80 text-xl font-bold border-2 border-white/60 relative group '>{userData.name[0].toUpperCase()}
                    <div className='absolute hidden group-hover:block top-3 -right-10 z-10 text-black rounded pt-10'>
                        <ul className='text-sm font-normal list-none m-0 p-2 bg-lime-200 rounded-md'>
                            {!userData.isAccountVerified
                                &&
                                <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-lime-300 rounded-md cursor-pointer'>Verify Email</li>}

                            <li onClick={logout} className='py-1 px-2 hover:bg-lime-300 pr-10 rounded-md cursor-pointer'>Logout</li>
                        </ul>
                    </div>
                </div> : <LoginButton />}


            </nav>
        </>
    )
}

export default Navbar