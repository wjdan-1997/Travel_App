
 async function update_picture (pic){
    const pix_url = 'https://pixabay.com/api/?'
    const pix_key = '19520465-cdac67a723e8d1376760718ba'  
    const Parameters2='&city&image_type=photo'  
    
    
    let start_date = document.getElementById('start').value
    let end_date = document.getElementById('end').value
    let new_date = new Date()
    let travel_Start = new Date(start_date)
    let travel_End = new Date(end_date)
    let time_result = travel_Start.getTime() - new_date.getTime()
    let diff_in_dates = Math.round(time_result / (1000*3600*24))
    let dates = {start_date, end_date, diff_in_dates} 

    if(travel_Start < new_date || travel_End < new_date){
        alert('Please Enter a Valid Date For Travel, Thanks!')
        return false
    } if (travel_Start > new_date) {
         return true;
    }
    else {
        console.log("You travel Time True");
    }
   

    const main = document.querySelector('main')
    const div_Element = document.createElement('div')
    div_Element.setAttribute('class', 'final_result')
    main.appendChild(div_Element)
    const final_touch = document.querySelector('.final_result');
    const CityName = pic.CityName;
   const res =  await fetch(`${pix_url}key=${pix_key}&q=${CityName}${Parameters2}`)
  
    
    const photo = await res.json()
     
    console.log('looll:',photo)

    final_touch.innerHTML = `    
    <div class="container_pic">
    <div class="co_box">

    <div class="pic">
    <h1>Trip in:</h1> 
    <h1>${pic.CityName}</h1>
    </div>

    <div class="pic">
    <h1>Today Date:</h1>
    <h1>${pic.dateTime}</h1>
    </div>

    <div class="pic">
    <h1>Booking Date:</h1>
    <h1>${pic.booking}</h1>
    </div>

     <div id="pic">
     <h1>Difference Between Days: ${dates.diff_in_dates} </h1>
     </div>

     <div id="dest_date">
    <h1>Trip</h1>
    <h1>From: ${dates.start_date} To: ${dates.end_date}</h1>
    </div>

    <div class="pic">
    <h1>Weather Today:</h1>
    <h1>${pic.weather}</h1>
    </div>

    <div class="pic">
    <h1>Temperature In The City:</h1>
    <h1>${pic.temp}</h1>
    </div>

    <div class="pic">
    <h1>Countrt Code:</h1>
    <h1>${pic.country_code}</h1>
    </div> 

    <div class="pic">
    <h1>Time Zone:</h1>
    <h1>${pic.zone}</h1>
    </div>
    <img class="img" src="${photo.hits[0].webformatURL}"/>      

</div>

</div>
    
    `;
}



export{update_picture};