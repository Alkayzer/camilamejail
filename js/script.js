document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const formMessage = document.getElementById("form-message");

    const messages = {
      en: {
        success: "Thank you! Your message has been sent successfully.",
        error: "Oops! There was a problem sending your message."
      },
      es: {
        success: "¡Gracias! Tu mensaje ha sido enviado con éxito.",
        error: "¡Vaya! Hubo un problema al enviar tu mensaje."
      }
    };

    try {
      const response = await fetch("https://formspree.io/f/mbljyakp", {
        method: "POST",
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      if (response.ok) {
        formMessage.textContent = messages[currentLang].success;
        formMessage.style.color = "green";
        form.reset();
      } else {
        formMessage.textContent = messages[currentLang].error;
        formMessage.style.color = "red";
      }
    } catch (error) {
      formMessage.textContent = messages[currentLang].error;
      formMessage.style.color = "red";
    }
  });


  document.addEventListener("scroll", () => {
    const fadeElements = document.querySelectorAll("[data-fade='true']");
    fadeElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      if (isVisible) {
        el.classList.add("opacity-100");
      }
    });
  });

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("#navbar a");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 50
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("border-b-2", "border-customGreen");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("border-b-2", "border-customGreen");
      }
    });
  });

  const flagButton = document.getElementById("language-toggle");
  const flagImage = document.getElementById("flag");

  const flags = {
    en: {
      src: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
      lang: "en",
      alt: "English"
    },
    es: {
      src: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
      lang: "es",
      alt: "Español"
    }
  };

  let currentLang = "en";

  flagButton.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "es" : "en";

    flagImage.src = flags[currentLang].src;
    flagImage.alt = flags[currentLang].alt;

    loadLanguage(currentLang);
  });

  async function loadLanguage(lang) {
    try {
      const response = await fetch(`../lang/${lang}.json`);
      const translations = await response.json();

      document.getElementById("nav-home").textContent = translations.home;
      document.getElementById("nav-about-me").textContent = translations.about_me;
      document.getElementById("nav-projects").textContent = translations.projects;
      document.getElementById("nav-services").textContent = translations.services;
      document.getElementById("nav-tools").textContent = translations.tools;
      document.getElementById("nav-contact-me").textContent = translations.contact_me;

      document.getElementById("greeting").innerHTML = translations.greeting;
      document.getElementById("conversational-ux").textContent = translations.conversational_ux;
      document.getElementById("content-analyst").textContent = translations.content_analyst;
      document.getElementById("scrum-master").textContent = translations.scrum_master;
      document.getElementById("html-css").textContent = translations.html_css;

      document.getElementById("about-me-title").textContent = translations.about_me_title;
      document.getElementById("about-me-description1").textContent = translations.about_me_description1;
      document.getElementById("about-me-description2").textContent = translations.about_me_description2;
      document.getElementById("about-me-description3").textContent = translations.about_me_description3;

      document.getElementById("projects-title").textContent = translations.projects_title;
      document.getElementById("resume-prompt").textContent = translations.resume_prompt;
      document.getElementById("download-resume").textContent = translations.download_resume;

      document.getElementById("services-title").textContent = translations.services_title;
      document.getElementById("services-description").textContent = translations.services_description;

      document.getElementById("service-title1").textContent = translations.service_title1;
      document.getElementById("service-description1").textContent = translations.service_description1;
      document.getElementById("service-title2").textContent = translations.service_title2;
      document.getElementById("service-description2").textContent = translations.service_description2;
      document.getElementById("service-title3").textContent = translations.service_title3;
      document.getElementById("service-description3").textContent = translations.service_description3;
      document.getElementById("service-title4").textContent = translations.service_title4;
      document.getElementById("service-description4").textContent = translations.service_description4;

      document.getElementById("tools-title").textContent = translations.tools_title;
      document.getElementById("tools-description").textContent = translations.tools_description;

      document.getElementById("contact-title").textContent = translations.contact_title;
      document.getElementById("contact-description").textContent = translations.contact_description;
      document.getElementById("fullnamelabel").textContent = translations.fullnamelabel;
      document.getElementById("emaillabel").textContent = translations.emaillabel;
      document.getElementById("messagelabel").textContent = translations.messagelabel;
      document.getElementById("send").textContent = translations.send;

    } catch (error) {
      console.error("Error loading language file:", error);
    }
  }

  document.getElementById("menu-toggle").addEventListener("click", function() {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.toggle("open");
  });

  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
});
