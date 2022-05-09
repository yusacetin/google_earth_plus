function savekeys(){
    const northkeyValue = document.getElementById("northkey").value;
    const svkeyValue = document.getElementById("svkeys").value;
    const measurekeyValue = document.getElementById("measurekey").value;
    const searchkeyValue = document.getElementById("searchkey").value;
    const randomkeysValue = document.getElementById("randomkeys").value;
    const mapstylekeyValue = document.getElementById("mapstylekey").value;
    const voyagerkeysValue = document.getElementById("voyagerkeys").value;
    const projectskeyValue = document.getElementById("projectskey").value;
    const settingskeyValue = document.getElementById("settingskey").value;

    chrome.storage.local.set({"northkey": northkeyValue}, ()=>{});
    chrome.storage.local.set({"svkeys": svkeyValue}, ()=>{});
    chrome.storage.local.set({"measurekey": measurekeyValue}, ()=>{});
    chrome.storage.local.set({"searchkey": searchkeyValue}, ()=>{});
    chrome.storage.local.set({"randomkeys": randomkeysValue}, ()=>{});
    chrome.storage.local.set({"mapstylekey": mapstylekeyValue}, ()=>{});
    chrome.storage.local.set({"voyagerkeys": voyagerkeysValue}, ()=>{});
    chrome.storage.local.set({"projectskey": projectskeyValue}, ()=>{});
    chrome.storage.local.set({"settingskey": settingskeyValue}, ()=>{});
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
                "settingskey"],
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
                });
        }catch(exc){}
    })
}

window.onload = ()=>{
    document.getElementById("savebutton").addEventListener("click", ()=>{
        savekeys();
    });
    document.getElementById("resetbutton").addEventListener("click", ()=>{
        resetkeys();
    });
    getAndDisplayStoredValues();
}
