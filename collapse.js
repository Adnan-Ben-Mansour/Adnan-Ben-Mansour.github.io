// Collapsible code cells. Click the cell label to toggle.
(function () {
  function initCells() {
    var cells = document.querySelectorAll('.cell');
    cells.forEach(function (cell) {
      var label = cell.querySelector('.cell-label');
      if (!label) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cell-toggle';
      btn.setAttribute('aria-expanded', 'true');
      btn.innerHTML = '<span class="chev" aria-hidden="true">▾</span><span class="cell-toggle-label">collapse</span>';
      label.appendChild(btn);
      label.classList.add('is-toggle');

      function setCollapsed(collapsed) {
        cell.classList.toggle('is-collapsed', collapsed);
        btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
        var lbl = btn.querySelector('.cell-toggle-label');
        if (lbl) lbl.textContent = collapsed ? 'expand' : 'collapse';
      }

      label.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        var isCollapsed = cell.classList.contains('is-collapsed');
        setCollapsed(!isCollapsed);
      });
    });
  }

  // Collapsible page sections: click the h2 of a .block or .year-block to toggle.
  function initBlocks() {
    var blocks = document.querySelectorAll('.block, .year-block');
    blocks.forEach(function (block) {
      var h2 = block.querySelector(':scope > h2');
      if (!h2) return;
      h2.style.cursor = 'pointer';
      h2.setAttribute('role', 'button');
      h2.setAttribute('tabindex', '0');
      h2.setAttribute('aria-expanded', 'true');

      function setCollapsed(collapsed) {
        block.classList.toggle('is-collapsed', collapsed);
        h2.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      }
      h2.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        setCollapsed(!block.classList.contains('is-collapsed'));
      });
      h2.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setCollapsed(!block.classList.contains('is-collapsed'));
        }
      });
    });
  }

  function init() { initCells(); initBlocks(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
