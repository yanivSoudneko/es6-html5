'use strict'

function createColors() {
    var colors = loadFromStorage(USER_DATE)
    if (!colors)
        return colors = gColors
    _saveColorsToStorage()
}

function _saveColorsToStorage() {
    saveToStorage(USER_DATE, gUserData)
}

function onSetUserPref(ev) {
    ev.preventDefault();
    var color = document.getElementById('color').value
    var textColor = document.getElementById('textColor').value
    var date = document.getElementById('dob').value
    var time = document.getElementById('time').value
    var userData = { color, textColor, date, time }
    gUserData = userData
    _saveColorsToStorage()
}

function showAge(newVal) {
    document.getElementById("sAge").innerHTML = newVal;
}