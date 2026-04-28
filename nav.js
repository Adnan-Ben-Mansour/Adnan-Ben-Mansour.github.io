/* Nav indicator: a sliding pill that follows the current/hovered link.
   Theme toggle: persisted slide switch. */
(function(){
  var nav = document.querySelector('.nav');
  if (nav) {
    var indicator = document.createElement('span');
    indicator.className = 'nav-indicator';
    nav.insertBefore(indicator, nav.firstChild);

    var links = nav.querySelectorAll('a');

    function moveTo(el){
      if(!el) return;
      var nr = nav.getBoundingClientRect();
      var er = el.getBoundingClientRect();
      indicator.style.transform = 'translateX(' + (er.left - nr.left) + 'px)';
      indicator.style.width = er.width + 'px';
    }

    function moveToCurrent(){
      var cur = nav.querySelector('a.is-current') || links[0];
      moveTo(cur);
    }

    var transitionsEnabled = false;
    function init(){
      moveToCurrent();
      if (transitionsEnabled) return;
      // Commit the position with transitions still disabled by forcing a
      // synchronous layout flush, then defer enabling transitions to the
      // next frame. Without this, browsers (notably Chrome) batch the
      // style change and the .is-ready class addition into a single
      // recompute and animate from the CSS-default translateX(0) to the
      // current link's position - which is exactly the "starts at Home,
      // slides to clicked link" bug we want to kill.
      void indicator.offsetWidth;
      requestAnimationFrame(function () {
        indicator.classList.add('is-ready');
        transitionsEnabled = true;
      });
    }

    // Run on next frame, on load, and as a fallback after a short timeout -
    // any one of these will reliably trigger even if rAF is paused.
    requestAnimationFrame(init);
    if (document.readyState === 'complete') {
      init();
    } else {
      window.addEventListener('load', init);
    }
    setTimeout(init, 100);

    links.forEach(function(a){
      a.addEventListener('mouseenter', function(){ moveTo(a); });
      a.addEventListener('focus',      function(){ moveTo(a); });
    });
    nav.addEventListener('mouseleave', moveToCurrent);
    window.addEventListener('resize', moveToCurrent);
  }

  // Theme toggle
  var btn = document.querySelector('.theme-toggle');
  if (btn) {
    function syncPressed(){
      var t = document.documentElement.getAttribute('data-theme');
      btn.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
    }
    syncPressed();
    btn.addEventListener('click', function(){
      var cur = document.documentElement.getAttribute('data-theme') || 'dark';
      var next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch(e){}
      syncPressed();
      if (nav) {
        requestAnimationFrame(function(){
          var cur = nav.querySelector('a.is-current') || nav.querySelector('a');
          if (cur) {
            var nr = nav.getBoundingClientRect();
            var er = cur.getBoundingClientRect();
            var ind = nav.querySelector('.nav-indicator');
            if (ind) {
              ind.style.transform = 'translateX(' + (er.left - nr.left) + 'px)';
              ind.style.width = er.width + 'px';
            }
          }
        });
      }
    });
  }

  // Avatar viewfinder: camera-snap animation triggered after load,
  // and replayable on hover over the avatar (with a cooldown so it
  // doesn't fire on every micro-movement of the cursor).
  var vf = document.querySelector('.avatar-viewfinder');
  if (vf) {
    var avatarWrap = document.querySelector('.avatar-wrap') || vf.parentElement;
    var ANIM_MS = 1400;
    var COOLDOWN_MS = 1800; // animation + a beat of breathing room
    var lastSnap = 0;
    var inFlight = false;

    function snapVf() {
      var now = Date.now();
      if (inFlight || (now - lastSnap) < COOLDOWN_MS) return;
      inFlight = true;
      lastSnap = now;
      // toggle the class to restart the keyframes
      vf.classList.remove('is-snapping');
      // force reflow so the browser sees the removal as a real state change
      void vf.offsetWidth;
      vf.classList.add('is-snapping');
      setTimeout(function () { inFlight = false; }, ANIM_MS);
    }

    if (document.readyState === 'complete') {
      setTimeout(snapVf, 250);
    } else {
      window.addEventListener('load', function () { setTimeout(snapVf, 250); });
    }

    if (avatarWrap) {
      avatarWrap.addEventListener('pointerenter', snapVf);
    }
  }

  // Badge cursor-tracked shine + subtle 3D tilt.
  var badges = document.querySelectorAll('.hero-affil li');
  badges.forEach(function(b){
    function onEnter(e){
      if (b.classList.contains('is-winking')) return;
      var r = b.getBoundingClientRect();
      var x = (e.clientX != null ? e.clientX : r.left + r.width/2) - r.left;
      var y = (e.clientY != null ? e.clientY : r.top + r.height/2) - r.top;
      var px = Math.max(0, Math.min(100, (x / r.width) * 100));
      var py = Math.max(0, Math.min(100, (y / r.height) * 100));
      var rx = ((y / r.height) - 0.5) * -16;
      var ry = ((x / r.width) - 0.5) * 16;
      b.style.setProperty('--mx', px.toFixed(1) + '%');
      b.style.setProperty('--my', py.toFixed(1) + '%');
      b.style.setProperty('--tx', rx.toFixed(2) + 'deg');
      b.style.setProperty('--ty', ry.toFixed(2) + 'deg');
      b.classList.add('is-winking');
    }
    function onAnimEnd(e){
      if (e.animationName === 'badge-wink-tilt') {
        b.classList.remove('is-winking');
      }
    }
    b.addEventListener('pointerenter', onEnter);
    b.addEventListener('mouseenter', onEnter);
    b.addEventListener('animationend', onAnimEnd);
  });
})();
