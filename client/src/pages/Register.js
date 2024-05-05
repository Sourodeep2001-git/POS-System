import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {message} from 'antd';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
import '../index.css'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    setPassword(event.target.value);
  };

  const handleButtonClick = () => {
    setShowPassword(!showPassword);
  };

    const handleSubmit = async(value)=> {
      try{
        dispatch({
          type: 'SHOW_LOADING'
        })
        await axios.post('/api/users/register', value);
        message.success('Register Successfully')
        navigate('/login');

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
    }

    //currently login user
    useEffect(() => {
      if(localStorage.getItem('auth')){
        localStorage.getItem('auth');
        navigate("/");
      }
    },[navigate]);

  return (
    <>
    <div className='register'>
        <div className='register-form'>

        
        <h1>POS APP</h1>
        <h3>Register Page</h3><b>
        <Form 
        layout='vertical' 
        
        onFinish={handleSubmit}>
            <b>
          <Form.Item name="name" label="Name">
          <Input required/>
          </Form.Item>
          <Form.Item name="userId" label="User ID">
          <Input required/>
          </Form.Item>
          <Form.Item name="password" label="Password">
          <div className='wrapper'>
          <Input type={showPassword ? 'text' : 'password'} value={password} onChange={handleInputChange} required/> 
          <Button onClick={handleButtonClick}> {showPassword ? <EyeOutlined/> : <EyeInvisibleOutlined />}</Button>
          </div>
          </Form.Item>
          </b>
          <div className='d-flex justify-content-between'>
            <p>
                <b>
                Already register Please
                </b>
                <Link to="/login"> Login Here !</Link>
            </p>
            <Button type='primary' htmlType='submit'>
              Register
            </Button>
          </div>
        </Form>
        </b>
    </div>
    </div>
    </>
  )
}

export default Register;