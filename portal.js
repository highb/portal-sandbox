// Adding some styles with transitions
const style = document.createElement('style');
style.innerHTML = `
  portal {
    position:fixed;
    width: 100%;
    height: 100%;
    opacity: 0;
    box-shadow: 0 0 20px 10px #999;
    transform: scale(0.4);
    transform-origin: bottom left;
    bottom: 20px;
    left: 20px;
    animation-name: fade-in;
    animation-duration: 1s;
    animation-delay: 0s;
    animation-fill-mode: forwards;
  }
  .portal-transition {
    transition: transform 0.4s;
  }
  @media (prefers-reduced-motion: reduce) {
    .portal-transition {
      transition: transform 0.001s;
    }
  }
  .portal-reveal {
    transform: scale(1.0) translateX(-20px) translateY(20px);
  }
  @keyframes fade-in {
    0%   { opacity: 0; }
    100% { opacity: 1; }
  }
`;
const portal = document.createElement('portal');
// Let's navigate into the WICG Portals spec page
portal.src = './index.html';
// Add a class that defines the transition. Consider using
// `prefers-reduced-motion` media query to control the animation.
// https://developers.google.com/web/updates/2019/03/prefers-reduced-motion
portal.classList.add('portal-transition');
portal.addEventListener('click', evt => {
  // Animate the portal once user interacts
  portal.classList.add('portal-reveal');
});
portal.addEventListener('transitionend', evt => {
  if (evt.propertyName == 'transform') {
    // Activate the portal once the transition has completed
    portal.activate();
  }
});
document.body.append(style, portal);