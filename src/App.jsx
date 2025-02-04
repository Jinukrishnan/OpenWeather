import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import './App.css'
import axios from 'axios'
function App() {
  const [city, setCity] = useState("")
  const [image, setImage] = useState("./Images/Sunny.jpg  ")
  const [data, setData] = useState(null)
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = '0fe4be1958500a23b94f315c0e59c2f2'
  // find weather data
  const findWeather = async () => {
    try {
      console.log(city);
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      if (res.status === 200) {
        setData({ ...res.data })
        setBackgroundImage(res)
      }

    } catch (error) {
      console.log(error);

      toast.warn(error.response.data.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

    }


  }
  // set background image based on weather data
  const setBackgroundImage = (res) => {
    if (res.data.weather[0].main.toLowerCase() == "clouds") {
      setImage("./Images/Cloud.jpg")
    } else if (res.data.weather[0].main.toLowerCase() == "rain") {
      setImage("./Images/Rain.jpg")
    }
    else {
      setImage("./Images/Sunny.jpg")
    }
  }
  // get latitude and longitude based on currewnt location
  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("hai");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }

  }, [])
// get current location weather data based on latitude and longitude
  const getCurrentLocationWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}`
      );
      console.log(response);


      if (response.status == 200) {
        console.log("hoi");
        setData({ ...response.data })
        setBackgroundImage(response)
      }
    } catch (err) {
      setError("Failed to fetch location name.");
    }
  }
  useEffect(() => {
    getCurrentLocationWeather()
  }, [location])
  if (!data)
    return (<div className='loading'><h1>Fetching Yout Current Location Weather Data....</h1></div>)
  return (
    <>
      <div className="container">
        <ToastContainer />
        <img className='image' src={image} alt="" />
        <div className="content">
          <div className="enter">
            <div className="input">
              <input type="text" placeholder='Enter Location' onChange={e => setCity(e.target.value)} />
            </div>
            <div className="btn">
              <button className='find' onClick={findWeather}><span className="material-symbols-outlined">
                search
              </span></button>
            </div>
          </div>
          {
            data && (
              <div className="weather_container">
                <h2 className="">{data.name}, {data.sys.country}</h2>
                <p className="">{data.weather[0].description}</p>
                <div className="weather_image">
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                    alt="weather icon"
                    className="w-20 h-20"
                  />

                  <h3 className="">{Math.floor(data.main.temp - 273)}°C</h3>
                  <div className="weather">
                    <div className="child">
                      <p className="head">Humidity</p>
                      <p className='dt'>{data.main.humidity}%</p>
                    </div>
                    <div className="child">
                      <p className="head">Wind Speed</p>
                      <p className='dt'>{data.wind.speed} m/s</p>
                    </div>
                    <div className="child">
                      <p className="head">Pressure</p>
                      <p className='dt'>{data.main.pressure} hPa</p>
                    </div>
                    <div className="child">
                      <p className="head">Cloudiness</p>
                      <p className='dt'>{data.clouds.all}%</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
