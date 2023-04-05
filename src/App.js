import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

const API="https://node2-tabasumnad.vercel.app";
// const API="http://localhost:4000";


function App() {
  return (
    <div className="App">
      {/* <Phone/> */}
      <PhoneList/>
      
      
    </div>
  );
}

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
