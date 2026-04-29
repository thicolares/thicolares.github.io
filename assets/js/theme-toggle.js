(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  var mql = window.matchMedia('(prefers-color-scheme: dark)');

  function effective() {
    return root.dataset.theme || (mql.matches ? 'dark' : 'light');
  }

  btn.addEventListener('click', function () {
    var next = effective() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Follow OS changes only when user has not made an explicit choice.
  var onChange = function () {
    var saved;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    if (!saved) delete root.dataset.theme;
  };
  if (mql.addEventListener) mql.addEventListener('change', onChange);
  else if (mql.addListener) mql.addListener(onChange);
})();
