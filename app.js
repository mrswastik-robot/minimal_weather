const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const { json } = require("body-parser");
const { info } = require("console");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
    res.render("home");
});

app.get("/about", function(req, res){
    res.render("about");
});

var cityName;   //a global variable
let infos = [];  //iss array me jsobject push crow aur weather.ejs me print krte jao

app.get("/weather", function(req, res){

    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    const options = {
        weekday : "long",
        day : "numeric",                        
        month :"long"
    }
    
    var day = today.toLocaleDateString("en-US", options);



    res.render("weather", {days: day, times: time, cities: cityName, infos: infos});
});




app.post("/", function(request, respond){

    var city = request.body.cityname;
    cityName = city;
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q= "+ city + "&appid=0d2756831c1837c39c8291dafda623cc&units=metric#";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on('data', function(data){

            weatherDATA = JSON.parse(data);
            let icon;

            const info = {
             temp : weatherDATA.main.temp,
             county : weatherDATA.sys.country,
             description : weatherDATA.weather[0].description,
             icon : weatherDATA.weather[0].icon,
             iconURL : "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            }

            console.log(info.county);
            infos.push(info);
            

        })




    });

    
    console.log(info.county);
    respond.redirect("/weather");

});    

















app.listen(process.env.PORT || 5000, function(){
    console.log("Weather Brodcast started on Port : 5000");
});