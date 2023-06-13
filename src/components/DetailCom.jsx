import React from "react";
import { useLocation } from "react-router-dom";
import Credit from "./Credit";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CircularRates from "./CircularRates";
const Detail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const posterPath = searchParams.get("poster");
  const title = searchParams.get("title");
  const videoLink = searchParams.get("video");
  const rating = searchParams.get("rating");
  const overview = searchParams.get("overview");
  const date = searchParams.get("date");
  const background = searchParams.get("background");
  const creditLink = searchParams.get("creditLink");

  const handleButtonClick = () => {

    window.open(`https://www.youtube.com/watch?v=${videoLink}`, "_blank");
  };
  const [activeMenu, setActiveMenu] = useState("Dashboard"); 
  const navigate = useNavigate();
  const scrollToDashboard = () => {
    setActiveMenu("Dashboard"); 
    navigate('/');
  };



  return (
    <div className="font-poppins relative flex flex-row h-screen w-screen" style={{ textAlign: "center", color: "white" }}>
     <button
  className="font-bold inline-block mt-2 ml-2 px-4 py-2 bg-gray-500 text-white no-underline cursor-pointer border-none rounded-full text-xl relative z-10 h-12 transition-colors duration-300 hover:bg-blue-800"
  onClick={scrollToDashboard}
>
  Back
</button>

      <div className=" ml-20 mr-7 flex flex-row mt-40">
        {posterPath && (
          <div className=" mr-10 top :0 inline-block" >
            <img 
              style={{ maxWidth: "400px", marginRight: "20px" }}
              src={`${process.env.REACT_APP_BASEIMGURL}/${posterPath}`}
              alt="Movie Poster"
              className="rounded-3xl"
            />
          </div>
        )}
        <div className="text-left w-2/3">
        
          
          {title && <h2 className="text-7xl font-bold" style={{ marginTop: 0, marginBottom: "5px" }}>{title}</h2>}
          {date && <p className="mt-4 text-3xl font-bold" style={{ marginTop: 0 }}>Release Date: {date}</p>}
          <div className="mt-1"><CircularRates  value={rating} /></div>
          {overview && <p  className=" mt-9 text-2xl mb-6" >{overview}</p>}
          {videoLink && (
            <button
            className="font-bold inline-block px-4 py-2  bg-gray-500 text-white no-underline cursor-pointer border-none rounded-full text-xl relative z-10 h-12 transition-colors duration-300 hover:bg-blue-800"
            onClick={handleButtonClick}
          >
            Watch Trailer
          </button>
            
          )}
        </div>
      </div>
      {background && (
        <img
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.09,
          }}
          src={`${process.env.REACT_APP_BASEIMGURL}${background}`}
          alt="Background Image"
        />
      )}
      
    </div>
  );
};

export default Detail;
