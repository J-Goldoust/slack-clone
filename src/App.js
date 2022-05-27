import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import styled from 'styled-components'
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
     <Router>

      <Header />
      
      <AppBody>
        <Sidebar />

        <Routes>
        <Route exact path="/" element={<><Chat/></>}/>
            {/* <Route index element={} />
            <Route path="blogs" element={} />
            <Route path="contact" element={} />
            <Route path="*" element={} /> */}
           {/* </Route> */}
        </Routes>

      </AppBody>

    </Router>
    </div>
  )}

export default App


const AppBody = styled.div`
  display: flex;
  height: 100vh;
`
