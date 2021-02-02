console.log('client side jsf')



const weatherForm=document.querySelector('form')

const searchWord =document.querySelector('input')
 
const mess1 = document.querySelector('#message-1')
const mess2 = document.querySelector('#message-2')
// mess1.textContent='(data.location)';
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = searchWord.value
    //console.log(location)

    mess1.textContent=''
    mess2.textContent=''
    fetch('http://localhost:5000/weather?address='+location).then((response)=>{

    response.json().then((data)=>{
        if(data.error)
        return  mess1.textContent=(data.error);
        else{
        mess1.textContent=(data.location);
        mess2.textContent=(data.weather);
        }
    })
})

})