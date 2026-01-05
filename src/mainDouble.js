import './styleDouble.css'
import gsap from 'gsap';


const items = gsap.utils.toArray('.project');
const items2 = gsap.utils.toArray('.project2');
const count = items.length;
const carousel = document.querySelector('.carousel');
const carousel2 = document.querySelector('.carousel2');


function calculateRadius() {
  if (window.innerWidth < 768) {
    return {
      x: window.innerWidth * 1.2,
      y: window.innerHeight * 0.5
    };
  } else {
    return {
      x: window.innerWidth * 0.8,
      y: window.innerHeight * 0.7
    };
  }
}

function updateCarouselPosition() {
  const leftOffset = window.innerWidth * 0.5 + radiusX + window.innerWidth * 0.13;
  carousel.style.left = `${leftOffset}px`;
  carousel2.style.right = `${leftOffset}px`;

}

let radiusX = calculateRadius().x;
let radiusY = calculateRadius().y;


const scroll = {
  current: 0,
  target: 0,
  ease: 0.03
};


const drag = {
  active: false,
  startY: 0,
  startScroll: 0
};


const angles = items.map((_, i) => (i / count) * Math.PI * 2);

window.addEventListener('wheel', (e) => {
  const delta = gsap.utils.clamp(-0.05, 0.05, e.deltaY * 0.001);
  scroll.target += delta;
});

// Mouse Down
window.addEventListener('mousedown', (e) => {
  drag.active = true;
  drag.startY = e.clientY;
  drag.startScroll = scroll.target;
});

// Mouse Move
window.addEventListener('mousemove', (e) => {
  if (!drag.active) return;
  
  const deltaY = e.clientY - drag.startY;
  scroll.target = drag.startScroll - deltaY * 0.002;
});

// Mouse Up
window.addEventListener('mouseup', () => {
  drag.active = false;
});

// Touch Start
window.addEventListener('touchstart', (e) => {
  drag.active = true;
  drag.startY = e.touches[0].clientY;
  drag.startScroll = scroll.target;
});

// Touch Move
window.addEventListener('touchmove', (e) => {
  if (!drag.active) return;
  
  const deltaY = e.touches[0].clientY - drag.startY;
  scroll.target = drag.startScroll - deltaY * 0.002;
});

// Touch End
window.addEventListener('touchend', () => {
  drag.active = false;
});








updateCarouselPosition();


items.forEach((el, i) => {
  const a = angles[i];
  gsap.set(el, {
    x: Math.cos(a) * radiusX,
    y: Math.sin(a) * radiusY,
    rotate: 0,
    zIndex: count - i
  });
});

items2.forEach((el, i) => {
  const a = angles[i];
  gsap.set(el, {
    x: Math.cos(a) * radiusX,
    y: Math.sin(a) * radiusY,
    rotate: 0,
    zIndex: count - i
  });
});



window.addEventListener('resize', () => {
  const radius = calculateRadius();
  radiusX = radius.x;
  radiusY = radius.y;
  
  updateCarouselPosition();
  
  items.forEach((el, i) => {
    const a = angles[i] + scroll.current;
    gsap.set(el, {
      x: Math.cos(a) * radiusX,
      y: Math.sin(a) * radiusY
    });
  });
});

// resize
window.addEventListener('resize', () => {
  if (window.innerWidth < 768) {
    radiusX = window.innerWidth * 1.2;
    radiusY = window.innerHeight * 0.5;
  } else {
    radiusX = window.innerWidth * 0.8;
    radiusY = window.innerHeight * 0.7;
  }
  
  items.forEach((el, i) => {
    const a = angles[i] + scroll.current;
    gsap.set(el, {
      x: Math.cos(a) * radiusX,
      y: Math.sin(a) * radiusY
    });
  });

  items2.forEach((el, i) => {
    const a = angles[i] + scroll.current;
    gsap.set(el, {
      x: Math.cos(a) * radiusX,
      y: Math.sin(a) * radiusY
    });
  });
});

// Update loop
gsap.ticker.add(() => {
  scroll.current += (scroll.target - scroll.current) * scroll.ease;
  items.forEach((el, i) => {
    const a = angles[i] + scroll.current;
    gsap.set(el, {
      x: Math.cos(a) * radiusX,
      y: Math.sin(a) * radiusY
    });
  });
});

gsap.ticker.add(() => {
  scroll.current += (scroll.target - scroll.current) * scroll.ease;
  items2.forEach((el, i) => {
    const a = angles[i] + scroll.current;
    gsap.set(el, {
      x: Math.cos(a) * radiusX,
      y: Math.sin(a) * radiusY
    });
  });
});