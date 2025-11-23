import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Listen from "./Components/Listen";
import More from "./Components/More";
import Navbar from "./Components/Nav.jsx";
import Videos from "./Components/Videos";
import Footer from "./Components/Footer";
import Bts from "./Components/Bts";
import FollowUs from "./Components/FollowUs";
import CollaborationSection from "./Components/Collab";



const App = () => {
  return (
    <Router>
      <div style={styles.appContainer}>
        {/* Navbar */}
        <Navbar />
        
        {/* Main content area */}
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listen" element={<Listen />} />
            <Route path="/more" element={<More />} />
            <Route path="/videos" element={<Videos />} />
             <Route path="/bts" element={<Bts/>} />
             <Route path="/followus" element={<FollowUs/>} />
            
             
          </Routes>
        </div>
       <CollaborationSection />
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

 const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
   minHeight: "50vh",
  },
  content: {
   flex: 1,
   paddingTop: "0px", // Space for fixed navbar
    paddingBottom: "0px", // Space for fixed footer
  },
};

export default App;