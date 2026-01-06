import gsap from 'gsap';

const loaderShown = sessionStorage.getItem('loaderShown');

if (!loaderShown) {
  const loaderCircle = document.querySelector('.loader-circle');
  const total = 100;
  const step = 2; 
  const numbers = [];
  const radius = 200;
  const minDuration = 5;
  const startTime = performance.now();

  const images = document.querySelectorAll('img');
  const totalImages = images.length;
  let loadedImages = 0;

  for (let i = 0; i <= total; i += step) {
    const div = document.createElement('div');
    div.className = 'loader-number';
    div.textContent = i;
    loaderCircle.appendChild(div);
    numbers.push(div);
  }

  const anglesCircle = numbers.map((_, i) => (i / numbers.length) * Math.PI * 2);
  const startOffset = Math.PI; 

  let realProgress = 0;   
  let animatedProgress = 0; 

  function updateLoader(progress) {
    const currentIndex = Math.round(progress / step);

    numbers.forEach((numEl, i) => {
      const a = anglesCircle[i] - (progress / total) * Math.PI * 2 + startOffset;
      const x = radius * Math.cos(a) + loaderCircle.offsetWidth / 2;
      const y = radius * Math.sin(a) + loaderCircle.offsetHeight / 2;
      numEl.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;

      if (i === currentIndex) {
        numEl.style.color = '#ca4355';
        numEl.style.fontSize = '26px';
        numEl.style.fontWeight = '700';
      } else {
        numEl.style.color = 'black';
        numEl.style.fontSize = '14px';
        numEl.style.fontWeight = '400';
      }
    });
  }

  function imageLoaded() {
    loadedImages++;
    realProgress = Math.floor((loadedImages / totalImages) * 100);
  }

  images.forEach(img => {
    if (img.complete) {
      imageLoaded();
    } else {
      img.addEventListener('load', imageLoaded);
      img.addEventListener('error', imageLoaded);
    }
  });

  if (totalImages === 0) realProgress = 100;

  gsap.ticker.add(function tick() {
    const elapsed = (performance.now() - startTime) / 1000;
    const minProgress = Math.min(100, (elapsed / minDuration) * 100);
    const targetProgress = Math.max(realProgress, minProgress);

    animatedProgress += (targetProgress - animatedProgress) * 0.1;

    if (Math.abs(animatedProgress - targetProgress) < 0.1) {
      animatedProgress = targetProgress;
    }

    updateLoader(animatedProgress);

    if (animatedProgress >= 100) {
      gsap.ticker.remove(tick);
      setTimeout(() => {
        gsap.to('.loader', { 
          opacity: 0, 
          duration: 1, 
          ease: 'power2.inOut', 
          onStart: () => {
            document.querySelector('.loader').style.pointerEvents = 'none';
          },
          onComplete: () => {
            sessionStorage.setItem('loaderShown', 'true');
          }
        });
      }, 1000);
    }
  });

} else {
  const loader = document.querySelector('.loader');
  if (loader) loader.style.display = 'none';
}
