import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar'
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
function UpdateStore() {
    const [currentUser, setCurrentUser] = useState()
    const [form, setForm] = useState()
    const navigation = useNavigate()
   
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('user')))
        
    }, [])
    useEffect(() => {
        console.log(currentUser);
        if (currentUser) {
            setForm({
                fullName: currentUser.fullName,
                email: currentUser.email,
                address: currentUser.address,
                openHour: currentUser.openHour,
                closeHour: currentUser.closeHour
            })
        }
    }, [currentUser])

    const handleUpdate = async() => {
        const newRef = doc(db, "users", currentUser.id);
        await updateDoc(newRef, form).then((e) => {navigation("/store");   toast.success("Update store success");localStorage.setItem('user', JSON.stringify({...currentUser,...form }))  }).catch((error) => alert("Something wrong:", error));
    }

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
                    <div className=' text-black w-full flex  justify-center mx-10 pt-[80px]'>
                        <div className='flex gap-[60px]'>
                            <div className='pt-[20px]'>
                                <div><img src="/afood.jpg" alt="" className=' rounded-full w-[80%]' /></div>
                                <div className='w-[20%] pt-[90px] ml-[50px]'>
                                    <button onClick={handleUpdate} type="submit" className=' bg-[#F5FAFC] border rounded-lg py-2  w-20 font-semibold'>
                                        Submit
                                    </button>
                                </div>
                            </div>
                            <div className='w-[80%] pt-[20px]'>
                                <div className='flex' >
                                    <label className='w-24 py-4 font-semibold'>Name</label>
                                    <input type="name" defaultValue={currentUser?.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className=' border border-black h-10 m-2 w-[60%] p-3 ' />
                                </div>
                                <div className='pt-2 flex '>
                                    <label className='w-24 py-4 font-semibold'>Email</label>
                                    <input type="email" defaultValue={currentUser?.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className=' border border-black h-10 m-2 w-[60%] p-3' />
                                </div>
                                <div className='pt-2 flex' >
                                    <label className='w-24 py-4 font-semibold'>Address</label>
                                    <input type="address" defaultValue={currentUser?.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className=' border border-black h-10 m-2 w-[60%] p-3' />
                                </div>
                                <div className='pt-2 flex'>
                                    <label className='w-24 py-4 font-semibold'>OpenHour</label>
                                    <input type="openHour" defaultValue={currentUser?.openHour} onChange={(e) => setForm({ ...form, openHour: e.target.value })} className=' border border-black h-10 m-2 w-[60%] p-3' />
                                </div>
                                <div className='pt-2 flex' >
                                    <label className='w-24 py-4 font-semibold'>CloseHour</label>
                                    <input type="closeHour" defaultValue={currentUser?.closeHour} onChange={(e) => setForm({ ...form, closeHour: e.target.value })} className=' border border-black h-10 m-2 w-[60%] p-3' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateStore