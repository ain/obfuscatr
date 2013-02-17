String.prototype.bin2hex = function() 
{
    var str = '';
	for (x=0;x<this.split("").length;x++) str += '%'+this.charCodeAt(x).toString(16);
	return str;
}

function obfuscate()
{
    msg.style.display = 'none';
    email = box.value;
    if (email.length == 0) {
        errorHandler(1);
    } else if (!isValidEmail(email)) {
        errorHandler(2);
    }  else {
        var jsStr = 'document.write(\'<a href="mailto:'+email+'">'+email+'</a>\');',
            encStr = jsStr.bin2hex();
        obfStr = '<script type="text/javascript">eval(unescape("' + encStr + '"));</script>';
        box.value = obfStr;
        toggle();
        // switch buttons
        obfuscateBtn.style.display = 'none';
    }
}

function reset()
{
    msg.style.display = 'none';
    box.value = '';
    obfuscateBtn.style.display = 'inline';
    toggle();
}

/**
    Validate email address
    
    Parameters:
    email:String - email address
    Returns:
    Boolean - true on correct and false on incorrect email
 */
function isValidEmail(email)
{
    var rgx = /^([\w-\.\+])+\@([\w-]+\.)+([\w]{2,4})+$/;
    return rgx.test(email);
}

function toggle()
{
    box.focus();
    box.select();
}

function errorHandler(eid)
{
    var str;
    switch (eid) {
        case 1: 
            str = 'Please enter an email to obfuscate';
            toggle();
            break;
        case 2:
            str = 'Invalid email. Please fix';
            box.focus();
            break;
    }
    msg.innerHTML = str;
    msg.style.display = 'block';
}

function checkEnter(e)
{
    var kCode;
    if(e && e.which) { 
        // NN4 specific code
        e = e;
        kCode = e.which;
    } else {
        // IE specific code
        e = event;
        kCode = e.keyCode;
    }
    if (kCode == 13) {
        obfuscate();
    }
}