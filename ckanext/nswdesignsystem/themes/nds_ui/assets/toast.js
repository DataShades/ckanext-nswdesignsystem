/**
 * Toast notification component for NSW Design System.
 *
 * Follows the exact NSW DS class pattern:
 *   constructor(element) — element is the toast <div class="js-toast">
 *   init()               — read data attributes, position, start auto-dismiss
 *
 * Register on the global NSW object:
 *
 *   import Toast from './toast.js'
 *   NSW.Toast = Toast
 *
 *   // in your initSite() extension — wires server-rendered toasts:
 *   document.querySelectorAll('.js-toast')
 *     .forEach((el) => new NSW.Toast(el).init())
 *
 * ── Creating toasts purely from JS ───────────────────────────────────────
 *
    NSW.Toast.create({
      message:     'File saved successfully.',
      title:       'Saved',           // optional
      variant:     'success',         // info|success|warning|error
      position:    'bottom-right',    // {bottom|top}-{left|center|right}|static
      duration:    5000,              // ms; 0 = never
      dismissible: true,
    })
 *
 * create() injects the element into the correct stack container, then
 * calls init() on the new instance automatically.
 *
 * ── Stack containers ─────────────────────────────────────────────────────
 * Each position gets a shared stack <div> appended to <body> on first use.
 * Multiple toasts at the same position stack vertically with a gap.
 * The stack is removed from the DOM when it becomes empty.
 *
 * ── Custom events ────────────────────────────────────────────────────────
 *   "nsw-toast:shown"    fired on element after it becomes visible
 *   "nsw-toast:dismissed" fired on element just before it is removed
 */

(function (NSW) {
  class Toast {
    // ── Stack registry: position → container element ─────────────────────

    static _stacks = {};

      static _instances = new WeakMap();

    // ── Constructor ──────────────────────────────────────────────────────────

    constructor(element) {
      this.element = element;

      // Read config from data attributes (set by Jinja2 macro)
      this.variant = this.element.dataset.toastVariant || "info";
      this.position = this.element.dataset.toastPosition || "bottom-right";
      this.duration = parseInt(this.element.dataset.toastDuration ?? "0", 10);
      this.dismissible = this.element.dataset.toastDismissible !== "false";
      this._timer = null;
      this._onClose = this._onClose.bind(this);
    }

    // ── Lifecycle ────────────────────────────────────────────────────────────

    init() {
      const existing = Toast._instances.get(this.element);
      if (existing) return;

      // Move element into the correct stack container (idempotent)
      if (this.position !== "static") {
        const stack = Toast._getOrCreateStack(this.position);
        if (this.element.parentNode !== stack) {
          stack.appendChild(this.element);
        }
      }

      // Wire close button
      const closeBtn = this.element.querySelector(".js-toast-close");
      if (closeBtn) {
        closeBtn.addEventListener("click", this._onClose);
      }

      // Trigger enter animation on next frame so the transition fires
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.element.classList.add("nsw-toast--visible");
          this.element.dispatchEvent(
            new CustomEvent("nsw-toast:shown", { bubbles: true }),
          );
        });
      });

      // Auto-dismiss
      if (this.duration > 0) {
        this._timer = setTimeout(() => this.dismiss(), this.duration);
      }

      Toast._instances.set(this.element, this)
      return this;
    }

    static getOrCreateInstance(el) {
      const existing = Toast._instances.get(this.element);
      if (existing) return existing;

      const toast = new Toast(el);
      toast.init();
      return toast;
    }


    dismiss() {
      if (this._timer) clearTimeout(this._timer);
      this.element.dispatchEvent(
        new CustomEvent("nsw-toast:dismissed", { bubbles: true }),
      );
      this.element.classList.remove("nsw-toast--visible");
      this.element.classList.add("nsw-toast--leaving");
      // Remove after CSS transition completes (150ms matches CSS)
      const onEnd = () => {
        this.element.removeEventListener("transitionend", onEnd);
        if (this.element.parentNode) {
          const stack = this.element.parentNode;
          stack.removeChild(this.element);
          // Clean up empty stack container
          if (stack.children.length === 0) {
            stack.parentNode?.removeChild(stack);
            delete Toast._stacks[this.position];
          }
        }
      };
      this.element.addEventListener("transitionend", onEnd);
      // Fallback if transition never fires (e.g. prefers-reduced-motion)
      setTimeout(onEnd, 300);
    }

    // ── Private ──────────────────────────────────────────────────────────────

    _onClose() {
      this.dismiss();
    }

    // ── Static: stack management ─────────────────────────────────────────────

    /**
     * Returns (creating if necessary) the fixed-position stack <div>
     * for a given position token.
     */
    static _getOrCreateStack(position) {
      if (Toast._stacks[position]) return Toast._stacks[position];

      const stack = document.createElement("div");
      stack.classList.add("nsw-toast-stack");
      const [vertical, horizontal] = position.split("-");
      stack.classList.add(
        `nsw-toast-stack--${vertical}`,
        `nsw-toast-stack--${horizontal}`,
      );

      stack.setAttribute("aria-live", "off"); // individual toasts have their own live region
      stack.setAttribute("aria-relevant", "additions");
      stack.dataset.toastStack = position;
      document.body.appendChild(stack);
      Toast._stacks[position] = stack;
      return stack;
    }

    // ── Static: factory ──────────────────────────────────────────────────────

    /**
     * Programmatically create and show a toast without server-side HTML.
     *
     * @param {object} options
     * @param {string} options.message      (required)
     * @param {string} [options.title]
     * @param {string} [options.variant]    info|success|warning|error
     * @param {string} [options.position]   default "bottom-right"
     * @param {number} [options.duration]   ms; 0 = never
     * @param {boolean}[options.dismissible] default true
     * @returns {Toast} the instance (already init()'d)
     */
    static create({
      message,
      title = null,
      variant = "info",
      position = "bottom-right",
      duration = 0,
      dismissible = true,
    }) {
      const ICONS = {
        info: "info",
        success: "check_circle",
        warning: "warning",
        danger: "cancel",
      };
      const ROLES = {
        info: "status",
        success: "status",
        warning: "alert",
        danger: "alert",
      };
      const LIVE = {
        info: "polite",
        success: "polite",
        warning: "assertive",
        danger: "assertive",
      };

      const el = document.createElement("div");
      el.className = `nsw-toast nsw-toast--${variant} js-toast`;
      el.setAttribute("role", ROLES[variant] || "status");
      el.setAttribute("aria-live", LIVE[variant] || "polite");
      el.setAttribute("aria-atomic", "true");
      el.dataset.toastVariant = variant;
      el.dataset.toastPosition = position;
      el.dataset.toastDuration = String(duration);
      el.dataset.toastDismissible = String(dismissible);

      el.innerHTML = `
      <span class="material-icons nsw-material-icons nsw-toast__icon" focusable="false" aria-hidden="true">${ICONS[variant] || "info"}</span>
      <div class="nsw-toast__content">
        ${title ? `<p class="nsw-toast__title">${title}</p>` : ""}
        <p class="nsw-toast__message">${message}</p>
      </div>
      ${
        dismissible
          ? `
      <button type="button" class="nsw-icon-button nsw-toast__close js-toast-close" aria-label="Close notification">
        <span class="material-icons nsw-material-icons" focusable="false" aria-hidden="true">close</span>
      </button>`
          : ""
      }
    `;

      const instance = new Toast(el);
      instance.init();
      return instance;
    }
  }
  NSW.Toast = Toast;
  document
    .querySelectorAll(".js-toast")
    .forEach((el) => new NSW.Toast(el).init());
})(window.NSW);
