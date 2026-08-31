/*
====================================
EDUCATION SECTION
====================================
*/

const timelineItems =
    document.querySelectorAll(".timeline-item");

const timelineProgress =
    document.querySelector(".timeline-progress");

const totalItems =
    timelineItems.length;


/*
====================================
Activate Timeline Item
====================================
*/

function activateTimelineItem(selectedItem) {

    timelineItems.forEach((item) => {

        item.classList.remove("active");

        const button =
            item.querySelector(".education-toggle");

        if (button) {
            button.textContent = "View Details";
        }

    });


    selectedItem.classList.add("active");


    const selectedButton =
        selectedItem.querySelector(
            ".education-toggle"
        );

    if (selectedButton) {
        selectedButton.textContent =
            "Hide Details";
    }


    updateProgressLine(selectedItem);

}


/*
====================================
Update Timeline Progress
====================================
*/

function updateProgressLine(selectedItem) {

    const selectedIndex =
        Number(
            selectedItem.dataset.index
        );


    /*
    There are 3 timeline points.

    Index 0:
    no progress

    Index 1:
    halfway

    Index 2:
    full progress
    */

    const progress =
        selectedIndex /
        (totalItems - 1);


    /*
    Timeline line is 67%
    of the timeline width.
    */

    const maximumWidth = 67;

    const progressWidth =
        maximumWidth * progress;


    timelineProgress.style.width =
        `${progressWidth}%`;

}


/*
====================================
Timeline Item Events
====================================
*/

timelineItems.forEach((item) => {

    const marker =
        item.querySelector(
            ".timeline-marker"
        );

    const toggleButton =
        item.querySelector(
            ".education-toggle"
        );


    /*
    Clicking timeline dot
    */

    marker.addEventListener(
        "click",
        () => {

            activateTimelineItem(item);

        }
    );


    /*
    Clicking details button
    */

    toggleButton.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();


            /*
            If already active,
            collapse it.
            */

            if (
                item.classList.contains(
                    "active"
                )
            ) {

                item.classList.remove(
                    "active"
                );

                toggleButton.textContent =
                    "View Details";

            }

            else {

                activateTimelineItem(item);

            }

        }
    );


    /*
    Clicking education card
    also activates it
    */

    const card =
        item.querySelector(
            ".education-card"
        );

    card.addEventListener(
        "click",
        (event) => {

            /*
            Avoid activating twice
            when button is clicked.
            */

            if (
                event.target.classList.contains(
                    "education-toggle"
                )
            ) {
                return;
            }

            activateTimelineItem(item);

        }
    );

});


/*
====================================
Initialize Timeline
====================================
*/

const initiallyActive =
    document.querySelector(
        ".timeline-item.active"
    );

if (initiallyActive) {

    updateProgressLine(
        initiallyActive
    );

}




/* ========================================
   Work Experience Interactivity
======================================== */

const experienceItems =
    document.querySelectorAll(
        ".experience-item"
    );


experienceItems.forEach((item) => {

    const toggleButton =
        item.querySelector(
            ".experience-toggle"
        );


    /*
    ========================================
    Toggle Experience Details
    ========================================
    */

    toggleButton.addEventListener(
        "click",
        () => {

            const isActive =
                item.classList.contains(
                    "active"
                );


            /*
            Close the selected experience
            */

            if (isActive) {

                item.classList.remove(
                    "active"
                );

                toggleButton.textContent =
                    "View Details";

                toggleButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            /*
            Open the selected experience
            */

            else {

                item.classList.add(
                    "active"
                );

                toggleButton.textContent =
                    "Hide Details";

                toggleButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        }
    );

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
CLOSE MOBILE MENU
AFTER SELECTING PAGE
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






/*
===========================================================
CERTIFICATION FILTER
===========================================================
*/

const certificationFilters =
    document.querySelectorAll(
        ".certification-filter"
    );


const certificationCards =
    document.querySelectorAll(
        ".certification-card"
    );


certificationFilters.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const selectedFilter =
                    button.dataset.filter;


                /*
                Update active button
                */

                certificationFilters
                    .forEach(
                        (filterButton) => {

                            filterButton
                                .classList
                                .remove(
                                    "active"
                                );

                        }
                    );


                button
                    .classList
                    .add(
                        "active"
                    );


                /*
                Filter certification cards
                */

                certificationCards
                    .forEach(
                        (card) => {

                            const status =
                                card.dataset.status;


                            if (
                                selectedFilter === "all" ||
                                selectedFilter === status
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

                            }

                        }
                    );

            }
        );

    }
);



/*
===========================================================
CERTIFICATION SCROLL REVEAL
===========================================================
*/

const certificationObserver =
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
            threshold: 0.12
        }

    );


certificationCards.forEach(
    (card) => {

        certificationObserver
            .observe(
                card
            );

    }
);



/*
===========================================================
ANIMATE CERTIFICATION PROGRESS
===========================================================
*/

const progressBars =
    document.querySelectorAll(
        ".progress-fill"
    );


const progressObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        const progress =
                            entry.target
                                .dataset
                                .progress;


                        entry.target
                            .style
                            .width =
                                `${progress}%`;


                        observer
                            .unobserve(
                                entry.target
                            );

                    }

                }
            );

        },

        {
            threshold: 0.4
        }

    );


progressBars.forEach(
    (bar) => {

        progressObserver
            .observe(
                bar
            );

    }
);



/*
===========================================================
CERTIFICATE IMAGE PREVIEW
===========================================================
*/

const previewButtons =
    document.querySelectorAll(
        ".certificate-preview-button"
    );


const certificateModal =
    document.getElementById(
        "certificate-modal"
    );


const certificateModalImage =
    document.getElementById(
        "certificate-modal-image"
    );


const certificateModalClose =
    document.querySelector(
        ".certificate-modal-close"
    );


const certificateModalOverlay =
    document.querySelector(
        ".certificate-modal-overlay"
    );


function openCertificateModal(
    imageSource
) {

    certificateModalImage.src =
        imageSource;


    certificateModal
        .classList
        .add(
            "open"
        );


    certificateModal
        .setAttribute(
            "aria-hidden",
            "false"
        );


    document.body.style.overflow =
        "hidden";

}


function closeCertificateModal() {

    certificateModal
        .classList
        .remove(
            "open"
        );


    certificateModal
        .setAttribute(
            "aria-hidden",
            "true"
        );


    certificateModalImage.src =
        "";


    document.body.style.overflow =
        "";

}



previewButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const imageSource =
                    button.dataset.image;


                openCertificateModal(
                    imageSource
                );

            }
        );

    }
);



if (certificateModalClose) {

    certificateModalClose
        .addEventListener(
            "click",
            closeCertificateModal
        );

}



if (certificateModalOverlay) {

    certificateModalOverlay
        .addEventListener(
            "click",
            closeCertificateModal
        );

}



/*
===========================================================
CLOSE MODAL WITH ESC KEY
===========================================================
*/

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            certificateModal
                .classList
                .contains(
                    "open"
                )
        ) {

            closeCertificateModal();

        }

    }
);