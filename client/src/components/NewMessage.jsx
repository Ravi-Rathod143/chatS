import React, { useState, useEffect } from 'react'
import { getSocket } from '../socket'
export default function NewMessage({ channelId }){
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(false)

  useEffect(()=>{
    const s = getSocket();
    if (!s) return;
    const timeout = setTimeout(()=> {
      if (typing) { s.emit('typing', { channelId, typing: false }); setTyping(false); }
    }, 2000);
    return ()=> clearTimeout(timeout);
  }, [typing, channelId]);

  function send(){
    if (!text) return;
    const s = getSocket();
    s.emit('message', { channelId, text });
    s.emit('typing', { channelId, typing: false });
    setText('');
  }

  function handleChange(e){
    setText(e.target.value);
    const s = getSocket();
    if (!s) return;
    if (!typing) { s.emit('typing', { channelId, typing: true }); setTyping(true); }
    // we'll auto-clear typing on timeout in effect
  }

  return (
    <div className="p-4 border-t flex">
      <input value={text} onChange={handleChange} className="flex-1 border p-2 mr-2" placeholder="Type a message..." />
      <button onClick={send} className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
    </div>
  )
}
