// end point
// url https://google.com / https://facebook.com/
// https://www.facebook.com/groups/254500784901873
// baseURL === 'facebook.com'
const weekDays = ["Sunday", "Monday", "Tueday", "Wedensday", "Thursday", "Friday", "Saturday"]
function getDayName(date) {
  return weekDays[new Date(date).getDay()];
}
function getMonthFormula(date) {
  return new Date(date).toString().slice(4, 10).split(" ").reverse().join(" ");
}

var searchInputElement = document.getElementById("search");
var searchButtonElement = document.getElementById("search-button");
var resultDiv = document.getElementById("result");

searchInputElement.addEventListener("keyup", (e) => {
  if (e.code == "Enter") {
    search(e.target.value);
  }
});

searchButtonElement.addEventListener("click", (e) => {
  e.preventDefault();
  let cityName = searchInputElement.value;
  search(cityName);
});

async function getCityData(cityName, days = 3) {
  var result = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7b703b9fdc184193a12231137221006&q=${cityName}&aqi=no&days=${days}`
  );
  return await result.json();
}

async function search(cityName) {

  var cityData = await getCityData(cityName);


  resultDiv.innerHTML = `
      ${buildMainDayHTML(cityData)}

      ${buildSubDayHTML(cityData, 1)}

      ${buildSubDayHTML(cityData, 2)}
  `;

}


function buildMainDayHTML(data) {
  const currentHour = new Date().getHours();
  const hourData = data.forecast.forecastday[0].hour[currentHour];

  return `
  <div class="titel">
    <div class="todaynaw">
      <div class="today">${getDayName(data.forecast.forecastday[0].date)}</div>

      <div class="dat">${getMonthFormula(data.forecast.forecastday[0].date)}</div>
      <div class="cler"></div>
    </div>
    <div class="num1 fw-bolder" id="creat">
      <div class="location fa-2x">
        ${data.location.name}
      </div>
      <div class="dgree fw-bolder">
        <div class="num fw-bolder fa-4x">
          ${hourData.temp_c}
          <sup>o</sup>
          c
          <div class="forecast-icon">
            <img src="https:${hourData.condition.icon}" alt="" width="90" />
          </div>
        </div>
        <div class="comment mb-3 " style="color: #009ad8">
          ${hourData.condition.text}
        </div>
      </div>
    </div>
  </div>
  `;
}


function buildSubDayHTML(data, dayIndex) {
  const currentHour = new Date().getHours();
  const hourData = data.forecast.forecastday[dayIndex].hour[currentHour];

  return `
    <div class="titel">
      <div class="todaynaw ">
        <div class="today2">${getDayName(data.forecast.forecastday[dayIndex].date)}</div>
      </div>
      <div class="num1 fw-bolder" id="creat">
        <div class="forecast-icon text-center fa-4x">
          <img src="https:${hourData.condition.icon}" alt="" width="80" />
        </div>
        <div class="dgree fw-bolder fa-2x">
          <div class="num fw-bolder text-center">
            ${data.forecast.forecastday[dayIndex].day.maxtemp_c}
            <sup>o</sup>
            c
          </div>
        </div>
        <div class=" text-center ">
          <small>${data.forecast.forecastday[dayIndex].day.mintemp_c}<sup>o</sup></small>
        </div>
        <div class="day2 text-center mt-5 mb-5" style="color: #009ad8">
          ${data.forecast.forecastday[dayIndex].day.condition.text}
        </div>
      </div>

    </div>
  `;
}