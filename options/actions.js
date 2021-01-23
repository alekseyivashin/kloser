document.getElementById("default-tab").addEventListener("change", function () {
    const option = this.options[this.selectedIndex].value;
    const caption = document.getElementById("site-caption");
    const input = document.getElementById("site-input");
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
