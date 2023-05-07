import { HiViewGrid} from "react-icons/hi";
import { MdNoFood, MdOutlineDiscount } from "react-icons/md";
import { BiStore } from "react-icons/bi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
function Sidebar() {
    const navigate = useNavigate()
    const userCollectionRef = collection(db, "users")
    const getUser = async () => {
        const data = await getDocs(userCollectionRef)
        const Users = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        setDoc(Users[0])
    }
    const handleLogout = (e) =>{
        localStorage.setItem("user", null)
        navigate("/login")
        toast.success('Logout is fucking success!')
    }
    return (
        <div className=" h-screen bg-[#F5FAFC] fixed w-[20%]">
            <div className=" font-semibold h-[30%] py-10">
                <img src="/afood.jpg" alt="" className=" rounded-full w-[50%] mx-[70px]" />
            </div>
            <div className="ml-[60px] pt-[50px] h-[50%]">
                <div className="flex gap-2 py-7 h-10 cursor-pointer hover:text-cyan-600 draft:text-sky-500">
                    <HiViewGrid size={24} className="transition delay-150" />
                   <Link to='/'> <h1>Dashboards</h1></Link>
                </div>
                <div className=" flex gap-2 py-7 h-10 cursor-pointer ease-in duration-300 hover:text-cyan-600 draft:text-sky-500">
                    <MdNoFood size={24} />
                    <Link to='/food'><p>Food</p></Link>   
                </div>
                <div className=" flex gap-2 py-7 h-10 cursor-pointer ease-in duration-300  hover:text-cyan-600 draft:text-sky-500">
                    <MdOutlineDiscount size={24} />
                    <Link to='/voucher'><p>Voucher</p></Link> 
                </div>
                <div className=" flex gap-2 py-7 h-10 cursor-pointer ease-in duration-300  hover:text-cyan-600 draft:text-sky-500">
                    <BiStore size={24} />
                    <Link to='/store'><p>Store</p></Link> 
                </div>
            </div>
            <div className="h-[20%] py-10 ml-10">
                <div  onClick={handleLogout} className="flex cursor-pointer gap-3 font-bold rounded-lg border border-black hover:text-cyan-600 draft:text-sky-500 w-[50%] py-2 h-10 justify-center">
                <RiLogoutBoxRLine size={24}/>
                <p>Logout</p>
                </div>
            </div>
        </div>
    )
}
export default Sidebar