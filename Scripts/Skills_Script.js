/* ========================================
   Skills Filter
======================================== */

const filterButtons =
    document.querySelectorAll(
        ".filter-button"
    );

const skillCards =
    document.querySelectorAll(
        ".skill-card"
    );


filterButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const selectedFilter =
                button.dataset.filter;


            /*
            Remove active state
            from all buttons
            */

            filterButtons.forEach(
                (filterButton) => {

                    filterButton.classList.remove(
                        "active"
                    );

                }
            );


            /*
            Activate selected button
            */

            button.classList.add(
                "active"
            );


            /*
            Filter cards
            */

            skillCards.forEach((card) => {

                const categories =
                    card.dataset.category.split(
                        " "
                    );


                if (
                    selectedFilter === "all" ||
                    categories.includes(
                        selectedFilter
                    )
                ) {

                    card.classList.remove(
                        "hidden"
                    );

                }

                else {

                    card.classList.add(
                        "hidden"
                    );

                    card.classList.remove(
                        "expanded"
                    );


                    const detailsButton =
                        card.querySelector(
                            ".skill-details-button"
                        );


                    detailsButton.textContent =
                        "View Uses";

                }

            });

        }
    );

});


/* ========================================
   Expand Skill Cards
======================================== */

skillCards.forEach((card) => {

    const detailsButton =
        card.querySelector(
            ".skill-details-button"
        );


    detailsButton.addEventListener(
        "click",
        () => {

            const isExpanded =
                card.classList.contains(
                    "expanded"
                );


            /*
            Close any other
            expanded skill cards
            */

            skillCards.forEach(
                (otherCard) => {

                    if (
                        otherCard !== card
                    ) {

                        otherCard.classList.remove(
                            "expanded"
                        );


                        const otherButton =
                            otherCard.querySelector(
                                ".skill-details-button"
                            );


                        otherButton.textContent =
                            "View Uses";

                    }

                }
            );


            /*
            Toggle selected skill
            */

            if (isExpanded) {

                card.classList.remove(
                    "expanded"
                );

                detailsButton.textContent =
                    "View Uses";

            }

            else {

                card.classList.add(
                    "expanded"
                );

                detailsButton.textContent =
                    "Hide Uses";

            }

        }
    );

});


/* ========================================
   Scroll Reveal Animation
======================================== */

const observerOptions = {
    threshold: 0.12
};


const skillObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        observerOptions
    );


skillCards.forEach((card) => {

    skillObserver.observe(card);

});






/*
========================================
MOBILE HEADER MENU
========================================
*/

const mobileMenuButton =
    document.querySelector(
        ".mobile-menu-button"
    );


const headerContainer =
    document.querySelector(
        ".header_container"
    );


if (
    mobileMenuButton &&
    headerContainer
) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            const menuIsOpen =
                headerContainer
                    .classList
                    .toggle(
                        "menu-open"
                    );


            mobileMenuButton.setAttribute(
                "aria-expanded",
                menuIsOpen
            );

        }
    );

}


/*
========================================
CLOSE MENU AFTER LINK CLICK
========================================
*/

const headerNavLinks =
    document.querySelectorAll(
        ".header_item2 a"
    );


headerNavLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                headerContainer
                    .classList
                    .remove(
                        "menu-open"
                    );


                mobileMenuButton
                    .setAttribute(
                        "aria-expanded",
                        "false"
                    );

            }
        );

    }
);


/*
========================================
CURRENT YEAR
========================================
*/

const currentYear =
    document.getElementById(
        "current-year"
    );


if (currentYear) {

    currentYear.textContent =
        new Date()
            .getFullYear();

}