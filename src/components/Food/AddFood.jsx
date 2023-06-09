import Sidebar from '../sidebar/Sidebar'
import React, { useEffect, useState } from 'react';
import { db, storage } from '../../firebase'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ref as refUploadImgs, uploadBytes, getDownloadURL } from 'firebase/storage'
import { toast } from 'react-toastify'
import { v1 as uuidv1 } from 'uuid';

function AddFood() {
    const [formInput, setFormInput] = useState()
    const [categories, setCategories] = useState()
    const productCollectionRef = collection(db, "products")
    const navigation = useNavigate()
    const categoryCollectionRef = collection(db, "categorys")
    const [images, setImages] = useState([])
    const getCategory = async () => {
        const data = await getDocs(categoryCollectionRef)
        setCategories(data.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
        }));
    }
    useEffect(() => {
        getCategory()
    }, [])
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const id = uuidv1()
            const imageRef = refUploadImgs(storage, "/imageFood/" + id);
            uploadBytes(imageRef, e.target.files[0])
                .then(() => {
                    getDownloadURL(imageRef).then((url) => {
                        setImages(prev => [...prev, url])

                    }).catch(error => {
                        console.log(error.message, "err");
                    });
                })
        }
    }
    const createProduct = async () => {
        if (document.getElementById('name').value === '' || document.getElementById('image').value === '' || document.getElementById('price').value === '' || document.getElementById('desc').value === '') {
            toast.error("You have not entered all the information!")
        }else if (Number(formInput.price) <= 0 || formInput.priceDiscount && Number(formInput.priceDiscount) <= 0) {
            toast.warning("Product price and discount must be greater than 0");
        }else if ( Number(formInput.priceDiscount) >= Number(formInput.price)) {
            toast.warning("Price discount cannot be greater than or equal to product price");
        } else {
            try {
                const newProductRef = doc(productCollectionRef);
                await setDoc(newProductRef, {
                    ...formInput,
                    id: newProductRef.id,
                    sold: 0,
                    quantity: 1,
                    priceDiscount: Number(formInput.priceDiscount) || formInput.priceDiscount ? Number(formInput.priceDiscount) : 0,
                    price: Number(formInput.price),
                    image: images,
                    isDeleted: false,
                    isShow: true,
                    idUser: JSON.parse(localStorage.getItem('user')).id,
                });
                navigation("/food");
                toast.success("Add product success")
            } catch (error) {
                toast.error("Something wrong", error);
            }
        }
    }
    const handleChangeCategory = (e) => {
        const item = categories.find(ctg => ctg.id === e.target.value);
        setFormInput({ ...formInput, nameCategory: item.name, idCategory: item.id })
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
                            <p className="font-bold text-2xl mx-3"> Create Food</p>
                        </div>
                    </div>

                    <div className=' pt-[80px] h-screen ml-5 mr-5 '>
                        <div className=''>
                            <p className=' font-semibold uppercase'>name</p>
                            <input type="name" id='name' defaultValue={formInput?.name} onChange={(e) => setFormInput({ ...formInput, name: e.target.value })} className=' border p-2 w-full outline-none' />
                        </div>
                        <div className='pt-2'>
                            <p className=' font-semibold uppercase'>category</p>
                            <select onChange={e => handleChangeCategory(e)} className=' border p-2 w-[20%] outline-none' >
                                {categories?.filter(cate => cate.isDeleted === false)?.map(cate => (
                                    <option key={cate.id} value={cate.id} >{cate.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className=' pt-2 flex'>
                            <div>
                                <p className=' font-semibold uppercase'>image</p>
                                <input id='image' type="file" onChange={(e) => handleImageChange(e)} className='w-[200px]' />
                            </div>
                            {
                                images &&
                                images.map((img, index) => (
                                    <span key={index} className=' w-36'> <img src={img} alt="" className='h-[90px] w-[130px] object-cover flex ' /></span>
                                ))
                            }
                        </div>
                        <div className=' pt-2'>
                            <p className=' font-semibold uppercase'>price</p>
                            <input id='price' type="price" defaultValue={formInput?.price} onChange={(e) => setFormInput({ ...formInput, price: e.target.value })} className=' border p-2 w-full outline-none' />
                        </div>
                        <div>
                            <div className=' pt-2'>
                                <p className=' font-semibold uppercase'>priceDiscount</p>
                                <input id='priceDis' type="priceDiscound" defaultValue={formInput?.priceDiscount} onChange={(e) => setFormInput({ ...formInput, priceDiscount: e.target.value })} className=' border p-2 w-full outline-none' />
                            </div>
                        </div>
                        <div className=' pt-2'>
                            <p className=' font-semibold uppercase'>description</p>
                            <textarea name="" id="desc" defaultValue={formInput?.description} onChange={(e) => setFormInput({ ...formInput, description: e.target.value })} className=' border h-[100px]  p-2 w-full outline-none' ></textarea>
                        </div>
                        <div className=' pt-2 justify-end flex mr-10'>
                            <button className=" rounded-lg bg-[#d0f2ff] text-gray-700  border h-10 w-[170px] font-semibold mr-2 "
                                onClick={createProduct}
                            >
                                Create New Food
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddFood