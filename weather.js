const apiKey = "2af249d29c60a8f3211a40b00b121d40";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchBtn = document.querySelector(".btn");
const waetherImg = document.querySelector(".cloud-image");
const welcome=document.querySelector(".welcome");
const mainDiv=document.querySelector(".main");


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    if(response.status==404 || city==""){
        mainDiv.style.display="none";
        welcome.style.display="flex";
        document.body.style.background=' url(images/beautiful-natural-clouds-sky.jpg)'
        document.querySelector(".SearchCity-text").innerHTML="INVALID CITY NAME !!";
        document.querySelector(".SearchCity-text").style.color="red";
        document.querySelector(".SearchCity-text").style.background="white";
    }
    else{
    mainDiv.style.display="block";
    welcome.style.display="none";
    document.body.style.background='linear-gradient(90deg,#06daa1,#5b548a)'
    
    let cloudElement;
    data.weather.map((elements) => {
        cloudElement = elements.main;
    });
    console.log(cloudElement)
    if (cloudElement == "Clouds") {
        waetherImg.src = "images/clouds.png";
    } else if (cloudElement == "Clear") {
        waetherImg.src = "images/clear.png";
    } else if (cloudElement == "Drizzle") {
        waetherImg.src = "images/drizzle.png";
    } else if (cloudElement == "Mist") {
        waetherImg.src = "images/mist.png";
    } else if (cloudElement == "Snow") {
        waetherImg.src = "images/snow.png";
    } else if (cloudElement == "Rain") {
        waetherImg.src = "images/rain.png";
    }

    document.querySelector(".degree").innerHTML = (Math.round(data.main.temp) + "°C");
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity-percent").innerHTML = (data.main.humidity + "%");
    document.querySelector(".speed").innerHTML = (data.wind.speed + "km/hr");
    }
}
searchBtn.addEventListener("click", (e) => {
    
    checkWeather(searchbox.value);
})
