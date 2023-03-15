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

    /* select initialization */
    let selects = document.querySelectorAll("select");
    M.FormSelect.init(selects);

        /* Materialize select category validation code sourced from Code Institute Task Manager mini project: https://bit.ly/3mMOpsi */
        validateMaterializeSelect();
        function validateMaterializeSelect() {         
            let classValid = "border-bottom: 1px solid #4caf50; box-shadow: 0 1px 0 0 #4caf50;";
            let classInvalid = "border-bottom: 1px solid #f44336; box-shadow: 0 1px 0 0 #f44336;";
            let selectValidate = document.querySelector("select.validate");
            let selectWrapperInput = document.querySelector(".select-wrapper input.select-dropdown");
            if (selectValidate != null && selectValidate.hasAttribute("required")) {
                selectValidate.style.cssText = "display: block; height: 0; padding: 0; width: 0; position: absolute;";
            }
            if (selectWrapperInput != null) {
                selectWrapperInput.addEventListener("focusin", (e) => {
                    e.target.parentNode.addEventListener("change", () => {
                        ulSelectOptions = e.target.parentNode.childNodes[1].childNodes;
                        for (let i = 0; i < ulSelectOptions.length; i++) {
                            if (ulSelectOptions[i].className == "selected" && ulSelectOptions[i].hasAttribute != "disabled") {
                                e.target.style.cssText = classValid;
                            }
                        }
                    });
                });
                selectWrapperInput.addEventListener("click", (e) => {
                    ulSelectOptions = e.target.parentNode.childNodes[1].childNodes;
                    for (let i = 0; i < ulSelectOptions.length; i++) {
                        if (ulSelectOptions[i].className == "selected" && ulSelectOptions[i].hasAttribute != "disabled" && ulSelectOptions[i].style.backgroundColor == "rgba(0, 0, 0, 0.03)") {
                            e.target.style.cssText = classValid;
                        } else {
                            e.target.addEventListener("focusout", () => {
                                if (e.target.parentNode.childNodes[3].hasAttribute("required")) {
                                    if (e.target.style.borderBottom != "1px solid rgb(76, 175, 80)") {
                                        e.target.style.cssText = classInvalid;
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
});
