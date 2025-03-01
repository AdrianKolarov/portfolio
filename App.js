export function initApp() {
    document.addEventListener("DOMContentLoaded", function () {
      let options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };
  
      let callback = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      };
  
      let observer = new IntersectionObserver(callback, options);
      document.querySelectorAll(".hidden").forEach((section) => {
        observer.observe(section);
      });
  
      setupModalEvents();
    });
  
    let currentIndex = 0;
    let certImages = [];
    const modal = document.querySelector(".modal");
    const modalImage = document.getElementById("modalImage");
  
    function setupModalEvents() {
      let currentLanguage = document
        .getElementById("english-version")
        .classList.contains("lang-hidden")
        ? document.getElementById("german-version")
        : document.getElementById("english-version");
  
      certImages = currentLanguage.querySelectorAll(".cert");
      certImages.forEach((image, index) => {
        image.addEventListener("click", () => {
          currentIndex = index;
          modal.style.display = "flex";
          modalImage.src = image.src;
          document.body.style.overflow = "hidden";
        });
      });
    }
  
    function closeModal() {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  
    function changeImage(direction) {
      currentIndex += direction;
      if (currentIndex < 0) {
        currentIndex = certImages.length - 1;
      } else if (currentIndex >= certImages.length) {
        currentIndex = 0;
      }
      modalImage.src = certImages[currentIndex].src;
    }
  
    let isZoomedIn = false;
    modalImage.addEventListener("click", () => {
      if (isZoomedIn) {
        modalImage.style.transform = "translateY(0) scale(1)";
        modalImage.style.cursor = "pointer";
      } else {
        modalImage.style.transform = "translateY(1000px) scale(4)";
        modalImage.style.cursor = "zoom-out";
      }
      isZoomedIn = !isZoomedIn;
    });
  
    window.onclick = function (event) {
      if (event.target === modal) {
        closeModal();
      }
    };
  
    function switchLanguage(lang) {
      const english = document.getElementById("english-version");
      const german = document.getElementById("german-version");
      const btnEn = document.getElementById("btn-en");
      const btnDe = document.getElementById("btn-de");
  
      if (lang === "en") {
        english.classList.remove("lang-hidden");
        german.classList.add("lang-hidden");
        btnEn.querySelector(".flag").classList.add("active");
        btnDe.querySelector(".flag").classList.remove("active");
      } else if (lang === "de") {
        english.classList.add("lang-hidden");
        german.classList.remove("lang-hidden");
        btnEn.querySelector(".flag").classList.remove("active");
        btnDe.querySelector(".flag").classList.add("active");
      }
  
      setupModalEvents();
    }
  
    
    window.switchLanguage = switchLanguage;
    window.closeModal = closeModal;
    window.changeImage = changeImage;
  }
  