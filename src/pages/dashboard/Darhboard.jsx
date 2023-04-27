import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { MdOutlineFastfood, MdMonetizationOn } from 'react-icons/md'
import { FaStore } from 'react-icons/fa'
import Chart from '../../components/chart/Chart'

function Dashboard() {
  return (
    <div>
      <div className='w-full'>
        <div className='flex'>
          <div className='w-[25%]'>
            <Sidebar />
          </div>
          <div className=' text-black w-full'>
            <div className='h-[70px] fixed text-[#09132C] w-full px-6 py-4 bg-[#fafafa] flex items-center' >
              <div className='font-normal max-md:text-sm max-w-[400px]'>
                <p className='font-bold text-2xl mx-3'>Dashboard</p>
              </div>
            </div>
            <div className='flex pt-[100px] ml-2'>
              <div className='w-[40%] h-[150px]  font-semibold'>
                <div className='flex justify-between pt-7 mx-10 bg-[#F5FAFC] h-[150px] rounded-lg border'>
                  <div className='mx-5'>
                    <p className='text-2xl'>25</p>
                    <p className='py-2'>Food</p>
                    <p className=' border-b'>See all food</p>
                  </div>
                  <MdOutlineFastfood size={24} className='mx-5' />
                </div>
              </div>
              <div className='w-[40%] h-[150px]  font-semibold'>
                <div className='flex justify-between pt-7 mx-10 bg-[#F5FAFC] h-[150px] rounded-lg border'>
                  <div className='mx-5'>
                    <p className='text-2xl'>1</p>
                    <p className='py-2'>Store</p>
                    <p className=' border-b'>See all store</p>
                  </div>
                  <FaStore size={24} className='mx-5' />
                </div>
              </div>
              <div className='w-[40%] h-[150px]  font-semibold'>
                <div className='flex justify-between pt-7 mx-10 bg-[#F5FAFC] h-[150px] rounded-lg border'>
                  <div className='mx-5'>
                    <p className='text-2xl'>$ <span>250000</span></p>
                    <p className='py-2'>Revenue</p>
                  </div>
                  <MdMonetizationOn size={24} className='mx-5' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='text-black w-full'>
          <Chart/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard