import express from 'express';
import path from 'path';
import hbs from 'hbs';
import { forecast } from './utils/forecast.js'
import { geocode } from './utils/geocode.js';

const app = express();
const port = process.env.PORT || 3000

const publicDirectoryPath=path.join(import.meta.dirname,'../public')
const viewsPath = path.join(import.meta.dirname,'../templates/views')
const partialsPath = path.join(import.meta.dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Author',
        name:'Harshvardhan',
        des:'He is a great author'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        description:'you can get the help here',
        name:'Harshvardhan'
    })
})

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Harsh',
        weather:'The weather is nice today'
    })
})

app.get('/weather',(req,res)=>{
    console.log(req.query)
    if(!req.query.search){
        return res.send({
            error:'You need to provide a address'
        })
    }
    geocode(req.query.search, (error, {lat,long}={}) => {
        if (error) {
            return res.send({
                error:"Try adding any other loaction."
            });
        }
    
        forecast(lat,long, (error, forecastdata) => {
            if (error!=undefined) {
                return res.send(error);
            }
            res.send(forecastdata);
        });
    });
})

app.get('/help/*splat',(req,res)=>{
    res.render('404',{
        name:'Harshvardhan',
        title:'404',
        errormessage:'Help article is not found!'
    })
})

app.get('/*splat',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Harshvardhan',
        errormessage:'The page is not found'
    })
})

app.listen(port,()=>{
    console.log('Sever is up on port '+port)
})
