import { useState } from "react";
import playButton from "../assests/playLogo.png";
import "./OptionCard.css";
import axios from "axios";
import PropTypes from "prop-types";

const OptionCard = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState("hin");

  const languageOptions = [
    { value: "hin", label: "Hindi" },
    { value: "mar", label: "Marathi" },
    { value: "guj", label: "Gujarati" },
    { value: "kan", label: "Kannada" },
    { value: "tel", label: "Telugu" },
  ];

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const downloadFile = async (url, fileName, fileType) => {
    try {
      const response = await axios.get(url, { responseType: "blob" });

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: fileType });
        const fileUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = fileUrl;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(fileUrl);
      } else {
        alert(`Failed to download ${fileName}.`);
      }
    } catch (error) {
      console.error(`Error downloading ${fileName}:`, error);
    }
  };

  const handleDownload = () => {
    switch (props.title) {
      case "Video to Audio":
        downloadFile(
          `http://localhost:5000/audio?language=${selectedLanguage}`,
          "audio.mp3",
          "audio/mpeg"
        );
        break;
      case "Video Subtitles":
        downloadFile(
          `http://localhost:5000/subtitle`,
          "English Subtitles.txt",
          "text/plain"
        );
        break;
      case "Translated Subtitles":
        downloadFile(
          `http://localhost:5000/trans_sub`,
          "Translated Subtitles.txt",
          "text/plain"
        );
        break;
      case "Dub a Video":
        downloadFile(
          `http://localhost:5000/dub`,
          "dubbed_video.mp4",
          "video/mp4"
        );
        break;
      default:
        alert("Invalid option.");
    }
  };

  OptionCard.propTypes = {
    title: PropTypes.string.isRequired,
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden h-[480px] w-[400px] m-[30px]">
    <img className="w-full h-60 object-cover rounded-t-lg" src={props.img} alt={props.title} />
    <h1 className="text-xl font-bold text-gray-800 my-4">{props.title}</h1>
    <select
      className="w-90% p-2 rounded-md border border-gray-300"
      value={selectedLanguage}
      onChange={handleLanguageChange}
    >
      {languageOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <button
      onClick={handleDownload}
      className="cardButton"
    >
      Download
    </button>
  </div>
);
};

OptionCard.propTypes = {
title: PropTypes.string.isRequired,
img: PropTypes.string.isRequired,
};

export default OptionCard;