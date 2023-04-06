import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Home } from './Home';

const API="https://node2-tabasumnad.vercel.app";
// const API="http://localhost:4000";


function App() {
  return (
    <div className="App">
      {/* <Phone/> */}

      <Routes>
      <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/mobiles" element={
        <ProtectedRoute>
           <PhoneList/>
        </ProtectedRoute>
       } />
      </Routes>


  
      
      
    </div>
  );
}

function ProtectedRoute({children}){
  const token=localStorage.getItem("token");
return token ? (<section>
  <h1>This is a protected Route</h1>
  {children}
</section>):(<Navigate replace to="/ "/>)
}

// 2nd DAY FSD 1.LOGIN 2.Mobile

function PhoneList(){
  const [mobileList, setMobilrList]=useState([]);

  useEffect(()=>{
    fetch(`${API}/mobile`)
    .then((res)=>res.json())
    .then((data)=>setMobilrList(data));
  },[]);

  


  return(
    <div className="phone-list-container">
      
     {
     mobileList.map((mbl,index)=>(
     <Phone mobile={mbl} key={mbl._id} />
    ))} 
    </div>
  )

}


// componenet declaration || { mobile }-->object destructuring (ES6)
function Phone({mobile}){
  // const mobile={
  //   "model": "OnePlus 9 5G",
  //   "img": "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
  //   "company": "Oneplus"
  // };

  return (
    <div className="phone-container">
      <img src={mobile.img} alt={mobile.img} className="phone-picture"/>
<h2 className="phone-name">{mobile.model}</h2>
<h5 className="phone-company">{mobile.company}</h5>
    </div>
  );
}


export default App;
