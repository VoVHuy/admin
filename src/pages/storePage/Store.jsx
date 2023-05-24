import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar'
import React, { useState, useEffect } from 'react';
function Store() {
  const [currentUser, setCurrentUser] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('user')))
  }, [])
  const handleUpdate = (e) => {
    e.preventDefault();
    navigate('/store/update')
  }
  return (
    <div className='w-full'>
      <div className='flex'>
        <div className='w-[20%]'>
          <Sidebar />
        </div>
        <div className='w-[80%]'>
          <div className='h-[70px] fixed text-[#09132C] w-full px-6 py-4 bg-[#fafafa] flex items-center' >
            <div className='font-normal max-md:text-sm max-w-[400px]'>
              <p className="font-bold text-2xl mx-3">Store</p>
            </div>
          </div>
          <div className=' text-black  flex  justify-center mx-10 pt-[80px]'>
            <div className='flex gap-[10px] w-[100%]'>
              <div className='pt-[20px] w-[40%]'>
                <div >
                    <img src={currentUser?.avatar} alt="" className=' rounded-full h-[180px] w-[60%]' />
                </div>
                <div className='w-[20%] pt-[30px] ml-[40px]'>
                  <button type="submit" className=' bg-[#F5FAFC] border rounded-lg py-2  w-20 font-semibold'
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
              </div>
              <div className='w-[100%] pt-[20px] -mx-[30px]'>
                <div className='flex' >
                  <h1 className='w-24  font-semibold'>Name:</h1>
                  <p className=' w-[55%] '>{currentUser?.fullName}</p>
                </div>
                <div className='pt-4 flex '>
                  <h1 className='w-24  font-semibold'>Email:</h1>
                  <p className=' w-[80%] '>{currentUser?.email}</p>
                </div>
                <div className='pt-4 flex '>
                  <h1 className='w-24  font-semibold'>Phone:</h1>
                  <p className='  w-[55%] '>{currentUser?.phone}</p>
                </div>
                <div className='pt-4 flex' >
                  <h1 className='w-24  font-semibold'>Address:</h1>
                  <p className='  w-[80%]  '>{currentUser?.address}</p>
                </div>
                <div className='pt-4 flex'>
                  <h1 className='w-24 font-semibold'>OpenHour:</h1>
                  <p className='  w-[55%] '>{currentUser?.openHour}</p>
                </div>
                <div className='pt-4 flex' >
                  <h1 className='w-24 font-semibold'>CloseHour:</h1>
                  <p className=' w-[55%] '>{currentUser?.closeHour}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Store