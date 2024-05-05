import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
import '../index.css'
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    setPassword(event.target.value);
  };

  const handleButtonClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values) => {
    try {
      dispatch({
        type: 'SHOW_LOADING',
      });
      
      const res = await axios.post('/api/users/login', values);

      dispatch({
        type: 'HIDE_LOADING',
      });
    
      message.destroy();
      message.success('User Login Successfully');
      localStorage.setItem('auth', JSON.stringify(res.data)); 
      navigate('/');
      }
      
     catch (error) {
      dispatch({
        type: 'HIDE_LOADING',
      });
      message.destroy();
      message.error('Failed to login. Check your credentials.')
      console.log(error)
    }
  };

  // Check if the user is already logged in
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    
    <div className="register">
      <div className="register-form">
        <h1>POS APP</h1>
        <h3>Login Page</h3>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="userId" label="User ID">
            <Input required />
          </Form.Item>
          <Form.Item name="password" label="Password">
          <div className='wrapper'>
          <Input type={showPassword ? 'text' : 'password'} value={password} onChange={handleInputChange} required/> 
          <Button onClick={handleButtonClick}> {showPassword ? <EyeOutlined/> : <EyeInvisibleOutlined />}</Button>
          </div>
          </Form.Item>
          <div className="d-flex justify-content-between">
            <p>
              <b>New User?</b>
              <Link to="/register"> Register Here!</Link>
            </p>
            <Button type="primary" htmlType="submit">
              SignIn
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;