import React from 'react'
export default function MessageList({ messages }){
  return (<div className="p-4 overflow-auto flex-1">{messages.map(m=> (
    <div key={m._id} className="mb-2">
      <div className="text-sm font-semibold">{m.sender.name}</div>
      <div>{m.text}</div>
      <div className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleString()}</div>
    </div>
  ))}</div>)
}
