(function (NSW) {
  class Dialog extends NSW.Dialog {
    static _instances = new WeakMap();

    init() {
      const existing = Dialog._instances.get(this.element);
      if (!existing) {
        super.init();
        Dialog._instances.set(this.element, this);
      }
    }

    static getOrCreateInstance(el) {
      const existing = Dialog._instances.get(this.element);
      if (existing) return existing;

      const dialog = new Dialog(el);
      if (!el.classList.contains("js-dialog")) dialog.init();
      return dialog;
    }
  }
  NSW.Dialog = Dialog;
})(window.NSW);
