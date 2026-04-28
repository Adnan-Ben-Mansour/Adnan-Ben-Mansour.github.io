// Visual signatures for publication cards. Each is a small abstract motif
// that hints at the paper's content. Used as a stamp in the bottom-right
// of each .pub. Wire up by setting data-sig="<key>" on a <li class="pub">.
// Falls back to "default" for unknown keys.
(function(){
  var SIGS = {
    // Federated learning · robust aggregation: a central server with surrounding
    // clients, two outliers crossed-out (Byzantine-resistant aggregation).
    'fl-aggregation': ''
      + '<svg viewBox="0 0 60 60" width="100%" height="100%" fill="none">'
      +   '<g stroke="currentColor" stroke-width="0.7" opacity="0.85">'
      +     '<line x1="30" y1="30" x2="12" y2="12"/>'
      +     '<line x1="30" y1="30" x2="48" y2="12"/>'
      +     '<line x1="30" y1="30" x2="12" y2="48"/>'
      +     '<line x1="30" y1="30" x2="48" y2="48"/>'
      +     '<line x1="30" y1="30" x2="30" y2="8"/>'
      +     '<line x1="30" y1="30" x2="52" y2="30"/>'
      +     '<line x1="30" y1="30" x2="8"  y2="30"/>'
      +     '<line x1="30" y1="30" x2="30" y2="52"/>'
      +   '</g>'
      +   '<circle cx="30" cy="30" r="4.5" fill="currentColor"/>'
      +   '<g fill="currentColor">'
      +     '<circle cx="12" cy="12" r="2.4"/>'
      +     '<circle cx="30" cy="8"  r="2.4"/>'
      +     '<circle cx="48" cy="12" r="2.4"/>'
      +     '<circle cx="8"  cy="30" r="2.4"/>'
      +     '<circle cx="52" cy="30" r="2.4"/>'
      +     '<circle cx="30" cy="52" r="2.4"/>'
      +   '</g>'
      // Outliers: marked with a cross — Byzantine clients rejected.
      +   '<g fill="currentColor" opacity="0.45">'
      +     '<circle cx="12" cy="48" r="2.4"/>'
      +     '<circle cx="48" cy="48" r="2.4"/>'
      +   '</g>'
      +   '<g stroke="currentColor" stroke-width="0.9" stroke-linecap="round">'
      +     '<line x1="9"  y1="45" x2="15" y2="51"/>'
      +     '<line x1="15" y1="45" x2="9"  y2="51"/>'
      +     '<line x1="45" y1="45" x2="51" y2="51"/>'
      +     '<line x1="51" y1="45" x2="45" y2="51"/>'
      +   '</g>'
      + '</svg>',

    // FedControl · feedback loop: a closed control loop with sense → controller → plant → feedback arrow.
    fedcontrol: ''
      + '<svg viewBox="0 0 60 60" width="100%" height="100%" fill="none">'
      +   '<g stroke="currentColor" stroke-width="0.9" fill="none">'
      // Outer loop
      +     '<path d="M 14 18 L 46 18 L 46 42 L 14 42 Z"/>'
      // Inner blocks (controller, plant)
      +     '<rect x="18" y="22" width="10" height="8"/>'
      +     '<rect x="32" y="22" width="10" height="8"/>'
      +   '</g>'
      // Forward arrow between the two blocks
      +   '<g stroke="currentColor" stroke-width="0.7" stroke-linecap="round">'
      +     '<line x1="28" y1="26" x2="32" y2="26"/>'
      +     '<polyline points="30,24 32,26 30,28" fill="none"/>'
      +   '</g>'
      // Feedback arrow on the bottom (plant → controller)
      +   '<g stroke="currentColor" stroke-width="0.8" fill="none">'
      +     '<path d="M 37 30 L 37 38 L 23 38 L 23 30"/>'
      +     '<polyline points="21,32 23,30 25,32" fill="none"/>'
      +   '</g>'
      // Summing junction
      +   '<circle cx="14" cy="26" r="2.4" stroke="currentColor" stroke-width="0.9" fill="none"/>'
      +   '<line x1="12" y1="26" x2="16" y2="26" stroke="currentColor" stroke-width="0.5"/>'
      +   '<line x1="14" y1="24" x2="14" y2="28" stroke="currentColor" stroke-width="0.5"/>'
      +   '<line x1="14" y1="26" x2="18" y2="26" stroke="currentColor" stroke-width="0.7"/>'
      +   '<line x1="42" y1="26" x2="48" y2="26" stroke="currentColor" stroke-width="0.7"/>'
      + '</svg>',

    // Computational heterogeneity · clients of different sizes around a server.
    heterogeneity: ''
      + '<svg viewBox="0 0 60 60" width="100%" height="100%" fill="none">'
      +   '<g stroke="currentColor" stroke-width="0.6" opacity="0.7">'
      +     '<line x1="30" y1="30" x2="12" y2="13"/>'
      +     '<line x1="30" y1="30" x2="48" y2="14"/>'
      +     '<line x1="30" y1="30" x2="9"  y2="33"/>'
      +     '<line x1="30" y1="30" x2="51" y2="32"/>'
      +     '<line x1="30" y1="30" x2="14" y2="50"/>'
      +     '<line x1="30" y1="30" x2="46" y2="50"/>'
      +   '</g>'
      // Server (square)
      +   '<rect x="25" y="25" width="10" height="10" fill="currentColor"/>'
      // Clients of different sizes (heterogeneous compute)
      +   '<g fill="currentColor">'
      +     '<circle cx="12" cy="13" r="3.6"/>'      // big client
      +     '<circle cx="48" cy="14" r="1.8"/>'      // small
      +     '<circle cx="9"  cy="33" r="2.6"/>'      // medium
      +     '<circle cx="51" cy="32" r="3.2"/>'      // big-ish
      +     '<circle cx="14" cy="50" r="1.5"/>'      // tiny
      +     '<circle cx="46" cy="50" r="2.8"/>'      // medium
      +   '</g>'
      + '</svg>',

    // Donut distillation · large grid → small grid (knowledge distillation, pruning).
    distill: ''
      + '<svg viewBox="0 0 60 60" width="100%" height="100%" fill="none">'
      // Big "teacher" network: 4×4 grid on the left
      +   '<g fill="currentColor">'
      +     '<circle cx="9"  cy="11" r="1.5"/><circle cx="15" cy="11" r="1.5"/><circle cx="21" cy="11" r="1.5"/><circle cx="27" cy="11" r="1.5"/>'
      +     '<circle cx="9"  cy="19" r="1.5"/><circle cx="15" cy="19" r="1.5"/><circle cx="21" cy="19" r="1.5"/><circle cx="27" cy="19" r="1.5"/>'
      +     '<circle cx="9"  cy="27" r="1.5"/><circle cx="15" cy="27" r="1.5"/><circle cx="21" cy="27" r="1.5"/><circle cx="27" cy="27" r="1.5"/>'
      +     '<circle cx="9"  cy="35" r="1.5"/><circle cx="15" cy="35" r="1.5"/><circle cx="21" cy="35" r="1.5"/><circle cx="27" cy="35" r="1.5"/>'
      +   '</g>'
      // Some teacher nodes pruned (faded)
      +   '<g fill="currentColor" opacity="0.25">'
      +     '<circle cx="15" cy="19" r="1.5"/><circle cx="27" cy="11" r="1.5"/>'
      +     '<circle cx="9"  cy="27" r="1.5"/><circle cx="21" cy="35" r="1.5"/>'
      +   '</g>'
      // Distillation arrow
      +   '<g stroke="currentColor" stroke-width="0.8" fill="none">'
      +     '<line x1="32" y1="23" x2="42" y2="23"/>'
      +     '<polyline points="40,21 42,23 40,25"/>'
      +   '</g>'
      // Small "student": 2×2 grid on the right
      +   '<g fill="currentColor">'
      +     '<circle cx="46" cy="18" r="2.4"/><circle cx="54" cy="18" r="2.4"/>'
      +     '<circle cx="46" cy="28" r="2.4"/><circle cx="54" cy="28" r="2.4"/>'
      +   '</g>'
      // Donut hint: a small ring under the student
      +   '<g stroke="currentColor" stroke-width="1" fill="none">'
      +     '<circle cx="50" cy="44" r="5"/>'
      +     '<circle cx="50" cy="44" r="2"/>'
      +   '</g>'
      + '</svg>',

    // Multimodal interactions · bipartite attention: image patches ↔ text tokens.
    multimodal: ''
      + '<svg viewBox="0 0 60 60" width="100%" height="100%" fill="none">'
      // Left column: image patches as 3×3 grid of squares
      +   '<g fill="currentColor">'
      +     '<rect x="8"  y="10" width="4" height="4"/>'
      +     '<rect x="14" y="10" width="4" height="4"/>'
      +     '<rect x="20" y="10" width="4" height="4"/>'
      +     '<rect x="8"  y="16" width="4" height="4"/>'
      +     '<rect x="14" y="16" width="4" height="4"/>'
      +     '<rect x="20" y="16" width="4" height="4"/>'
      +     '<rect x="8"  y="22" width="4" height="4"/>'
      +     '<rect x="14" y="22" width="4" height="4"/>'
      +     '<rect x="20" y="22" width="4" height="4"/>'
      +   '</g>'
      // Frame around the image
      +   '<rect x="6" y="8" width="20" height="20" stroke="currentColor" stroke-width="0.6" fill="none" opacity="0.6"/>'
      // Right column: text tokens as horizontal pill markers
      +   '<g fill="currentColor">'
      +     '<rect x="38" y="11" width="14" height="2" rx="1"/>'
      +     '<rect x="38" y="17" width="10" height="2" rx="1"/>'
      +     '<rect x="38" y="23" width="14" height="2" rx="1"/>'
      +     '<rect x="38" y="29" width="8"  height="2" rx="1"/>'
      +     '<rect x="38" y="35" width="12" height="2" rx="1"/>'
      +     '<rect x="38" y="41" width="10" height="2" rx="1"/>'
      +   '</g>'
      // Bipartite attention lines (selected, not all-to-all)
      +   '<g stroke="currentColor" stroke-width="0.6" opacity="0.7">'
      +     '<line x1="24" y1="12" x2="38" y2="12"/>'
      +     '<line x1="24" y1="18" x2="38" y2="24"/>'
      +     '<line x1="24" y1="24" x2="38" y2="18"/>'
      +     '<line x1="24" y1="14" x2="38" y2="36"/>'
      +     '<line x1="24" y1="22" x2="38" y2="42"/>'
      +     '<line x1="24" y1="26" x2="38" y2="30"/>'
      +   '</g>'
      // Eye / attention origin
      +   '<g stroke="currentColor" stroke-width="0.7" fill="none" opacity="0.7">'
      +     '<ellipse cx="30" cy="48" rx="6" ry="3"/>'
      +     '<circle cx="30" cy="48" r="1.4" fill="currentColor"/>'
      +   '</g>'
      + '</svg>',

    // Default: QR-finder corners + scattered data dots — generic research artifact.
    default: ''
      + '<svg viewBox="0 0 60 60" width="100%" height="100%" fill="none">'
      +   '<g stroke="currentColor" stroke-width="1.2" fill="none">'
      +     '<rect x="8" y="8" width="14" height="14"/>'
      +     '<rect x="38" y="8" width="14" height="14"/>'
      +     '<rect x="8" y="38" width="14" height="14"/>'
      +   '</g>'
      +   '<g fill="currentColor">'
      +     '<rect x="12" y="12" width="6" height="6"/>'
      +     '<rect x="42" y="12" width="6" height="6"/>'
      +     '<rect x="12" y="42" width="6" height="6"/>'
      +   '</g>'
      +   '<g fill="currentColor">'
      +     '<rect x="28" y="28" width="2" height="2"/>'
      +     '<rect x="33" y="28" width="2" height="2"/>'
      +     '<rect x="38" y="28" width="2" height="2"/>'
      +     '<rect x="28" y="33" width="2" height="2"/>'
      +     '<rect x="38" y="33" width="2" height="2"/>'
      +     '<rect x="28" y="38" width="2" height="2"/>'
      +     '<rect x="33" y="38" width="2" height="2"/>'
      +     '<rect x="42" y="42" width="2" height="2"/>'
      +     '<rect x="47" y="42" width="2" height="2"/>'
      +     '<rect x="42" y="47" width="2" height="2"/>'
      +     '<rect x="47" y="47" width="2" height="2"/>'
      +   '</g>'
      + '</svg>',
  };

  function inject(){
    var pubs = document.querySelectorAll('.pub[data-sig]');
    pubs.forEach(function(p){
      var key = p.getAttribute('data-sig');
      var svg = SIGS[key] || SIGS['default'];
      var existing = p.querySelector(':scope > .pub-sig');
      if (existing && existing.children.length > 0) return;
      var sig = existing || document.createElement('div');
      sig.className = 'pub-sig';
      sig.setAttribute('aria-hidden', 'true');
      sig.innerHTML = svg;
      if (!existing) p.insertBefore(sig, p.firstChild);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
