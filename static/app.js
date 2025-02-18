import React, { useState, useEffect } from "react";
import "./App.css";

// Component: SubHeader
const SubHeader = () => (
  <div className="sub-header">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
    <a href="/dashboard">Dashboard</a>
  </div>
);

// Component: Header
const Header = ({ location }) => (
  <header>
    <h1>Glacial Lake Outburst Flood (GLOF) Monitoring Dashboard</h1>
    <p>Real-time monitoring of glacial lake conditions to predict potential outburst floods.</p>
    <div className="warning">
      <p>
        <strong>Warning:</strong> This area has a high risk of glacial lake outburst flood. Please
        take necessary precautions.
      </p>
      <p>
        <strong>Current Location:</strong> <span>{location}</span>
      </p>
    </div>
  </header>
);

// Component: Advanced Glacial Lake Surveillance
const GlacialLakeSurveillance = ({ waterLevel, glacialCrack, inWaterSensor }) => (
  <div className="grid" id="grid1">
    <h2>Advanced Glacial Lake Surveillance</h2>
    <ul>
      <li>Water Level Sensor: {waterLevel}</li>
      <li>Glacial Crack Sensor: {glacialCrack}</li>
      <li>In-Water Sensor: {inWaterSensor}</li>
    </ul>
  </div>
);

// Component: Weather Station
const WeatherStation = () => (
  <div className="grid" id="grid2">
    <h2>
      <a href="/weatherStation" style={{ color: "#F1C40F", textDecoration: "none" }}>
        Go to Weather Station Dashboard
      </a>
    </h2>
    <div className="weather-container">
      <p>Click to view real-time weather data graphs.</p>
    </div>
  </div>
);

// Component: Energy Generation
const EnergyGeneration = ({ energyData }) => (
  <div className="grid" id="grid3">
    <h2>Energy Generation</h2>
    <canvas id="energyChart"></canvas>
  </div>
);

// Component: Satellite Images
const SatelliteImages = ({ satelliteImage }) => (
  <div className="grid" id="grid4">
    <h2>Satellite Images</h2>
    <div className="satellite-image">
      <img id="satelliteImage" src={satelliteImage} alt="Satellite Image" />
    </div>
  </div>
);

// Main App Component
const App = () => {
  const [location, setLocation] = useState("Fetching location...");
  const [waterLevel, setWaterLevel] = useState("Loading...");
  const [glacialCrack, setGlacialCrack] = useState("Loading...");
  const [inWaterSensor, setInWaterSensor] = useState("Loading...");
  const [satelliteImage, setSatelliteImage] = useState("");
  const [energyData, setEnergyData] = useState([]);

  const satelliteImages = [
    "https://www.hindustantimes.com/ht-img/img/2024/04/24/550x309/INDIA-FLOODS-SATELLITE-1_1696655449977_1713973000063.JPG",
    "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2020/10/46500768681_c1736d81e5_c.jpg",
    "https://pub.mdpi-res.com/remotesensing/remotesensing-15-01941/article_deploy/html/images/remotesensing-15-01941-g009.png?1680747920",
    "https://geospatialmedia.s3.amazonaws.com/wp-content/uploads/2023/10/sikkim-ff2.png",
    "https://media.wired.com/photos/6537130c74b5757f9c94430d/4:3/w_2068,h_1551,c_limit/india-himalyas-science-2T0W37B.jpg",
    "https://akm-img-a-in.tosshub.com/indiatoday/images/story/media_bank/202310/sikkim-flood-052859376-16x9.jpg?VersionId=SmzwTNsAJf43sCVFzNKdYLreH1CMRjth",
  ];

  const locations = [
    "Shimla, Himachal Pradesh",
    "Leh, Ladakh",
    "Darjeeling, West Bengal",
    "Munnar, Kerala",
    "Nainital, Uttarakhand",
  ];

  // Simulate Data Updates
  useEffect(() => {
    // Location simulation
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * locations.length);
      setLocation(locations[randomIndex]);
    }, 2000);

    // Sensor data simulation
    setInterval(() => {
      setWaterLevel(`${(Math.random() * 100).toFixed(2)} cm`);
      setGlacialCrack(`${(Math.random() * 50).toFixed(2)} mm displacement`);
      setInWaterSensor(`${(Math.random() * 20).toFixed(2)} m`);
    }, 2000);

    // Satellite image simulation
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * satelliteImages.length);
      setSatelliteImage(satelliteImages[randomIndex]);
    }, 2000);
  }, []);

  return (
    <div>
      <SubHeader />
      <Header location={location} />
      <div className="dashboard">
        <GlacialLakeSurveillance
          waterLevel={waterLevel}
          glacialCrack={glacialCrack}
          inWaterSensor={inWaterSensor}
        />
        <WeatherStation />
        <EnergyGeneration energyData={energyData} />
        <SatelliteImages satelliteImage={satelliteImage} />
      </div>
    </div>
  );
};

export default App;
