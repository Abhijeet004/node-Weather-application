const express = require('express')

const app = express()

const path = require('path')

const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//define path for express config
const publicDirectory=(path.join(__dirname,'../public'))
const viewPath = path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partial')

// set up handle bar engine
app.set('view engine', 'hbs')
app.set('views', viewPath)

//set up static directory
app.use(express.static(publicDirectory))
hbs.registerPartials(partialPath)


app.get('',(req,res)=>{
    res.render('index',{
        title:'Dynamic Page',
        message:'This is a home page',
        name:'Abhi'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        message:'This is a about page',
        name:'Abhi'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'This is a help page',
        name:'Abhi'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'please give the address'
        })
    }
 
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{

        if(error){
            return res.send({
                error
            })
        }
    
        forecast(latitude,longitude,(error,{weather}={})=>{
        if(error){
            return res.send({
                error
            })
        }
            res.send({
                location:location,
                weather:weather
            })
        })
    })
})
 




app.get('/help/*',(req,res)=>{
    res.render('notfound',{
        title:'Help Article 404',
        message:'Help article not found',
        name:'Abhi'
    })
})

app.get('*',(req,res)=>{
    res.render('notfound',{
        title:'404',
        message:'Page not found',
        name:'Abhi'
    })
})

app.listen(5000,()=>
console.log('server started'))
