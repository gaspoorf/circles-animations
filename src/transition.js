// page transition animation

import { gsap } from "gsap";

window.addEventListener("DOMContentLoaded", () => {
  const transitionDivs = document.querySelectorAll(".transition-content");
  const container = document.querySelector(".transition-container");

  if (!container || transitionDivs.length === 0) return;
 
    container.style.display = "flex";

    gsap.set(transitionDivs, {
      x: "0%",
      display: "block",
    });

    setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          container.style.display = "none";
          transitionDivs.forEach(div => div.style.display = "none");
          sessionStorage.setItem("hasVisited", "true");
        }
      });

      transitionDivs.forEach((div, i) => {
        tl.to(div, {
          x: "100%",
          duration: 0.8,
          ease: "power2.inOut",
        }, i * 0.15);
      });
    }, 500);

});


// redirection with transtition
window.redirection = function (url) {
  transitionAndRedirect("/" + url);
};

function transitionAndRedirect(url) {
  const transitionDivs = document.querySelectorAll(".transition-content");
  const container = document.querySelector(".transition-container");

  if (!container || transitionDivs.length === 0) return;

  container.style.display = "flex";

  gsap.set(transitionDivs, {
    x: "100%",
    display: "block",
  });

  setTimeout(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        window.location.href = url;
      }
    });

    transitionDivs.forEach((div, i) => {
      tl.to(div, {
        x: "0%",
        duration: 0.8,
        ease: "power2.inOut",
      }, i * 0.15);
    });
  }, 500);
}