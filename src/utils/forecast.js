import request from "request";

export const forecast = (lat,long,callback) => {
    const url=`https://api.weatherstack.com/current?access_key=17aef618df00a91586d49ab67e1b1939&query=${lat},${long}`
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Cannot connect to the app',undefined)
        }else if(body.error){
            callback('Wrong forecast!!',undefined)
        }else{
            const {temperature,wind_dir,wind_speed,humidity,visibility,uv_index,feelslike} = body.current
            callback(undefined,body)
        }
    })
}