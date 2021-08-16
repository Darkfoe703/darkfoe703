// ==========================================================================
// SIDEBAR control
// ==========================================================================
function sb_open() {
  let sideBar = document.getElementById("mySidebar");
  sideBar.classList.remove("animate-right");
  sideBar.classList.remove("sidebar-hide");
  sideBar.classList.remove("sidebar-init")
  sideBar.classList.add("animate-left");
  sideBar.classList.add("sidebar-show");
}
function sb_close() {
  let sideBar = document.getElementById("mySidebar");
  sideBar.classList.remove("animate-left");
  sideBar.classList.remove("sidebar-show");
  sideBar.classList.add("animate-right");
  sideBar.classList.add("sidebar-hide");
}

var bbutton = document.getElementById("bbutton");
bbutton.addEventListener("click", sb_open);
var cbutton = document.getElementById("cbutton");
cbutton.addEventListener("click", sb_close);

// ==========================================================================
// SECCIÓN DE CONTENIDO
// ==========================================================================
function ctHome() {
  section[0].innerHTML = pageCV;
  sb_close();
}
function ctPortfolio() {
  section[0].innerHTML = pagePortfolio;
  sb_close();
}
function ctContact() {
  section[0].innerHTML = pageContact;
  sb_close();
}

var section = document.getElementsByClassName("experience");

var btCV = document.getElementById("btHome");
btCV.addEventListener("click", ctHome);
var btPortfolio = document.getElementById("btPortfolio");
btPortfolio.addEventListener("click", ctPortfolio);
var btContact = document.getElementById("btContact");
btContact.addEventListener("click", ctContact);

let url = document.location.href;
//console.log(url);
if (url.includes("#portfolio")) {
  ctPortfolio();
} else if (url.includes("#contact")) {
  ctContact();
} else {
  ctHome();
}
