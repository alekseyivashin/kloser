document.getElementById("default-tab").addEventListener("change", function () {
    var option = this.options[this.selectedIndex].value;
    var caption = document.getElementById("site-caption");
    var input = document.getElementById("site-input");
    switch (option) {
        case "chrome":
            caption.style.display = "none";
            input.style.display = "none";
            break;
        case "another":
            caption.style.display = "block";
            input.style.display = "block";
            break;
    }
});