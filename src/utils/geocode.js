import request from "request";

export const geocode = (address,callback) => {
    const geocodeurl=`https://api.positionstack.com/v1/forward?access_key=09e98230258fa401447ea52a9316657b&query=${address}`
    request({url:geocodeurl,json:true},(error,{body})=>{
        if(error){
            callback('Unable to access the app!',undefined)
        }else if(!body.data || body.data.length===0){
            callback('Wrong geocode!!',undefined)
        }else{
            callback(undefined,{
                lat:body.data[0].latitude,
                long:body.data[0].longitude
            });
        }
    })
}
