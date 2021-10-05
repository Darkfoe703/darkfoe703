// ==========================================================================
// SIDEBAR control
// ==========================================================================
function sb_open() {
  const sideBar = document.getElementById("mySidebar");
  sideBar.classList.remove("animate-right", "sidebar-hide", "sidebar-init");
  sideBar.classList.add("animate-left", "sidebar-show");
}
function sb_close() {
  const sideBar = document.getElementById("mySidebar");
  sideBar.classList.remove("animate-left", "sidebar-show");
  sideBar.classList.add("animate-right", "sidebar-hide");
}

const bbutton = document.getElementById("bbutton");
bbutton.addEventListener("click", sb_open);
const cbutton = document.getElementById("cbutton");
cbutton.addEventListener("click", sb_close);
