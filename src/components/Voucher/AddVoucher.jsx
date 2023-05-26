import Sidebar from '../sidebar/Sidebar'
import React, { useEffect, useState } from 'react';
import { db, storage } from '../../firebase'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage'
import { toast } from 'react-toastify'
import { v1 as uuidv1 } from 'uuid';
function AddVoucher() {
    const voucherCollectionRef = collection(db, "vouchers")
    const navigation = useNavigate()
    const [image, setImage] = useState([])
    const [currentUser, setCurrentUser] = useState()
    const [vouchers, setVouchers] = useState([])
    const [voucher, setVoucher] = useState([])
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const id = uuidv1()
            const imageRef = ref(storage, "/imageVoucher/" + id);
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

    const getVoucher = async () => {
        const data = await getDocs(voucherCollectionRef)
        const docData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setVouchers(docData.filter((e) => e.idUser === currentUser.id))
    }
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    useEffect(() => {
        if (currentUser) {
            getVoucher()
        }

    }, [currentUser])

    const createVoucher = async () => {
        if (document.getElementById('name').value === '') {
            toast.error("You have not entered all the information!")
        } else if (document.getElementById('code').value === '') {
            toast.error("You have not entered all the information!")
        } else if (vouchers.some(item => item.code === voucher.code)) {
            toast.error("Code Already Exists")
        } else if (document.getElementById('enddate').value === '') {
            toast.error("You have not entered all the information!")
        } else if (document.getElementById('discount').value === '') {
            toast.error("You have not entered all the information!")
        } else if (document.getElementById('minorder').value === '') {
            toast.error("You have not entered all the information!")
        } else if (document.getElementById('litmitmax').value === '') {
            toast.error("You have not entered all the information!")
        } else if (document.getElementById('desc').value === '') {
            toast.error("You have not entered all the information!")
        } else if (document.getElementById('image').value === '') {
            toast.error("You have not entered all the information!")
        } else if (Number(voucher.discountMoney) <= 0 || Number(voucher.minOrderPrice) <= 0 || Number(voucher.limitMax) <= 0) {
            toast.warning("Voucher discountMoney, minOrderPrice and limitMax must be greater than 0");
        }
        else {
            try {
                const newProductRef = doc(voucherCollectionRef);
                await setDoc(newProductRef, {
                    ...voucher,
                    id: newProductRef.id,
                    discountMoney: Number(voucher.discountMoney),
                    minOrderPrice: Number(voucher.minOrderPrice),
                    limitMax: Number(voucher.limitMax),
                    image: image,
                    listCustomer: [],
                    isDeleted: false,
                    isShow: true,
                    idUser: JSON.parse(localStorage.getItem('user')).id,
                });
                navigation("/voucher");
                toast.success("Add voucher success")
            } catch (error) {
                toast.error("Something wrong", error);


            }
        }
    }
    return (
        <div className='w-full'>
            <div className='flex'>
                <div className='w-[25%]'>
                    <Sidebar />
                </div>
                <div className=' text-black w-full'>
                    <div className='h-[70px] fixed text-[#09132C] w-full px-6 py-4 bg-[#fafafa] flex items-center' >
                        <div className='font-normal flex justify-between gap-[700px]'>
                            <p className="font-bold text-2xl mx-3"> Create Voucher</p>
                        </div>
                    </div>

                    <div className=' pt-[80px] h-screen ml-5 mr-5 '>
                        <div className=''>
                            <p className=' font-semibold uppercase'>name</p>
                            <input type="name" id='name' defaultValue={voucher?.name} onChange={(e) => setVoucher({ ...voucher, name: e.target.value })} className=' border p-2 w-full outline-none' />
                        </div>
                        <div className=''>
                            <p className=' font-semibold uppercase'>Code</p>
                            <input type="name" id='code' defaultValue={voucher?.code} onChange={(e) => setVoucher({ ...voucher, code: e.target.value })} className=' border p-2 w-full outline-none' />
                        </div>
                        <div className=''>
                            <p className=' font-semibold uppercase'>End Date</p>
                            <input type="datetime-local" name="" id="enddate" defaultValue={voucher?.endDate} onChange={(e) => setVoucher({ ...voucher, endDate: e.target.value })} className=' border p-2 w-full outline-none' />
                        </div>
                        <div className=''>
                            <p className=' font-semibold uppercase'>Discount Money</p>
                            <input type="name" id='discount' defaultValue={voucher?.discountMoney} onChange={(e) => setVoucher({ ...voucher, discountMoney: e.target.value })} className=' border p-2 w-full outline-none' />
                        </div>
                        <div className=''>
                            <p className=' font-semibold uppercase'>Min Order Price</p>
                            <input type="name" id='minorder' defaultValue={voucher?.minOrderPrice} onChange={(e) => setVoucher({ ...voucher, minOrderPrice: e.target.value })} className=' border p-2 w-full outline-none' />
                        </div>
                        <div className=''>
                            <p className=' font-semibold uppercase'>Limit Max</p>
                            <input type="name" id='litmitmax' defaultValue={voucher?.limitMax} onChange={(e) => setVoucher({ ...voucher, limitMax: e.target.value })} className=' border p-2 w-full outline-none' />
                        </div>
                        <div className=' pt-2'>
                            <p className=' font-semibold uppercase'>description</p>
                            <textarea name="" id="desc" defaultValue={voucher?.description} onChange={(e) => setVoucher({ ...voucher, description: e.target.value })} className=' border h-[100px]  p-2 w-full outline-none' ></textarea>
                        </div>
                        <div className=' pt-2'>
                            <p className=' font-semibold uppercase'>image</p>
                            <input id='image' type="file" onChange={(e) => handleImageChange(e)} />
                            <img src={image} alt="" className='h-[80px] w-[120px]' />
                        </div>
                        <div className=' pt-2 justify-end flex mr-10'>
                            <button className=" rounded-lg bg-[#d0f2ff] text-gray-700  border h-10 w-[170px] font-semibold mr-2 "
                                onClick={createVoucher}
                            >
                                Create New Voucher
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddVoucher