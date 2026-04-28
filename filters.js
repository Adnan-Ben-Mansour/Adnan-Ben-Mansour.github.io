// Multi-tag filter for blog posts.
// Click a tag to toggle it on/off. Posts shown if they match ANY active tag (OR).
(function () {
  var filtersEl = document.getElementById('tag-filters');
  var posts = Array.from(document.querySelectorAll('#posts > li'));
  var emptyMsg = document.getElementById('empty-msg');
  if (!filtersEl || !posts.length) return;

  // Collect tags + counts
  var counts = {};
  posts.forEach(function (li) {
    (li.getAttribute('data-tags') || '').split(',').filter(Boolean).forEach(function (t) {
      counts[t] = (counts[t] || 0) + 1;
    });
  });
  var tags = Object.keys(counts).sort();

  var active = new Set();

  // Build buttons
  tags.forEach(function (t) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'filter-btn';
    b.dataset.tag = t;
    b.innerHTML = t + ' <span style="opacity:.6;">' + counts[t] + '</span>';
    b.addEventListener('click', function () {
      if (active.has(t)) active.delete(t); else active.add(t);
      apply();
    });
    filtersEl.appendChild(b);
  });

  // Clear button
  var clr = document.createElement('button');
  clr.type = 'button';
  clr.className = 'filter-clear';
  clr.textContent = 'clear';
  clr.addEventListener('click', function () { active.clear(); apply(); });
  filtersEl.appendChild(clr);

  function apply() {
    // Update button states
    filtersEl.querySelectorAll('.filter-btn').forEach(function (b) {
      b.classList.toggle('is-on', active.has(b.dataset.tag));
    });
    // Update post visibility + tag highlight
    var visible = 0;
    posts.forEach(function (li) {
      var liTags = (li.getAttribute('data-tags') || '').split(',').filter(Boolean);
      var show = active.size === 0 || liTags.some(function (t) { return active.has(t); });
      li.classList.toggle('is-hidden', !show);
      if (show) visible++;
      li.querySelectorAll('.post-tag').forEach(function (pt) {
        pt.classList.toggle('is-active', active.has(pt.dataset.tag));
      });
    });
    if (emptyMsg) emptyMsg.style.display = visible === 0 ? 'block' : 'none';
    clr.style.visibility = active.size ? 'visible' : 'hidden';
  }

  // Allow clicking tags ON posts to toggle the filter too
  posts.forEach(function (li) {
    li.querySelectorAll('.post-tag').forEach(function (pt) {
      pt.style.cursor = 'pointer';
      pt.addEventListener('click', function () {
        var t = pt.dataset.tag;
        if (active.has(t)) active.delete(t); else active.add(t);
        apply();
      });
    });
  });

  // Apply tags from URL hash (e.g. #tag=research or #tag=research,notes)
  function applyHash() {
    var m = (location.hash || '').match(/^#tag=([\w,-]+)/);
    if (m) {
      active.clear();
      m[1].split(',').filter(Boolean).forEach(function (t) {
        if (counts[t] != null) active.add(t);
      });
    }
  }
  applyHash();
  window.addEventListener('hashchange', function(){ applyHash(); apply(); });

  apply();
})();
