import React, { useEffect, useState } from "react";
import hotbg from '../assets/hot1.jpg';
import coldbg from '../assets/cold1.jpg';
import { getweatherData } from "../weatherService";
import Description from "../description";

function Weatherfunc() {
    const [city,setCity]=useState("london");
    const [weather, setWeather] = useState(null);
    const [units, setUnits] = useState("metric");
    const [bg,setBg] = useState(hotbg)

    useEffect(() => {
        const fetchWeatherdata = async () => {
            const data = await getweatherData(city, units);
            setWeather(data);
            
            //dynamic bg
            const threshold = units === "metric" ? 20 : 60;
            if (data.temp<=threshold) setBg(coldbg)
            else setBg(hotbg)
        };
        fetchWeatherdata();
    }, [units, city]);

    const handleUnitsClick = (e) => {
        const button = e.currentTarget;
        const currentUnit = button.innerText.slice(1);
        const isCelsius = currentUnit === "C";
        button.innerText=isCelsius ? "°F" : "°C";
        setUnits(isCelsius ? "metric" : "imperial");
    };

    const inputKeypressed = (e) =>{
        if (e.keyCode === 13) {
            setCity(e.currentTarget.value);
            e.currentTarget.blur();
        }
    };

    return (
        <>
            <div className="app" style={{ backgroundImage: `url(${bg})` }}>
                <div className="overlay">
                    {
                        weather && (
                            <div className="container">
                                <div className="section section__inputs">
                                    <input onKeyDown={inputKeypressed} type="text" name="city" placeholder="Enter city name..." />
                                    <button onClick={(e)=>handleUnitsClick(e)}>°F</button>
                                </div>
                                <div className="section section__temperature">
                                    <div className="icon">
                                        <h3>{`${weather.name},${weather.country}`}</h3>
                                        <img src={weather.IconURL} alt="" />
                                        <h3>{weather.description}</h3>
                                    </div>
                                    <div className="temperature">
                                        <h1>{`${weather.temp.toFixed()} °${units === "metric" ? "C" : "F"}`}</h1>
                                    </div>
                                </div>

                                {/* bottom description*/}
                                <Description weather={weather} units={units}/>
                            </div>
                        )
                    }

                </div>
            </div>
        </>
    );
};

export default Weatherfunc;