/*
===========================================================
PROJECT FILTERS
===========================================================
*/

const projectFilterButtons =
    document.querySelectorAll(
        ".project-filter"
    );


projectFilterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const section =
                    button.dataset.section;


                const selectedFilter =
                    button.dataset.filter;


                /*
                Find filter buttons
                belonging to same section
                */

                const sectionButtons =
                    document.querySelectorAll(
                        `.project-filter[data-section="${section}"]`
                    );


                /*
                Remove active state
                */

                sectionButtons.forEach(
                    (sectionButton) => {

                        sectionButton
                            .classList
                            .remove(
                                "active"
                            );

                    }
                );


                /*
                Activate selected filter
                */

                button
                    .classList
                    .add(
                        "active"
                    );


                /*
                Get correct project grid
                */

                const projectGrid =
                    document.querySelector(
                        `[data-project-group="${section}"]`
                    );


                const projectCards =
                    projectGrid
                        .querySelectorAll(
                            ".project-card"
                        );


                /*
                Filter project cards
                */

                projectCards.forEach(
                    (card) => {

                        const categories =
                            card
                                .dataset
                                .category
                                .split(
                                    " "
                                );


                        if (
                            selectedFilter === "all" ||
                            categories.includes(
                                selectedFilter
                            )
                        ) {

                            card
                                .classList
                                .remove(
                                    "hidden"
                                );

                        }

                        else {

                            card
                                .classList
                                .add(
                                    "hidden"
                                );


                            /*
                            Close hidden card
                            if expanded
                            */

                            card
                                .classList
                                .remove(
                                    "expanded"
                                );


                            const detailsButton =
                                card
                                    .querySelector(
                                        ".project-details-button"
                                    );


                            detailsButton.textContent =
                                "View Details";

                        }

                    }
                );

            }
        );

    }
);



/*
===========================================================
EXPAND PROJECT CARDS
===========================================================
*/

const allProjectCards =
    document.querySelectorAll(
        ".project-card"
    );


allProjectCards.forEach(
    (card) => {

        const detailsButton =
            card.querySelector(
                ".project-details-button"
            );


        detailsButton.addEventListener(
            "click",
            () => {

                const isExpanded =
                    card
                        .classList
                        .contains(
                            "expanded"
                        );


                /*
                Close other cards
                */

                allProjectCards.forEach(
                    (otherCard) => {

                        if (
                            otherCard !== card
                        ) {

                            otherCard
                                .classList
                                .remove(
                                    "expanded"
                                );


                            const otherButton =
                                otherCard
                                    .querySelector(
                                        ".project-details-button"
                                    );


                            if (otherButton) {

                                otherButton.textContent =
                                    "View Details";

                            }

                        }

                    }
                );


                /*
                Toggle selected project
                */

                if (isExpanded) {

                    card
                        .classList
                        .remove(
                            "expanded"
                        );


                    detailsButton.textContent =
                        "View Details";

                }

                else {

                    card
                        .classList
                        .add(
                            "expanded"
                        );


                    detailsButton.textContent =
                        "Hide Details";

                }

            }
        );

    }
);



/*
===========================================================
PROJECT SCROLL REVEAL
===========================================================
*/

const projectObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add(
                                "visible"
                            );


                        observer
                            .unobserve(
                                entry.target
                            );

                    }

                }
            );

        },

        {
            threshold: 0.1
        }

    );


allProjectCards.forEach(
    (card) => {

        projectObserver.observe(
            card
        );

    }
);



/*
===========================================================
MOBILE HEADER MENU
===========================================================
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


            mobileMenuButton
                .setAttribute(
                    "aria-expanded",
                    menuIsOpen
                );

        }
    );

}



/*
===========================================================
CLOSE MOBILE MENU AFTER LINK CLICK
===========================================================
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

                if (
                    headerContainer &&
                    mobileMenuButton
                ) {

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

            }
        );

    }
);



/*
===========================================================
CURRENT YEAR
===========================================================
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