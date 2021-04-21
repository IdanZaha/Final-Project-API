let mapURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
let busURL =  "https://api.winnipegtransit.com/v3/trip-planner.json?api-key=";
let transitKey = "GtccxA20vtH5vxIYeR36&";
let mapKey = "access_token=pk.eyJ1IjoiaWRhbnphaGEiLCJhIjoiY2tucDBpbTdkMWFsdzJ2cGVramh3cGJ4MCJ9.oewmkBX2H-FTDOusd-Y1Yg";


const orgForm = document.querySelector('.origin-form');
const orgDiv = document.querySelector('.origins');
const orgInp = document.querySelector('.origin-form input');
const desForm = document.querySelector('.destination-form');
const desDiv = document.querySelector('.destinations');
const desInp = document.querySelector('.destination-form input');
const butt = document.querySelector('button');
const tripSec = document.querySelector('.my-trip');
const selDiv = document.getElementsByClassName("selected");



function timeFunc(t) {
  t = t.split("T").join(" ");
  return new Date(t);
}

async function displayTrip(x) {
  if (x != null) {
    tripSec.innerHTML = `<li><span class="material-icons">exit_to_app</span> Depart at ${timeFunc(x.times.start)}</li>`;

    x.segments.forEach(function (y) {
      let start = timeFunc(y.times.start);
      let end = timeFunc(y.times.end);
      let diff = Math.abs(end.getMinutes() - start.getMinutes());
      
      let icon = y.type;
      let text;

      if (y.type === "ride") {
        icon = "directions_bus";
        text = `Ride the ${y.route.key} for ${diff} minutes `
      }
      if (y.type === "walk") {
        icon = "directions_walk";
        if ("stop" in y.to) {
          text = `Walk for ${diff} minutes to stop #${y.to.stop.key} - ${y.to.stop.name}`
        } else {
          text = `Walk for ${diff} minutes to your destination, arriving at ${end}`;
        }
      }
      if (y.type === "transfer") {
        icon = "transfer_within_a_station";
        text = `Transfer from stop #${y.from.stop.key} - ${y.from.stop.name} to stop #${y.to.stop.key} - ${y.to.stop.name}`
      }

      tripSec.insertAdjacentHTML("beforeend", `<li><span class="material-icons">${icon}</span> ${text}</li>`);
    });
  }
}

async function getStreets(a) {
  let info = await fetch(`${mapURL}${a}.json?${mapKey}&bbox=-97.325875,49.766204,-96.953987,49.99275&limit=10`)
  info = await info.json();
  return info;
}

async function findRoute(longA, longB, latA, latB) {
  let info = await fetch(`${busURL + transitKey}origin=geo/${latA},${longA}&destination=geo/${latB},${longB}`);
  info = await info.json();
  let list = info.plans.sort((x, y) => {
    x = timeFunc(x.times.end);
    y = timeFunc(y.times.end);
    return x.getTime() < y.getTime()
  })
  displayTrip(info.plans[0]);
}

function submitFunc() {
desForm.onsubmit = async (e) => {
  e.preventDefault();
  if (desInp.value.length > 0) {
    desDiv.innerHTML = "";
    let info = await getStreets(desInp.value);
    info.features.forEach((item) => {
      item.place_name = item.place_name.split(",");
      desDiv.insertAdjacentHTML(`afterbegin`,`<li data-long="${item.center[0]}" data-lat="${item.center[1]}">
          <div class= "name" > ${item.place_name[0]}</div>
          <div>${item.place_name[1]}</div>
        </li >`);
    })
    desInp.value = "";
  }
}

orgForm.onsubmit = async (e) => {
  e.preventDefault();
  if (orgInp.value.length > 0) {
    orgDiv.innerHTML = "";
    let info = await getStreets(orgInp.value);
    info.features.forEach((item) => {
      item.place_name = item.place_name.split(",");
      orgDiv.insertAdjacentHTML(`afterbegin`,`<li data-long="${item.center[0]}" data-lat="${item.center[1]}">
          <div class="name"> ${item.place_name[0]}</div>
          <div>${item.place_name[1]}</div>
        </li >`);
    })
    orgInp.value = "";
    }
  }
}

function clickFunc() {
desDiv.onclick = (e) => {
  let x = e.target.closest("li");
  if (x) {
    x.classList.add("selected");
  }
}

orgDiv.onclick = (e) => {
  let x = e.target.closest("li");
  if (x) {
    x.classList.add("selected");
  }
 }

 butt.onclick = () => {
  findRoute(selDiv[0].dataset.long, selDiv[1].dataset.long, selDiv[0].dataset.lat, selDiv[1].dataset.lat);
  }
}



submitFunc();
clickFunc();
