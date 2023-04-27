import React, { useEffect, useMemo, useState } from 'react'
import { BarChart,Bar,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { database } from '../../firebase'
import { getDatabase, onValue, ref, set, remove, update } from 'firebase/database';
import moment from 'moment/moment';


const Chart = () => {

  const [revenueData, setRevenueData] = useState([])
  const [dateFrom, setDateFrom] = useState('')
  const [dataTo, setDateTo] = useState('')

  const [data, setData] = useState([])
  const handleReadData = () => {
    onValue(ref(database, '/History'), (snapshot) => {
        setRevenueData([])
        const data = snapshot.val();
        if(data !==null){
          Object.values(data).map((order) => {
            setRevenueData((prev) => [...prev, order])
          })
        }
    })
  }

  useEffect(() => {
    handleReadData()
},[])


const computedDataTypeYear = useMemo(() => {
  return revenueData.reduce((prevObj, data)=>{
    const dateStr = data.time_order;
    const parts = dateStr.split(' | ');
    const date = parts[0];
    const time = parts[1];
    const [day, month, year] = date.split('/');
    const [hour, minute] = time.split(':');
    const isoDateStr = `${year}-${month}-${day}T${hour}:${minute}`;


    const Month = new Date(isoDateStr).getMonth() + 1

    if(Month === 1) {
      return {
        ...prevObj,
        Thang1: (prevObj.Thang1 || 0) + data.total_cart
      }
    }
    if(Month === 2) {
      return {
        ...prevObj,
        Thang2: (prevObj.Thang2 || 0) + data.total_cart
      }
    }
    if(Month === 3) {
      return {
        ...prevObj,
        Thang3: (prevObj.Thang3 || 0) + data.total_cart
      }
    }
    if(Month === 4) {
      return {
        ...prevObj,
        Thang4: (prevObj.Thang4 || 0) + data.total_cart
      }
    }
    if(Month === 5) {
      return {
        ...prevObj,
        Thang5: (prevObj.Thang5 || 0) + data.total_cart
      }
    }
    if(Month === 6) {
      return {
        ...prevObj,
        Thang6: (prevObj.Thang6 || 0) + data.total_cart
      }
    }
    if(Month === 7) {
      return {
        ...prevObj,
        Thang7: (prevObj.Thang7 || 0) + data.total_cart
      }
    }
    if(Month === 8) {
      return {
        ...prevObj,
        Thang8: (prevObj.Thang8 || 0) + data.total_cart
      }
    }
    if(Month === 9) {
      return {
        ...prevObj,
        Thang9: (prevObj.Thang9 || 0) + data.total_cart
      }
    }
    if(Month === 10) {
      return {
        ...prevObj,
        Thang10: (prevObj.Thang10 || 0) + data.total_cart
      }
    }
    if(Month === 11) {
      return {
        ...prevObj,
        Thang11: (prevObj.Thang11 || 0) + data.total_cart
      }
    }
    if(Month === 12) {
      return {
        ...prevObj,
        Thang12: (prevObj.Thang12 || 0) + data.total_cart
      }
    }
  }, {})
}, [revenueData])

const computedDataTypeMonth = useMemo(() => {
    const nowMonth = new Date().getMonth() + 1
    const nowYear = new Date().getFullYear()
    const dailySales = {}
    revenueData.forEach(sale => {
      const dateStr = sale.time_order;
      const parts = dateStr.split(' | ');
      const date = parts[0];
      const [day, month, year] = date.split('/');
      const isoDateStr = `${year}-${month}-${day}`;

      const Month = new Date(isoDateStr).getMonth() + 1
      const Year = new Date(isoDateStr).getFullYear()
      
      if(Month == nowMonth && Year == nowYear) {
      
        if (dailySales[isoDateStr]) {
          dailySales[isoDateStr] += sale.total_cart;
        } 
        else {
          dailySales[isoDateStr] = sale.total_cart;
        }
      }
    });
    return dailySales
}, [revenueData])

const computedBookingTypeToDay = useMemo(() => {
  return revenueData.reduce((prevObj, data) => {
    const now = new Date().getDate()
    const nowMonth = new Date().getMonth() + 1
    const nowYear = new Date().getFullYear()

    const dateStr = data.time_order;
    const parts = dateStr.split(' | ');
    const date = parts[0];
    const [day, month, year] = date.split('/');
    const isoDateStr = `${year}-${month}-${day}`;

    const ngay =  new Date(isoDateStr).getDate();
    const Month = new Date(isoDateStr).getMonth() + 1
    const Year = new Date(isoDateStr).getFullYear()

    if(ngay === now && Month === nowMonth && Year === nowYear) {
      return {
        ...prevObj,
        homNay: (prevObj.homNay || 0) + data.total_cart
      }
    }
    return prevObj
  },{})

}, [revenueData])

const filterRevenueByDate = () => {
  const result = {}
  revenueData.filter(data => {
    const dateStr = data.time_order;
    const parts = dateStr.split(' | ');
    const date = parts[0];
    const [day, month, year] = date.split('/');
    const isoDateStr = `${year}-${month}-${day}`;

    const revenueDataDate = moment(isoDateStr);
    return revenueDataDate.isBetween(dateFrom, dataTo, null, []);
  }).forEach(sale => {
    const dateStr = sale.time_order;
    const parts = dateStr.split(' | ');
    const date = parts[0];
    const [day, month, year] = date.split('/');
    const isoDateStr = `${year}-${month}-${day}`;

    const ngay = isoDateStr
    if (result[ngay]) {
      result[ngay] += sale.total_cart;
    }
    else {
      result[ngay] = sale.total_cart;
    }
  })
  const _data = []
  for(let key in result) {
    _data.push({name: key, total: result[key]})
  }   
 setData(_data)
}
useEffect(() => {
  filterRevenueByDate()
 },[dataTo])

  const handleFilterByDate = (filter) => {
    let result = []
    switch(filter){
      case 'homnay':
        result = [{
          name: 'Hôm nay',
          total: computedBookingTypeToDay?.homNay
        }]
        break;
      case 'thangnay':
        for(let key in computedDataTypeMonth) {
          result.push({name: key, total: computedDataTypeMonth[key]})
        }
        break;
      case 'namnay':
        result = [
          {
            name: 'Tháng 1',
            total: computedDataTypeYear.Thang1,
          },
          {
            name: 'Tháng 2',
            total: computedDataTypeYear.Thang2,
          },
          {
            name: 'Tháng 3',
            total: computedDataTypeYear.Thang3,
          },
          {
            name: 'Tháng 4',
            total: computedDataTypeYear.Thang4,
          },
          {
            name: 'Tháng 5',
            total: computedDataTypeYear.Thang5,
          },
          {
            name: 'Tháng 6',
            total: computedDataTypeYear.Thang6,
          },
          {
            name: 'Tháng 7',
            total: computedDataTypeYear.Thang7,
          },
          {
            name: 'Tháng 8',
            total: computedDataTypeYear.Thang8,
          },
          {
            name: 'Tháng 9',
            total: computedDataTypeYear.Thang9,
          },
          {
            name: 'Tháng 10',
            total: computedDataTypeYear.Thang10,
          },
          {
            name: 'Tháng 11',
            total: computedDataTypeYear.Thang11,
          },
          {
            name: 'Tháng 12',
            total: computedDataTypeYear.Thang12,
          },
        ];
        break;
      default:
        break;
    }
    setData(result)
  }
  console.log(data);
  return (
    <div className=''>
      <form >
        <div className='ml-[300px] pt-5 gap-10 flex '>
          <div className=''>
              <label>Từ Ngày</label>
              <input type="date" className='ml-5 border py-2 p-2 border-black' value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}/>
          </div>
          <div className='date-input'>
              <label>Đến Ngày</label>
              <input type="date" className='ml-5 border py-2 p-2 border-black' value={dataTo} onChange={(e) => setDateTo(e.target.value)}/>
          </div>
        </div>
      </form>
      <div className='select-container flex flex-col ml-[300px] text-black'>
        <label>Lọc Theo</label>
        <select className='date-select pt-5px pb-10px w-[180px]'  onChange={(e) => handleFilterByDate(e.target.value)}>
            <option value="homnay">Hôm nay</option>
            <option value="thangnay">Tháng Này</option>
            <option value="namnay">Năm nay</option>
        </select>
      </div>
      <ResponsiveContainer width="70%" height={300} className='ml-[300px]'>
      <BarChart
           width={500}
           height={300}
           data={data}
           margin={{
             top: 5,
             right: 30,
             left: 20,
             bottom: 5,
           }}
           barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis/>
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="total" fill="#FFB26B" background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart