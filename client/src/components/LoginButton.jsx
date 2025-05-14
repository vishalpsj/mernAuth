import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
    const navigate = useNavigate()
    return (
        <>
                <button
                onClick={() => navigate('/login')}
                 className='text-white/80 hover:text-white  hover:rounded-2xl transition-all duration-200 ease-linear hover:cursor-pointer border border-white/80 px-3 sm:px-6 py-1 rounded-md font-bold flex items-center gap-2'>Login <FaArrowRight /></button>
        </>
    )
}

export default LoginButton