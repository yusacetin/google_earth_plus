// shortcuts that simulate clicks
const svkeys = ["d", "e"]; // shortcuts for street view
const randomkeys = ["q"]; // shortcuts for random location aka I'm Feeling Lucky
const voyagerkeys = ["g"]; // shortcut for voyager (mapping this to "v" by default might be more intuitive but i never use this feature so i want measure to be more accessible (see measurekey below))

// shortcuts that modify existing shortcuts
// i don't know if these can be assigned to multiple keys with this method
const northkey = "f"; // shortcut for top-north view
const measurekey = "v"; // shortcut for distance measurement
const searchkey = "s"; // shortcut for search
const mapstylekey = "w"; // shortcut for map style
const projectskey = "p"; // shortcut for projects (i never use it so i don't want it to occupy valuable space)
const settingskey = "t"; // shortcut for settings

// if the modified shortcuts don't work automatically, press this once
// when the page loads to register them again
const fixkey = "z";

var north_success = false;
var toolbar_success = false;
var menu_success = false;

document.onkeydown = function(e){
    if (window.location.href.indexOf("search") >= 0){
        return;
    }

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

    else if(e.key.toLowerCase() == fixkey){
        registerModifiedShortcuts();
    }
}

function registerModifiedShortcuts(){
    if (!north_success){
        registerNorthKey();
    }
    if (!toolbar_success){
        registerToolbarShortcuts();
    }
    if (!menu_success){
        registerMenuShortcuts();
    }
}

function registerNorthKey(){
    try{
        const app = document.getElementsByTagName("earth-app")[0].shadowRoot;
        const compass = app.getElementById("compass").shadowRoot;
        // getElementsByTagName doesn't work so we iterate over the children to check
        for (let i=0; i<compass.childNodes.length; i++){
            if (compass.childNodes[i].tagName.toLowerCase() == "earth-kb-shortcut"){
                if (compass.childNodes[i].getAttribute("keys").toLowerCase() == "n"){
                    compass.childNodes[i].setAttribute("keys", northkey);
                    break;
                }
            }
        }
        north_success = true;
        console.log("North key register successful");
    }catch(exc){
        console.log("trying again in 1 second");
        setTimeout(registerNorthKey, 1000);
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
        console.log("Toolbar register successful");
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
        console.log("Menu register successful");
    }catch(exc){
        console.log("trying again in 1 second");
        setTimeout(registerMenuShortcuts, 1000);
    }
}

registerModifiedShortcuts();