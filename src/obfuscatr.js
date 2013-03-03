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
  changelogLink = document.getElementById('changelogLink');
  jsCBox = document.getElementById('jsCBox');
  back = document.getElementById("back");
  doneBtn = document.getElementById('doneBtn');
  createGenericButton(doneBtn, "Done", hideBack);
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
  changelogLink.onclick = launchChangelog;
  doneBtn.onclick = hideBack;
  flip.onclick = showBack;
  flip.onmouseover = enterflip;
  flip.onmouseout = exitflip;
}

function setJSEnabled() {
  jsCBox.checked = !jsCBox.checked;
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
    if (jsCBox.checked) {
      var jsStr = 'document.write(\'<a href="mailto:'+email+'">'+email+'</a>\');',
      encStr = jsStr.bin2hex();
      obfStr = '<script type="text/javascript">eval(unescape("' + encStr + '"));</script>';
    } else {
      obfStr = email.bin2hex();
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
      str = 'Please enter an email to obfuscate';
      break;
    case 2:
      str = 'Invalid email. Please fix';
      break;
    case 3:
      // set box contents to initial email
      box.value = email;
      str = 'Done. Email copied to clipboard';
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