/********************************************************

    Copyright (c) 2007-2009 Flashbit LLC
    Authors: Ain Tohvri <ain@flashbit.net>
    
********************************************************/

/**
    Toggle element on/off
    
    Parameters
    id:String - ID for the element to toggle
 */
function toggleVs(id)
{
    if (document.getElementById(id)) {
        var element = document.getElementById(id);
        element.style.display = (element.style.display == 'none') ? 'block' : 'none';
    }
}

function init() {
    var vpos = document.URL.indexOf('#');
    if (vpos != -1) {
        var vs = document.URL.substr(vpos + 1);
        toggleVs(vs);
    }
}