import React, { useState, useEffect } from 'react'

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?'
const ICON_URL = 'https://openweather.org/img/wn/'
const API_KEY = ''

function Weather () {
  const [temp, setTemp] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [direction, setDirection] = useState(0)
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)

  useEffect(() => {
    const url =
      API_URL +
      'lat=' +
      lat +
      '&lon=' +
      lng +
      '&units=metric' +
      '&appid=' +
      API_KEY

    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          if (result.main != undefined) {
            setTemp(result.main.temp)
            setSpeed(result.wind.speed)
            setDirection(result.wind.deg)
            setDescription(result.weather[0].description)
            setIcon(ICON_URL + result.weather[0].icon + '@2x.png')
            setIsLoading(false)
          } else {
            alert('Could not read weather information')
          }
        },
        error => {
          setIsLoading(true)
        }
      )
  }, [])
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLat(position.coords.latitude)
          setLng(position.coords.longitude)
        },
        error => {}
      )
    } else {
    }
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  } else {
    return (
      <div className='content'>
        <h3>Your position is</h3>
        <p>
          Position: &nbsp;
          {lat.toFixed(3)},{lng.toFixed(3)}
        </p>

        <>
          <h3>Weather on your location</h3>
          <p>{temp} C&#176;</p>
          <p>
            {speed} m/s {direction} degrees
          </p>
          <p>{description}</p>
          <img src={icon} alt='' />
        </>
      </div>
    )
  }
}

export default Weather
