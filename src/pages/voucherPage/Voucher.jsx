import Sidebar from '../../components/sidebar/Sidebar'
import { AiOutlineSearch } from "react-icons/ai";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify'
function Voucher() {
    const [vouchers, setVouchers] = useState([])
    const [currentUser, setCurrentUser] = useState()
    const voucherCollectionRef = collection(db, "vouchers")
    const navigate = useNavigate()
    const [currentPage, setCurrenPage] = useState(1)
    const [records, setRecords] = useState([])
    const [numbers, setNumbers] = useState([])
    // const router = useRoutes()
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;

    useEffect(() => {
        if (vouchers.length > 0) {
            let npage = Math.ceil(vouchers.length / recordsPerPage)
            const arr = []
            for (let index = 0; index < npage; index++) {
                arr.push(index + 1)
            }

            setNumbers(arr)
        }
    }, [vouchers]);

    useEffect(() => {
        setRecords(vouchers?.slice(firstIndex, lastIndex))
    }, [currentPage, vouchers]);

    const deleteVoucher = async (id) => {
        const voucherDoc = doc(db, "vouchers", id);
        await deleteDoc(voucherDoc)
            .then(() => {
                getVoucher(); toast.error("Delete voucher success")
            }).catch((error) =>
                toast.error("Something wrong:", error))
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

    const handleAdd = (e) => {
        e.preventDefault();
        navigate('/voucher/add')
    }

    const handleSearch = (e) => {
        let searchText = e.target.value;
        const filterProduct = vouchers.filter(item => {
            let nameCategory = item.nameCategory.toUpperCase();
            if (nameCategory.includes(searchText.toUpperCase())) {
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
                            <p className="font-bold text-2xl mx-3">Voucher</p>
                        </div>
                    </div>
                    <div className='pt-24 h-screen'>
                        <div className='flex justify-between'>
                            <div className=" rounded-full ml-3 bg-slate-200 flex py-2 h-10 w-[200px] text-gray-400">
                                <AiOutlineSearch size={24} className="mx-2 " />
                                <input type="text" placeholder="Search" className=" bg-slate-200 text-black w-[150px] outline-none" onChange={handleSearch} />
                            </div>
                            <button className=" rounded-lg bg-[#F5FAFC] border h-10 w-[80px] font-semibold mr-3 " onClick={handleAdd}>
                                Create
                            </button>
                        </div>
                        <div className=" bg-white text-gray-800 pt-2 [&>*:nth-child(odd)]:bg-[#F2f2f2] mx-3 ">
                            <div className="font-semibold flex justify-between bg-[#F5FAFC] h-[40px] py-2">
                                <div className="flex ml-3 gap-[80px]">
                                    <div className="flex items-center gap-[85px]">
                                        <label >Id</label>
                                        <label >Name</label> 
                                    </div>
                                    <div className='flex gap-[90px]'>
                                    <label >Code</label>
                                    <label >EndDate</label>
                                    <div>
                                    <div className='flex gap-[80px]'>
                                    <label >Image</label>
                                    <label >Description</label>
                                    </div>
                                    </div>
                                    </div>     
                                </div>
                                <div className="mr-[110px]">
                                    <p>Action</p>
                                </div>
                            </div>
                            {records?.map((voucher, idx) => (
                                <div key={idx} className=" py-2 flex justify-between ">
                                    <div className='flex items-center gap-[50px] ml-3'>
                                        <p className='w-[50px] truncate'>{voucher.id}</p>
                                        <p className='w-[70px] truncate '>{voucher.name}</p>
                                        <p className='w-[80px] '>{voucher.code}</p>
                                        <p className='w-[100px] truncate'>{voucher.endDate}</p>
                                        <img src={voucher.image} alt="" className=' h-[50px] w-[80px] object-cover' />
                                        <p className='w-[70px] truncate'>{voucher.description}</p>

                                    </div>
                                    <div className="flex gap-2 mr-3 items-center">
                                        <button className=" rounded-lg bg-[#F5FAFC] border h-7 w-[100px] font-semibold "

                                        >Not</button>
                                        <button className=" rounded-lg bg-[#F5FAFC] border h-7 w-[70px] font-semibold  "
                                            onClick={() => navigate(`/voucher/update/${voucher.id}`)}
                                        >Update</button>
                                        <button className=" rounded-lg bg-[#f86060] border h-7 w-[70px] font-semibold "
                                            onClick={() => { deleteVoucher(voucher.id) }}
                                        >Delete</button>
                                    </div>
                                </div>
                            )
                            )}
                            <div className="flex gap-[10px] justify-center py-3">
                                <div className="ml-10">
                                    <a href="#" onClick={prePage}>Previous</a>
                                </div>
                                {
                                    numbers?.map((n, i) => (
                                        <div className={`${currentPage === n ? 'active' : ''}`} key={i}>
                                            <a href="#" className={currentPage === n ? `font-bold` : ''}
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
export default Voucher