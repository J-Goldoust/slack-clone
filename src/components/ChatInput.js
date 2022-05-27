import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import { serverTimestamp, addDoc, collection } from "firebase/firestore"
import { db } from "../firebase"


function ChatInput({ channelName, channelId }) {

    const [input, setInput] = useState('')


    const sendMessage = (e) => {
        e.preventDefault()

        if (!channelId) {
            return false
        }

        
        addDoc(collection(db, "rooms", channelId, 'messages'), {
            user: 'J.Goldoust',
            userImage: '../public/profile.jpg',
            time: serverTimestamp(),
            message: input
        })

        setInput('')
    }

  return (
    <ChatContainer>
        <form>
            <input 
                placeholder={`Message #${channelName}`} 
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <Button type='submit' hidden onClick={sendMessage} > Send </Button>
        </form>
    </ChatContainer>
  )
}

export default ChatInput


const ChatContainer = styled.div`
    border-radius: 20px;

    > form {
        position: relative;
        justify-content: center;
        display: flex;
    }

    > form > input {
        position: fixed;
        bottom: 30px;
        width: 70%;
        border: 1px solid gray;
        border-radius: 8px;
        padding: 20px;
        outline: none;
        font-size: 16px;
    }

    > form > Button {
        display: none !important;
    }
`