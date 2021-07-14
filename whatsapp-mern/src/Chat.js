import React from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  SettingsOverscanTwoTone,
} from '@material-ui/icons'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import { useState } from 'react'
import axios from './axios'

function Chat({ messages }) {
  const [input, setInput] = useState('')
  const sendMessage = async (e) => {
    e.preventDefault()
    await axios.post('/messages/new', {
      message: input,
      name: 'DEMO APP',
      timestamp: 'Just now!',
      received: false,
    })

    setInput('')
  }

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar />

        <div className='chat__headerInfo'>
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>

        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className='chat__body'>
        {messages.map((message) => (
          <p
            className={`chat__message ${message.received && 'chat__receiver'}`}
          >
            <span className='chat__name'>Sonny</span>
            {message.message}
            <span className='chat__timestamp'>{new Date().toUTCString()}</span>
          </p>
        ))}
      </div>

      <div className='chat__footer'>
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type a message'
            type='text'
          />
          <button onClick={sendMessage} type='submit'>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat
