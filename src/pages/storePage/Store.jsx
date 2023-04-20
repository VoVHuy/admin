import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
function Store() {
  return (
    <div className='w-full'>
      <div className='flex'>
        <div className='w-[20%]'>
          <Sidebar />
        </div>
        <div className=''>
            <div className='h-[70px] fixed text-[#09132C] w-full px-6 py-4 bg-[#fafafa] flex items-center' >
              <div className='font-normal max-md:text-sm max-w-[400px]'>
                <p className="font-bold text-2xl mx-3">Store</p>
              </div>
            </div>
          <div className=' text-black w-full flex gap-28 justify-center mx-10 pt-[80px]'>
            <div className='flex'>
              <div><img src="/afood.jpg" alt="" className=' rounded-full w-[80%]' /></div>
              <div className='w-[80%] pt-[100px]'>
                <div className='flex' >
                  <label className='w-24 py-4 font-semibold'>Name</label>
                  <input type="name" className=' border border-black h-10 m-2 w-[60%] p-3 ' />
                </div>
                <div className='pt-2 flex '>
                  <label className='w-24 py-4 font-semibold'>Email</label>
                  <input type="email" className=' border border-black h-10 m-2 w-[60%] p-3' />
                </div>
                <div className='pt-2 flex' >
                  <label className='w-24 py-4 font-semibold'>Address</label>
                  <input type="address" className=' border border-black h-10 m-2 w-[60%] p-3' />
                </div>
                <div className='pt-2 flex'>
                  <label className='w-24 py-4 font-semibold'>OpenHour</label>
                  <input type="openHour" className=' border border-black h-10 m-2 w-[60%] p-3' />
                </div>
                <div className='pt-2 flex' >
                  <label className='w-24 py-4 font-semibold'>CloseHour</label>
                  <input type="closeHour" className=' border border-black h-10 m-2 w-[60%] p-3' />
                </div>
              </div>
            </div>
            <div className='w-[20%]'>
              <button type="submit" className=' bg-[#F5FAFC] border rounded-lg py-2 w-20 font-semibold'
              >Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Store