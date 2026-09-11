// ================================
// MENU FILTER & SEARCH
// ================================

const categoryButtons = document.querySelectorAll(".category-btn");
const menuItems = document.querySelectorAll(".menu-item");
const searchInput = document.getElementById("menuSearch");

let selectedCategory = "all";



// FILTER MENU ITEMS

function filterMenu() {

    const searchValue = searchInput.value.toLowerCase().trim();

    let visibleItems = 0;

    menuItems.forEach((item) => {

        const category = item.dataset.category;
        const text = item.textContent.toLowerCase();

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const matchesSearch =
            text.includes(searchValue);

        if (matchesCategory && matchesSearch) {

            item.style.display = "";

            visibleItems++;

        } else {

            item.style.display = "none";

        }

    });


    // Show message if nothing matches
    showNoResultsMessage(visibleItems);
}


// ================================
// CATEGORY BUTTONS
// ================================

categoryButtons.forEach((button) => {

    button.addEventListener("click", () => {

        selectedCategory = button.dataset.category;


        // Remove active class
        categoryButtons.forEach((btn) => {
            btn.classList.remove("active");
        });


        // Add active class to selected button
        button.classList.add("active");


        filterMenu();

    });

});


// ================================
// SEARCH
// ================================

searchInput.addEventListener("input", () => {

    filterMenu();

});


// ================================
// NO RESULTS MESSAGE
// ================================

function showNoResultsMessage(visibleItems) {

    let message = document.getElementById("noResults");

    if (visibleItems === 0) {

        if (!message) {

            message = document.createElement("p");

            message.id = "noResults";
            message.className = "no-results";

            message.textContent =
                "Sorry, no meals found. Try another search.";

            document
                .querySelector(".menu-items .container")
                .appendChild(message);
        }

    } else {

        if (message) {
            message.remove();
        }

    }

}