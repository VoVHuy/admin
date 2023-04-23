import React from 'react'

function Login() {
    return (
        <div className='w-[100%] h-[100vh] flex items-center bg-[#FAFAFA] text-black'>
            <div className='w-[100%]  pt-[24px] flex '>
                <div className='w-[50%] h-[100%] flex justify-end mb-10'>
                    <div className='w-[70%]'>
                        <div className=' w-[100%] flex justify-center'>
                            <div >
                                <img src="/afood.jpg" alt="" className='w-[150px] h-[100%] rounded-full border' />
                            </div>
                        </div>
                        <div className=' w-[100%] justify-center'>
                            <p className='w-[100%] flex justify-center pt-7 font-bold text-[20px] font-sans text-orange-600'>
                                APP FOOD DELIVERY
                            </p>
                            <p className='w-[100%] flex justify-center text-center'>
                                food with love only from natural and fresh products
                            </p>
                        </div>
                    </div>
                </div>

                <div className='w-[40%] h-[75vh]  flex justify-start '>
                    <div className='w-[60%] h-[90%] flex justify-center '>
                        <div className=' w-[100%]'>
                            <div className='w-[100%] flex flex-wrap justify-center font-bold text-[20px] font-sans items-center max-md:gap-4 max-md:flex-col max-md:w-[80%]  mb-3'>
                                <p>Login with phone number</p>
                            </div>
                            {/* input phone */}
                            <div className='w-[100%] flex justify-center mb-4'>
                                <input type="phone" placeholder='Phone'
                                    className='h-10 text-black gap-3 flex justify-center items-center w-[215px] py-3  border-[1px] border-slate-400  bg-white focus:outline-none pl-4 rounded-[12px] max-md:w-[100%] max-md:py-0 max-lg:py-2'
                                />
                            </div>
                            {/* input password */}
                            <div className='w-[100%] justify-center flex mb-4'>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    className='h-10 text-black gap-3 flex justify-center items-center w-[215px] py-3 border-[1px] border-slate-400  bg-white focus:outline-none pl-4 rounded-[12px] max-md:w-[100%] max-md:py-0 max-lg:py-2'
                                />
                            </div>
                            {/* booton login */}
                            <div className='w-[100%] flex justify-center items-center'>
                                <button
                                    className='  h-11 text-white gap-3 flex justify-center items-center w-[215px] py-3 bg-[#0070F0] rounded-[12px] max-md:w-[100%] max-md:py-0 max-lg:py-2  hover:bg-[#3b8deb] '
                                >
                                    <span className='text-center font-semibold max-md:w-[50%] '>Login</span>
                                </button>
                            </div>
                            {/* create account & reset password */}
                            <div className='w-[100%] flex text-[15px] pt-3 justify-center'>
                                <p className='w-[50%] text-end pr-1 text-[#0070F0] hover:text-[#234bb9] cursor-pointer'>Create Account </p>
                                <p className='mx-1 text-[#0070F0]' >|</p>
                                <p className='w-[45%] pl-1  text-[#0070F0] hover:text-[#234bb9] cursor-pointer'>Reset Password</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Login