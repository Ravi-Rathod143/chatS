import React from 'react'
import { useStore } from './store'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Channels from './pages/Channels'
import Chat from './pages/Chat'

export default function App(){
  const { token } = useStore();
  if (!token) return (<div className="min-h-screen flex items-center justify-center"> <div className="max-w-md w-full p-6 border rounded"> <h2 className="text-xl font-bold mb-4">Mini Chat</h2> <Login /> <div className="my-2"/> <Signup /> </div></div>)
  return (<div className="h-screen flex"> <Channels /> <Chat /> </div>)
}
