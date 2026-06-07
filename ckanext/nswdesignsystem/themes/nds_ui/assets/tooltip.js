(function (NSW) {
  class Tooltip extends NSW.Tooltip {
    static _instances = new WeakMap();

    init() {
      const existing = Tooltip._instances.get(this.element);
      if (!existing) {
        super.init();
        Tooltip._instances.set(this.element, this);
      }
    }

    static getOrCreateInstance(el) {
      const existing = Tooltip._instances.get(this.element);
      if (existing) return existing;

      const tooltip = new Tooltip(el);
      if (!el.classList.contains("js-tooltip")) tooltip.init();
      return tooltip;
    }
  }
  NSW.Tooltip = Tooltip;
})(window.NSW);
