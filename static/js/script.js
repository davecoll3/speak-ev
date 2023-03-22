// selectors for elements on the page to interact with
const sidenavs = document.querySelectorAll(".sidenav");
const collapsibles = document.querySelectorAll(".collapsible");
const modals = document.querySelectorAll('.modal');
const toTopButton = document.getElementById("to-top-btn");

/*
event listeners for Materialize initialization
code sourced from: https://materializecss.com/
*/
document.addEventListener('DOMContentLoaded', function() {
    // mobile sidenav
    M.Sidenav.init(sidenavs, {edge: "right"});

    // collapsible accordian
    M.Collapsible.init(collapsibles);

    // delete term modal
    M.Modal.init(modals);
});

/*
back to top button
code adapted from w3schools: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
on scroll event to hide/show back to top button
*/
window.onscroll = function() {
    scrollFunction()
;};

// define the scrollFunction() 
function scrollFunction() {
  if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
    toTopButton.style.display = "block";
  } else {
    toTopButton.style.display = "none";
  }
}

// event listener for back to top button
toTopButton.addEventListener("click", function() {
    topFunction();
});

// define the topFunction() 
function topFunction() {
document.body.scrollTop = 0; // for Safari
document.documentElement.scrollTop = 0; // for Chrome, Firefox, IE and Opera
}