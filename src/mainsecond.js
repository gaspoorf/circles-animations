import './secondstyles.css'
import gsap from 'gsap';

const items = gsap.utils.toArray('.project');
const items2 = gsap.utils.toArray('.project2');

const count = items.length;


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

let radiusX = calculateRadius().x;
let radiusY = calculateRadius().y;

const scroll = {
  current: 0,
  target: 0,
  ease: 0.05,
};

const drag = {
  active: false,
  startY: 0,
  startScroll: 0
};

const angles = items.map((_, i) => (i / count) * Math.PI * 2);

//wheel
window.addEventListener('wheel', (e) => {
  const delta = gsap.utils.clamp(-0.08, 0.08, e.deltaY * 0.0015);
  scroll.target += delta;
});


//touch
window.addEventListener('touchstart', (e) => {
  drag.active = true;
  drag.startY = e.touches[0].clientY;
  drag.startScroll = scroll.target;
});

window.addEventListener('touchmove', (e) => {
  if (!drag.active) return;
  const deltaY = e.touches[0].clientY - drag.startY;
  scroll.target = drag.startScroll - deltaY * 0.005;
});

window.addEventListener('touchend', () => {
  drag.active = false;
});


function initializePositions() {
  items.forEach((el, i) => {
    const a = angles[i];
    gsap.set(el, {
      x: Math.cos(a) * radiusX,
      y: window.innerHeight / 2 - el.offsetHeight / 2 + Math.sin(a) * radiusY,
      rotate: 0,
      zIndex: count - i
    });
  });

  items2.forEach((el, i) => {
    const a = angles[i];
    gsap.set(el, {
      x: Math.cos(a) * radiusX,
      y: window.innerHeight / 2 - el.offsetHeight / 2 + Math.sin(a) * radiusY,
      rotate: 0,
      zIndex: count - i
    });
  });
}

window.addEventListener('load', () => {
  setTimeout(initializePositions, 100);
});

// Resize
window.addEventListener('resize', () => {
  if (window.innerWidth < 768) {
    radiusX = window.innerWidth * 1.2;
    radiusY = window.innerHeight * 0.5;
  } else {
    radiusX = window.innerWidth * 0.8;
    radiusY = window.innerHeight * 0.7;
  }
  
  items.forEach((el, i) => {
    if (el.classList.contains('active')) return;
    const a = angles[i] + scroll.current;
    gsap.set(el, {
      x: Math.cos(a) * radiusX,
      y: window.innerHeight / 2 - el.offsetHeight / 2 + Math.sin(a) * radiusY

    });
  });

  items2.forEach((el, i) => {
    if (el.classList.contains('active')) return;
    const a = angles[i] + scroll.current;
    gsap.set(el, {
      x: Math.cos(a) * radiusX,
      y: window.innerHeight / 2 - el.offsetHeight / 2 + Math.sin(a) * radiusY

    });
  });
});


gsap.ticker.add(() => {
  scroll.current += (scroll.target - scroll.current) * scroll.ease;
  items.forEach((el, i) => {
    if (el.classList.contains('active')) return;
    const a = angles[i] + scroll.current;
    gsap.set(el, {
      x: Math.cos(a) * radiusX,
      y: window.innerHeight / 2 - el.offsetHeight / 2 + Math.sin(a) * radiusY

    });
  });

  items2.forEach((el, i) => {
    if (el.classList.contains('active')) return;
    const a = angles[i] + scroll.current;
    gsap.set(el, {
      x: Math.cos(a) * radiusX,
      y: window.innerHeight / 2 - el.offsetHeight / 2 + Math.sin(a) * radiusY

    });
  });
});



const projects = document.querySelectorAll('.project');
const projects2 = document.querySelectorAll('.project2');

const activeBackground = document.querySelector('.active-background');
const activeBackground2 = document.querySelector('.active-background2');
const activeProject = document.getElementById('project-background');
const activeProject2 = document.getElementById('project-background2');


const suptitle = document.getElementById('suptitle');
const name = document.getElementById('name');
const description = document.getElementById('description');
const suptitle2 = document.getElementById('suptitle2');
const name2 = document.getElementById('name2');
const description2 = document.getElementById('description2');

const navigation = document.querySelector('.navigation');
const demo = document.querySelector('.demo');

// open project
projects.forEach((project, index) => {
  project.addEventListener('click', () => {

    gsap.to(projects2, {
      opacity: 0,
      duration: 0.7,
      ease: 'power2.inOut',
    });
    gsap.to(demo, {
      opacity: 0,
      duration: 0.7,
      ease: 'power2.inOut',
    });


    if (window.innerWidth < 768) {
      gsap.to(navigation, {
        opacity: 0,
        duration: 0.7,
        ease: 'power2.inOut',
      });
    }

    const img = project.querySelector('img');
    const bgSrc = img.getAttribute('data-bg-src');
    activeProject.src = bgSrc;

    const projectSuptitle = project.querySelector('.suptitle');
    const suptitleContent = projectSuptitle.getAttribute('data-content');
    const projectName = project.querySelector('.name');
    const nameContent = projectName.getAttribute('data-content');
    const projectDescription = project.querySelector('.description');
    const descriptionContent = projectDescription.getAttribute('data-content');

    suptitle.textContent = suptitleContent;
    name.textContent = nameContent;
    description.textContent = descriptionContent;
    

    projects.forEach((p, i) => {
      if (p !== project && p.classList.contains('active')) {
        const a = angles[i] + scroll.current;
        gsap.to(p, {
          x: Math.cos(a) * radiusX,
          y: Math.sin(a) * radiusY, 
          scale: 1,
          duration: 0.7,
          ease: 'power2.inOut',
          onComplete: () => {
            p.classList.remove('active');
          }
        });
      }
    });
    
    if (!project.classList.contains('active')) {
      project.classList.add('active');
      
      const projectRect = project.getBoundingClientRect();
      const xCenter = (window.innerWidth / 2) - (projectRect.left + projectRect.width / 2);
      
      gsap.to(project, {
        x: `+=${xCenter}`,
        y: window.innerHeight / 2 - project.offsetHeight / 2,
        duration: 0.7,
        scale: 1.3, 
        ease: 'power2.inOut',
      });

      gsap.to(activeBackground, { 
        opacity: 1,
        duration: 0.7,
        ease: 'power2.inOut',
        onComplete: () => {
          activeBackground.style.pointerEvents = 'auto';
        }
      });
    }
  });
});

