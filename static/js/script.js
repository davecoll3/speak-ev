// selectors for elements on the page to interact with
const sidenavs = document.querySelectorAll(".sidenav");
const collapsibles = document.querySelectorAll(".collapsible");
const tooltips = document.querySelectorAll(".tooltipped");
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

    // tooltips helpers
    M.Tooltip.init(tooltips);

    // delete term modal
    M.Modal.init(modals);
});


/*
back to top button functionallity
code sourced from w3schools: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
when user scrolls down 70px from the top of the document, display back to top button
*/
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
    toTopButton.style.display = "block";
  } else {
    toTopButton.style.display = "none";
  }
}

// back to top button click results in scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}