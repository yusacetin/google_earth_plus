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

// shortcuts that simulate clicks
var svkeys = ["d", "e"]; // shortcuts for street view
var randomkeys = ["q"]; // shortcuts for random location aka I'm Feeling Lucky
var voyagerkeys = ["g"]; // shortcut for voyager (mapping this to "v" by default might be more intuitive but i never use this feature so i want measure to be more accessible (see measurekey below))

// shortcuts that modify existing shortcuts
// i don't know if these can be assigned to multiple keys with this method
var northkey = "f"; // shortcut for top-north view
var measurekey = "v"; // shortcut for distance measurement
var searchkey = "s"; // shortcut for search
var mapstylekey = "w"; // shortcut for map style
var projectskey = "p"; // shortcut for projects (i never use it so i don't want it to occupy valuable space)
var settingskey = "t"; // shortcut for settings
var topdownkey = "u"; //shortcut for top-down view, default
var resetviewkey = "r"; //shortcut for reset view, default

var north_success = false;
var toolbar_success = false;
var menu_success = false;

document.onkeydown = function(e){
    if (svkeys.indexOf(e.key.toLowerCase()) >= 0){
        const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
        const sv = app.getElementById("street-view").shadowRoot;
        const svbutton = sv.getElementById("pegman-icon");
        svbutton.click();
        return;
    }

    else if (randomkeys.indexOf(e.key.toLowerCase()) >= 0){
        const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
        const toolbar = app.getElementById("toolbar").shadowRoot;
        const randombutton = toolbar.getElementById("random-icon");
        randombutton.click();
        return;
    }

    else if (voyagerkeys.indexOf(e.key.toLowerCase()) >= 0){
        const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
        const toolbar = app.getElementById("toolbar").shadowRoot;
        const voyagerbutton = toolbar.getElementById("feed");
        voyagerbutton.click();
        return;
    }
}

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
                "resetviewkey"],
                function(value){
                    if (value["northkey"] != undefined){
                        northkey = value["northkey"];
                    }

                    if (value["svkeys"] != undefined){
                        svkeys = value["svkeys"].split(",");
                    }

                    if (value["measurekey"] != undefined){
                        measurekey = value["measurekey"];
                    }

                    if (value["searchkey"] != undefined){
                        searchkey = value["searchkey"];
                    }

                    if (value["randomkeys"] != undefined){
                        randomkeys = value["randomkeys"].split(",");
                    }

                    if (value["mapstylekey"] != undefined){
                        mapstylekey = value["mapstylekey"];
                    }

                    if (value["voyagerkeys"] != undefined){
                        voyagerkeys = value["voyagerkeys"].split(",");
                    }

                    if (value["projectskey"] != undefined){
                        projectskey = value["projectskey"];
                    }

                    if (value["settingskey"] != undefined){
                        settingskey = value["settingskey"];
                    }

                    if (value["topdownkey"] != undefined){
                        topdownkey = value["topdownkey"];
                    }

                    if (value["resetviewkey"] != undefined){
                        resetviewkey = value["resetviewkey"];
                    }

                    registerModifiedShortcuts();
                });
        }catch(exc){}
    });
}

function registerModifiedShortcuts(){
    if (!north_success){
        registerNavKeys();
    }
    if (!toolbar_success){
        registerToolbarShortcuts();
    }
    if (!menu_success){
        registerMenuShortcuts();
    }
}

function registerNavKeys(){
    try{
        const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
        const compass = app.getElementById("compass").shadowRoot;
        for (let i=0; i<compass.childNodes.length; i++){
            if (compass.childNodes[i].tagName.toLowerCase() == "earth-kb-shortcut"){
                switch (compass.childNodes[i].getAttribute("keys").toLowerCase()){
                    case "n":
                        compass.childNodes[i].setAttribute("keys", northkey);
                        break;
                    case "u":
                        compass.childNodes[i].setAttribute("keys", topdownkey);
                        break;
                    case "r":
                        compass.childNodes[i].setAttribute("keys", resetviewkey);
                        break;
                }
            }
        }
        north_success = true;
        console.log("Navigation keys register successful");
    }catch(exc){
        console.log("trying again in 1 second");
        setTimeout(registerNavKeys, 1000);
    }
}

function registerToolbarShortcuts(){
    try{
        const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
        const toolbar = app.getElementById("toolbar").shadowRoot;
        for (let i=0; i<toolbar.childNodes.length; i++){
            if (toolbar.childNodes[i].tagName.toLowerCase() == "earth-kb-shortcut"){
                switch (toolbar.childNodes[i].getAttribute("keys").toLowerCase()){
                    case "/":
                        toolbar.childNodes[i].setAttribute("keys", searchkey);
                        break;
                    case "p":
                        toolbar.childNodes[i].setAttribute("keys", projectskey);
                        break;
                    case "m":
                        toolbar.childNodes[i].setAttribute("keys", mapstylekey);
                        break;
                    case "shift+m":
                        toolbar.childNodes[i].setAttribute("keys", measurekey);
                        break;
                }
            }
        }
        toolbar_success = true;
        console.log("Toolbar keys register successful");
    }catch(exc){
        console.log("trying again in 1 second");
        setTimeout(registerToolbarShortcuts, 1000);
    }
}

function registerMenuShortcuts(){
    try{
        const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
        const menu = app.getElementById("menu").shadowRoot;
        for (let i=0; i<menu.childNodes.length; i++){
            if (menu.childNodes[i].tagName.toLowerCase() == "earth-kb-shortcut"){
                switch (menu.childNodes[i].getAttribute("keys").toLowerCase()){
                    case ",":
                        menu.childNodes[i].setAttribute("keys", settingskey);
                        break;
                }
            }
        }
        menu_success = true;
        console.log("Menu keys register successful");
    }catch(exc){
        console.log("trying again in 1 second");
        setTimeout(registerMenuShortcuts, 1000);
    }
}

getKeyValuesAndCallRegister();