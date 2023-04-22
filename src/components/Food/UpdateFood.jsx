import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import Sidebar from '../sidebar/Sidebar'
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ref as refUploadImgs, uploadBytes, getDownloadURL } from 'firebase/storage'
import { toast } from 'react-toastify'
function UpdateFood() {
    const [formInput, setFormInput] = useState()
    const [image, setImage] = useState()
    const { id } = useParams()
    const navigation = useNavigate()
    const productCollectionRef = collection(db, "products")

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const imageRef = refUploadImgs(storage, "/imageFood/image/");
            uploadBytes(imageRef, e.target.files[0])
                .then(() => {
                    getDownloadURL(imageRef).then((url) => {
                        setImage(url);

                    }).catch(error => {
                        console.log(error.message, "err");
                    });
                })
        }

    }
    const getProduct = async () => {
        const data = await getDocs(productCollectionRef)
        const products = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setFormInput(products.find((e) => e.id == id))
        setImage(products.find((e) => e.id == id).image)
    }
    useEffect(() => {
        getProduct()
    }, [])

    useEffect(() => {
        console.log(formInput);
    }, [formInput])

    const editProduct = async () => {
        const newRef = doc(db, "products", id);
        await updateDoc(newRef, { ...formInput, image: image }).then(() => { navigation("/food"); toast.success("Update product success") }).catch((error) => toast.success("Something wrong:", error));

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
                            <p className="font-bold text-2xl mx-3"  > Update Food</p>
                            <button className=" rounded-lg bg-[#F5FAFC] border h-10 w-[80px] font-semibold mr-2 "
                                onClick={() => editProduct()}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className=' pt-[100px] h-screen ml-5 mr-5'>
                        <div className=''>
                            <p className=' font-semibold uppercase'>category</p>
                            <input type="category" defaultValue={formInput?.nameCategory} onChange={(e) => setFormInput({ ...formInput, nameCategory: e.target.value })} className=' border p-2 w-full' />
                        </div>
                        <div className=' pt-2'>
                            <p className=' font-semibold uppercase'>name</p>
                            <input type="name" defaultValue={formInput?.name} onChange={(e) => setFormInput({ ...formInput, name: e.target.value })} className=' border p-2 w-full' />
                        </div>
                        <div className=' pt-2'>
                            <p className=' font-semibold uppercase'>image</p>
                            <input required type="file" onChange={(e) => handleImageChange(e)} />
                            {
                                image && (
                                    <img src={image} alt="" className='h-[150px] w-[250px]' />
                                )
                            }
                        </div>
                        <div className=' pt-2'>
                            <p className=' font-semibold uppercase'>price</p>
                            <input type="price" defaultValue={formInput?.price} onChange={(e) => setFormInput({ ...formInput, price: e.target.value })} className=' border p-2 w-full' />
                        </div>
                        <div className=' pt-2'>
                            <p className=' font-semibold uppercase'>description</p>
                            <textarea name="" id="" defaultValue={formInput?.description} onChange={(e) => setFormInput({ ...formInput, description: e.target.value })} className=' border h-[100px]  p-2 w-full' ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateFood