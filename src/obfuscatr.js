String.prototype.bin2hex = function() {
  var str = '';
  for (x = 0, l = this.split("").length; x < l; x++)
    str += '%'+this.charCodeAt(x).toString(16);
  return str;
}
String.prototype.reverse = function() {
  return this.split("").reverse().join("");
}
Function.prototype.inScope = function(scope)
{
  var that = this;
  return function()
  {
    return that.apply(scope, arguments);
  };
};

/** @constructor */
function Obfuscatr() {
  this.stage = 0;
  this.front = null;
  this.fliprollie = null;
  this.flip = null;
  this.field = null;
  this.btn = null;
  this.msg = null;
  this.box = null;
  this.logo = null;
  this.linkChangelog = null;
  this.algorithmJs = null;
  this.back = null;
  this.btnDone = null;
  this.flipShown = false;
  this.animation = {
    duration:0,
    starttime:0,
    to:1.0,
    now:0.0,
    from:0.0,
    firstElement:null,
    timer:null
  };
}

Obfuscatr.prototype.init = function() {
  this.front = document.getElementById("front");
  this.fliprollie = document.getElementById("fliprollie");
  this.flip = document.getElementById ("flip");
  this.field = document.getElementById('field');
  this.btn = document.getElementById('btn');
  this.msg = document.getElementById('msg');
  this.box = document.getElementById('box');
  createGenericButton(this.btn, "Obfuscate!", this.obfuscate.inScope(this));

  this.logo = document.getElementById('logo');
  this.linkChangelog = document.getElementById('link-changelog');
  this.algorithmJs = document.getElementById('algorithm-js');
  this.back = document.getElementById("back");
  this.btnDone = document.getElementById('btn-done');
  createGenericButton(this.btnDone, "Done", this.hideBack.inScope(this));

  this.toggle();

  this.addEventListeners();
}

Obfuscatr.prototype.addEventListeners = function() {
  this.front.onmousemove = this.mousemove.inScope(this);
  this.front.onmouseout = this.mouseexit.inScope(this);
  this.logo.onclick = this.launchSite.inScope(this);
  this.linkChangelog.onclick = this.launchChangelog.inScope(this);
  this.btnDone.onclick = this.hideBack.inScope(this);
  this.flip.onclick = this.showBack.inScope(this);
  this.flip.onmouseover = this.enterflip.inScope(this);
  this.flip.onmouseout = this.exitflip.inScope(this);
}

Obfuscatr.prototype.isValidEmail = function(email) {
  var rgx = /^([\w-\.\+])+\@([\w-]+\.)+([\w]{2,4})+$/;
  return rgx.test(email)
}

Obfuscatr.prototype.errorHandle = function(id) {
  var str;
  switch (id) {
    case 1:
      str = 'Please enter email to obfuscate.';
      break;
    case 2:
      str = 'Invalid email. Please fix.';
      break;
    case 3:
      this.box.value = this.email;
      str = 'Done. Email copied to clipboard.';
      break;
  }
  this.field.style.display = 'none';
  this.msg.innerHTML = str;
  this.msg.style.display = 'block';
  this.btn.innerHTML = '';
  createGenericButton(this.btn, "Back", this.goBack.inScope(this));
}

Obfuscatr.prototype.obfuscate = function() {
  var email = this.box.value;
  if (email.length == 0) {
    this.errorHandle(1);
  } else if (!this.isValidEmail(email)) {
    this.errorHandle(2);
  } else {
    // obfuscate in respect of the selected method of obfuscation
    if (this.algorithmJs.checked) {
      var jsStr = 'document.write(\'<a href="mailto:' + email + '">' + email + '</a>\');',
      obfStr = '<script type="text/javascript">eval(unescape("' + jsStr.bin2hex() + '"));</script>';
    } else {
      obfStr = '<script type="text/javascript">function obfuscatrtr() { window.location = \'mailto:\' + this.innerHTML.split("").reverse().join(""); }</script>\
        <a href="javascript:void(0);" onclick="obfuscatrtr.apply(this)" style="direction:rtl; unicode-bidi:bidi-override;">' + email.reverse() + '</a>';
    }
    this.btn.innerHTML = '';
    createGenericButton(this.btn, "Copy", this.copy.inScope(this));
    this.stage = 1;
    this.box.value = obfStr;
    this.toggle();
  }
}

