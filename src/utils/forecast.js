const request = require('request') 

const forecast =(latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=29c9b6df0ae5f0f5743985739955458c&query='+latitude+','+longitude+'&units=f'
    
    request({url, json: true},(error,response)=>{
        if(error){
            callback("unable to connect",undefined)
         }
     else if(response.body.error){
         callback("Invalid coordinates",undefined)
     }
     else{
     
         callback(undefined,{
             weather:'At '+response.body.current.observation_time+' temperature is '+response.body.current.temperature +' with humidity '+ response.body.current.humidity,
             location: response.body.location
           
         })
     }
   
 })
}


module.exports = forecast;