(function (NSW) {
  class Popover extends NSW.Popover {
    static _instances = new WeakMap();

    init() {
      const existing = Popover._instances.get(this.element);
      if (!existing) {
        super.init();
        Popover._instances.set(this.element, this);
      }
    }

    static getOrCreateInstance(el) {
      const existing = Popover._instances.get(this.element);
      if (existing) return existing;

      const popover = new Popover(el);
      // js-popover already initialized by NSW DS. Calling init here will
      // duplicate toggle event on click, which will hide popover immediately
      // after displaying.
      if (!el.classList.contains("js-popover")) popover.init();

      return popover;
    }
  }
  NSW.Popover = Popover;
})(window.NSW);
