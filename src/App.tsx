
import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Secure } from './Secure';
import './App.css'

export default function App() {
  return (
    <div className="layout-container">
    <header className="layout-header">
      <span className="header-title">AK Site</span>
    </header>
    
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

    <footer className="layout-footer">
      <span className="layout-title">Footer</span>
    </footer>
    </div>
  );
}

function Layout() {
  return (

    <main className="layout-main">
    	<div className="layout-sidebar">

      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/secure">Secure</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>
      </div>
      <div className="layout-content">

          {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
        <Outlet />
      </div>
      
    </main>
   
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
} 

function NoMatch() {
  return (
    <div>
      <h2>Page not found</h2>
      <p>
        <Link to="/">Return to home</Link>
      </p>
    </div>
  );
}
