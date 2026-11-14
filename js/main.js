
/* ==========================================
   ICSCAI 2026 - MAIN JAVASCRIPT
   Responsive interactions for all devices
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================
       1. CONFERENCE COUNTDOWN
    ====================================== */

    const targetDate = new Date(
        "2026-12-08T09:00:00+05:30"
    ).getTime();

    function updateCountdown() {

        const now = Date.now();
        const diff = targetDate - now;

        const daysEl = document.getElementById("cd-days");
        const hoursEl = document.getElementById("cd-hours");
        const minutesEl = document.getElementById("cd-minutes");
        const secondsEl = document.getElementById("cd-seconds");

        if (diff <= 0) return;

        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    /* ======================================
       2. APC CALCULATOR
    ====================================== */

    const authorTypeEl = document.getElementById("calc-author-type");
    const authorsCountEl = document.getElementById("calc-authors-count");
    const pagesCountEl = document.getElementById("calc-pages-count");
    const totalDisplayEl = document.getElementById("calc-total-display");
    const breakdownTextEl = document.getElementById("calc-breakdown-text");

    function calculateAPC() {

        if (
            !authorTypeEl ||
            !authorsCountEl ||
            !pagesCountEl ||
            !totalDisplayEl
        ) return;

        const type = authorTypeEl.value;

        const authors = Math.max(
            1,
            parseInt(authorsCountEl.value, 10) || 1
        );

        const pages = Math.max(
            1,
            parseInt(pagesCountEl.value, 10) || 1
        );

        const extraAuthors = Math.max(0, authors - 5);
        const extraPages = Math.max(0, pages - 10);

        if (type === "indian") {

            const base = 2000;
            const extraAuthorFee = extraAuthors * 300;
            const extraPageFee = extraPages * 200;

            const total = base + extraAuthorFee + extraPageFee;

            totalDisplayEl.textContent =
                "₹" + total.toLocaleString("en-IN");

            if (breakdownTextEl) {
                breakdownTextEl.textContent =
                    `Base ₹2,000 + ${extraAuthors} extra author(s) (₹${extraAuthorFee}) + ${extraPages} extra page(s) (₹${extraPageFee})`;
            }

        } else {

            const base = 35;
            const extraAuthorFee = extraAuthors * 3;
            const extraPageFee = extraPages * 2;

            const total = base + extraAuthorFee + extraPageFee;

            totalDisplayEl.textContent =
                "$" + total + " / €" + total;

            if (breakdownTextEl) {
                breakdownTextEl.textContent =
                    `Base $35 + ${extraAuthors} extra author(s) ($${extraAuthorFee}) + ${extraPages} extra page(s) ($${extraPageFee})`;
            }
        }
    }

    if (authorTypeEl) {
        authorTypeEl.addEventListener("change", calculateAPC);
    }

    if (authorsCountEl) {
        authorsCountEl.addEventListener("input", calculateAPC);
    }

    if (pagesCountEl) {
        pagesCountEl.addEventListener("input", calculateAPC);
    }

    calculateAPC();


    /* ======================================
       3. TECHNICAL TRACK ACCORDIONS
    ====================================== */

    const trackToggles = document.querySelectorAll(".track-toggle");

    trackToggles.forEach(function (button) {

        const card = button.closest(".track-card");

        if (!card) return;

        const content = card.querySelector(".track-content");
        const icon = button.querySelector(".track-icon");

        if (!content) return;

        // Set the correct initial accessibility state
        button.setAttribute(
            "aria-expanded",
            String(!content.classList.contains("hidden"))
        );

        button.addEventListener("click", function () {

            const isOpen = !content.classList.contains("hidden");

            if (isOpen) {
                content.classList.add("hidden");
            } else {
                content.classList.remove("hidden");
            }

            button.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            if (icon) {
                icon.style.transform = isOpen
                    ? "rotate(-90deg)"
                    : "rotate(0deg)";
            }

        });

    });


    /* ======================================
       4. MOBILE NAVIGATION DRAWER
    ====================================== */

    const drawer = document.getElementById("academic-drawer");
    const drawerPanel = document.getElementById("academic-drawer-panel");

    const toggleBtn = document.getElementById("menu-toggle-btn");
    const closeBtn = document.getElementById("menu-close-btn");

    function openDrawer() {

        if (!drawer || !drawerPanel) return;

        drawer.classList.remove(
            "opacity-0",
            "pointer-events-none"
        );

        drawerPanel.classList.remove("-translate-x-full");

        drawer.setAttribute("aria-hidden", "false");

        if (toggleBtn) {
            toggleBtn.setAttribute("aria-expanded", "true");
        }

        document.body.style.overflow = "hidden";
    }

    function closeDrawer() {

        if (!drawer || !drawerPanel) return;

        drawer.classList.add(
            "opacity-0",
            "pointer-events-none"
        );

        drawerPanel.classList.add("-translate-x-full");

        drawer.setAttribute("aria-hidden", "true");

        if (toggleBtn) {
            toggleBtn.setAttribute("aria-expanded", "false");
        }

        document.body.style.overflow = "";
    }

    if (toggleBtn) {
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.addEventListener("click", openDrawer);
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeDrawer);
    }

    // Close when the background overlay is clicked
    if (drawer) {

        drawer.addEventListener("click", function (event) {

            if (event.target === drawer) {
                closeDrawer();
            }

        });

    }

    // Close after selecting a navigation link
    document.querySelectorAll(".drawer-nav-item").forEach(function (link) {

        link.addEventListener("click", closeDrawer);

    });

    // Close drawer using Escape
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeDrawer();
        }

    });


    /* ======================================
       5. LEARN MORE BUTTON
    ====================================== */

    const learnMoreBtn = document.getElementById("learn-more-btn");

    const learnMoreContent = document.getElementById(
        "learn-more-content"
    );

    const learnMoreIcon = document.getElementById("learn-more-icon");

    const learnMoreText = document.getElementById("learn-more-text");

    if (learnMoreBtn && learnMoreContent) {

        learnMoreBtn.addEventListener("click", function () {

            const isExpanded =
                learnMoreBtn.getAttribute("aria-expanded") === "true";

            learnMoreContent.classList.toggle("hidden");

            learnMoreBtn.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );

            if (learnMoreIcon) {
                learnMoreIcon.textContent = isExpanded
                    ? "expand_more"
                    : "expand_less";
            }

            if (learnMoreText) {
                learnMoreText.textContent = isExpanded
                    ? "Learn More"
                    : "Show Less";
            }

        });

    }


    /* ======================================
       6. INITIALIZE DRAWER STATE
    ====================================== */

    closeDrawer();

    console.log("ICSCAI 2026: JavaScript initialized successfully.");

});
