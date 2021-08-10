const tiltEffectSettings = {
	max: 25, // max tilt rotation (degrees (deg))
	perspective: 1000, // transform perspective, the lower the more extreme the tilt gets (pixels (px))
	scale: 1.1, // transform scale - 2 = 200%, 1.5 = 150%, etc..
	speed: 500, // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
	easing: "cubic-bezier(.03,.98,.52,.99)" // easing (transition-timing-function) of the enter/exit transition
  };
  
  const karts = document.querySelectorAll(".kart");
  
  karts.forEach(kart => {
	kart.addEventListener("mouseenter", kartMouseEnter);
	kart.addEventListener("mousemove", kartMouseMove);
	kart.addEventListener("mouseleave", kartMouseLeave);
  });
  
  function kartMouseEnter(event) {
	setTransition(event);
  }
  
  function kartMouseMove(event) {
	const kart = event.currentTarget;
	const kartWidth = kart.offsetWidth;
	const kartHeight = kart.offsetHeight;
	const centerX = kart.offsetLeft + kartWidth/2;
	const centerY = kart.offsetTop + kartHeight/2;
	const mouseX = event.clientX - centerX;
	const mouseY = event.clientY - centerY;
	const rotateXUncapped = (+1)*tiltEffectSettings.max*mouseY/(kartHeight/2);
	const rotateYUncapped = (-1)*tiltEffectSettings.max*mouseX/(kartWidth/2);
	const rotateX = rotateXUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : 
					(rotateXUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateXUncapped);
	const rotateY = rotateYUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : 
					(rotateYUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateYUncapped);
  
	kart.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
							scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
  }
  
  function kartMouseLeave(event) {
	event.currentTarget.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
	setTransition(event);
  }
  
  function setTransition(event) {
	const kart = event.currentTarget;
	clearTimeout(kart.transitionTimeoutId);
	kart.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
	kart.transitionTimeoutId = setTimeout(() => {
	  kart.style.transition = "";
	}, tiltEffectSettings.speed);
  }