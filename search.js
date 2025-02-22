// // This example requires the Places library. Include the libraries=places
// // parameter when you first load the API. For example:
// // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
// function initMap() {
//     const map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: 40.749933, lng: -73.98633 },
//       zoom: 13,
//       mapTypeControl: false,
//     });
//     const card = document.getElementById("form");
//     const input = document.getElementById("location");
//     const biasInputElement = document.getElementById("use-location-bias");
//     const strictBoundsInputElement = document.getElementById("use-strict-bounds");
//     const options = {
//       fields: ["formatted_address", "geometry", "name"],
//       strictBounds: false,
//     };
  
//     map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
  
//     const autocomplete = new google.maps.places.Autocomplete(input, options);
  
//     // Bind the map's bounds (viewport) property to the autocomplete object,
//     // so that the autocomplete requests use the current map bounds for the
//     // bounds option in the request.
//     autocomplete.bindTo("bounds", map);
  
//     const infowindow = new google.maps.InfoWindow();
//     const infowindowContent = document.getElementById("infowindow-content");
  
//     infowindow.setContent(infowindowContent);
  
//     const marker = new google.maps.Marker({
//       map,
//       anchorPoint: new google.maps.Point(0, -29),
//     });
  
//     autocomplete.addListener("place_changed", () => {
//       infowindow.close();
//       marker.setVisible(false);
  
//       const place = autocomplete.getPlace();
  
//       if (!place.geometry || !place.geometry.location) {
//         // User entered the name of a Place that was not suggested and
//         // pressed the Enter key, or the Place Details request failed.
//         window.alert("No details available for input: '" + place.name + "'");
//         return;
//       }
  
//       // If the place has a geometry, then present it on a map.
//       if (place.geometry.viewport) {
//         map.fitBounds(place.geometry.viewport);
//       } else {
//         map.setCenter(place.geometry.location);
//         map.setZoom(17);
//       }
  
//       marker.setPosition(place.geometry.location);
//       marker.setVisible(true);
//       infowindowContent.children["place-name"].textContent = place.name;
//       infowindowContent.children["place-address"].textContent =
//         place.formatted_address;
//       infowindow.open(map, marker);
//     });
  
//     // Sets a listener on a radio button to change the filter type on Places
//     // Autocomplete.
//     function setupClickListener(id, types) {
//       const radioButton = document.getElementById(id);
  
//       radioButton.addEventListener("click", () => {
//         autocomplete.setTypes(types);
//         input.value = "";
//       });
//     }
  
//     setupClickListener("changetype-all", []);
//     setupClickListener("changetype-address", ["address"]);
//     setupClickListener("changetype-establishment", ["establishment"]);
//     setupClickListener("changetype-geocode", ["geocode"]);
//     setupClickListener("changetype-cities", ["(cities)"]);
//     setupClickListener("changetype-regions", ["(regions)"]);
//     biasInputElement.addEventListener("change", () => {
//       if (biasInputElement.checked) {
//         autocomplete.bindTo("bounds", map);
//       } else {
//         // User wants to turn off location bias, so three things need to happen:
//         // 1. Unbind from map
//         // 2. Reset the bounds to whole world
//         // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
//         autocomplete.unbind("bounds");
//         autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 });
//         strictBoundsInputElement.checked = biasInputElement.checked;
//       }
  
//       input.value = "";
//     });
//     strictBoundsInputElement.addEventListener("change", () => {
//       autocomplete.setOptions({
//         strictBounds: strictBoundsInputElement.checked,
//       });
//       if (strictBoundsInputElement.checked) {
//         biasInputElement.checked = strictBoundsInputElement.checked;
//         autocomplete.bindTo("bounds", map);
//       }
  
//       input.value = "";
//     });
//   }
  
//   window.initMap = initMap;


// ... (rest of the code remains the same) ...








function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.749933, lng: -73.98633 },
      zoom: 13,
      mapTypeControl: false,
      
    });
    
  
    
    
    const input = document.getElementById("location");
    
    
    const options = {
      fields: ["formatted_address", "geometry", "name"],
    };
    options.fields[2]
  
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    
    
  
    const infowindow = new google.maps.InfoWindow();
    
    

     const marker = new google.maps.Marker({
       map,
       anchorPoint: new google.maps.Point(0, -29),
     });
    autocomplete.addListener("place_changed", () => {


      // ... (rest of the place_changed event handling from the previous response) ...
      infowindow.close();
      marker.setVisible(false);
  
      const place = autocomplete.getPlace();

      
      
  
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
  
      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
  
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
    //   infowindowContent.children["place-name"].textContent = place.name;
    //   infowindowContent.children["place-address"].textContent =
    //     place.formatted_address;
      infowindow.open(map, marker);

      const datalist = document.getElementById('suggestions');
    // datalist.addEventListener('click', (event) => {
    // if (event.target.tagName === 'OPTION') {
    //     const selectedPlace = event.target.value;
    //     input.value = selectedPlace; // Set the selected place as the input value

    //     // Trigger the fetch function in index.js
    //     const fetchEvent = new Event('fetchLocation', {
    //         details : {
    //             city: place.name,
    //             address: place.formatted_address,
    //             addressSelected : selectedPlace
    //         }

    //     }); 
    //     window.dispatchEvent(fetchEvent);
        
    //     // console.log(window.dispatchEvent(fetchEvent));
        
    // }
    // });
    });
  
    function handleUserInput(inputValue) {
      const service = new google.maps.places.PlacesService(map);
      const request = {
        input: inputValue,
        type: ["geocode"], // Search for locations
      };
  
      service.autocomplete(request, (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const suggestionsList = document.getElementById("suggestions");
          suggestionsList.innerHTML = ""; 
  
          for (const prediction of predictions) {
            const option = document.createElement("option");
            option.value = prediction.description; 
            suggestionsList.appendChild(option);
          }
        }
      });
    }
  
    // input.addEventListener("input", () => {
    //   const inputValue = input.value;
    //   if (inputValue.length > 0) {
    //     handleUserInput(inputValue);
    //   } else {
    //     document.getElementById("suggestions").innerHTML = "";
    //   }
    // });
  }
  
  window.initMap = initMap;