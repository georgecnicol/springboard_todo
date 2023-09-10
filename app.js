const toggleSwitch = document.querySelector('#checkbox');

if(localStorage.darkmode == 'true'){
    toggleSwitch.checked = 'true';
    document.body.className = "dark";
}

toggleSwitch.addEventListener('click', function(e){
    //document.body.className = toggleSwitch.checked ? "dark" : "" ;
    const {checked} = toggleSwitch;  // just a kv pair, where the instantiation takes place, the
                                    // name of which is "checked".
    document.body.className = checked ? "dark" : "";
    localStorage.darkmode = checked;

});