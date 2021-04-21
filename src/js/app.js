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

async function showData(x) {
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

