import React,{useState,useEffect} from "react";
import { useSelector} from "react-redux";
import { Layout, Menu} from "antd";
import { Link,useNavigate} from "react-router-dom";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UsergroupDeleteOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
  

} from "@ant-design/icons";
import "../styles/DefaultLayout.css";
import Spinner from "./Spinner";




const DefaultLayout =({children}) =>  {
  const navigate = useNavigate()
  const {cartItems, loading} = useSelector(state => state.rootReducer)
  const [collapsed,setCollapsed] =useState(false);
  const { Header, Sider, Content } = Layout;


  const toggle = () => {
    setCollapsed(
      !collapsed
    );
  };

  useEffect(() =>{
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
  },[cartItems]);

  


  
    return (
      <>
      
      <Layout>
        {loading && <Spinner/>}
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <h1 className="text-center text-light font-wight-bold mt-4">POS SYSTEM</h1>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={window.location.pathname}
          >
            
            <Menu.Item key="/" icon={<HomeOutlined />}>
              <Link to="/" style={{textDecoration:"none"}}>Home</Link>
            </Menu.Item>
            <Menu.Item key="/bills" icon={<CopyOutlined />}>
              <Link to="/bills" style={{textDecoration:"none"}}>Bills</Link>
            </Menu.Item>
            <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
              <Link to="/items" style={{textDecoration:"none"}}>Items</Link>
            </Menu.Item>
            <Menu.Item key="/customers" icon={<UsergroupDeleteOutlined />}>
              <Link to="/customers" style={{textDecoration:"none"}}>Cutomers</Link>
            </Menu.Item>
            <Menu.Item key="/logout" 
            icon={<LogoutOutlined />}
            onClick={() =>{
              localStorage.removeItem("auth");
              navigate("/login");
            }}
            >
              Logout
            </Menu.Item>
           
            <Menu.Item>
            <a
              href="https://play.google.com/store/games?hl=en&gl=US"
              target="_blank"
              rel="noopener noreferrer"
              
            >
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                height={48}
                style={{ marginLeft: "auto", marginRight: "16px" }}
              />
            </a>
            </Menu.Item>
            <Menu.Item>
            <a
  href="https://www.apple.com/in/store"
  target="_blank"
  rel="noopener noreferrer"
  
>
  <img
    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us"
    alt="Download on the App Store"
    height={48}
    width={110}
    style={{ marginLeft: "7px", marginRight: "16px"}}
  />
</a>
</Menu.Item>   
          </Menu>
         
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
            <center>
            <img src="https://i.ibb.co/47wKvzC/Retail-Store-10-8-2023-removebg-preview.png" height={64} width={300} />
            </center>
            
            <div className="cart-item d-flex jusitfy-content-space-between flex-row" 
            onClick={() => navigate('/cart')}>
              <ShoppingCartOutlined />
              <p><b>{cartItems.length}</b></p>
            </div>

            

          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
      </>
    );
    
  }

export default DefaultLayout;