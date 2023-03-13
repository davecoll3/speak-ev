/* mobile sidenav and collapsible sourced from Materialize: https://materializecss.com/ */
document.addEventListener('DOMContentLoaded', function() {
let sidenavs = document.querySelectorAll(".sidenav");
let sidenavsInstance = M.Sidenav.init(sidenavs, {edge: "right"});
let collapsibles = document.querySelectorAll(".collapsible");
let collapsiblesInstance = M.Collapsible.init(collapsibles);
let selects = document.querySelectorAll("select");
let selectsInstance = M.FormSelect.init(selects);
});
