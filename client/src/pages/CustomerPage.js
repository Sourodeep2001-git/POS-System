import React, {useState, useEffect} from 'react'
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Table } from 'antd';

const CustomerPage = () => {
  const[billsData,setbillsData] =useState([]);
  const dispatch = useDispatch()

  const getAllBills =async ()=>{
    try{
      dispatch({
        type: 'SHOW_LOADING'
      })
      const{data} = await axios.get('/api/bills/get-bills');
      setbillsData(data);
      dispatch({
        type:'HIDE_LOADING',
      });
      console.log(data);
    } catch(error){
      dispatch({
        type:'HIDE_LOADING',
      });
      console.log(error)
    }
  };
   //useEffect
   useEffect(() => {
    
    getAllBills();
  }, []);

  const columns =[
    {title:'ID', dataIndex:'_id'},
    {title:'Customer Name', dataIndex:'customerName'
},
{title:'Contact Number', dataIndex:'customerNumber'},

  ];

  return (
    <DefaultLayout>
     <h1> Customer Page</h1>
      <Table columns={columns} dataSource={billsData} bordered pagination={false}/>
      </DefaultLayout>
  )
}

export default CustomerPage