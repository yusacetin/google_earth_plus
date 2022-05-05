const northkey = "f"; // shortcut for top-north view
const svkey = "d"; // shortcut for street view

document.onkeyup = function(e){
    if (e.key.toLowerCase() == svkey){
        const app = document.getElementsByTagName("earth-app")[0];
        const appShadowRoot = app.shadowRoot;
        const sv = appShadowRoot.getElementById("street-view");
        const svShadowRoot = sv.shadowRoot;
        const svbutton = svShadowRoot.getElementById("pegman-icon");
        svbutton.click();
    }
}

function addF(){
    const app = document.getElementsByTagName("earth-app")[0];
    const appShadowRoot = app.shadowRoot;
    const compass = appShadowRoot.getElementById("compass");
    const compassSR = compass.shadowRoot;
    // getElementsByTagName doesn't work so we iterate over the children to check
    for (let i=0; i<compassSR.childNodes.length; i++){
        if (compassSR.childNodes[i].tagName.toLowerCase() == "earth-kb-shortcut"){
            if (compassSR.childNodes[i].getAttribute("keys").toLowerCase() == "n"){
                compassSR.childNodes[i].setAttribute("keys", northkey);
                break;
            }
        }
    }
}

addF();