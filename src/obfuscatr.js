/********************************************************

    Copyright (c) 2007-2013 Flashbit LLC
    Authors: Ain Tohvri <ain@flashbit.net>

    TODO: remove this header, add Grunt + licence

********************************************************/

String.prototype.bin2hex = function() {
  var str = '';
  for (x = 0, l = this.split("").length; x < l; x++)
    str += '%'+this.charCodeAt(x).toString(16);
  return str;
}
String.prototype.reverse = function() {
  return this.split("").reverse().join("");
}

/**
 * Initialize
 */
function init() {
  // stage ID indicating the stage obfuscation is at
  stage = 0;

  front = document.getElementById("front");
  fliprollie = document.getElementById("fliprollie");
  flip = document.getElementById ("flip");

  // front elements
  field = document.getElementById('field');
  btn = document.getElementById('btn');
  msg = document.getElementById('msg');
  box = document.getElementById('box');
  createGenericButton(btn, "Obfuscate!", obfuscate);

  // back elements
  logo = document.getElementById('logo');
  linkChangelog = document.getElementById('link-changelog');
  algorithmJs = document.getElementById('algorithm-js');
  back = document.getElementById("back");
  btnDone = document.getElementById('btn-done');
  createGenericButton(btnDone, "Done", hideBack);
  // focus
  toggle();

  addEventListeners();
}

function addEventListeners() {
  // front elements
  front.onmousemove = mousemove;
  front.onmouseout = mouseexit;

  // back elements
  logo.onclick = launchSite;
  linkChangelog.onclick = launchChangelog;
  btnDone.onclick = hideBack;
  flip.onclick = showBack;
  flip.onmouseover = enterflip;
  flip.onmouseout = exitflip;
}

function setJSEnabled() {
  algorithmJs.checked = !algorithmJs.checked;
}

/**
 *  Proceed button handler.
 */
function proceed() {
  // halt on 0 input
  if (box.value == '') return false;
  // proceed according to the active stage
  switch (stage) {
    case 1:
      copy();
      break;
    default:
      obfuscate();
  }
}

/**
 * Obfuscate the email.
 */
function obfuscate() {
  email = box.value;
  if (email.length == 0) {
    errorHandler(1);
  } else if (!isValidEmail(email)) {
    errorHandler(2);
  } else {
    // obfuscate in respect of the selected method of obfuscation
    if (algorithmJs.checked) {
      var jsStr = 'document.write(\'<a href="mailto:' + email + '">' + email + '</a>\');',
      obfStr = '<script type="text/javascript">eval(unescape("' + jsStr.bin2hex() + '"));</script>';
    } else {
      obfStr = '<script type="text/javascript">function obfuscatrtr() { window.location = \'mailto:\' + this.innerHTML.split("").reverse().join(""); }</script>\
        <a href="javascript:void(0);" onclick="obfuscatrtr.apply(this)" style="direction:rtl; unicode-bidi:bidi-override;">' + email.reverse() + '</a>';
    }
    btn.innerHTML = '';
    createGenericButton(btn, "Copy", copy);
    stage = 1;
    box.value = obfStr;
    toggle();
  }
}

/**
 * Copy the result to clipboard.
 */
function copy() {
  widget.system("/bin/echo -n '" + obfStr.toString() + "' | /usr/bin/pbcopy", null);
  errorHandler(3);
}

/**
 * Write error to the input field.
 *
 * @param {number} Error number
 */
function errorHandler(eid) {
  var str;
  switch (eid) {
    case 1:
      str = 'Please enter email to obfuscate.';
      break;
    case 2:
      str = 'Invalid email. Please fix.';
      break;
    case 3:
      // set box contents to initial email
      box.value = email;
      str = 'Done. Email copied to clipboard.';
      break;
  }
  field.style.display = 'none';
  msg.innerHTML = str;
  msg.style.display = 'block';
  btn.innerHTML = '';
  createGenericButton(btn, "Back", goBack);
}

function goBack() {
  btn.innerHTML = '';
  msg.innerHTML = '';
  field.style.display = 'block';
  createGenericButton(btn, "Obfuscate!", obfuscate);
  toggle();
}

/**
 * Validate email address.
 *
 * @param {String} email The email that is validated for obfuscation
 * @return {Boolean} true if email is valid, false otherwise
 */
function isValidEmail(email) {
  var rgx = /^([\w-\.\+])+\@([\w-]+\.)+([\w]{2,4})+$/;
  return rgx.test(email);
}

function toggle() {
  box.focus();
  box.select();
}

function launchChangelog() {
  widget.openURL('http://obfuscatr.flashbit.net/download.html#changelog');
}

function launchSite() {
  widget.openURL('http://obfuscatr.flashbit.net')
}