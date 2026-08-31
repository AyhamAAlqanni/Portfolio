/*
===========================================================
ANIMATED ROLE TEXT
===========================================================
*/

const roles = [

    "Data Analyst",
    "Software Engineer",
    "MCS Student",
    "Data Science Enthusiast"

];


const roleElement =
    document.querySelector(
        ".dynamic-role"
    );


let roleIndex = 0;

let characterIndex = 0;

let deleting = false;



function typeRole() {

    const currentRole =
        roles[roleIndex];


    if (!deleting) {

        roleElement.textContent =
            currentRole.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (
            characterIndex ===
            currentRole.length
        ) {

            deleting = true;

            setTimeout(
                typeRole,
                1400
            );

            return;
        }

    }

    else {

        roleElement.textContent =
            currentRole.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (
            characterIndex === 0
        ) {

            deleting = false;

            roleIndex =
                (
                    roleIndex + 1
                )
                %
                roles.length;

        }

    }


    setTimeout(

        typeRole,

        deleting
            ? 45
            : 85
    );

}


typeRole();



/*
===========================================================
MOBILE MENU
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


mobileMenuButton.addEventListener(
    "click",
    () => {

        headerContainer
            .classList
            .toggle(
                "menu-open"
            );

    }
);



/*
===========================================================
STAT COUNTER
===========================================================
*/

const statNumbers =
    document.querySelectorAll(
        ".stat_number"
    );


let statsAnimated = false;


function animateStats() {

    if (statsAnimated) {
        return;
    }


    statsAnimated = true;


    statNumbers.forEach(
        (stat) => {

            const target =
                Number(
                    stat.dataset.target
                );


            let current = 0;


            const increment =
                target / 35;


            function updateCounter() {

                current += increment;


                if (
                    current <
                    target
                ) {

                    stat.textContent =
                        Math.ceil(
                            current
                        );

                    requestAnimationFrame(
                        updateCounter
                    );

                }

                else {

                    stat.textContent =
                        target + "+";

                }

            }


            updateCounter();

        }
    );

}



/*
===========================================================
STAT OBSERVER
===========================================================
*/

const statsSection =
    document.querySelector(
        ".stats_section"
    );


const statsObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        animateStats();

                        statsObserver
                            .disconnect();

                    }

                }
            );

        },

        {
            threshold: 0.3
        }

    );


statsObserver.observe(
    statsSection
);



/*
===========================================================
PROJECT CARD SCROLL ANIMATION
===========================================================
*/

const projectCards =
    document.querySelectorAll(
        ".project_card"
    );


const projectObserver =
    new IntersectionObserver(

        (entries) => {

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

                        projectObserver
                            .unobserve(
                                entry.target
                            );

                    }

                }
            );

        },

        {
            threshold: 0.15
        }

    );


projectCards.forEach(
    (card) => {

        projectObserver.observe(
            card
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


currentYear.textContent =
    new Date().getFullYear();



/*
===========================================================
CLOSE MOBILE MENU AFTER LINK CLICK
===========================================================
*/

const navLinks =
    document.querySelectorAll(
        ".header_item2 a"
    );


navLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                headerContainer
                    .classList
                    .remove(
                        "menu-open"
                    );

            }
        );

    }
);