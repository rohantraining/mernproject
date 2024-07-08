import React, { useState, useEffect } from 'react';
import { Form, Input, message, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import Spinner from '../components/Spinner';
import '../styles/RegisterPage.css'; // Import your CSS file here

const { Title } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // form submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post('http://localhost:8080/api/v1/users/register', values);
      message.success('Registration successful');
      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong');
    }
  };

  // prevent for login user
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <div className="register-page">
        {loading && <Spinner />}
        <Title level={2} className="register-title">EXPENSE TRACKER APPLICATION USING MERN STACK</Title>
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Register Form</h1>
          <Form.Item label={<span><UserOutlined /> Name</span>} name="name" >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label={<span><MailOutlined /> Email</span>} name="email" >
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item label={<span><LockOutlined /> Password</span>} name="password" >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/login">Already Registered? Click here to login</Link>
            <button className="btn btn-primary">Register</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
