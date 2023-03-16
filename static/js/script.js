// Get the button:
let toTopButton = document.getElementById("to-top-btn");

// When the user scrolls down 70px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
    toTopButton.style.display = "block";
  } else {
    toTopButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

document.addEventListener('DOMContentLoaded', function() {
    /* mobile sidenav initialization */
    let sidenavs = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenavs, {edge: "right"});

    /* collapsible initialization */
    let collapsibles = document.querySelectorAll(".collapsible");
    M.Collapsible.init(collapsibles);

    /* tooltips initialization */
    let tooltips = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(tooltips);

    /* modal initialization */
    let modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});
