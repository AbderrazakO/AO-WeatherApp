import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { RiArrowLeftLine } from 'react-icons/ri'
import './index.css'

let Root = () => {
  // Use States
  let [data, setData] = useState({})
  let [stat, setStat] = useState('')
  let [statClass, setStatClass] = useState('')

  // Get Get Data By Devise Location
  let getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Set Values
        const key = '0f54e63013571d93b7d0c17e8d20c5e4'
        let url_geo = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}`
        // console.log(url_geo)
        // Fetch Data
        const weatherData = async () => {
          const response = await fetch(url_geo)
          // console.log(response.status)
          // Handling Errors
          if (response.status >= 200 && response.status <= 299) {
            const data = await response.json()
            setStatClass('verifiedStat')
            setStat('Wait To Load Data')
            setTimeout(() => {
              setData(data)
            }, 1000)
          } else {
            setData({})
            setStatClass('deniedStat')
            setStat('Error City not found')
          }
        }
        weatherData()
      },
      (error) => {
        setStatClass('deniedStat')
        setStat('You denied Permision')
      }
    )
  }

  // Get Data By City Name
  let enterKeyPressed = (event) => {
    if (event.key === 'Enter') {
      // Set Values
      const key = '0f54e63013571d93b7d0c17e8d20c5e4'
      let url_city = `https://api.openweathermap.org/data/2.5/weather?q=${event.target.value}&appid=${key}`
      // Fetch Data
      const weatherData = async () => {
        const response = await fetch(url_city)
        // console.log(response.status)
        // Handling Errors
        if (response.status >= 200 && response.status <= 299) {
          const data = await response.json()
          setTimeout(() => {
            setData(data)
          }, 1000)
          setStatClass('verifiedStat')
          setStat('Wait To Load Data')
        } else {
          setData({})
          setStatClass('deniedStat')
          setStat('Error City not found')
        }
      }
      weatherData()
    }
  }
  // Go Back btn
  let deleteData = () => {
    setData({})
    setStat('')
    setStatClass('')
  }
  useEffect(() => {
    deleteData()
  }, [])

  // Show Data
  // console.log('>>>>>>>>>>>>> Start Data <<<<<<<<<<<<<<<<')
  // console.log(data)
  // console.log('>>>>>>>>>>>>>  End Data  <<<<<<<<<<<<<<<<')

  // Return Search Box

  // Set Weather Card
  if (Object.keys(data).length !== 0) {
    return (
      <>
        <h1>Welcome To AO Weather</h1>
        <section className='section'>
          <section className={`weather-card`}>
            <div className='row row-1'>
              <button className='btn arrow' onClick={deleteData}>
                <RiArrowLeftLine />
              </button>
              <span>Weather Card</span>
            </div>
            <div className='row row-2'>
              <img src={`./icons/${data.weather[0].icon}.svg`} alt='' />
            </div>
            <div className='row row-3'>{`${Math.round(
              data.main.temp - 273.15
            )}°C`}</div>
            <div className='row row-4'>{data.weather[0].description}</div>
            <div className='row row-5'>
              <span>{`${data.name},`}</span>
              <span>{data.sys.country}</span>
            </div>
            <div className='box'>
              <div className='row'>
                <div className='item'>
                  <h2>{`${Math.round(data.main.temp - 273.15)}°C`}</h2>
                  <p>Apparent temperature</p>
                </div>
                <div className='item'>
                  <h2>{`${data.main.humidity}%`}</h2>
                  <p>Humidity</p>
                </div>
              </div>
              <div className='row'>
                <div className='item'>
                  <h2>{`${data.main.pressure}hPa`}</h2>
                  <p>Air pressure</p>
                </div>
                <div className='item'>
                  <h2>{`${data.visibility / 1000}Km`}</h2>
                  <p>Visibility</p>
                </div>
              </div>
              <div className='row'>
                <div className='item'>
                  <h2>{`${data.wind.deg}°`}</h2>
                  <p>Wind deg</p>
                </div>
                <div className='item'>
                  <h2>{`${data.wind.speed}Km/h`}</h2>
                  <p>Wind speed</p>
                </div>
              </div>
            </div>
          </section>
        </section>
      </>
    )
  } else {
    return (
      <>
        <h1>Welcome To AO Weather</h1>
        <section className='section'>
          <div className={`search-box`}>
            <div className='search-row search-row-1'>Search Box</div>
            <div className='search-row search-row-2'>
              <h4 className={`stat ${statClass}`}>{stat}</h4>
            </div>
            <div className='search-row search-row-3'>
              <input
                type='text'
                name='search'
                id='search'
                placeholder='Enter City Name'
                onKeyDown={enterKeyPressed}
              />
            </div>
            <div className='search-row search-row-4'>
              <span></span>
              <div className='or'>OR</div>
              <span></span>
            </div>
            <div className='search-row search-row-5'>
              <button className='btn' onClick={getLocation}>
                Get Devise Location
              </button>
            </div>
          </div>
        </section>
      </>
    )
  }
}

// Render App
ReactDOM.render(<Root />, document.getElementById('root'))
