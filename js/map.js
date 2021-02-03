'use strict'
var gLocation = []
const KEY = 'location'



function getCurrLocation() {
    return navigator.geolocation.getCurrentPosition()
}


function initMap({ lat = 29.55805, lng = 34.94821 }) {

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: { lat, lng },
    });
    let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to get Lat/Lng!",
        position: { lat, lng },
    });
    infoWindow.open(map);
    map.addListener("click", (mapsMouseEvent) => {
        var currCoords = {
            position: { lat: mapsMouseEvent.latLng.lat(), lng: mapsMouseEvent.latLng.lng() },
            id: makeId(),
            location: prompt('location?'),
        }
        const marker = new google.maps.Marker({
            position: currCoords.position,
            map,
            title: 'Hello World!',
            location: currCoords.location
        });
        gLocation.push(currCoords)
        map.setCenter(marker)
        _saveLocationsToStorage()
        renderLocations()
    });
}



function renderLocations() {
    var strHTML = gLocation.map(function(location) {
        return `
                            <tr><td>${location.location}</td>
                            <td>${location.position.lat}</td>
                            <td>${location.position.lng}</td>
                            <td><button onclick="removeLocation('${location.id}')">X</button></td></tr>`
    })
    document.querySelector('.body-table').innerHTML = strHTML.join('')
}



function getPosition() {
    if (!navigator.geolocation) {
        console.log("HTML5 Geolocation is not supported in your browser.");
        return;
    }
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
}





function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
            initMap(position.coords.latitude, position.coords.longitude);
        })
}




function onDelteLocation(LocationId) {
    removeLocation(LocationId)
    renderLocations()

}

function _saveLocationsToStorage() {
    saveToStorage(KEY, gLocation)
}




function showLocation(position) {
    document.getElementById("latitude").innerHTML = position.coords.latitude
    document.getElementById("longitude").innerHTML = position.coords.longitude;
    document.getElementById("accuracy").innerHTML = position.coords.accuracy;
    var date = new Date(position.timestamp);
    document.getElementById("timestamp").innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();


    initMap(position.coords.latitude, position.coords.longitude);
}




function handleLocationError(error) {
    var locationError = document.getElementById("locationError");

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location.";
            break;
    }


}