import { useEffect,useState } from "react";

function Counter() {
  const[count,setcount]=useState(0);
   useEffect(()=>{
    console.log("component Mounted");
    return()=>{
      console.log("component unmounted");
    }
  },[]);
  useEffect(()=>{
    console.log("count updated",count);
  },[count]);

  return(
    <>
    <h3>{count}</h3>
    <button onClick={()=>setcount(count+1)}>
      increment
    </button>
    <button onClick={()=>setcount(count-1)}>
      decrement
    </button>
    </>
  )
}


export default Counter;



