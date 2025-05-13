import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Header = () => {
    const navigate = useNavigate()

    const { userData } = useContext(AppContext)

    return (
        <>
            <div className='flex w-full h-screen justify-center items-center'>
                <div className='flex flex-col sm:flex-row items-center justify-center gap-15 w-full max-w-3/4'>
                    <div>
                        <img src={assets.boy} alt="" />
                    </div>

                    <div className='flex flex-col items-center justify-center gap-10 bg-black/10 h-full backdrop-blur-md rounded-3xl py-15'>
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-5xl font-bold text-white/80'>Welcome to Heltron</h3>
                        <h4 className='text-2xl font-medium text-white/80'>Hello {userData ? userData.name : 'User'}</h4>
                        </div>
                        <p className='text-md w-4/5 text-white/90'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore eligendi deleniti minima quia nulla possimus amet architecto nostrum cupiditate.</p>

                        <div>
                            {userData ? '' : <button
                            onClick={() => navigate('/login')}
                                className='bg-[#9ddf85] px-8 py-3 font-bold text-black/80 hover:text-black rounded-sm hover:rounded-4xl transition-all duration-150 ease-linear cursor-pointer'>
                                Get Started
                            </button>}
                            
                        </div>
                    </div>
                    <img src={assets.tree} alt="" className="w-2/5 fixed -z-10 right-0 bottom-0 " />
                </div>
            </div>
        </>
    )
}

export default Header