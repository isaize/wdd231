const navButton = document.querySelector("#nav-button");
const navigation = document.querySelector("#primary-navigation");

if (navButton && navigation) {
    navButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        navButton.classList.toggle("show", isOpen);
        navButton.setAttribute("aria-expanded", String(isOpen));
        navButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });
}