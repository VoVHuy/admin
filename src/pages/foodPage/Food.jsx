import Sidebar from '../../components/sidebar/Sidebar'
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineSelector } from "react-icons/hi";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify'
function Food() {
  const [products, setProducts] = useState([])
  const [currentUser, setCurrentUser]= useState()
  const productCollectionRef = collection(db, "products")
  const navigate = useNavigate()

  const [currentPage, setCurrenPage] = useState(1)
  const [records, setRecords] = useState([])
  const [numbers, setNumbers] = useState([])
  // const router = useRoutes()
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  useEffect(() => {
    if (products.length > 0) {
      let npage = Math.ceil(products.length / recordsPerPage)
      const arr = []
      for (let index = 0; index < npage; index++) {
        arr.push(index + 1)
      }

      setNumbers(arr)
    }
  }, [products]);

  useEffect(() => {
    setRecords(products?.slice(firstIndex, lastIndex))
  }, [currentPage, products]);

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc).then(() => { getProduct(); toast.error("Delete product success") }).catch((error) => toast.error("Something wrong:", error))
  }
  const getProduct = async () => {
    const data = await getDocs(productCollectionRef)
    const docData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setProducts(docData.filter((e)=> e.idUser === currentUser.id))
  }
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  useEffect(()=>{
    if (currentUser) {
      getProduct()
    }
   
  },[currentUser])

  const handleAdd = (e) => {
    e.preventDefault();
    navigate('/food/add')
  }

  const handleSearch = (e) => { 
    let searchText = e.target.value;
    const filterProduct = products.filter(item => {
      let name = item.name.toUpperCase();
      if (name.includes(searchText.toUpperCase())) {
        return item;
      }
    })
    setRecords(filterProduct)

  }

  return (
    <div className='w-full'>
      <div className='flex'>
        <div className='w-[25%]'>
          <Sidebar />
        </div>
        <div className=' text-black w-full'>
          <div className='h-[70px] fixed text-[#09132C] w-full px-6 py-4 bg-[#fafafa] flex items-center' >
            <div className='font-normal max-md:text-sm max-w-[400px]'>
              <p className="font-bold text-2xl mx-3">Food</p>
            </div>
          </div>
          <div className='pt-24 h-screen'>
            <div className='flex justify-between'>
              <div className=" rounded-full ml-5 bg-slate-200 flex py-2 h-10 w-[300px] text-gray-400">
                <AiOutlineSearch size={24} className="mx-2 " />
                <input type="text" placeholder="Search" className=" bg-slate-200 text-black w-[250px]" onChange={handleSearch} />
              </div>
              <button className=" rounded-lg bg-[#F5FAFC] border h-10 w-[80px] font-semibold mr-2 " onClick={handleAdd}>
                Create
              </button>
            </div>
            <div className=" bg-white text-gray-800 pt-2">
              <div className="font-semibold uppercase flex justify-between bg-[#F5FAFC] h-[40px] py-2">
                <div className="flex gap-[90px] mx-5">
                  <div className="flex items-center">
                    <p>id</p>
                    <HiOutlineSelector size={15} />
                  </div>
                  <p>name</p>
                  <p>images</p>
                  <p>price</p>
                  <p>description</p>
                  <p>ID Store</p>
                </div>
                <div className="mr-[100px]">
                  <p>Action</p>
                </div>
              </div>
              {records?.map((product) => {
                return (
                  <div className=" py-2 flex justify-between">
                    <div className='flex items-center gap-[30px] mx-5'>
                      <p className='w-[90px]'>{product.id.slice(-5)}</p>
                      <p className='w-[110px]'>{product.name}</p>
                      <img src={product.image} alt="" className='h-[70px] w-[115px]' />
                      <p className='w-[102px]'>{product.price}</p>
                      <p className='w-[160px]'>{product.description}</p>
                      <p className='w-[100px]'>{product?.idUser.slice(-5)}</p>
                    </div>
                    <div className="flex gap-2 mr-3 items-center">
                      <button className=" rounded-lg bg-[#F5FAFC] border h-7 w-[70px] font-semibold  "
                        onClick={() => navigate(`/food/update/${product.id}`)}
                      >Update</button>
                      <button className=" rounded-lg bg-[#f86060] border h-7 w-[70px] font-semibold "
                        onClick={() => { deleteProduct(product.id) }}
                      >Delete</button>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-between py-3">
                <div className="mx-10">
                  <a href="#" onClick={prePage}>Previous</a>
                </div>
                {
                  numbers?.map((n, i) => (
                    <div className={`${currentPage === n ? 'active' : ''}`} key={i}>
                      <a href="#" className="page-link border"
                        onClick={() => changePage(n)}>{n}</a>
                    </div>
                  ))
                }
                <div className="mr-10">
                  <a href="#" onClick={nextPage}>Next</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  function prePage() {
    if (currentPage !== firstIndex && currentPage !== 1) {
      setCurrenPage(currentPage - 1)
    }
  }
  function changePage(id) {
    setCurrenPage(id)
  }
  function nextPage() {
    if (currentPage !== firstIndex && currentPage !== numbers.length) {
      setCurrenPage(currentPage + 1)
    }
  }
}

export default Food