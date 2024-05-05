/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React,{useState,useEffect, useRef} from 'react'
import DefaultLayout from "./../components/DefaultLayout";
import axios from 'axios';
import { Col, Row } from 'antd';
import { useDispatch } from 'react-redux';
import ItemList from "../components/ItemList";
import{CloseOutlined}from "@ant-design/icons";
import "../styles/DefaultLayout.css";
const Homepage = () => {
  const[itemData,setitemsData] =useState([]);
  const[search, setSearch]=useState("")
  const dispatch = useDispatch()
  const sname=useRef()
  const handleSubmit= (event) => {
    event.preventDefault();
    sname.current.value ="";
  }
  
  //useEffect
  useEffect(() => {
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
        console.log(error)
      }
    };
    getAllItems();
  }, [dispatch]);
  
  return (
  <DefaultLayout>
    

    <form  onSubmit={handleSubmit}>
      <div class="searchBox-fakeInput">
    <div class="searchBox-inputWrapper">
      <input ref={sname} type="text" class="form-control searchBox-input js-searchBox-input" placeholder="Search Products Here..." 
      value={search} onChange={(e)=>{setSearch(e.target.value)}} />
    </div>
    <div class="searchBox-clearWrapper">
    <button>
      <CloseOutlined />
    </button>
    </div>
  </div>
      </form>
    
    
<Row>  
        {
        itemData
          .filter((item) => {
            if(search == ""){
              return item;
            }
            else if(item.name.toLowerCase().includes(search.toLowerCase())){
              return item;
            }
          })
          .map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
            <ItemList key={item.id} item={item} />
            </Col>
          ))}
          
      
    </Row>
  </DefaultLayout>
  );
};

export default Homepage;