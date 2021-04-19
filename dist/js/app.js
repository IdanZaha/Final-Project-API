const mapBoxToken="pk.eyJ1IjoiaWRhbnphaGEiLCJhIjoiY2tucDBpbTdkMWFsdzJ2cGVramh3cGJ4MCJ9.oewmkBX2H-FTDOusd-Y1Yg",origin=document.querySelector(".origin-form"),origins=document.querySelector(".origins"),destinations=document.querySelector(".destinations"),busCont=document.querySelector(".bus-container");destinations.innerHTML="",origins.innerHTML="",busCont.innerHTML="";async function inputLocations(){const o=await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/types?access_token=${mapBoxToken}`);await o.json();console.log(o)}origin.onsubmit=o=>{o.preventDefault(),""!==origin?origins.insertAdjacentHTML("afterbegin",`     
  <li data-long="-97.113936" data-lat="49.823059">
  <div class="name">WORKS</div>
  <div> 1588 St. Mary's Road</div>
</li>`):console.log("works")};