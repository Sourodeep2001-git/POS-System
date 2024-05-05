import React,{useEffect,useState, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {EyeOutlined } from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
import "../styles/InvoiceStyles.css";

const BillsPage = () => {
    const componentRef = useRef();
    const dispatch = useDispatch()
    const[billsData,setbillsData] =useState([]);
    const [popupModal, setPopupModal] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null)
    
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

    //print function
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
  
  //able data
    const columns =[
      {title:'ID', dataIndex:'_id'},
      {title:'Customer Name', dataIndex:'customerName'
  },
  {title:'Contact Number', dataIndex:'customerNumber'},
  {title:'Subtotal', dataIndex:'subTotal'},
  {title:'Tax', dataIndex:'tax'},
  {title:'Total Amount', dataIndex:'totalAmount'},
  
  
  
  {title:'Actions', 
  dataIndex:"_id", 
  render :(id,record) => 
  <div>
  <EyeOutlined style={{cursor:'pointer'}}
  onClick={()=> {
    setSelectedBill(record)
    setPopupModal(true)
  }}/>
  
  </div>
  },
  ];
  const clearBill = () => {
    return dispatch({type:"CLEAR_BILL"});
};
  

  return (
    <DefaultLayout>
        <div className='d-flex justify-content-between'>
      <h1>Invoice List</h1>
    
      </div>
        
        <Table columns={columns} dataSource={billsData} bordered/>
        {
          popupModal && (
            <Modal title="Invoice Details"
            visible={popupModal}  
            onCancel={() => {   
              setPopupModal(false);
            
            }}
        footer={false}
        >
            {/*=================Invoice Model Start=================*/}
            <div id="invoice-POS" ref={componentRef}>
                <center id="top">
                    <div className='logo' />
                    <div className='info'>
                        <h2>Retail Store</h2>
                        <p> Contact : +91 7044373952 | Kolkata</p>
                    </div>
                    {/*==========End Info===========*/}
                </center>
                {/*=======================End InvoiceTop==================*/}
                <div id="mid">
                    <div className='mt-2'>
                        <p>
                            Customer Name : <b>{selectedBill.customerName}</b>
                            <br />
                            Phone No. : <b>{selectedBill.customerNumber}</b>
                            <br />
                            Date : <b>{selectedBill.date.toString().substring(0, 10)}</b>
                            <br />
                        </p>
                        <hr style={{ margin: "5px" }} />
                    </div>
                </div>
                {/*=============End Invoice Mid==============*/}
                <div id='bot'>
                    <div id='table'>
                        <table>
                            <tbody>
                                <tr className='table_title'>
                                    <td className='item'>
                                        <h2>Item</h2>
                                    </td>
                                    <td className='Hours'>
                                        <h2>Qty</h2>
                                    </td>
                                    <td className='Rate'>
                                        <h2>Price</h2>
                                    </td>
                                    <td className='Rate'>
                                        <h2>Total</h2>
                                    </td>
                                </tr>
                                {selectedBill.cartItems.map((item) => (
                                    <>
                                    <tr className='service'>
                                        <td className='table_item'>
                                            <p className='item_text'>{item.name}</p>
                                        </td>
                                        <td className='table_item'>
                                            <p className='item_text'>{item.quantity}</p>
                                        </td>
                                        <td className='table_item'>
                                            <p className='item_text'>{item.price}</p>
                                        </td>
                                        <td className='table_item'>
                                            <p className='item_text'>{item.quantity * item.price}</p>
                                        </td>
                                    </tr>
                                    </>
                                ))}

                                <tr className='table_title'>
                                    <td />
                                    <td />
                                    <td className='Rate'>
                                        <h2>tax</h2>
                                    </td>
                                    <td className='payment'>
                                        <h2>₹{selectedBill.tax}</h2>
                                    </td>
                                </tr>
                                <tr className='table_title'>
                                    <td />
                                    <td />
                                    <td className='Rate'>
                                        <h2>Grand Total : </h2>
                                    </td>
                                    <td className='payment'>
                                        <h2><b> 
                                         ₹{selectedBill.totalAmount}
                                            </b></h2>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/*=================End table===============*/}
                    <div id="legalcopy">
                        <p className='legal'>
                            <strong>Thank You For Your order!</strong> 10% GST application
                            on total amount.Please note that this is non refundable amount
                            for any assistance please write email
                            <b> aritradeb45@gmail.com </b>
                        </p>
                    </div>
                </div>
                {/*==========End InvoiceBot==========*/}
            </div>
            {/*=============End Invoice============*/}
            <div className='d-flex justify-content-end mt-3'>
                <Button type='primary' onClick={handlePrint}>
                    Print
                </Button>
            </div>
            {/*========================Invoice Model End======================*/}

      </Modal>
          )
        }
    </DefaultLayout>
  )
}

export default BillsPage