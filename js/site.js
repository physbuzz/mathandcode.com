(function () {
  var groups = ["theme", "width", "type", "text"];
  var defaults = { theme: "system", width: "normal", type: "sans", text: "normal" };
  var allowed = {
    theme: { system: true, light: true, dark: true },
    width: { normal: true, wide: true, compact: true },
    type: { sans: true, serif: true },
    text: { small: true, normal: true, large: true }
  };
  var namePrefix = "mathandcode-reader:";

  function readWindowState() {
    if (!window.name || window.name.indexOf(namePrefix) !== 0) return {};
    try {
      return JSON.parse(window.name.slice(namePrefix.length)) || {};
    } catch (error) {
      return {};
    }
  }

  function saveWindowState(name, value) {
    var state = readWindowState();
    state[name] = value;
    try {
      window.name = namePrefix + JSON.stringify(state);
    } catch (error) {}
  }

  function readSetting(name) {
    var value = null;
    try {
      value = localStorage.getItem("mathandcode-reader-" + name);
    } catch (error) {}
    if (!value) value = readWindowState()[name];
    return allowed[name][value] ? value : null;
  }

  function saveSetting(name, value) {
    try {
      localStorage.setItem("mathandcode-reader-" + name, value);
    } catch (error) {}
    saveWindowState(name, value);
  }

  function apply(name, value) {
    if (value === defaults[name]) {
      delete document.documentElement.dataset[name];
      return;
    }
    document.documentElement.dataset[name] = value;
  }

  function bindReaderControls() {
    groups.forEach(function (name) {
      var saved = readSetting(name);
      var inputs = Array.prototype.slice.call(document.querySelectorAll('input[name="reader-' + name + '"]'));
      inputs.forEach(function (input) {
        if (saved && input.value === saved) input.checked = true;
        input.addEventListener("change", function () {
          if (!input.checked) return;
          apply(name, input.value);
          saveSetting(name, input.value);
          if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise().catch(function () {});
          }
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindReaderControls();
  });
})();
