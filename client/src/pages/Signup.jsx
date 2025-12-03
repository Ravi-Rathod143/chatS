import React, { useState } from 'react'
import API from '../api'
import { useStore } from '../store'
import { connect } from '../socket'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setAuth = useStore(state => state.setAuth)
  async function submit(e){
    e.preventDefault();
    const res = await API.post('/auth/signup', { name, email, password });
    const { token, user } = res.data;
    setAuth(token, user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    connect(token);
  }
  return (
    <form onSubmit={submit} className="mt-4">
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="name" className="border p-2 w-full mb-2" />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" className="border p-2 w-full mb-2" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" className="border p-2 w-full mb-2" />
      <button className="bg-green-500 text-white px-4 py-2 rounded">Sign up</button>
    </form>
  )
}
