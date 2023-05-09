import Sidebar from '../sidebar/Sidebar'
import React, { useEffect, useState } from 'react';
import { db, storage } from '../../firebase'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { ref as refUploadImgs, uploadBytes, getDownloadURL, ref } from 'firebase/storage'
import { toast } from 'react-toastify'
import { v1 as uuidv1 } from 'uuid';
function UpdateVoucher() {
    const voucherCollectionRef = collection(db, "vouchers")
    const navigation = useNavigate()
    const { id } = useParams()
    const [image, setImage] = useState([])
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
    const editVoucher = async () => {
        if (voucher.name === "") {
            toast.error("You have not entered all the information!")
        } else if (voucher.code === "") {
            toast.error("You have not entered all the information!")
        } else if (voucher.endDate === "") {
            toast.error("You have not entered all the information!")
        } else if (voucher.discountMoney === "") {
            toast.error("You have not entered all the information!")
        } else if (voucher.minOrderPrice === "") {
            toast.error("You have not entered all the information!")
        } else if (voucher.limitMax === "") {
            toast.error("You have not entered all the information!")
        } else if (voucher.description === "") {
            toast.error("You have not entered all the information!")
        }
        else {
            const newRef = doc(db, "vouchers", id);
            await updateDoc(newRef, {
                ...voucher,
                discountMoney: Number(voucher.discountMoney),
                minOrderPrice: Number(voucher.minOrderPrice),
                limitMax: Number(voucher.limitMax),
                image: image
            })
                .then(() => {
                    navigation("/voucher");
                    toast.success("Update voucher success")
                })
                .catch((error) => alert("Something wrong:", error));

        }
    }
    const getProduct = async () => {
        const data = await getDocs(voucherCollectionRef)
        const vouchers = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setVoucher(vouchers.find((e) => e.id === id))
        const image = vouchers.find(voucher => {
            if (voucher.id === id) {
                return voucher.image
            }
        })
        setImage(image.image)
    }
    useEffect(() => {
        getProduct()
    }, [])
    return (
        <div className='w-full'>
            <div className='flex'>
                <div className='w-[25%]'>
                    <Sidebar />
                </div>
                <div className=' text-black w-full'>
                    <div className='h-[70px] fixed text-[#09132C] w-full px-6 py-4 bg-[#fafafa] flex items-center' >
                        <div className='font-normal flex justify-between gap-[700px]'>
                            <p className="font-bold text-2xl mx-3"> Update Voucher</p>
                        </div>
                    </div>

                    <div className=' pt-[80px] h-screen ml-5 mr-5 '>
                        <div className=''>
                            <p className=' font-semibold uppercase'>name</p>
                            <input type="name" id='name' defaultValue={voucher?.name} onChange={(e) => setVoucher({ ...voucher, name: e.target.value })} className=' border p-2 w-full outline-none' />
                        </div>
                        <div className=''>
                            <p className=' font-semibold uppercase'>Code</p>
                            <input type="name" id='name' defaultValue={voucher?.code} onChange={(e) => setVoucher({ ...voucher, code: e.target.value })} className=' border p-2 w-full outline-none' />
                        </div>
                        <div className=''>
                            <p className=' font-semibold uppercase'>End Date</p>
                            <input type="datetime-local" name="" id="" defaultValue={voucher?.endDate} onChange={(e) => setVoucher({ ...voucher, endDate: e.target.value })} className=' border p-2 w-full outline-none' />
                        </div>
                        <div className=''>
                            <p className=' font-semibold uppercase'>Discount Money</p>
                            <input type="name" id='name' defaultValue={voucher?.discountMoney} onChange={(e) => setVoucher({ ...voucher, discountMoney: e.target.value })} className=' border p-2 w-full outline-none' />
                        </div>
                        <div className=''>
                            <p className=' font-semibold uppercase'>Min Order Price</p>
                            <input type="name" id='name' defaultValue={voucher?.minOrderPrice} onChange={(e) => setVoucher({ ...voucher, minOrderPrice: e.target.value })} className=' border p-2 w-full outline-none' />
                        </div>
                        <div className=''>
                            <p className=' font-semibold uppercase'>Limit Max</p>
                            <input type="name" id='name' defaultValue={voucher?.limitMax} onChange={(e) => setVoucher({ ...voucher, limitMax: e.target.value })} className=' border p-2 w-full outline-none' />
                        </div>
                        <div className=' pt-2'>
                            <p className=' font-semibold uppercase'>description</p>
                            <textarea name="" id="desc" defaultValue={voucher?.description} onChange={(e) => setVoucher({ ...voucher, description: e.target.value })} className=' border h-[100px]  p-2 w-full outline-none' ></textarea>
                        </div>
                        <div className=' pt-2'>
                            <p className=' font-semibold uppercase'>image</p>
                            <input type="file" onChange={(e) => handleImageChange(e)} />
                            <img src={image} alt="" className='h-[80px] w-[120px]' />
                        </div>
                        <div className=' pt-2 justify-end flex mr-10'>
                            <button className=" rounded-lg bg-[#d0f2ff] text-gray-700  border h-10 w-[170px] font-semibold mr-2 "
                                onClick={editVoucher}
                            >
                                Update Voucher
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateVoucher