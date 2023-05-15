/*
This file is part of Custom Shortcuts for Google Earth Web.

Custom Shortcuts for Google Earth Web is free software: you can redistribute it
and/or modify it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or (at your option)
any later version.

Custom Shortcuts for Google Earth Web is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Custom Shortcuts
for Google Earth Web. If not, see <https://www.gnu.org/licenses/>.
*/

// ########################
// ### Global variables ###
// ########################

// Non-native shortcuts
var svkeys = ["d", "e"]; // shortcuts for street view
var randomkeys = ["b"]; // shortcuts for random location aka I'm Feeling Lucky
var voyagerkeys = ["5"]; // shortcut for voyager (mapping this to "v" by default might be more intuitive but i never use this feature so i want measure to be more accessible (see measurekey below))
var gridlinesKeys = ["q"]; // shortcuts to toggle gridlines
var closekeys = ["g"]; // shortcuts to close pop ups

// Native shortcuts
var northKeys = ["r"];
var measureKeys = ["v"];
var searchKeys = ["s"];
var mapStyleKeys = ["w"];
var projectsKeys = ["p"];
var settingsKeys = ["t"];
var topDownKeys = ["u"];
var resetViewKeys = ["f"];
var focusKeys = ["l"];

// Native shortcut registration status indicators
var north_success = false;
var toolbar_success = false;
var menu_success = false;
var earthView_success = false;

// Modifier key pressed conditions
var ctrlDown = false;
var shiftDown = false;
var altDown = false;

// ##########################################
// ### Functions for non-native shortcuts ###
// ##########################################

function toggleStreetView(){
    const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
    const sv = app.getElementById("street-view").shadowRoot;
    const svbutton = sv.getElementById("pegman-icon");
    svbutton.click();
}

function randomLocation(){
    const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
    const toolbar = app.getElementById("toolbar").shadowRoot;
    const randombutton = toolbar.getElementById("random-icon");
    randombutton.click();
}

function openVoyager(){
    const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
    const toolbar = app.getElementById("toolbar").shadowRoot;
    const voyagerbutton = toolbar.getElementById("feed");
    voyagerbutton.click();
}

function toggleGridlines(){
    const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
    const drawer = app.getElementById("drawer-container").shadowRoot;
    const mapstyle = drawer.getElementById("mapstyle").shadowRoot;
    const gridbutton = mapstyle.getElementById("gridlines-toggle").shadowRoot;
    const griddiv = gridbutton.getElementById("toggleButton");
    griddiv.click();
}

function closeInfoWindows(){
    const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
    const card = app.getElementById("knowledge-card").shadowRoot;
    const topcard = card.getElementById("top-card").shadowRoot;
    const closebutton = topcard.getElementById("close");
    closebutton.click();
}

// #######################################################################
// ### Functions for native shortcuts (for multiple shortcuts support) ###
// #######################################################################

function toggleNorth(){
    const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
    const compass = app.getElementById("compass").shadowRoot;
    const compassButton = compass.getElementById("compass-icon");
    compassButton.click();
}

function toggleMeasure(){
    const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
    const toolbar = app.getElementById("toolbar").shadowRoot;
    const measureButton = toolbar.getElementById("measure");
    measureButton.click();
}

function toggleSearch(){
    const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
    const toolbar = app.getElementById("toolbar").shadowRoot;
    const searchButton = toolbar.getElementById("search");
    searchButton.click();
}

function toggleMapStyle(){
    const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
    const toolbar = app.getElementById("toolbar").shadowRoot;
    const mapStyleButton = toolbar.getElementById("map-style");
    mapStyleButton.click();
}

function toggleProjects(){
    const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
    const toolbar = app.getElementById("toolbar").shadowRoot;
    const projectsButton = toolbar.getElementById("projects");
    projectsButton.click();
}

function openSettings(){
    const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
    const menu = app.getElementById("menu").shadowRoot;
    const settingsButton = menu.getElementById("settings-button");
    settingsButton.click();
}

// ####################################
// ### Execute non-native shortcuts ###
// ####################################

function checkAndRun(e, keyList, starti, callback){
    for (let i=starti; i<keyList.length; i++){
        const shortcutKeys = keyList[i].split("+");
        if (shortcutKeys.length > 1){
            // Combination
            if (shortcutKeys.indexOf("ctrl") >= 0) {
                // Combination contains ctrl
                if (!ctrlDown) {
                    break; // failed to complete combination
                }
            }
            // Reaching here means that the program did not break in the previous line
            if (shortcutKeys.indexOf("shift") >= 0) {
                // Combination contains shift
                if (!shiftDown) {
                    break; // failed to complete combination
                }
            }
            // Last step to check for alt
            if (shortcutKeys.indexOf("alt") >= 0) {
                if (!altDown) {
                    break;
                }
            }
            // Reaching here means all combinatorial modifiers are being pressed
            // all that is left is to check for the letter press
            if (shortcutKeys.indexOf(e.code.toLowerCase().slice(-1)) >= 0) {
                // Success
                callback();
                return;
            }
        } else {
            // Single key
            if (shortcutKeys[0].indexOf(e.key.toLowerCase()) >= 0){
                callback();
                return;
            }
        }

    }
}

// Update modifier key down statuses
document.onkeyup = function(e) {
    if (e.code == "ControlLeft" || e.code == "ControlRight") {
        ctrlDown = false;
    }else if (e.code == "ShiftLeft" || e.code == "ShiftRight") {
        shiftDown = false;
    }else if (e.code == "AltLeft" || e.code == "AltRight") {
        altDown = false;
    }
}

document.onkeydown = function(e){
    // update modifier key down statuses
    if (e.code == "ControlLeft" || e.code == "ControlRight") {
        ctrlDown = true;
    }else if (e.code == "ShiftLeft" || e.code == "ShiftRight") {
        shiftDown = true;
    }else if (e.code == "AltLeft" || e.code == "AltRight") {
        altDown = true;
    }

    // ### Non native shortcuts ###

    // Toggle streetview
    checkAndRun(e, svkeys, 0, toggleStreetView);
    
    // Random location
    checkAndRun(e, randomkeys, 0, randomLocation);

    // Open voyager
    checkAndRun(e, voyagerkeys, 0, openVoyager);

    // Toggle gridlines
    checkAndRun(e, gridlinesKeys, 0, toggleGridlines);
    
    // Close information windows
    checkAndRun(e, closekeys, 0, closeInfoWindows);

    // ### Native shortcuts (multiple shortcuts support) ###

    // Toggle north
    checkAndRun(e, northKeys, 1, toggleNorth);

    // Toggle measure
    checkAndRun(e, measureKeys, 1, toggleMeasure);

    // Toggle search
    checkAndRun(e, searchKeys, 1, toggleSearch);

    // Toggle map style selector
    checkAndRun(e, mapStyleKeys, 1, toggleMapStyle);

    // Toggle projects menu
    checkAndRun(e, projectsKeys, 1, toggleProjects);

    // Open settings
    checkAndRun(e, settingsKeys, 1, openSettings);
    
}

// ############################################
// ### Retrieve saved user data from Google ###
// ############################################

async function getKeyValuesAndCallRegister(){
    return new Promise((resolve, reject)=>{
        try{
            chrome.storage.local.get([
                "northkey",
                "svkeys",
                "measurekey",
                "searchkey",
                "randomkeys",
                "mapstylekey",
                "voyagerkeys",
                "projectskey",
                "settingskey",
                "topdownkey",
                "resetviewkey",
                "gridlinesKeys",
                "closeWindowsKeys"],
                function(value){
                    if (value["northkey"] != undefined){
                        northKeys = value["northkey"].split(",");
                    }

                    if (value["svkeys"] != undefined){
                        svkeys = value["svkeys"].split(",");
                    }

                    if (value["measurekey"] != undefined){
                        measureKeys = value["measurekey"].split(",");
                    }

                    if (value["searchkey"] != undefined){
                        searchKeys = value["searchkey"].split(",");
                    }

                    if (value["randomkeys"] != undefined){
                        randomkeys = value["randomkeys"].split(",");
                    }

                    if (value["mapstylekey"] != undefined){
                        mapStyleKeys = value["mapstylekey"].split(",");
                    }

                    if (value["voyagerkeys"] != undefined){
                        voyagerkeys = value["voyagerkeys"].split(",");
                    }

                    if (value["projectskey"] != undefined){
                        projectsKeys = value["projectskey"].split(",");
                    }

                    if (value["settingskey"] != undefined){
                        settingsKeys = value["settingskey"].split(",");
                    }

                    if (value["topdownkey"] != undefined){
                        topDownKeys = value["topdownkey"].split(",");
                    }

                    if (value["resetviewkey"] != undefined){
                        resetViewKeys = value["resetviewkey"].split(",");
                    }

                    if (value["gridlinesKeys"] != undefined){
                        gridlinesKeys = value["gridlinesKeys"].split(",");
                    }

                    if (value["closeWindowsKeys"] != undefined){
                        closekeys = value["closeWindowsKeys"].split(",");
                    }

                    if (value["focusKeys"] != undefined){
                        focusKeys = value["focusKeys"].split(",");
                    }

                    registerNativeShortcuts();
                });
        }catch(exc){}
    });
}

// #################################
// ### Register native shortcuts ###
// #################################

// Call each sub category
function registerNativeShortcuts(){
    if (!north_success){
        registerNavKeys();
    }
    if (!toolbar_success){
        registerToolbarShortcuts();
    }
    if (!menu_success){
        registerMenuShortcuts();
    }
    if (!earthView_success) {
        registerEarthViewShortcuts();
    }
}

// Navigation menu shortcuts
function registerNavKeys(){
    try{
        const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
        const compass = app.getElementById("compass").shadowRoot;
        for (let i=0; i<compass.childNodes.length; i++){
            if (compass.childNodes[i].tagName.toLowerCase() == "earth-kb-shortcut"){
                switch (compass.childNodes[i].getAttribute("keys").toLowerCase()){
                    case "n":
                        //compass.childNodes[i].setAttribute("keys", northkey);
                        compass.childNodes[i].setAttribute("keys", northKeys[0]);
                        break;
                    case "u":
                        compass.childNodes[i].setAttribute("keys", topDownKeys[0]);
                        break;
                    case "r":
                        compass.childNodes[i].setAttribute("keys", resetViewKeys[0]);
                        break;
                }
            }
        }
        north_success = true;
        console.log("Navigation keys register successful");
    }catch(exc){
        console.log("Trying to register navigation keys again in 1 second...");
        setTimeout(registerNavKeys, 1000);
    }
}

// Toolbar shortcuts
function registerToolbarShortcuts(){
    try{
        const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
        const toolbar = app.getElementById("toolbar").shadowRoot;
        for (let i=0; i<toolbar.childNodes.length; i++){
            if (toolbar.childNodes[i].tagName.toLowerCase() == "earth-kb-shortcut"){
                switch (toolbar.childNodes[i].getAttribute("keys").toLowerCase()){
                    case "/":
                        toolbar.childNodes[i].setAttribute("keys", searchKeys[0]);
                        break;
                    case "p":
                        toolbar.childNodes[i].setAttribute("keys", projectsKeys[0]);
                        break;
                    case "m":
                        toolbar.childNodes[i].setAttribute("keys", mapStyleKeys[0]);
                        break;
                    case "shift+m":
                        toolbar.childNodes[i].setAttribute("keys", measureKeys[0]);
                        break;
                }
            }
        }
        toolbar_success = true;
        console.log("Toolbar keys register successful");
    }catch(exc){
        console.log("Trying to register toolbar keys again in 1 second...");
        setTimeout(registerToolbarShortcuts, 1000);
    }
}

// Menu shortcuts
function registerMenuShortcuts(){
    try{
        const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
        const menu = app.getElementById("menu").shadowRoot;
        for (let i=0; i<menu.childNodes.length; i++){
            if (menu.childNodes[i].tagName.toLowerCase() == "earth-kb-shortcut"){
                switch (menu.childNodes[i].getAttribute("keys").toLowerCase()){
                    case ",":
                        menu.childNodes[i].setAttribute("keys", settingsKeys[0]);
                        break;
                }
            }
        }
        menu_success = true;
        console.log("Menu keys register successful");
    }catch(exc){
        console.log("Trying to register menu keys again in 1 second...");
        setTimeout(registerMenuShortcuts, 1000);
    }
}

// Earth view shortcuts
function registerEarthViewShortcuts(){
    try{
        const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
        const earthView = app.getElementById("earth-view").shadowRoot;
        for (let i=0; i<earthView.childNodes.length; i++){
            if (earthView.childNodes[i].tagName.toLowerCase() == "earth-kb-shortcut"){
                switch (earthView.childNodes[i].getAttribute("keys").toLowerCase()){
                    case "g":
                        earthView.childNodes[i].setAttribute("keys", focusKeys[0]);
                        break;
                }
            }
        }
        earthView_success = true;
        console.log("Earth keys register successful");
    }catch(exc){
        console.log("Trying to register Earth view keys again in 1 second...");
        setTimeout(registerEarthViewShortcuts, 1000);
    }
}

// ########################################################
// ### Call get user data and register native shortcuts ###
// ########################################################

getKeyValuesAndCallRegister();