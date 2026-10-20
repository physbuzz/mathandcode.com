(function () {
  const choices = {
    theme: ["system", "light", "dark"],
    width: ["normal", "wide", "compact"],
    type: ["sans", "serif"],
    text: ["normal", "small", "large"]
  };
  const root = document.documentElement;

  function apply(name, value) {
    if (value === choices[name][0]) delete root.dataset[name];
    else root.dataset[name] = value;
  }

  for (const name of Object.keys(choices)) {
    try {
      const value = localStorage.getItem("mathandcode-reader-" + name);
      if (choices[name].includes(value)) apply(name, value);
    } catch (error) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    for (const name of Object.keys(choices)) {
      const inputs = document.querySelectorAll('input[name="reader-' + name + '"]');
      for (const input of inputs) {
        input.checked = input.value === (root.dataset[name] || choices[name][0]);
        input.addEventListener("change", function () {
          if (!input.checked) return;
          apply(name, input.value);
          try { localStorage.setItem("mathandcode-reader-" + name, input.value); } catch (error) {}
        });
      }
    }
  });
})();
