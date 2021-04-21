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



