

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
  const [users, setUsers] = useState();
  const [totalRevenue, setTotalRevenue] = useState();
  const getProduct = async () => {
    const data = await getDocs(productCollectionRef)
    const docData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const productInshop = docData.filter((e) => e.idUser === product.id);
    setProduct(productInshop);
    const result = productInshop?.sort(function (a, b) { return b.sold - a.sold });
    setTopSeller(result.slice(0, 3));
  }



  const getUsers = async () => {
    const users = await getDocs(userCollectionRef)
    let docData = users.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setUsers(docData)
  }

  const getOrder = async () => {
    const order = await getDocs(orderCollectionRef)
    const docOrder = order.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const orderInshop = docOrder.filter((e) => e);
    const formatOrder = orderInshop?.reduce(function (r, a) {
      r[a.idCustomer] = r[a.idCustomer] || [];
      r[a.idCustomer].push(a);
      return r;
    }, []);
    let ordersWithCusomer = Object.keys(formatOrder)?.map((item, index) => {
      return {
        id: Object.keys(formatOrder)[index],
        value: Object.values(formatOrder)[index]
      }
    })
    const currentUser = JSON.parse(localStorage.getItem('user'))

    const orderPaymentShop = orderInshop.filter(ois => {
      if (ois.listProduct[0].idUser === currentUser.id) {

        return {
          ...ois,
          idShop: ois.listProduct[0].idUser
        };
      }
    });

    const formatDataFilter = users?.filter(
      (item) => ordersWithCusomer.some((itemUsr) => itemUsr.id == item.id)
    );
    const isSold = orderPaymentShop?.map((item, index) => {
      let isUser = users.find(us => us.id === item.idCustomer)

      return {
        idCustomer: item.idCustomer,
        idShop: item.listProduct[0].idUser,
        userName: isUser?.fullName,
        payment: item.totalPrice,
        statusOrder: item.statusOrder

      }

    });


    const customer = isSold?.reduce(function (r, a) {
      r[a.idCustomer] = r[a.idCustomer] || [];
      if (a.statusOrder === 'DONE') {
        r[a.idCustomer].push(a);
      }
      return r;
    }, []);
    let top = Object.keys(customer)?.map((item, index) => {

      let totlPay = Object.values(customer)[index].reduce((r, a) => {
        return r + a.payment;
      }, 0)
      return {
        name: Object.values(customer)[index][0].userName,
        totalPay: totlPay
      }
    })
    const result = top?.sort(function (a, b) { return b.totalPay - a.totalPay });
    setTopUser(result.slice(0, 3));

    const listOrderInShop = orderInshop.filter(orderIn => orderIn.listProduct[0].idUser === currentUser.id);
    let totalRevenueShop = 0;
    listOrderInShop.map(item => {
      if (item.statusOrder === 'DONE') {
        totalRevenueShop += +item.totalPrice - item.shipPrice;
      }
    })
    setTotalRevenue(totalRevenueShop)
  }

  useEffect(() => {
    getProduct();
    getUsers()
  }, []);

  useEffect(() => {
    getOrder()
  }, [users])

  return (
    <div>
      <div className='w-full'>
        <div className='flex'>
          <div className='w-[20%]'>
            <Sidebar />
          </div>
          <div className=' text-black w-[80%]'>
            <div className='h-[70px] fixed text-[#09132C] w-full px-6 py-4 bg-[#fafafa] flex items-center' >
              <div className='font-normal max-md:text-sm max-w-[400px]'>
                <p className='font-bold text-2xl mx-3'>Dashboard</p>
              </div>
            </div>
            <div className='flex pt-[80px] ml-[73px]'>
              <div className='w-[34%] h-[150px] font-semibold ml-3 border rounded-lg '>
                <div className='ml-3 '>
                  <label>Top Most Ordered Dishes</label>
                </div>
                <div className='flex gap-[130px] bg-[#F2f2f2] items-center'>
                  <div className='ml-3'>
                    <label>Name</label>
                  </div>
                  <div className='flex gap-[30px]'>
                    <label>Image</label>
                    <label >Sold</label>
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='mx-3'>
                    {topSeller?.map(item => (

                      <div key={item.id} className='flex gap-[25px]'>
                        <div className='w-[150px] truncate'>{item.name}</div>
                        <img src={item.image} alt="" className='w-[50px] object-cover h-[30px]' />
                        <div className='w-[10%]'>{item.sold}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='w-[29%] border rounded-lg h-[150px] ml-3  font-semibold'>
                <div className='ml-3 '>
                  <label>Top users who put the most</label>
                </div>
                <div className='flex bg-[#F2f2f2] items-center'>
                  <div className='ml-3 flex gap-[150px]'>
                    <label>Name</label>
                    <label >Total</label>
                  </div>
                </div>
                <div className=' justify-between items-center'>
                  <div className='mx-3'>
                    {topuser?.map(item => (
                      <div key={item?.id} className=' flex pt-[5px]  gap-[23px]'>
                        <div className='w-[170px]'>{item?.name}</div>
                        <div className='w-[70px]'>{item?.totalPay}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='w-[25%] h-[150px]  font-semibold'>
                <div className='flex justify-between pt-7 ml-3  h-[150px] rounded-lg border'>
                  <div className='mx-5'>
                    <p className='text-2xl'>$ {totalRevenue ? totalRevenue : ""}</p>
                    <p className='py-2'>Revenue</p>
                  </div>
                  <MdMonetizationOn size={24} className='mx-5' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='text-black w-full    '>
          <Chart />
        </div>
      </div>
    </div>
  )
}

export default Dashboard