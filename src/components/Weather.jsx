import React, { useEffect, useState } from "react";
import { Card, CardGroup } from "react-bootstrap";
import dayjs from "dayjs";
import {
  WiDaySunny,
  WiCloudy,
  WiThunderstorm,
  WiRainWind,
  WiStormShowers,
} from "weather-icons-react";

const WEATHER_4DAY =
  "https://api.data.gov.sg/v1/environment/4-day-weather-forecast";

const Weather = () => {
  const [weatherForecasts, setWeatherForecasts] = useState([]);

  useEffect(() => {
    fetch(WEATHER_4DAY)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.items[0]["forecasts"]);
        setWeatherForecasts(data.items[0]["forecasts"]);
      })
      .catch((err) => console.error(err));
  }, []);

  const WeatherIcon = ({ weather, size }) => {
    weather = weather.toLowerCase();
    let parsedWeather;
    if (weather.includes("thundery showers")) {
      parsedWeather = "thunderyshowers";
    } else if (weather.includes("thunderstorm")) {
      parsedWeather = "thunderstorm";
    } else if (weather.includes("showers") || weather.includes("rain")) {
      parsedWeather = "rain";
    } else if (weather.includes("cloudy")) {
      parsedWeather = "cloudy";
    } else {
      parsedWeather = "sunny";
    }

    switch (parsedWeather) {
      case "thunderyshowers":
        return <WiStormShowers size={size} />;
      case "cloudy":
        return <WiCloudy size={size} />;
      case "thunderstorm":
        return <WiThunderstorm size={size} />;
      case "rain":
        return <WiRainWind size={size} />;
      default:
        return <WiDaySunny size={size} />;
    }
  };

  return (
    <div>
      <h5>4-Day Weather Forecast</h5>
      <CardGroup>
        {weatherForecasts.map((dayObj, index) => (
          <Card style={{ width: "12rem" }} key={index}>
            <Card.Body>
              <Card.Subtitle>
                {dayjs(dayObj.date, "YYYY-MM-DD").format("ddd, D MMMM")}
              </Card.Subtitle>
              <WeatherIcon weather={dayObj.forecast} size={36} />
              <div>
                {dayObj.temperature.low} - {dayObj.temperature.high} ℃
              </div>
              <Card.Text>{dayObj.forecast}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
};

export default Weather;
