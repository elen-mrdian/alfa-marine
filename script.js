document.addEventListener("DOMContentLoaded", () => {
  const benefits = [
    {
      title: "Fast turnaround",
      text: "Service aligned with port schedules and operational timing."
    },
    {
      title: "Competitive sourcing",
      text: "Efficient procurement through an established supplier network."
    },
    {
      title: "Experienced team",
      text: "Marine procurement handled by professionals familiar with vessel requirements."
    },
    {
      title: "Transparent communication",
      text: "Clear updates, responsive coordination, and order tracking throughout the process."
    },
    {
      title: "Compliance-focused delivery",
      text: "Operations aligned with maritime safety and customs standards."
    }
  ];

  let currentBenefit = 0;
  let isAnimating = false;

  const benefitTitle = document.getElementById("benefitTitle");
  const benefitText = document.getElementById("benefitText");
  const benefitCard = document.getElementById("benefitCard");
  const prevBenefit = document.getElementById("prevBenefit");
  const nextBenefit = document.getElementById("nextBenefit");
  const siteHeader = document.getElementById("siteHeader");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = mainNav ? mainNav.querySelectorAll("a") : [];

  function setBenefit(index) {
    if (!benefitTitle || !benefitText) return;
    benefitTitle.textContent = benefits[index].title;
    benefitText.textContent = benefits[index].text;
  }

  function animateBenefitChange(direction) {
    if (
      isAnimating ||
      !benefitTitle ||
      !benefitText ||
      !benefitCard ||
      !prevBenefit ||
      !nextBenefit
    ) {
      return;
    }

    isAnimating = true;

    const outClass = direction === "next" ? "slide-out-left" : "slide-out-right";
    const inClass = direction === "next" ? "slide-in-right" : "slide-in-left";

    benefitCard.classList.remove(
      "slide-out-left",
      "slide-out-right",
      "slide-in-left",
      "slide-in-right"
    );
    benefitCard.classList.add(outClass);

    setTimeout(() => {
      currentBenefit =
        direction === "next"
          ? (currentBenefit + 1) % benefits.length
          : (currentBenefit - 1 + benefits.length) % benefits.length;

      benefitCard.classList.remove(outClass);
      benefitCard.classList.add(inClass);

      setBenefit(currentBenefit);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          benefitCard.classList.remove(inClass);
        });
      });

      setTimeout(() => {
        isAnimating = false;
      }, 380);
    }, 190);
  }

  function updateHeaderState() {
    if (!siteHeader) return;
    if (window.scrollY > 24) {
      siteHeader.classList.add("is-scrolled");
    } else {
      siteHeader.classList.remove("is-scrolled");
    }
  }

  function closeMobileMenu() {
    if (!siteHeader || !mobileMenuToggle) return;
    siteHeader.classList.remove("menu-open");
    mobileMenuToggle.setAttribute("aria-expanded", "false");
  }

  function toggleMobileMenu() {
    if (!siteHeader || !mobileMenuToggle) return;
    const isOpen = siteHeader.classList.toggle("menu-open");
    mobileMenuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  if (benefitTitle && benefitText && benefitCard && prevBenefit && nextBenefit) {
    setBenefit(currentBenefit);

    prevBenefit.addEventListener("click", () => {
      animateBenefitChange("prev");
    });

    nextBenefit.addEventListener("click", () => {
      animateBenefitChange("next");
    });
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", toggleMobileMenu);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeMobileMenu();
    }
  });

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
});