import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from './../hooks/http.hook';
import { useMessage } from './../hooks/message.hook';
import { AuthContext } from './../context/AuthContext';
import './auth-page.css';

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      // message(data.message);
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Links App</h1>
        <div className='card blue darken-4'>
          <div className='card-content white-text'>
            <span className='card-title'>Authorization</span>
            <div className='row'>
              <div className='input-field col s6'>
                <input
                  id='email'
                  name='email'
                  type='text'
                  className='validate'
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor='email'>Email</label>
              </div>
              <div className='input-field col s6'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  className='validate'
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor='password'>Password</label>
              </div>
            </div>
          </div>
          <div className='card-action'>
            <button
              className='btn yellow darken-4'
              onClick={loginHandler}
              disabled={loading}>
              Login
            </button>
            <button
              className='btn grey lighten-1 black-text'
              onClick={registerHandler}
              disabled={loading}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
