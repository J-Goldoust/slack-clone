import React from 'react'
import styled from 'styled-components'
import { StarBorderOutlined, InfoOutlined } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { selectRoomId } from '../features/appSlice'
import ChatInput from './ChatInput'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'
import { collection, doc, getDoc, orderBy, query } from 'firebase/firestore'

function Chat() {

  const roomId = useSelector(selectRoomId)


  const [roomDetails] = useDocument(
    roomId && collection(db, 'rooms', roomId, 'name')
  )

  const [roomMessages] = useCollection(
    roomId && query(collection(db, 'rooms', roomId, 'messages'), orderBy('timestamp', 'asc'))
  )

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
