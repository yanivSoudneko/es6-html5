'use strict'

const USER_DATE = 'colors'
var gColors;
var gUserData;

function init() {
    createColors()
}

function updateFirst() {
    var color = document.getElementById('color').value
    var textColor = document.getElementById('textColor').value
    var colors = { color, textColor }
    document.body.style.backgroundColor = color
    document.body.style.color = textColor
    gColors = colors
    _saveColorsToStorage()
}