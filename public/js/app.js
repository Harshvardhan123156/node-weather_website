
const weatherForm=document.querySelector('form')
const seach=document.querySelector('input')
const messageone=document.querySelector('#m1')
const messagetwo=document.querySelector('#m2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const add=seach.value
    messageone.textContent='Loading...'
    messagetwo.textContent=''
    fetch(`http://localhost:3000/weather?search=${add}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                messageone.textContent=data.error
            }else{
                messageone.textContent= `${data.location.name} , ${data.location.region}.`
                messagetwo.textContent =`It is currently ${data.current.temperature}°C. It feels like ${data.current.feelslike}°C outside. ${data.current.weather_descriptions[0]}.`
            }
        })
    })
    console.log('Testing')
})