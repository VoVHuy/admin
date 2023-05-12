import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar'
import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref as refUploadImgs, uploadBytes, getDownloadURL, ref } from 'firebase/storage'
import { toast } from 'react-toastify';
import validator from 'validator';
import { v1 as uuidv1 } from 'uuid';
function UpdateStore() {
    const [currentUser, setCurrentUser] = useState()
    const [form, setForm] = useState()
    const [image, setImage] = useState([])
    const navigation = useNavigate()
    console.log(currentUser);
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const id = uuidv1()
            const imageRef = ref(storage, "/imageStore/" + id);
            uploadBytes(imageRef, e.target.files[0])
                .then(() => {
                    getDownloadURL(imageRef).then((url) => {
                        setImage(url)
                    }).catch(error => {
                        console.log(error.message, "err");
                    });
                })
        }
    }

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('user')))

    }, [])
    useEffect(() => {
        if (currentUser) {
            setForm({
                fullName: currentUser.fullName,
                email: currentUser.email,
                phone: currentUser.phone,
                address: currentUser.address,
                openHour: currentUser.openHour,
                closeHour: currentUser.closeHour
                
            })
        }
    }, [currentUser])

    //

    const handleUpdate = async () => {
        if (form.fullName ==="") {
            toast.error("You have not entered all the information!")
        }else if ( form.email ==="") {
            toast.error("You have not entered all the information!")
        }else if ( form.phone ==="") {
            toast.error("You have not entered all the information!")
        }
        else if (form.openHour ==="") {
            toast.error("You have not entered all the information!")
        }else if (form.closeHour ==="") {
            toast.error("You have not entered all the information!")
        }else if (!validator.isEmail(form.email)) {
            toast.warning("Please enter a valid email address.");
          }
        else {
            const newRef = doc(db, "users", currentUser.id);
            await updateDoc(newRef, form).then((e) => {
                navigation("/store");
                toast.success("Update store success");
                localStorage.setItem('user', JSON.stringify({ ...currentUser, ...form }))
            }).catch((error) =>
                alert("Something wrong:", error));
        }
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
                            <p className="font-bold text-2xl mx-3">Update Store</p>
                        </div>
                    </div>
                    <div className=' text-black w-full flex  justify-center mx-10 pt-[80px]'>
                        <div className='flex gap-[60px]'>
                            <div className='pt-[20px]'>
                                <div>
                                <img src="/afood.jpg" alt=""  className='rounded-full w-[70%]' />
                                </div>
                                <div className='w-[20%] pt-[100px] ml-[10px]'>
                                    <button onClick={handleUpdate} type="submit" className=' bg-[#d0f2ff] text-gray-700 border rounded-lg py-2 w-[150px] font-semibold'>
                                            Update Profile
                                    </button>
                                </div>
                            </div>
                            <div className='w-[80%] pt-[10px]' >
                                <div className='flex' >
                                    <label className='w-24 py-4 font-semibold'>Name</label>
                                    <input type="name" id='txt_fullname' defaultValue={currentUser?.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className=' border outline-none h-10 m-2 w-[60%] p-3 ' />
                                </div>
                                <div className='pt-2 flex '>
                                    <label className='w-24 py-4 font-semibold'>Email</label>
                                    <input type="email" id='txt_email' defaultValue={currentUser?.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className=' border outline-none h-10 m-2 w-[60%] p-3' />
                                </div>
                                <div className='pt-2 flex '>
                                    <label className='w-24 py-4 font-semibold'>Phone</label>
                                    <input type="phone" id='txt_phone' defaultValue={currentUser?.phone} onChange={(e) => setForm({ ...form, email: e.target.value })} className=' border outline-none h-10 m-2 w-[60%] p-3' />
                                </div>
                                <div className='pt-2 flex' >
                                    <label className='w-24 py-4 font-semibold'>Address</label>
                                    <input type="address" id='txt_address' value={currentUser?.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className=' outline-none h-10 m-2 w-[60%] p-3' />
                                </div>
                                <div className='pt-2 flex'>
                                    <label className='w-24 py-4 font-semibold'>OpenHour</label>
                                    <input type="openHour" id='txt_openhour' defaultValue={currentUser?.openHour} onChange={(e) => setForm({ ...form, openHour: e.target.value })} className=' border outline-none h-10 m-2 w-[60%] p-3' />
                                </div>
                                <div className='pt-2 flex' >
                                    <label className='w-24 py-4 font-semibold'>CloseHour</label>
                                    <input type="closeHour" id='txt_closehour' defaultValue={currentUser?.closeHour} onChange={(e) => setForm({ ...form, closeHour: e.target.value })} className=' border outline-none h-10 m-2 w-[60%] p-3' />
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