Obfuscatr.prototype.copy = function() {
  widget.system("/bin/echo -n '" + this.obfStr.toString() + "' | /usr/bin/pbcopy", null);
  errorHandle(3);
}

Obfuscatr.prototype.goBack = function(event) {
  this.btn.innerHTML = '';
  this.msg.innerHTML = '';
  this.field.style.display = 'block';
  createGenericButton(this.btn, "Obfuscate!", this.obfuscate.inScope(this));
  toggle();
}

Obfuscatr.prototype.launchChangelog = function() {
  widget.openURL('http://obfuscatr.flashbit.net/download.html#changelog');
}

Obfuscatr.prototype.launchSite = function() {
  widget.openURL('http://obfuscatr.flashbit.net');
}

Obfuscatr.prototype.toggle = function() {
  this.box.focus();
  this.box.select();
}

Obfuscatr.prototype.proceed = function() {
  // halt on 0 input
  if (this.box.value == '') {
    return false;
  }
  // proceed according to the active stage
  switch (this.stage) {
    case 1:
      this.copy();
      break;
    default:
      this.obfuscate();
  }
  return true;
}

Obfuscatr.prototype.showBack = function() {
  this.front.style.display = "none";
  this.back.style.display = "block";
  if (window.widget) {
    widget.prepareForTransition("ToBack");
    setTimeout (widget.performTransition, 0);
  }
}

Obfuscatr.prototype.hideBack = function () {
  this.back.style.display = "none";
  this.front.style.display = "block";
  if (window.widget) {
    widget.prepareForTransition("ToFront");
    setTimeout (widget.performTransition, 0);
  }
}

Obfuscatr.prototype.limit_3 = function(a, b, c) {
  return a < b ? b : (a > c ? c : a);
}

Obfuscatr.prototype.computeNextFloat = function(from, to, ease) {
  return from + (to - from) * ease;
}

Obfuscatr.prototype.enterflip = function(event) {
  this.fliprollie.style.display = "block";
}

Obfuscatr.prototype.exitflip = function(event) {
  this.fliprollie.style.display = "none";
}

Obfuscatr.prototype.animate = function() {
  var T;
  var ease;
  var time = new Date().getTime();
  T = this.limit_3(time - this.animation.starttime, 0, this.animation.duration);

  if (T >= this.animation.duration) {
    clearInterval(this.animation.timer);
    this.animation.timer = null;
    this.animation.now = this.animation.to;
  } else {
    ease = 0.5 - (0.5 * Math.cos(Math.PI * T / this.animation.duration));
    this.animation.now = this.computeNextFloat(this.animation.from, this.animation.to, ease);
  }
  this.animation.firstElement.style.opacity = this.animation.now;
}

Obfuscatr.prototype.mousemove = function(event) {
  if (!this.flipShown) {
    if (this.animation.timer != null) {
      clearInterval(this.animation.timer);
      this.animation.timer  = null;
    }
    this.animation.duration = 500;
    this.animation.starttime = new Date().getTime() - 13;;
    this.animation.firstElement = this.flip;
    this.animation.timer = setInterval(this.animate.inScope(this), 13);
    this.animation.from = this.animation.now;
    this.animation.to = 1.0;
    this.animate(this);
    this.flipShown = true;
  }
}

Obfuscatr.prototype.mouseexit = function(event) {
  if (this.flipShown) {
    // fade in the info button
    if (this.animation.timer != null) {
      clearInterval(this.animation.timer);
      this.animation.timer  = null;
    }
    this.animation.duration = 500;
    this.animation.starttime = new Date().getTime() - 13;
    this.animation.firstElement = this.flip;
    this.animation.timer = setInterval(this.animate.inScope(this), 13);
    this.animation.from = this.animation.now;
    this.animation.to = 0.0;
    this.animate();
    this.flipShown = false;
  }
}