const searchInput = document.getElementById("update-search");
const updateCards = document.querySelectorAll(".update-card");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.toLowerCase().trim();

        updateCards.forEach(function (card) {
            const cardText = card.textContent.toLowerCase();

            if (cardText.includes(searchText)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
}


const eventFilterButtons = document.querySelectorAll(".event-filter");
const eventCards = document.querySelectorAll(".event-info-card");

eventFilterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedCategory = button.dataset.filter;

        eventFilterButtons.forEach(function (filterButton) {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");

        eventCards.forEach(function (card) {
            const cardCategory = card.dataset.category;

            if (
                selectedCategory === "all" ||
                selectedCategory === cardCategory
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
});



const orgFilterButtons = document.querySelectorAll(".org-filter");
const orgCards = document.querySelectorAll(".org-card");
const orgResults = document.querySelector(".org-results");
const orgEmpty = document.querySelector(".org-empty");

orgFilterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedCategory = button.dataset.orgFilter;
        let visibleCount = 0;

       
        orgFilterButtons.forEach(function (filterButton) {
            filterButton.classList.remove("active");
            filterButton.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

       
        orgCards.forEach(function (card) {
            const cardCategory = card.dataset.orgCategory;

            if (
                selectedCategory === "all" ||
                selectedCategory === cardCategory
            ) {
                card.hidden = false;
                visibleCount++;
            } else {
                card.hidden = true;
            }
        });

        
        if (orgResults) {
            orgResults.textContent =
                "Showing " + visibleCount +
                (visibleCount === 1
                    ? " organization"
                    : " organizations");
        }

       
        if (orgEmpty) {
            orgEmpty.hidden = visibleCount !== 0;
        }
    });
});
