/**
 * themes/nsw/dropdown.js
 * ======================
 * Dropdown component for NSW Design System.
 *
 * Follows the exact NSW DS class pattern:
 *   constructor(element) — element is the trigger <button class="js-dropdown">
 *   init()               — wire events; safe to call multiple times
 *
 * Register on the global NSW object so your initSite() extension can
 * discover it automatically:
 *
 *   import Dropdown from './dropdown.js'
 *   NSW.Dropdown = Dropdown
 *
 *   // then in your initSite() extension:
 *   document.querySelectorAll('.js-dropdown')
 *     .forEach((el) => new NSW.Dropdown(el).init())
 *
 * ── Keyboard behaviour (ARIA menu pattern) ───────────────────────────────
 *   Enter / Space on trigger  → open panel, focus first item
 *   Escape                    → close panel, return focus to trigger
 *   ArrowDown                 → next item (wraps)
 *   ArrowUp                   → previous item (wraps)
 *   Home                      → first item
 *   End                       → last item
 *   Tab                       → close panel (natural focus order)
 *   Click outside             → close panel
 *
 * ── Custom events ────────────────────────────────────────────────────────
 *   "nsw-dropdown:open"   fired on trigger when panel opens
 *   "nsw-dropdown:close"  fired on trigger when panel closes
 *   "nsw-dropdown:action" fired on trigger when an action button is clicked
 *                         event.detail.item = clicked button's dataset object
 */

(function (NSW) {
  class Dropdown {
    constructor(element) {
      this.trigger = element;
      this.panelId = this.trigger.getAttribute("aria-controls");
      this.panel = this.panelId ? document.getElementById(this.panelId) : null;
      this.position = this.trigger.dataset.dropdownPosition || "bottom-start";
      this.isOpen = false;
      this.items = [];

      // Bound handlers stored so they can be removed on destroy()
      this._onTriggerClick = this._onTriggerClick.bind(this);
      this._onTriggerKeydown = this._onTriggerKeydown.bind(this);
      this._onPanelKeydown = this._onPanelKeydown.bind(this);
      this._onDocumentClick = this._onDocumentClick.bind(this);
      this._onDocumentKeyup = this._onDocumentKeyup.bind(this);
    }

    // ── Lifecycle ────────────────────────────────────────────────────────────

    init() {
      if (!this.panel) {
        console.warn(`Dropdown: no panel found with id="${this.panelId}"`);
        return;
      }
      this._collectItems();
      this._bindEvents();
    }

    destroy() {
      this.trigger.removeEventListener("click", this._onTriggerClick);
      this.trigger.removeEventListener("keydown", this._onTriggerKeydown);
      this.panel.removeEventListener("keydown", this._onPanelKeydown);
      document.removeEventListener("click", this._onDocumentClick);
      document.removeEventListener("keyup", this._onDocumentKeyup);
    }

    // ── Public API ───────────────────────────────────────────────────────────

    open() {
      if (this.isOpen) return;
      this._collectItems();
      this.panel.removeAttribute("hidden");
      this.panel.classList.add("active");
      this.trigger.setAttribute("aria-expanded", "true");
      this.isOpen = true;
      // Focus first non-disabled item (ARIA menu pattern)
      const first = this.items.find(
        (el) => !el.disabled && el.getAttribute("aria-disabled") !== "true",
      );
      if (first) first.focus();
      this.trigger.dispatchEvent(
        new CustomEvent("nsw-dropdown:open", { bubbles: true }),
      );
    }

    close() {
      if (!this.isOpen) return;
      this.panel.setAttribute("hidden", "");
      this.panel.classList.remove("active");
      this.trigger.setAttribute("aria-expanded", "false");
      this.isOpen = false;
      this.trigger.dispatchEvent(
        new CustomEvent("nsw-dropdown:close", { bubbles: true }),
      );
    }

    toggle() {
      if (this.isOpen) this.close();
      else this.open();
    }

    // ── Private: setup ───────────────────────────────────────────────────────

    _collectItems() {
      this.items = Array.from(
        this.panel.querySelectorAll('[role="menuitem"]:not([hidden])'),
      );
    }

    _bindEvents() {
      this.trigger.addEventListener("click", this._onTriggerClick);
      this.trigger.addEventListener("keydown", this._onTriggerKeydown);
      this.panel.addEventListener("keydown", this._onPanelKeydown);
      // Action buttons inside the panel
      this.panel.addEventListener("click", (e) => {
        const btn = e.target.closest(".nsw-dropdown__item--action");
        if (btn) this._onActionClick(btn);
      });
      document.addEventListener("click", this._onDocumentClick);
      document.addEventListener("keyup", this._onDocumentKeyup);
    }

    // ── Private: event handlers ──────────────────────────────────────────────

    _onTriggerClick() {
      this.toggle();
    }

    /**
     * Trigger keydown — handle Enter/Space/ArrowDown to open,
     * ArrowUp to open at last item.
     */
    _onTriggerKeydown(e) {
      const { key } = e;
      if (key === "ArrowDown" || key === "Enter" || key === " ") {
        e.preventDefault();
        this.open();
      } else if (key === "ArrowUp") {
        e.preventDefault();
        this.open();
        const last = [...this.items]
          .reverse()
          .find(
            (el) => !el.disabled && el.getAttribute("aria-disabled") !== "true",
          );
        if (last) last.focus();
      }
    }

    /**
     * Panel keydown — full ARIA menu keyboard navigation.
     */
    _onPanelKeydown(e) {
      const { key } = e;
      const active = document.activeElement;
      const enabled = this.items.filter(
        (el) => !el.disabled && el.getAttribute("aria-disabled") !== "true",
      );
      const idx = enabled.indexOf(active);

      switch (key) {
        case "ArrowDown":
          e.preventDefault();
          enabled[(idx + 1) % enabled.length]?.focus();
          break;
        case "ArrowUp":
          e.preventDefault();
          enabled[(idx - 1 + enabled.length) % enabled.length]?.focus();
          break;
        case "Home":
          e.preventDefault();
          enabled[0]?.focus();
          break;
        case "End":
          e.preventDefault();
          enabled[enabled.length - 1]?.focus();
          break;
        case "Escape":
          this.close();
          this.trigger.focus();
          break;
        case "Tab":
          // Let Tab close the panel naturally; focus moves on its own
          this.close();
          break;
        default:
          break;
      }
    }

    _onDocumentClick(e) {
      if (!this.isOpen) return;
      // Close if click is outside both trigger and panel
      if (!this.trigger.contains(e.target) && !this.panel.contains(e.target)) {
        this.close();
      }
    }

    _onDocumentKeyup(e) {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
        this.trigger.focus();
      }
    }

    _onActionClick(button) {
      this.trigger.dispatchEvent(
        new CustomEvent("nsw-dropdown:action", {
          bubbles: true,
          detail: { item: { ...button.dataset } },
        }),
      );
      this.close();
      this.trigger.focus();
    }

  }

  NSW.Dropdown = Dropdown;
  document
    .querySelectorAll(".js-dropdown")
    .forEach((el) => new NSW.Dropdown(el).init());
})(window.NSW);
