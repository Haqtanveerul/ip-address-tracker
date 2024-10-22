async function fetchData(ipAddress = "") {
  let apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=at_SIIQ8o0QB3B3Sb1ET5Dm0EAolHXo0`;
  if (ipAddress) {
    apiUrl += `$ipAddress=${ipAddress}`;
  }
  try {
    let response = await fetch(apiUrl); // Fetch data from the API
    let data = await response.json(); // Parse the response as JSON
    return data; // Return the parsed data
  } catch (error) {
    console.error("Error :" + error);
  }
}

// default load
window.addEventListener("DOMContentLoaded", function () {
  let ip = document.querySelector(".ip");

  fetchData().then((data) => {
    ip.innerHTML = data.ip;

    let city = data.location.city;
    let plz = data.location.postalCode;
    let country = data.location.country;

    let address = document.querySelector(".address");
    address.innerHTML = `${plz} ${city}, ${country}`;

    let timezone = data.location.timezone;
    // console.log(timezone);
    let realTimezone = document.querySelector(".real-timezone");
    // console.log(realTimezone);
    realTimezone.innerHTML = `UTC ${timezone}`;

    let isp = data.location.isp;
    let provider = document.querySelector(".provider");
    provider.innerHTML = `${isp}`;

    let latitude = data.location.lat;
    let longitude = data.location.lng;
    let map = document.querySelector("#map");
    // bounding box
    map.src = `https://www.openstreetmap.org/export/embed.html?bbox=${
      longitude - 0.05
    },${latitude - 0.05},${longitude + 0.05},${
      latitude + 0.05
    }&marker=${latitude},${longitude}`;
  });
});

document.querySelector(".search-button").addEventListener("click", function () {
  let ip = document.querySelector(".ip");
  let value = document.querySelector("#search-box").value;

  if (value === "") {
    alert("Please enter the ip address again!");
  }

  fetchData(value).then((data) => {
    ip.innerHTML = data.ip;

    let city = data.location.city;
    let plz = data.location.postalCode;
    let country = data.location.country;

    let address = document.querySelector(".address");
    address.innerHTML = `${plz} ${city}, ${country}`;

    let timezone = data.location.timezone;
    // console.log(timezone);
    let realTimezone = document.querySelector(".real-timezone");
    // console.log(realTimezone);
    realTimezone.innerHTML = `UTC ${timezone}`;

    let isp = data.location.isp;
    let provider = document.querySelector(".provider");
    provider.innerHTML = `${isp}`;

    let latitude = data.location.lat;
    let longitude = data.location.lng;
    let map = document.querySelector("#map");
    // bounding box
    map.src = `https://www.openstreetmap.org/export/embed.html?bbox=${
      longitude - 0.05
    },${latitude - 0.05},${longitude + 0.05},${
      latitude + 0.05
    }&marker=${latitude},${longitude}`;
  });
});

