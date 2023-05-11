import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import Sidebar from '../sidebar/Sidebar'
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ref as refUploadImgs, uploadBytes, getDownloadURL } from 'firebase/storage'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';
function UpdateFood() {
    const [formInput, setFormInput] = useState()
    const [image, setImage] = useState([])
    const [categories, setCategories] = useState()
    const { id } = useParams()
    const navigation = useNavigate()
    const productCollectionRef = collection(db, "products")
    const categoryCollectionRef = collection(db, "categorys")

    useEffect(() => {
        getCategory()
    }, [])

    const getCategory = async () => {
        const data = await getDocs(categoryCollectionRef)
        setCategories(data.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
        }));
    }
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const id = uuidv4()
            const imageRef = refUploadImgs(storage, "/imageFood/image/" + id);
            uploadBytes(imageRef, e.target.files[0])
                .then(() => {
                    getDownloadURL(imageRef).then((url) => {
                        setImage(prev => [...prev, url]);

                    }).catch(error => {
                        console.log(error.message, "err");
                    });
                })
        }
    }
    const getProduct = async () => {
        const data = await getDocs(productCollectionRef)
        const products = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setFormInput(products.find((e) => e.id === id))
        const image = products.find(product => {
            if (product.id === id) {
                return product.image
            }
        })
        setImage(image.image)
    }
    const handleDeleteImage = (ul) => {
        const igg = image.filter(img => {
            return img !== ul
        })
        setImage(igg)
    }

    useEffect(() => {
        getProduct()
    }, [])

    const editProduct = async () => {
        if (formInput.name ==="") {
            toast.error("You have not entered all the information!")
        }else if ( formInput.price ==="") {
            toast.error("You have not entered all the information!")
        }else if (formInput.description ==="") {
            toast.error("You have not entered all the information!")
        }
        else if (formInput.priceDiscount && formInput.priceDiscount >= formInput.price) {
            toast.warning("Price discount cannot be greater than or equal to product price");
          }
        else {
            const newRef = doc(db, "products", id);
            await updateDoc(newRef, { 
                ...formInput, 
                price: Number(formInput.price),
                priceDiscount: Number(formInput.priceDiscount), 
                priceDiscount: formInput.priceDiscount ? Number(formInput.priceDiscount) : 0,
                image: image 
            })
                .then(() => {
                    navigation("/food");
                    toast.success("Update product success")
                })
                .catch((error) => alert("Something wrong:", error));
        }
    }

    const handleChangeCategory = (e) => {
        const item = categories.find(ctg => ctg.id === e.target.value);
        setFormInput({ ...formInput, nameCategory: item.name, idCategory: item.id })
        console.log(formInput);

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
                        </div>
                    </div>
                    <div className=' pt-[80px] h-screen ml-5 mr-5'>

                        <div className=''>
                            <p className=' font-semibold uppercase'>name</p>
                            <input type="name" defaultValue={formInput?.name} onChange={(e) => setFormInput({ ...formInput, name: e.target.value })} className=' border p-2 w-full outline-none' />
                        </div>
                        <div className=' pt-2'>
                            <p className=' font-semibold uppercase'>category</p>
                            {

                                formInput?.nameCategory ? (
                                    <select defaultValue={formInput?.idCategory} onChange={e => handleChangeCategory(e)} className=' border p-2 w-[20%] outline-none' >
                                        {categories?.filter(cate => cate.isDeleted === false)?.map(cate => (
                                            <option key={cate.id} value={cate.id}>{cate.name}</option>
                                        ))}
                                    </select>) : ""
                            }
                        </div>
                        <div className=' pt-2 flex'>
                            <div>
                                <p className=' font-semibold uppercase'>image</p>
                                <input  type="file" onChange={(e) => handleImageChange(e)} className='w-[200px]' />
                            </div>
                            {
                                image &&
                                image?.map((img, index) => (
                                    <span key={index} className='relative w-36 block'>
                                        <span onClick={e => handleDeleteImage(img)} className=' rounded-lg cursor-pointer  absolute top-3 right-7'>X</span>
                                        <img src={img} alt="" className='w-[130px] h-[90px] object-cover' />
                                    </span>
                                ))

                            }
                        </div>
                        <div className=' pt-2'>
                            <p className=' font-semibold uppercase'>price</p>
                            <input type="price" defaultValue={formInput?.price} onChange={(e) => setFormInput({ ...formInput, price: e.target.value })} className=' border p-2 w-full outline-none' />
                        </div>
                        <div className=' pt-2'>
                            <p className=' font-semibold uppercase'>priceDiscount</p>
                            <input id='price' type="price" defaultValue={formInput?.priceDiscount} onChange={(e) => setFormInput({ ...formInput, priceDiscount: e.target.value })} className=' border p-2 w-full outline-none' />
                        </div>
                        <div className=' pt-2'>
                            <p className=' font-semibold uppercase'>description</p>
                            <textarea name="" defaultValue={formInput?.description} onChange={(e) => setFormInput({ ...formInput, description: e.target.value })} className=' border h-[100px]  p-2 w-full outline-none' ></textarea>
                        </div>
                    <div className='pt-2 justify-end flex mr-10'>
                    <button className=" rounded-lg bg-[#d0f2ff] text-gray-700 border h-10 w-[150px] font-semibold"
                                onClick={() => editProduct()}
                            >
                                Update Food
                    </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateFood 