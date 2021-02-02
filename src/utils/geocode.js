const request = require('request')
const geocode = (address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWJoaWplZXQwMDQiLCJhIjoiY2tqeHU5dm5tMDFqcDJ3b2VjN3JiY2Q0ZSJ9.moeXglQo7OIy5WW-o2oRCw&limit=1'

request({url,json:true},(error,response)=>{

    if(error){
           callback("unable to connect",undefined)
        }
    else if(response.body.features.length===0){
        callback("INVALID LOCATION",undefined)
    }
    else{
    
        callback(undefined,{
            latitude:response.body.features[0].center[1] ,
            longitude:response.body.features[0].center[0],
            location: response.body.features[0].place_name
        })
    }
})

}

module.exports = geocode;