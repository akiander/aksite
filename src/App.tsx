
import { Auth } from 'aws-amplify';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Link from '@mui/material/Link';
import React, { useState } from 'react'
import { Routes, Route, Outlet } from "react-router-dom";
import { Secure } from './Secure';
import './App.css'

export default function App() {
  return (
    <div>
        {/*      
          Routes nest inside one another. Nested route paths build upon
          parent route paths, and nested route elements render inside
          parent route elements. See the note about <Outlet> below. */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="secure" element={ <Secure />} />

            {/* Using path="*"" means "match anything", so this route
                  acts like a catch-all for URLs that we don't have explicit
                  routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
    </div>
  );
}

function Layout() {

  const [username, setUsername] = useState('anon');

  const checkAuth = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log('user',user)
      setUsername(user?.username)
    }
    catch (error) {
      /* When the user is not authenticated, we'll land here */ 
    }
  }
  // checkAuth(); // find out why this is called so often

  return (
    <div className="layout-container">
    <header className="layout-header">
    <Link href='/'>
      <div className="logo-box">
       
        <AutorenewIcon/>
        <span>Site</span>
        
      </div>
      </Link> 
    </header>
    
    <main className="layout-main">
    	<div className="layout-sidebar">

      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}

          <Link href="/">Home </Link>
          <Link href="/about">About </Link>
          

      </div>
      <div className="layout-content">

          {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
        <Outlet />
      </div>
      
    </main>
    <footer className="layout-footer">
    <span className="layout-title">Footer</span>
  </footer>
  </div>
   
  );
}

function Home() {
  return (
    <div>
      <span>Home</span>
    </div>
  ); 
}

function About() {
  return (
    <div>
      <span>About</span>
    </div>
  );
} 

function NoMatch() {
  return (
    <div>
      <span>Page not found</span>
      <p>
        <Link href="/">Return to home</Link>
      </p>
    </div>
  );
}