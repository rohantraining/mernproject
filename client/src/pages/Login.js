import React, {useState,useEffect} from 'react'
import {Form,Input, message, Spin as AntSpin} from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import axios  from 'axios';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import Spinner from '../components/Spinner';
import '../styles/LoginPage.css';

const Login = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    //form submit
    const submitHandler = async(values) => {
       try{
        setLoading(true)
        const {data} = await axios.post('http://localhost:8080/api/v1/users/login', values)
        setLoading(false)
        message.success('login success')
        localStorage.setItem('user', JSON.stringify({...data.user,password:""}))
        navigate('/')
       }catch(error){
        setLoading(false)
        message.error('something went wrong')
       }
    };

    //prevent for login user
useEffect(() => {
    if(localStorage.getItem('user')){
        navigate('/')
    }
}, [navigate]);

    return (
        <>
        <div className="register-page">
            {loading && <Spinner/>}
        <Form layout="vertical" onFinish={submitHandler}>
            <h1>Login Form</h1>

            <Form.Item label= {<span><MailOutlined /> Email</span>} name="email">
                <Input type='email'/>
            </Form.Item>

            <Form.Item label={<span><LockOutlined/>Password</span>}name="password">
                <Input type='password'/>
            </Form.Item>

            <div className='d-flex  justify-content-between'>
                <Link to="/register">Not a user? Click here to register</Link>
                <button className='btn btn-primary'>Login</button>
            </div>
        </Form>


        </div>
        
        </>
    )
}

export default Login;