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

  const services = [
    {
      title: "Provision Supply",
      text: "We supply fresh, frozen, and dry provisions tailored to crew size and voyage duration. All products are sourced from verified suppliers and handled under strict quality and hygiene standards.",
      items: [
        "Fresh produce, meat, poultry, and seafood",
        "Frozen and dry food products",
        "Dairy and bakery items",
        "Beverages and bottled water",
        "Multinational and special dietary products",
        "Galley consumables"
      ]
    },
    {
      title: "Technical Supply",
      text: "We provide essential technical stores for routine servicing and urgent requirements, working with trusted manufacturers to ensure quality and compliance.",
      items: [
        "Engine parts and mechanical components",
        "Tools and workshop equipment",
        "Deck and mooring equipment",
        "Deck stores and cabin stores",
        "Lubricants and chemicals",
        "Electrical components",
        "Safety and PPE equipment"
      ]
    },
    {
      title: "Repair Services",
      text: "We arrange qualified marine technicians to perform repairs aligned with vessel schedules, helping reduce operational delays.",
      items: [
        "Mechanical and engine repairs",
        "Electrical maintenance",
        "Deck equipment servicing",
        "Welding and fabrication",
        "Emergency technical support"
      ]
    }
  ];

  let currentBenefit = 0;
  let currentService = 0;
  let isAnimatingBenefit = false;

  const benefitTitle = document.getElementById("benefitTitle");
  const benefitText = document.getElementById("benefitText");
  const benefitCard = document.getElementById("benefitCard");
  const prevBenefit = document.getElementById("prevBenefit");
  const nextBenefit = document.getElementById("nextBenefit");

  const serviceTitle = document.getElementById("serviceTitle");
  const serviceText = document.getElementById("serviceText");
  const serviceList = document.getElementById("serviceList");
  const prevService = document.getElementById("prevService");
  const nextService = document.getElementById("nextService");

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
      isAnimatingBenefit ||
      !benefitTitle ||
      !benefitText ||
      !benefitCard ||
      !prevBenefit ||
      !nextBenefit
    ) {
      return;
    }

    isAnimatingBenefit = true;

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
        isAnimatingBenefit = false;
      }, 380);
    }, 190);
  }

  function setService(index) {
    if (!serviceTitle || !serviceText || !serviceList) return;

    serviceTitle.textContent = services[index].title;
    serviceText.textContent = services[index].text;
    serviceList.innerHTML = "";

    services[index].items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      serviceList.appendChild(li);
    });
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

  if (serviceTitle && serviceText && serviceList && prevService && nextService) {
    setService(currentService);

    prevService.addEventListener("click", () => {
      currentService = (currentService - 1 + services.length) % services.length;
      setService(currentService);
    });

    nextService.addEventListener("click", () => {
      currentService = (currentService + 1) % services.length;
      setService(currentService);
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
