import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { StarBorderOutlined, InfoOutlined } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { selectRoomId } from '../features/appSlice'
import ChatInput from './ChatInput'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'
import { collection, doc, getDoc, orderBy, query } from 'firebase/firestore'
import Message from './Message'

function Chat() {
  const chatRef = useRef(null)
  const roomId = useSelector(selectRoomId)


  const [roomDetails] = useDocument(
    roomId && collection(db, 'rooms', roomId, 'name')
  )

  const [roomMessages, loading] = useCollection(
    roomId && query(collection(db, 'rooms', roomId, 'messages'), orderBy('timestamp', 'asc'))
  )

  useEffect(() => {
    chatRef?.current?.scrollIntoView()
  }, [roomId, loading])

  console.log(roomDetails)
  console.log(roomMessages)

  return (
    <ChatContainer>

      <Header>
        <HeaderLeft>
          <h4>
            <strong>#Room-name</strong>
          </h4>
          <StarBorderOutlined />
        </HeaderLeft>

        <HeaderRight>
          <p>
            <InfoOutlined /> Details
          </p>
        </HeaderRight>
      </Header>

      <ChatMessages>
        {roomMessages?.docs.map((doc => {
          const { message, timestamp, user, userImage } = doc.data();

          return (
            <Message 
              key={doc.id}
              message={message}
              timestamp={timestamp}
              user={user}
              userImage={userImage}
            />
          )
        }))}

        <ChatBottom ref={chatRef}/>
      </ChatMessages>

      <ChatInput 
        channelId={roomId}
        channelName={roomDetails?.data}
      />
    </ChatContainer>
  )
}

export default Chat

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
`


const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    margin-right: 10px;
    text-transform: lowercase;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 10px;
  }
`

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`

const ChatMessages = styled.div``

const ChatBottom = styled.div`
  padding-bottom: 200px;
`
