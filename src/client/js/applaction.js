function handleSubmit (w){
    w.preventDefault()
   
    let form_city = document.getElementById('city').value 
    console.log('Form Input', form_city)
    let start_date = document.getElementById('start').value

    if(form_city === ""){
        alert('Please enter a valid city name.: EX Riyadh')
         return
    }

            get_city_api(city_Url,form_city,Parameters1,us) //   calback function AND return city_request
            
            .then((city_request)=>{ //  return data_Lat_Lon to use in weather api 
            console.log('check if data here to use ! ',city_request)
            const city_data={   //  Latitude and Longitude store in object 
              lat : city_request.geonames[0].lat, // 24.68773
              long : city_request.geonames[0].lng,  // 46.72185 
            };
            
             console.log(city_data)
                 return city_data // lat long data 
            }) 
            
           .then((city_data)=>{
               
                const get_weather_api = async (lat, long)=>{ 
                    // EX:https://api.weatherbit.io/v2.0/forecast/daily?&lat=24.68773&lon=46.72185&days=3&key=7ae347ac8b7d4ae6acc1ace0aba53da3
                    const weather_in_req = await fetch (`${weather_url}&lat=${lat}&lon=${long}&key=${weather_key}`)
                    console.log('weather_URL:', weather_in_req)
                    
                        const weather_in_RES = await weather_in_req.json(); // return with json(format)
                        console.log('weather RES:', weather_in_RES)
                       return weather_in_RES 
                }

                  return get_weather_api(city_data.lat,city_data.long) // Done fetching
                 
            })
            
            
            .then((w_data)=>{  // w_data: data return from the previous function 

                const weather_post = async function (url , data){  // url : http://localhost:8083/api , data : fetch from api and save in server key 
                    const weather_request = await fetch (url,{
                    method: "POST",
                    credentials: "same-origin",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        city: data.form_city,   // EX: 'key':'value' => projectData[CityName]= req.body.city => city= (form_city.value)
                        booking:data.start_date,
                        dateTime: data.datetime,
                        country_code: data.code,  // wind_cdir_full
                        timezone: data.zone,     // wind_cdir
                        weather:data.weather,
                        temp:data.temp
                    })  

                    })
                
                    const weather_response = await weather_request.json();
                    console.log("The response from weather: ",weather_response)
                    return weather_response // Good it's return 
                }
              const  pic = weather_post('http://127.0.0.1:8070/api',{
                form_city, // .value
                start_date,  //.value
                datetime:w_data.data[0].datetime,
                code: w_data.country_code,
                zone: w_data.timezone,
                weather: w_data.data[0].weather.description,
                temp: w_data.data[0].temp,
               
                
              })
                return pic

       })
            
       
       .then((pic)=>{

        const pixabay_post = async (pic) => {
        
        const CityName = pic.CityName;
        const res = await fetch(`${pix_url}key=${pix_key}&q=${CityName}${Parameters2}`);
        try {
            const pic = await res.json();
            console.log('photo pic URL:',pic)
            return pic
            
        }
        catch (error) {
                console.log("error : ", error);
        }
        };
        pixabay_post(pic)
        console.log('pleas show me pic i want be sure',pic )
        return pic
    })
    .then((pic)=>{
         update_picture(pic);
      })
        
      
} 
const get_city_api = async function(url, input,P1,username){
    const city_request = await (await fetch(`${city_Url}${form_city}${Parameters1}${us}`)).json()  // EX: http://api.geonames.org/searchJSON?maxRows=1&q=Riyadh&username=wejdan
    console.log('City_URL:', city_request)
       return city_request ;
        // Done this function it's fetching data from Geonams_Api and return a response with JSON format
}


// Geonams_Api
const city_Url = 'http://api.geonames.org/searchJSON?maxRows=1&q=';
const Parameters1 = '&username=';
const us = 'wejdan';

//pixabay_api

const pix_url = 'https://pixabay.com/api/?'
const pix_key = '19520465-cdac67a723e8d1376760718ba'  
const Parameters2='&city&image_type=photo'  
//weather_api

const weather_url = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const weather_key ='7ae347ac8b7d4ae6acc1ace0aba53da3';

var form_city = document.getElementById('city').value 


// this function will work untel user submit 
const ElmentTarget = document.getElementById('submit');
ElmentTarget.addEventListener('click', handleSubmit ); 
// function handelSubmit work with EventListen 


import {update_picture} from './pic_update'
export {handleSubmit}
