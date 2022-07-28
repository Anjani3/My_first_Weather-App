import React, { useEffect, useState } from "react";
import { API_KEY } from "./apikey";
import axios from "./axios";

//https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}

function App() {
  const [wether, setWether] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let { latitude, longitude } = position.coords;
      axios
        .get("", {
          params: {
            appid: API_KEY,
            lat: latitude,
            lon: longitude,
          },
        })
        .then((res) => {
          setWether(res.data);
          setLoading(false);
        });
    });
  }, []);

  if (!loading)
    return (
      <>
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="card">
            <div className="card-body">
              <p>NAME : {wether?.name}</p>
              <p>WETHEER: {wether?.weather[0]?.description}</p>
            </div>
          </div>
        </div>
      </>
    );
  else return <div>Loading....</div>;
}

export default App;
