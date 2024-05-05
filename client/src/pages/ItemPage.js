import React,{useEffect,useState} from 'react'
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {DeleteOutlined,EditOutlined } from '@ant-design/icons';
import { Modal,Button, Table, Form, Input, Select,message } from 'antd';
const ItemPage = () => {
  const dispatch = useDispatch()
  const[itemsData,setitemsData] =useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [editItem,setEditItem] = useState(null);
  const getAllItems =async ()=>{
    try{
      dispatch({
        type: 'SHOW_LOADING'
      })
      const{data} = await axios.get('/api/items/get-item');
      setitemsData(data);
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
    
    getAllItems()
  }, []);

//handle delete
const handleDelete = async (record) => {
  try{
    dispatch({
      type: 'SHOW_LOADING'
    });
    await axios.post('/api/items/delete-item', { itemId: record._id});
    message.success('Item Deleted Successfully')
    getAllItems();
    setPopupModal(false);
    dispatch({
      type:'HIDE_LOADING',
    });
    
  } catch(error){
    dispatch({
      type:'HIDE_LOADING',
    });
    message.error('Something Went Wrong');
    console.log(error);
  }
}

//able data
  const columns =[
    {title:'Name', dataIndex:'name'},
    {title:'Image', dataIndex:'image',
render:(image,record) =>(<img src={image} alt={record.name} height="60" width="60" />
),
},
{title:'Price', dataIndex:'price'},


{title:'Actions', 
dataIndex:"_id", 
render :(id,record) => 
<div>
<EditOutlined 
style={{cursor:'pointer'}} 
onClick={() => {
  setEditItem(record);
  setPopupModal(true);
}}
/>
<DeleteOutlined 
style={{cursor:'pointer'}} 
onClick={() => {
  handleDelete(record);
}}
/>
</div>
},
];

//handle form submit
const handleSubmit =async (value) => {
  if(editItem === null ){
    try{
      dispatch({
        type: 'SHOW_LOADING'
      })
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post('/api/items/add-item', value);
      message.success('Item Added Successfully')
      getAllItems();
      setPopupModal(false);
      dispatch({
        type:'HIDE_LOADING',
      });
      
    } catch(error){
      dispatch({
        type:'HIDE_LOADING',
      });
      message.error('Something Went Wrong')
      console.log(error)
    }
  }else{
    try{
      dispatch({
        type: 'SHOW_LOADING',
      });
      await axios.put('/api/items/edit-item', {...value, itemId:editItem._id});
      message.success('Item Updated Successfully')
      getAllItems();
      setPopupModal(false);
      dispatch({
        type:'HIDE_LOADING',
      });
      
    } catch(error){
      dispatch({
        type:'HIDE_LOADING',
      });
      message.error('Something Went Wrong')
      console.log(error);
    }
  }
};


  return (
    <DefaultLayout>
      <div className='d-flex justify-content-between'>
      <h1>Item List</h1>
      <Button type='primary' onClick={() => setPopupModal(true)}>Add Item</Button>
      </div>
        
        <Table columns={columns} dataSource={itemsData} bordered/>
        {
          popupModal && (
            <Modal title={`${editItem !== null? 'Edit Item' : 'Add New Item'}`}
            visible={popupModal}  
            onCancel={() => {
              setEditItem(null);
              setPopupModal(false);
            
            }}
        footer={false}
        >
        <Form layout='vertical' initialValues={editItem} onFinish={handleSubmit}>
          <Form.Item name="name" label="Name">
          <Input/>
          </Form.Item>
          <Form.Item name="price" label="Price">
          <Input/>
          </Form.Item>
          <Form.Item name="image" label="Image URL">
          <Input/>
          </Form.Item>
          
          <Form.Item name="category" label="Category">
          <Select>
          <Select.Option value="DRINKS">DRINKS</Select.Option>
          <Select.Option value="RICE">RICE</Select.Option>
          <Select.Option value="SPICE POWDERS">SPICE POWDERS</Select.Option>
          <Select.Option value="FLOURS">FLOURS</Select.Option>
          <Select.Option value="PULSES">PULSES</Select.Option>
          <Select.Option value="DALS">DALS</Select.Option>
          <Select.Option value="OILS">OILS</Select.Option>
          <Select.Option value="SPICES">SPICES</Select.Option>
          <Select.Option value="NUTS">NUTS</Select.Option>
          <Select.Option value="DAIRY PRODUCTS">DAIRY PRODUCTS</Select.Option>
          <Select.Option value="TOILETRIES ">TOILETRIES</Select.Option>
          <Select.Option value="CLEANING PRODUCTS ">CLEANING PRODUCTS</Select.Option>
          <Select.Option value="POOJA ITEMS">POOJA ITEMS</Select.Option>
          <Select.Option value="MISCELLANEOUS ">MISCELLANEOUS</Select.Option>

          </Select>
          </Form.Item>
          <div className='d-flex justify-content-end'>
            <Button type='primary' htmlType='submit'>
              SAVE
            </Button>
          </div>
        </Form>
      </Modal>
          )
        }
    </DefaultLayout>
  )
}

export default ItemPage