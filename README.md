Weather Application

Overview

This is a weather application built using React.js that allows users to check the current weather conditions for any location. The application also fetches weather data based on the user's current location using the Geolocation API.

Features

    Fetch weather data for any location using OpenWeatherMap API.

    Get current location's weather automatically.

    Dynamic background images based on weather conditions.

    Display weather details including:

        Temperature

        Humidity

        Wind Speed

        Pressure

        Cloudiness

    Search for weather by city name.

    Smooth and responsive UI.

    Toast notifications for errors.

Technologies Used

    React.js - Frontend framework

    Axios - API calls

    React Toastify - Notifications

    OpenWeatherMap API - Fetch weather data

    Geolocation API - Get user's current location

    Installation & Setup

1.Create a project weather app using vite
    npm create vite@latest weatherapp
2.Install dependencies
    npm install
3.Get an OpenWeatherMap API Key

    Sign up at OpenWeatherMap

    Generate an API key.

    Replace API_KEY in App.js with your key.
4.Run the application
    npm start
