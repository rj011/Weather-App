
const express = require("express");
const res = require("express/lib/response");
const { json } = require("express/lib/response");
const app=express();
app.set('view engine', 'ejs');
const bodyParser = require("body-parser");
const https = require("https");
var weatherData;
var temp;
var icon;
var imgUrl;
var query;
var weathertype;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.get("/",function(req,res)
{    
      res.sendFile(__dirname + "/index.html") ;
      
});

app.post("/",function(req,res){

     query = req.body.cityName;
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=911d303f87d63272fc5f9892797049a6";
    https.get(url, function(response)
{
      console.log(response.statusCode);
      response.on("data",function(data)
      {
          weatherData = JSON.parse(data);
          temp=weatherData.main.temp;
          icon = weatherData.weather[0].icon;
          weathertype = weatherData.weather[0].description;
          main=weatherData.weather[0].main;
          imgUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
        //  res.write("<h1>The temperature in "+ query+ " is "+ temp +" degree celcius</h1>");
        //  res.write("<h2>The weather is currently "+ weatherData.weather[0].description + "</h2>");
        //  res.write("<img src="+ imgUrl +">");
         //const tempreport = "The temperature in "+ query+ " is "+ temp +" degree celcius"
         
         res.render("report", {nameOfPlace: query, tempOfPlace: temp, type: weathertype, main: icon});
         
               
      })
});
}
);

app.post("/report",function(req,res)
{
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, function(req,res)
{
    console.log("Server started");
});


 