projects2.forEach((project, index) => {
  project.addEventListener('click', () => {

    if (window.innerWidth < 768) {
      gsap.to(navigation, {
        opacity: 0,
        duration: 0.7,
        ease: 'power2.inOut',
      });
    }
    gsap.to(demo, {
      opacity: 0,
      duration: 0.7,
      ease: 'power2.inOut',
    });

    const img = project.querySelector('img');
    const bgSrc = img.getAttribute('data-bg-src');
    activeProject2.src = bgSrc;

    const projectSuptitle = project.querySelector('.suptitle');
    const suptitleContent = projectSuptitle.getAttribute('data-content');
    const projectName = project.querySelector('.name');
    const nameContent = projectName.getAttribute('data-content');
    const projectDescription = project.querySelector('.description');
    const descriptionContent = projectDescription.getAttribute('data-content');

    suptitle2.textContent = suptitleContent;
    name2.textContent = nameContent;
    description2.textContent = descriptionContent;
    

    projects.forEach((p, i) => {
      if (p !== project && p.classList.contains('active')) {
        const a = angles[i] + scroll.current;
        gsap.to(p, {
          x: Math.cos(a) * radiusX,
          y: Math.sin(a) * radiusY, 
          scale: 1,
          duration: 0.7,
          ease: 'power2.inOut',
          onComplete: () => {
            p.classList.remove('active');
          }
        });
      }
    });
    
    if (!project.classList.contains('active')) {
      project.classList.add('active');
      
      const projectRect = project.getBoundingClientRect();
      const xCenter = (window.innerWidth / 2) - (projectRect.left + projectRect.width / 2);
      
      gsap.to(project, {
        x: `+=${xCenter}`,
        y: window.innerHeight / 2 - project.offsetHeight / 2,
        duration: 0.7,
        scale: 1.3, 
        ease: 'power2.inOut',
      });

      gsap.to(activeBackground2, { 
        opacity: 1,
        duration: 0.7,
        ease: 'power2.inOut',
        onComplete: () => {
          activeBackground2.style.pointerEvents = 'auto';
        }
      });
    }
  });
});

// close project
activeBackground.addEventListener('click', () => {
  if (window.innerWidth < 768) {
    gsap.to(navigation, {
      opacity: 1,
      duration: 0.7,
      ease: 'power2.inOut',
    });
  }

  gsap.to(projects2, {
    opacity: 1,
    duration: 0.7,
    ease: 'power2.inOut',
  });

  projects.forEach((p, i) => {
    if (p.classList.contains('active')) {
      const a = angles[i] + scroll.current;
      gsap.to(p, {
        x: Math.cos(a) * radiusX,
        y: window.innerHeight / 2 - p.offsetHeight / 2 + Math.sin(a) * radiusY,
        scale: 1,
        duration: 0.7,
        ease: 'power2.inOut',
        onComplete: () => {
          p.classList.remove('active');
        }
      });
    }
  });
  gsap.to(demo, {
    opacity: 1,
    duration: 0.7,
    ease: 'power2.inOut',
  });

  gsap.to(activeBackground, {
    opacity: 0,
    duration: 0.7,
    ease: 'power2.inOut',
    onComplete: () => {
      activeBackground.style.pointerEvents = 'none';
    }
  });
});


activeBackground2.addEventListener('click', () => {
  if (window.innerWidth < 768) {
    gsap.to(navigation, {
      opacity: 1,
      duration: 0.7,
      ease: 'power2.inOut',
    });
  }

  projects2.forEach((p, i) => {
    if (p.classList.contains('active')) {
      const a = angles[i] + scroll.current;
      gsap.to(p, {
        x: Math.cos(a) * radiusX,
        y: window.innerHeight / 2 - p.offsetHeight / 2 + Math.sin(a) * radiusY,
        scale: 1,
        duration: 0.7,
        ease: 'power2.inOut',
        onComplete: () => {
          p.classList.remove('active');
        }
      });
    }
  });
  gsap.to(demo, {
    opacity: 1,
    duration: 0.7,
    ease: 'power2.inOut',
  });

  gsap.to(activeBackground2, {
    opacity: 0,
    duration: 0.7,
    ease: 'power2.inOut',
    onComplete: () => {
      activeBackground2.style.pointerEvents = 'none';
    }
  });
});