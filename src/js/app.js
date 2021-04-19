const mapBoxToken = "pk.eyJ1IjoiaWRhbnphaGEiLCJhIjoiY2tucDBpbTdkMWFsdzJ2cGVramh3cGJ4MCJ9.oewmkBX2H-FTDOusd-Y1Yg";
const origin = document.querySelector('.origin-form');
const origins = document.querySelector('.origins');
const destinations = document.querySelector('.destinations');
const busCont = document.querySelector('.bus-container');

destinations.innerHTML = "";
origins.innerHTML = "";
busCont.innerHTML = "";

async function inputLocations() {
  const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/types?access_token=${mapBoxToken}`);
  const originJSON = await response.json();

  console.log(response);
}


origin.onsubmit = e => {
  e.preventDefault();
  if(origin !== "") {
  origins.insertAdjacentHTML('afterbegin', `     
  <li data-long="-97.113936" data-lat="49.823059">
  <div class="name">WORKS</div>
  <div> 1588 St. Mary's Road</div>
</li>`)
  } else {
    console.log("works");
  }
}



