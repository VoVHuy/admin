
import { FaUserAlt } from 'react-icons/fa'
import { MdMonetizationOn, MdOutlineFastfood } from 'react-icons/md'
import Chart from '../../components/chart/Chart'
import Sidebar from '../../components/sidebar/Sidebar'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../firebase'

function Dashboard() {
  const productCollectionRef = collection(db, "products")
  const orderCollectionRef = collection(db, "orders")
  const userCollectionRef = collection(db, "users")
  const [product, setProduct] = useState(JSON.parse(localStorage.getItem('user')));
  const [topSeller, setTopSeller] = useState();
  const [topuser, setTopUser] = useState();

  const getProduct = async () => {
    const data = await getDocs(productCollectionRef)
    const docData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const productInshop = docData.filter((e) => e.idUser === product.id);
    setProduct(productInshop);
    const result = productInshop?.sort(function (a, b) { return b.sold - a.sold });
    setTopSeller(result.slice(0, 3));

  }
  useEffect(() => {
    getProduct();
    getOrder();
  }, [])

  const getOrder = async () => {
    const order = await getDocs(orderCollectionRef)
    const docOrder = order.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const orderInshop = docOrder.filter((e) => e);
    const formatOrder = orderInshop.reduce(function (r, a) {
      r[a.idCustomer] = r[a.idCustomer] || [];
      r[a.idCustomer].push(a);
      return r;
    }, []);
    setTopUser(formatOrder.slice(0, 3));
  }

  // const getUsers =  () => {
  //   //const users = await getDocs(userCollectionRef)
  //   //const allUser = users?.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //   console.log(topuser)
  //   topuser?.map(topUsr => {
  //     console.log(topUsr[0]);
  //   })
  // }

  return (
    <div>
      <div className='w-full'>
        <div className='flex'>
          <div className='w-[25%]'>
            <Sidebar />
          </div>
          <div className=' text-black w-full'>
            <div className='h-[70px] fixed text-[#09132C] w-full px-6 py-4 bg-[#fafafa] flex items-center' >
              <div className='font-normal max-md:text-sm max-w-[400px]'>
                <p className='font-bold text-2xl mx-3'>Dashboard</p>
              </div>
            </div>
            <div className='flex pt-[80px]'>
              <div className='w-[35%] h-[150px] font-semibold mx-3 border rounded-lg '>
                <div className='ml-3 '>
                  <label>Top Most Ordered Dishes</label>
                </div>
                <div className='flex gap-[125px] bg-[#F2f2f2] items-center'>
                  <div className='ml-3'>
                    <label>Name</label>
                  </div>
                  <div className='flex gap-[25px]'>
                    <label>Image</label>
                    <label >Sold</label>
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='mx-3'>
                    {topSeller?.map(item => (
                      <div key={item.id} className='flex gap-[20px]'>
                        <div className='w-[150px]'>{item.name}</div>
                        <img src={item.image} alt="" className='w-[50px] object-cover h-[30px]' />
                        <div className='w-[10%]'>{item.sold}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='w-[40%] h-[150px]  font-semibold'>
                <div className='flex justify-between pt-7 mx-10 bg-[#F5FAFC] h-[150px] rounded-lg border'>
                  <div className='mx-5'>
                  </div>
                  <FaUserAlt size={24} className='mx-5' />
                </div>
              </div>
              <div className='w-[40%] h-[150px]  font-semibold'>
                <div className='flex justify-between pt-7 mx-10 bg-[#F5FAFC] h-[150px] rounded-lg border'>
                  <div className='mx-5'>
                    <p className='text-2xl'>$ <span>250000</span></p>
                    <p className='py-2'>Revenue</p>
                  </div>
                  <MdMonetizationOn size={24} className='mx-5' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='text-black w-full'>
          <Chart />
        </div>
      </div>
    </div>
  )
}

export default Dashboard