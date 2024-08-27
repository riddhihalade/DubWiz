import React, { useRef } from "react";
import Hero from "./Hero";
import OptionCard from "./OptionCard";
import VideoUpload from "./VideoUpload";
import translation from "../assests/translation.jpg"
import subtitles from "../assests/subtitles.jpg"
import dubbing from "../assests/dubbing.png"
import toaudio from "../assests/videotoaudio.png"
import Footer from "./Footer";


const MainPage = () => {
  const mainContentRef = useRef(null);

  const handleGetStarted = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-violet-600">
      {/* Hero Section */}
      <Hero onGetStarted={handleGetStarted} />

      {/* Main Section */}
      <div className="bg-white">
        <div className=" flex justify-center p-10 py-20">
          <VideoUpload />
        </div>

        {/* Add the ref here to scroll into view */}
        <div className="bg-white p-6">
          {/* Container for card layout */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className=" p-4">
              <OptionCard title="Dub a Video" img={dubbing} />
            </div>
            <div className=" p-4">
              <OptionCard title="Get Video Subtitles" img={subtitles} />
            </div>
            <div className="p-4">
              <OptionCard title="Get Video to Audio" img={toaudio} />
            </div>
           
            <div className=" p-4">
              <OptionCard title="Get Translated Subtitles" img={translation} />
            </div>
            
          </div>
        
        </div>
      </div>

      <Footer />

    </div>
  );
};

export default MainPage;
        
        
