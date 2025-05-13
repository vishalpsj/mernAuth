import React from 'react'
import LoginButton from './LoginButton'
import { useNavigate } from 'react-router-dom'


const NavbarForRegister = () => {
    const navigate = useNavigate()
    return (
        <>
            <nav className="fixed top-0 w-full px-15 py-5 flex justify-between items-center">
                <span
                onClick={() => navigate('/')}
                 className='text-[#659853] text-2xl font-bold cursor-pointer hover:text-white/70 transition-all duration-150 ease-linear'>Heltron</span>
            </nav>
        </>
    )
}

export default NavbarForRegister