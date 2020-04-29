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
    transform-origin: center center;
    animation-name: fade-in;
    animation-duration: 1s;
    animation-delay: 0s;
    animation-fill-mode: forwards;
  }
  body {
    background-image: url("portal.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  img {
    margin-left: auto;
    margin-right: auto;
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

function create_portal() {
  const portal = document.createElement('portal');
  // Let's navigate into the WICG Portals spec page
  portal.src = 'https://highb.github.io/portal-sandbox/';
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

  return portal
}

if (window.portalHost) {
  // Receive message via window.portalHost
  window.portalHost.addEventListener('message', evt => {
    console.log("I'm inside a portal, so I won't create another one... yet")
    const depth = evt.data.depth;
    if (depth > 0) {
      portal = create_portal();
      portal.postMessage({ 'depth': depth - 1 }, ORIGIN);
    }
  });
}

var ORIGIN = "https://highb.github.io/portal-sandbox/"

if (!window.portalHost) {
  portal = create_portal()

  portal.onload = (evt => {
    portal.postMessage({'depth': 10}, ORIGIN);
  });
}