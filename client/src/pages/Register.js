import React, {useState, useEffect} from 'react'
import {Form,Input, message, Spin as AntSpin} from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { set } from 'mongoose';
import Spinner from '../components/Spinner';


const Register = () => {

    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)


    //form sbmit
    const submitHandler = async (values) => {
        try{
            setLoading(true)
            await axios.post('http://localhost:8080/api/v1/users/register', values)
            message.success('Registration successful')
            setLoading(false)
            navigate('/login');

        } catch(error){
            setLoading(false);
            message.error('something went wrong');


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
            <h1>Register Form</h1>
            <Form.Item label="Name" name="name">
                <Input type/>
            </Form.Item>

            <Form.Item label="Email" name="email">
                <Input type='email'/>
            </Form.Item>

            <Form.Item label="Password" name="password">
                <Input type='password'/>
            </Form.Item>

            <div className='d-flex  justify-content-between'>
                <Link to="/login">Already Registered? Click here to login</Link>
                <button className='btn btn-primary'>Register</button>
            </div>
        </Form>


        </div>
        
        </>

    )
}

export default Register;