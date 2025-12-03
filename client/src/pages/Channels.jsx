import React, { useEffect, useState } from 'react'
import API from '../api'

export default function Channels({ selectedChannel, setSelectedChannel, socket }) {

  const [channels, setChannels] = useState([])
  const [name, setName] = useState('')

  useEffect(() => { fetchChannels() }, [])

  async function fetchChannels() {
    const res = await API.get('/channels', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
    setChannels(res.data);
  }

  async function create() {
    await API.post('/channels', { name }, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
    setName('');
    fetchChannels();
  }

  // When user clicks channel
  const handleSelectChannel = (channel) => {
    setSelectedChannel(channel);
    socket.emit('join-channel', channel._id);
  };

  return (
    <div className="w-80 border-r p-4 flex flex-col">
      <h3 className="font-bold">Channels</h3>

      <div className="mt-3 flex-1 overflow-auto">
        {channels.map(c => (
          <div
            key={c._id}
            onClick={() => handleSelectChannel(c)}
            className={`p-2 border-b cursor-pointer rounded
              ${selectedChannel?._id === c._id 
                ? "bg-green-600 text-white"
                : "hover:bg-gray-700 bg-gray-800 text-gray-300"
              }`}
          >
            #{c.name}
            <span className="text-xs text-gray-400 ml-2">({c.memberCount})</span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="new channel"
          className="border p-2 w-full mb-2"
        />
        <button onClick={create} className="w-full bg-blue-600 text-white py-2 rounded">
          Create
        </button>
      </div>
    </div>
  )
}
