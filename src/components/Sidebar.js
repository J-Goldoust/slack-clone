import React from 'react'
import styled from 'styled-components'
import SidebarOption from './SidebarOption'
import { 
  InsertComment, 
  Create, 
  FiberManualRecord,
  Inbox,
  Drafts,
  BookmarkBorder,
  FileCopy,
  PeopleAlt,
  Apps,
  ExpandLess,
  ExpandMore,
  Add
} from "@material-ui/icons"
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection } from "firebase/firestore"
import { db } from '../firebase'



function Sidebar() {

  const [channels, loading, error] = useCollection( collection(db, 'rooms') )


  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>JG Factory HQ</h2>
          <h3>
            <FiberManualRecord />
            Javad Goldoust
          </h3>
        </SidebarInfo>
        <Create />
      </SidebarHeader>

      <SidebarOption Icon={InsertComment} title="Threads" />
      <SidebarOption Icon={Inbox} title="Mentions & Reactions" />
      <SidebarOption Icon={Drafts} title="Saved Items" />
      <SidebarOption Icon={BookmarkBorder} title="Channel Browser" />
      <SidebarOption Icon={PeopleAlt} title="People & User Groups" />
      <SidebarOption Icon={Apps} title="Apps" />
      <SidebarOption Icon={FileCopy} title="File Browser" />
      <SidebarOption Icon={ExpandLess} title="Show Less" />
      <hr />
      <SidebarOption Icon={ExpandMore} title="Channel" />
      <hr />
      <SidebarOption Icon={Add}  addChannelOption title="Add Channel" />

      {channels?.docs.map((doc) => {
        <SidebarOption
          key={doc.id}
          id={doc.id}
          title={doc.data().name}
        />
      })}

      <SidebarOption 
        key={'ZhbeV2lnAXDk6L4J0UnV'} 
        id={'ZhbeV2lnAXDk6L4J0UnV'}
        title='test' 
      />

    </SidebarContainer>
  )
}

export default Sidebar


const SidebarContainer = styled.div`
  color: white;
  background-color: var(--slack-color);
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 50%;
  }
`

const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  h3{ 
    display: flex;
    font-size: 16px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 16px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
 `