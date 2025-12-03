import React, { useState, useEffect } from 'react'
import API from '../api'
import { useStore } from '../store'
import { connect } from '../socket'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setAuth = useStore(state => state.setAuth)

  useEffect(()=>{ // restore from localStorage
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) setAuth(token, JSON.parse(user));
  },[])

  async function submit(e){
    e.preventDefault();
    const res = await API.post('/auth/login', { email, password });
    const { token, user } = res.data;
    setAuth(token, user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    connect(token);
  }

  return (
    <form onSubmit={submit}>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" className="border p-2 w-full mb-2" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" className="border p-2 w-full mb-2" />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  )
}
