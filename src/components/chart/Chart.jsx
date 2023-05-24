import React, { useEffect, useMemo, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { db } from '../../firebase'
import moment from 'moment/moment';
import { collection, endAt, getDocs } from 'firebase/firestore';


const Chart = () => {

  const [revenueData, setRevenueData] = useState([])
  const [dateFrom, setDateFrom] = useState('')
  const [dataTo, setDateTo] = useState('')
  const [type, setType] = useState('')
  const [data, setData] = useState([])
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))
  let now = new Date().getDate()
    function checkDate() 
      {
        if (now < 10) {
          now = "0" + now;
        }
        return now;
      }
    let nowMonth = new Date().getMonth() + 1;
    function checkTime() 
      {
        if (nowMonth < 10) {
          nowMonth = "0" + nowMonth;
        }
        return nowMonth;
      }
    const nowYear = new Date().getFullYear()
    const maxDate = `${nowYear}-${checkTime()}-${checkDate()}`;
  const handleReadData = async () => {
    await getDocs(collection(db, "/orders"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        const filterData = newData.filter(item => {
          if (item.listProduct[0].idUser === currentUser.id) {
            return item;
          }
        })
        setRevenueData(filterData);
      })
  }

  useEffect(() => {
    handleReadData()
  }, [])

  const price = (price) => {
    if (price.statusOrder === 'DONE') {
      return price.totalPrice - price.shipPrice
    } else {
      return 0;
    }
  }

  const computedDataTypeYear = useMemo(() => {
    return revenueData.reduce((prevObj, data) => {
      const dateStr = data.timePeding;
      const parts = dateStr.split(' ');
      const date = parts[1];
      const time = parts[0];
      const [day, month, year] = date.split('/');
      const [hour, minute] = time.split(':');
      const isoDateStr = `${year}-${month}-${day}T${hour}:${minute}`;
      const Month = new Date(isoDateStr).getMonth() + 1;

      if (Month === 1) {
        return {
          ...prevObj,
          Thang1: (prevObj.Thang1 || 0) +  price(data)
        }

      }
      if (Month === 2) {
        return {
          ...prevObj,
          Thang2: (prevObj.Thang2 || 0) +  price(data)
        }
      }
      if (Month === 3) {
        return {
          ...prevObj,
          Thang3: (prevObj.Thang3 || 0) +  price(data)
        }
      }
      if (Month === 4) {
        return {
          ...prevObj,
          Thang4: (prevObj.Thang4 || 0) +  price(data)
        }
      }
      if (Month === 5) {
        return {
          ...prevObj,
          Thang5: (prevObj.Thang5 || 0) + price(data)
        }
      }
      if (Month === 6) {
        return {
          ...prevObj,
          Thang6: (prevObj.Thang6 || 0) +  price(data)
        }
      }
      if (Month === 7) {
        return {
          ...prevObj,
          Thang7: (prevObj.Thang7 || 0) +  price(data)
        }
      }
      if (Month === 8) {
        return {
          ...prevObj,
          Thang8: (prevObj.Thang8 || 0) +  price(data)
        }
      }
      if (Month === 9) {
        return {
          ...prevObj,
          Thang9: (prevObj.Thang9 || 0) +  price(data)
        }
      }
      if (Month === 10) {
        return {
          ...prevObj,
          Thang10: (prevObj.Thang10 || 0) +  price(data)
        }
      }
      if (Month === 11) {
        return {
          ...prevObj,
          Thang11: (prevObj.Thang11 || 0) +  price(data)
        }
      }
      if (Month === 12) {
        return {
          ...prevObj,
          Thang12: (prevObj.Thang12 || 0) +  price(data)
        }
      }
    }, {})
  }, [revenueData])

  const computedDataTypeMonth = useMemo(() => {
    const nowMonth = new Date().getMonth() + 1
    const nowYear = new Date().getFullYear()
    const dailySales = {}
    revenueData.forEach(sale => {
      const dateStr = sale.timePeding;
      const parts = dateStr.split(' ');
      const date = parts[1];
      const [day, month, year] = date.split('/');
      const isoDateStr = `${year}-${month}-${day}`;
      const Month = new Date(isoDateStr).getMonth() + 1
      const Year = new Date(isoDateStr).getFullYear()

      if (Month === nowMonth && Year === nowYear) {

        if (dailySales[isoDateStr]) {
          dailySales[isoDateStr] += price(sale);

        }
        else {
          dailySales[isoDateStr] = price(sale);

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
      const dateStr = data.timePeding;
      const parts = dateStr.split(' ');
      const date = parts[1];
      const [day, month, year] = date.split('/');
      const isoDateStr = `${year}-${month}-${day}`;
      const ngay = new Date(isoDateStr).getDate();
      const Month = new Date(isoDateStr).getMonth() + 1
      const Year = new Date(isoDateStr).getFullYear()

      if (ngay === now && Month === nowMonth && Year === nowYear) {
        return {
          ...prevObj,
          today: (prevObj.today || 0) + price(data)
        }
      }
      return prevObj
    }, {})

  }, [revenueData])

  const filterRevenueByDate = () => {
    const result = {}
    revenueData.filter(data => {
      const dateStr = data.timePeding;

      const parts = dateStr.split(' ');

      const date = parts[1];

      const [day, month, year] = date.split('/');

      const isoDateStr = `${year}-${month}-${day}`;

      const revenueDataDate = moment(isoDateStr);

      return revenueDataDate.isBetween(dateFrom, dataTo, null, []);
    }).forEach(sale => {
      const dateStr = sale.timePeding;
      const parts = dateStr.split(' ');
      const date = parts[1];
      const [day, month, year] = date.split('/');
      const isoDateStr = `${year}-${month}-${day}`;

      const ngay = isoDateStr
      if (result[ngay]) {
        result[ngay] += price(sale);
      }
      else {
        result[ngay] = price(sale);
      }
    })
    const _data = []
    for (let key in result) {
      _data.push({ name: key, total: result[key] })
    }
    setData(_data)
  }

  useEffect(() => {
    filterRevenueByDate()
  }, [dataTo])

  const handleFilterByDate = (filter) => {
    let result = []
    let nowdate = new Date().getDate()
    switch (filter) {
      case 'today':
        result = [{
          name: 'Today',
          total: computedBookingTypeToDay?.today
        }]
        break;
      case 'thisMonth':
        case 'thisMonth':
        for (let i = 1; i <= nowdate; i++){
          for(let key in computedDataTypeMonth) { 
            const layngay = key.split('-')
            const ngay = layngay[2]
            if (i == ngay) {
              result.push({name: key, total: computedDataTypeMonth[key]})
              break;
            }
          }
        }
        // for (let key in computedDataTypeMonth) {
        //   result.push({ name: key, total: computedDataTypeMonth[key] })
        // }
        break;
      case 'thisYear':
        result = [
          {
            name: 'January',
            total: computedDataTypeYear.Thang1,
          },
          {
            name: 'February',
            total: computedDataTypeYear.Thang2,
          },
          {
            name: 'March',
            total: computedDataTypeYear.Thang3,
          },
          {
            name: 'April',
            total: computedDataTypeYear.Thang4,
          },
          {
            name: 'May',
            total: computedDataTypeYear.Thang5,
          },
          {
            name: 'June',
            total: computedDataTypeYear.Thang6,
          },
          {
            name: 'July',
            total: computedDataTypeYear.Thang7,
          },
          {
            name: 'August',
            total: computedDataTypeYear.Thang8,
          },
          {
            name: 'September',
            total: computedDataTypeYear.Thang9,
          },
          {
            name: 'October',
            total: computedDataTypeYear.Thang10,
          },
          {
            name: 'November',
            total: computedDataTypeYear.Thang11,
          },
          {
            name: 'December',
            total: computedDataTypeYear.Thang12,
          },
        ];
        break;
      default:
        break;
    }
    setData(result)
  }


  return (
    <div >
      <div className=' flex'>
        <div className='ml-[360px] pt-5 gap-10 flex  '>
          <div className=''>
            <label>From</label>
            <input type="date" className='ml-5 border py-2 p-2 outline-none ' min="2023-01-01" max={maxDate} value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </div>
          <div className='date-input'>
            <label>To</label>
            <input type="date" className='ml-5 border py-2 p-2  outline-none' min="2023-01-01" max={maxDate} value={dataTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>
        </div>
        <div className='select-container pt-5 flex text-black'>
          <select className='date-select h-[43px]   ml-14 border  outline-none' value={type} onChange={(e) => handleFilterByDate(e.target.value)}>
            <option >Filter</option>
            <option value="today">Today</option>
            <option value="thisMonth">This Month</option>
            <option value="thisYear">This Year</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="75%" height={300} className='ml-[280px] pt-2'>
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
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="total" fill="#67ccf7" background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart