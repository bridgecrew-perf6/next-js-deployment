import { useState } from 'react'
import styles from './WeatherLayout.module.scss'

const WeatherLayout = () =>{
    const [place,setPlace] = useState('')
    const [tempDetails,setTempDetails] = useState()

    const API = {
        key:'b57549c46515406a977e84ae78cd9862',
        baseApi:`https://api.openweathermap.org/data/2.5/weather?units=metric`
    }

    const placeNameChange = (e) => {
        setPlace(e.target.value)
        fetchWeatherDetails(e.target.value)
    }

    const fetchWeatherDetails = (city) => {
        fetch(API.baseApi + `&appid=${API.key}&q=${city}`).then(res=> res.json())
        .then(result=>{

            if(result.main && result.weather[0]){
            const updatedtempDetails = {
                temprature:result.main.temp,
                weather:result.weather[0].description
            } 
            setTempDetails(updatedtempDetails)
            }
            else{
                setTempDetails('')
            }
        })
    }

    return (<>
        <div className={styles.container}>
        <input onChange={placeNameChange} placeholder='Search place'/>
        {tempDetails && <>
        <div><span>Time</span></div>
        <div><span>{tempDetails.temprature} c</span></div>
        <div><span>{tempDetails.weather} c</span></div>
        </>}
        {!tempDetails && <p>No data found</p>}
        </div>
    </>)
}

export default WeatherLayout