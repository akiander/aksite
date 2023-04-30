import About from './pages/About';
import './App.css'
import Home from './pages/Home';
import Layout from './Layout'
import NoMatch from './pages/NoMatch';
import React, { useEffect, useState } from 'react'
import { Routes, Route, Outlet } from "react-router-dom";
import { Secure } from './Secure';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function App() {

  // Detect if user is logged in or not
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  
  return (
    <div>
      {/*      
          Routes nest inside one another. Nested route paths build upon
          parent route paths, and nested route elements render inside
          parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout 
            username={user?.username || 'anon'} 
            loggedIn={!!user?.username} />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="secure" element={<Secure />} />

          {/* Using path="*"" means "match anything", so this route
                  acts like a catch-all for URLs that we don't have explicit
                  routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}