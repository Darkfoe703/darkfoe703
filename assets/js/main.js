// ==========================================================================
// SIDEBAR control
// ==========================================================================
function sb_open() {
  let sideBar = document.getElementById("mySidebar");
  sideBar.classList.remove("animate-right", "sidebar-hide", "sidebar-init");
  sideBar.classList.add("animate-left", "sidebar-show");
}
function sb_close() {
  let sideBar = document.getElementById("mySidebar");
  sideBar.classList.remove("animate-left", "sidebar-show");
  sideBar.classList.add("animate-right", "sidebar-hide");
}

var bbutton = document.getElementById("bbutton");
bbutton.addEventListener("click", sb_open);
var cbutton = document.getElementById("cbutton");
cbutton.addEventListener("click", sb_close);
