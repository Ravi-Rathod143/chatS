import React, { useEffect, useState, useRef } from 'react'
import API from '../api'
import { connect, getSocket } from '../socket'
import MessageList from '../components/MessageList'
import NewMessage from '../components/NewMessage'

export default function Chat(){
  const [channelId, setChannelId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]); // all users
  const [onlineSet, setOnlineSet] = useState(new Set());
  const [typingUsers, setTypingUsers] = useState({});
  const socketRef = useRef(null);

  useEffect(()=>{ // connect if token present
    const token = localStorage.getItem('token');
    if (token && !getSocket()) {
      socketRef.current = connect(token);
      socketRef.current.on('message', (m) => setMessages(prev => [...prev, m]));
      socketRef.current.on('presence', (arr) => {
        setOnlineSet(new Set(arr));
      });
      socketRef.current.on('typing', ({ userId, typing }) => {
        setTypingUsers(prev => ({ ...prev, [userId]: typing }));
        setTimeout(()=> setTypingUsers(prev => ({ ...prev, [userId]: false })), 2500);
      });
    }
  },[])

  useEffect(()=>{ (async ()=>{
    const res = await API.get('/channels', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
    if (res.data.length) {
      const id = res.data[0]._id; setChannelId(id);
      const s = getSocket(); if (s) s.emit('joinChannel', id);
      loadMessages(id, 0);
      // load users list
      const ures = await API.get('/users', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
      setUsers(ures.data);
    }
  })() }, [])

  async function loadMessages(id, pageToLoad){
    const res = await API.get(`/channels/${id}/messages?page=${pageToLoad}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
    if (pageToLoad === 0) setMessages(res.data);
    else setMessages(prev => [...res.data, ...prev]);
    setPage(pageToLoad);
  }

  function loadMore(){
    loadMessages(channelId, page+1);
  }

  return (
    <div className="flex-1 flex">
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div>Channel Chat</div>
          <div>
            <button onClick={loadMore} className="text-sm text-blue-600">Load older</button>
          </div>
        </div>
        <MessageList messages={messages} />
        {channelId && <NewMessage channelId={channelId} />}
      </div>
      <div className="w-64 border-l p-4">
        <h4 className="font-semibold mb-2">Online Users</h4>
        <div>
          {users.map(u => (
            <div key={u.id} className="flex items-center gap-2 p-1">
              <span className={"inline-block w-3 h-3 rounded-full " + (onlineSet.has(u.id) ? 'bg-green-500' : 'bg-gray-300')}></span>
              <span className="text-sm">{u.name} {typingUsers[u.id] ? <span className="text-xs text-gray-500">typing...</span> : ''}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
