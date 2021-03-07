import React, { useState, useEffect } from "react";
import { api } from "../services/api";

import Loading from './Loading'

import "./List.css";

export default function List() {
  const [Tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true)
  const[readMore, setReadMore] = useState(false)

  const removeTour = (e,id)=>{
    e.preventDefault()
    const newTours = Tours.filter((tour)=> tour.id !== id)
    setTours(newTours)
  }


  useEffect(() => {
    const data = async () => {
      const response = await api.get("/");

      setTours(response.data);
      setLoading(false)
    };
    data();
  }, []);

  if(loading){
    return(
      <main>
        <Loading/>
      </main>
      );
  }
  else{
    return (
      <div className="tours">
        <h1>Our Tours</h1>
        <div className="line"></div>
        {Tours.map((Tour) => {
          return (
            <div className="tour" key={Tour.id}>
              <div className="tour-image">
                <img src={Tour.image} alt="" />
              </div>
  
              <div className="tour-title">
                <p>{Tour.name}</p>
                <span>${Tour.price}</span>
              </div>
  
              <div className="tour-description">
                <p>
                  {readMore ? Tour.info :`${Tour.info.substring(0,200)}...`}
                  <button onClick = {()=> setReadMore(!readMore)}className="read">{readMore ? 'show less' : 'read more'}</button>
                </p>
                
                </div>
              <button className="hide" onClick={(e)=>{removeTour(e,Tour.id)}}>Not Interested</button>
            </div>
          );
        })}
      </div>
    );
  }
  
}
