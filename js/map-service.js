'use strict'

function removeLocation(LocationId) {
    var locationIdx = gLocation.findIndex(function(location) {
        return LocationId === location.id
    })
    gLocation.splice(locationIdx, 1)
    _saveLocationsToStorage()
    renderLocations()
}