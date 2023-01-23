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

function savekeys(){
    const northkeyValue = document.getElementById("northkey").value.toLowerCase();
    const svkeyValue = document.getElementById("svkeys").value.toLowerCase();
    const measurekeyValue = document.getElementById("measurekey").value.toLowerCase();
    const searchkeyValue = document.getElementById("searchkey").value.toLowerCase();
    const randomkeysValue = document.getElementById("randomkeys").value.toLowerCase();
    const mapstylekeyValue = document.getElementById("mapstylekey").value.toLowerCase()
    const voyagerkeysValue = document.getElementById("voyagerkeys").value.toLowerCase();
    const projectskeyValue = document.getElementById("projectskey").value.toLowerCase();
    const settingskeyValue = document.getElementById("settingskey").value.toLowerCase();

    const topdownkeyValue = document.getElementById("topdownkey").value.toLowerCase();
    const resetviewkeyValue = document.getElementById("resetviewkey").value.toLowerCase();

    chrome.storage.local.set({"northkey": northkeyValue}, ()=>{});
    chrome.storage.local.set({"svkeys": svkeyValue}, ()=>{});
    chrome.storage.local.set({"measurekey": measurekeyValue}, ()=>{});
    chrome.storage.local.set({"searchkey": searchkeyValue}, ()=>{});
    chrome.storage.local.set({"randomkeys": randomkeysValue}, ()=>{});
    chrome.storage.local.set({"mapstylekey": mapstylekeyValue}, ()=>{});
    chrome.storage.local.set({"voyagerkeys": voyagerkeysValue}, ()=>{});
    chrome.storage.local.set({"projectskey": projectskeyValue}, ()=>{});
    chrome.storage.local.set({"settingskey": settingskeyValue}, ()=>{});
    chrome.storage.local.set({"topdownkey": topdownkeyValue}, ()=>{});
    chrome.storage.local.set({"resetviewkey": resetviewkeyValue}, ()=>{});
}

function resetkeys(){
    document.getElementById("northkey").value = "f";
    document.getElementById("svkeys").value = "e,d";
    document.getElementById("measurekey").value = "v";
    document.getElementById("searchkey").value = "s";
    document.getElementById("randomkeys").value = "q";
    document.getElementById("mapstylekey").value = "w";
    document.getElementById("voyagerkeys").value = "g";
    document.getElementById("projectskey").value = "p";
    document.getElementById("settingskey").value = "t";
    document.getElementById("topdownkey").value = "u";
    document.getElementById("resetviewkey").value = "r";
}

function resetofficialkeys(){
    document.getElementById("northkey").value = "n";
    document.getElementById("svkeys").value = "";
    document.getElementById("measurekey").value = "shift+m";
    document.getElementById("searchkey").value = "/";
    document.getElementById("randomkeys").value = "";
    document.getElementById("mapstylekey").value = "m";
    document.getElementById("voyagerkeys").value = "";
    document.getElementById("projectskey").value = "p";
    document.getElementById("settingskey").value = ",";
    document.getElementById("topdownkey").value = "u";
    document.getElementById("resetviewkey").value = "r";
}

// reference: https://stackoverflow.com/a/57551361
async function getAndDisplayStoredValues(){
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
                    if (value["northkey"] == undefined){
                        document.getElementById("northkey").value = "f";
                        chrome.storage.local.set({"northkey": "f"}, ()=>{});
                    }else{
                        document.getElementById("northkey").value = value["northkey"];
                    }

                    if (value["svkeys"] == undefined){
                        document.getElementById("svkeys").value = "e,d";
                        chrome.storage.local.set({"svkeys": "e,d"}, ()=>{});
                    }else{
                        document.getElementById("svkeys").value = value["svkeys"];
                    }

                    if (value["measurekey"] == undefined){
                        document.getElementById("measurekey").value = "v";
                        chrome.storage.local.set({"measurekey": "v"});
                    }else{
                        document.getElementById("measurekey").value = value["measurekey"];
                    }

                    if (value["searchkey"] == undefined){
                        document.getElementById("searchkey").value = "s";
                        chrome.storage.local.set({"searchkey": "s"});
                    }else{
                        document.getElementById("searchkey").value = value["searchkey"];
                    }

                    if (value["randomkeys"] == undefined){
                        document.getElementById("randomkeys").value = "q";
                        chrome.storage.local.set({"randomkeys": "q"});
                    }else{
                        document.getElementById("randomkeys").value = value["randomkeys"];
                    }

                    if (value["mapstylekey"] == undefined){
                        document.getElementById("mapstylekey").value = "w";
                        chrome.storage.local.set({"mapstylekey": "w"});
                    }else{
                        document.getElementById("mapstylekey").value = value["mapstylekey"];
                    }

                    if (value["voyagerkeys"] == undefined){
                        document.getElementById("voyagerkeys").value = "g";
                        chrome.storage.local.set({"voyagerkeys": "g"});
                    }else{
                        document.getElementById("voyagerkeys").value = value["voyagerkeys"];
                    }

                    if (value["projectskey"] == undefined){
                        document.getElementById("projectskey").value = "p";
                        chrome.storage.local.set({"projectskey": "p"});
                    }else{
                        document.getElementById("projectskey").value = value["projectskey"];
                    }

                    if (value["settingskey"] == undefined){
                        document.getElementById("settingskey").value = "t";
                        chrome.storage.local.set({"settingskey": "t"});
                    }else{
                        document.getElementById("settingskey").value = value["settingskey"];
                    }

                    if (value["topdownkey"] == undefined){
                        document.getElementById("topdownkey").value = "u";
                        chrome.storage.local.set({"topdownkey": "u"});
                    }else{
                        document.getElementById("topdownkey").value = value["topdownkey"];
                    }

                    if (value["resetviewkey"] == undefined){
                        document.getElementById("resetviewkey").value = "r";
                        chrome.storage.local.set({"resetviewkey": "r"});
                    }else{
                        document.getElementById("resetviewkey").value = value["resetviewkey"];
                    }
                });
        }catch(exc){}
    })
}

window.onload = ()=>{
    document.getElementById("savebutton").addEventListener("click", ()=>{
        savekeys();
    });
    document.getElementById("resetofficialbutton").addEventListener("click", ()=>{
        resetofficialkeys();
    });
    document.getElementById("resetbutton").addEventListener("click", ()=>{
        resetkeys();
    });
    getAndDisplayStoredValues();
}
