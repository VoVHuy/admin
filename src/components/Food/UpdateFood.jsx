
import Sidebar from '../sidebar/Sidebar'
import React, { useState, useEffect} from 'react';
import {db} from '../../firebase'
import {  collection, getDocs , doc} from 'firebase/firestore';

function UpdateFood() {
    const [name, setName] = useState("")
    const [categori, setCategori] = useState("")
    const [price, setPrice] = useState(0)
    const [desc, setDesc] = useState("")
    const [image, setImage] = useState();
    const [products, setProducts] = useState([])
    const productCollectionRef = collection (db,"products")
    useEffect(() =>{
        const getProduct = async () =>{
            const data = await getDocs(productCollectionRef)
            setProducts(data.docs.map((doc)=> ({...doc.data(), id:doc.id})))
        }
          getProduct()
      },[])
      const editProduct = async (id, age) =>{
        const productDoc = doc(db, "products", id)
        const newFields ={age: age +1}
        // await editDoc(productDoc,newFields)
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
                            <p className="font-bold text-2xl mx-3"> Update Food</p>
                            <button className=" rounded-lg bg-[#F5FAFC] border h-10 w-[80px] font-semibold mr-2 " 
                            onClick={editProduct}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    <div className=' pt-[100px] h-screen ml-5 mr-5'>
                        <div className=''>
                            <p className=' font-semibold uppercase'>category</p>
                            <input type="number" name="" id="" className=' border p-2 w-full' />
                        </div>
                        <div className=' pt-2'>
                            <p className=' font-semibold uppercase'>name</p>
                            <input type="name" className=' border p-2 w-full' />
                        </div>
                        <div className=' pt-2'>
                            <p className=' font-semibold uppercase'>image</p>
                            <img src="/afood.jpg" alt="" className='h-[150px] w-[250px]' />
                        </div>
                        <div className=' pt-2'>
                            <p className=' font-semibold uppercase'>price</p>
                            <input type="price" className=' border p-2 w-full' />
                        </div>
                        <div className=' pt-2'>
                            <p className=' font-semibold uppercase'>description</p>
                            <textarea name="" id="" className=' border h-[100px]  p-2 w-full' ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateFood