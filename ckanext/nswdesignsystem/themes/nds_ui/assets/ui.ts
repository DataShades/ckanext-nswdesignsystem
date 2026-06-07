/// <reference path="../../../../../../../core/ckanext-theming/types.d.ts" />
import type * as NswNs from "../../../../../node_modules/nsw-design-system/dist/js/main";
declare var NSW: typeof NswNs;

((ckan) => {
  function applyAttrs(el: HTMLElement, attrs: { [key: string]: string }) {
    Object.entries(attrs).forEach(([key, value]) =>
      el.setAttribute(key, value),
    );
  }
  function applyProps(el: HTMLElement, props: { [key: string]: any }) {
    Object.entries(props).forEach(([key, value]) => ((el as any)[key] = value));
  }
  function applyListeners(
    el: HTMLElement,
    listeners: { [key: string]: Theming.Listener | Theming.ComplexListener },
  ) {
    Object.entries(listeners).forEach(([key, value]) => {
      if (typeof value == "function") {
        el.addEventListener(key, value);
      } else {
        el.addEventListener(key, value.listener, value.options);
      }
    });
  }

  class Modal implements IModal<HTMLElement> {
    #modal: NswNs.Dialog;
    constructor(public el: HTMLElement) {
      // @ts-ignore
      this.#modal = NSW.Dialog.getOrCreateInstance(el);
    }

    destroy() {
      this.close();
      this.#modal.element.remove();
    }

    show() {
      this.#modal.openDialog();
    }

    close() {
      this.#modal.closeDialog();
    }

    static create(
      content: Theming.Content,
      params: Theming.IModalParams = {},
    ): Modal {
      const html = `
        <div class="nsw-dialog" role="dialog">
          <div class="nsw-dialog__wrapper">
            <div class="nsw-dialog__container">
              <div class="nsw-dialog__top">
                <div class="nsw-dialog__title"></div>
                </div>
              <div class="nsw-dialog__content"></div>
            </div>
            <div class="nsw-dialog__bottom"></div>
          </div>
        </div>`;

      document.body.insertAdjacentHTML("beforeend", html);
      const modal = document.body.lastElementChild! as HTMLElement;

      if (params.title) {
        const heading = document.createElement("h2");
        heading.append(params.title);
        modal.querySelector(".nsw-dialog__title")?.appendChild(heading);
      }

      if (params.dismissible) {
        modal.classList.add("js-dialog-dismiss");
        modal.querySelector(".nsw-dialog__top")?.insertAdjacentHTML(
          "beforeend",
          `<div class="nsw-dialog__close">
             <button class="nsw-icon-button js-close-dialog">
               <span class="material-icons nsw-material-icons" focusable="false" aria-hidden="true">close</span>
               <span class="sr-only">Close</span>
             </button>
           </div>`,
        );
      }

      modal.querySelector(".nsw-dialog__content")?.append(content);

      const actions = params.actions || [];
      if (params.dismissLabel) {
        actions.unshift(
          ui.button(params.dismissLabel, {
            props: { onclick: () => result.close() },
            style: "secondary",
          }),
        );
      }

      if (actions.length) {
        modal.querySelector(".nsw-dialog__bottom")?.append(...actions);
      }

      const result = new Modal(modal);
      return result;
    }

    static byId(id: string): Modal | null {
      const el = document.getElementById(id);
      if (!el) {
        return null;
      }
      return new Modal(<HTMLElement>el);
    }
  }

  class Notification implements INotification {
    #toast: any;
    constructor(public el: HTMLElement) {
      // @ts-ignore
      this.#toast = NSW.Toast.getOrCreateInstance(el);
      this.close();
    }

    destroy() {
      this.#toast.dismiss();
      this.#toast.element.remove();
    }

    show() {
      this.#toast.element.hidden = false;
    }

    close() {
      this.#toast.element.hidden = true;
    }

    static create(
      content: Theming.Content,
      props: Theming.INotificationParams = {},
    ): Notification {
      // @ts-ignore
      const toast = NSW.Toast.create({
        message:
          typeof content === "string"
            ? content
            : content instanceof HTMLElement
              ? content.innerHTML
              : content.textContent,

        title: props.title,
        variant: props.style || "info",
        duration: props.timeout || 0,
        dismissible: props.dismissible,
      });

      return new Notification(toast.element);
    }

    static byId(id: string): Notification | null {
      const el = document.getElementById(id);
      if (!el) {
        return null;
      }
      return new Notification(el);
    }
  }

  class Tooltip implements ITooltip {
    #tooltip: NswNs.Tooltip;
    constructor(public el: HTMLElement) {
      // @ts-ignore
      this.#tooltip = NSW.Tooltip.getOrCreateInstance(el);
    }
    close() {
      this.#tooltip.hideTooltip();
    }
    show() {
      this.#tooltip.showTooltip();
    }
    destroy() {
      this.#tooltip.hideTooltip();
    }

    static create(
      content: Theming.Content,
      props: Theming.ITooltipParams = { target: document.body },
    ): Tooltip {
      if (typeof content !== "string") {
        throw "Only string tooltips are supported";
      }
      props.target.classList.add("nsw-tooltip");
      props.target.setAttribute("title", content);
      return new Tooltip(props.target);
    }

    static byId(id: string): Tooltip | null {
      const el = document.getElementById(id);
      if (!el) {
        return null;
      }
      return new Tooltip(el);
    }
  }

  class Popover implements IPopover {
    #popover: NswNs.Popover;
    constructor(public el: HTMLElement) {
      // @ts-ignore
      this.#popover = NSW.Popover.getOrCreateInstance(el);
    }
    close() {
      this.#popover.hidePopover();
    }
    show() {
      this.#popover.showPopover();
    }
    destroy() {
      this.#popover.element.remove();
    }

    static create(
      content: Theming.Content,
      props: Theming.IPopoverParams = { target: document.body },
    ): Popover {
      const title = props.title ? `<h2>${props.title}</h2>` : "";
      const text =
        typeof content === "string"
          ? content
          : content instanceof HTMLElement
            ? content.innerHTML
            : content.textContent;

      const id = `popover-${(Math.random() * 10000).toFixed(0)}`;
      const html = `<div id="${id}" class="nsw-popover"><div class="nsw-p-sm">${title} ${text}</div></div>`;
      document.body.insertAdjacentHTML("beforeend", html);
      props.target.setAttribute("aria-controls", id);
      return new Popover(props.target);
    }

    static byId(id: string): Popover | null {
      const el = document.getElementById(id);
      if (!el) {
        return null;
      }
      return new Popover(el);
    }
  }

  function buttonStyle(style?: string, color?: string) {
    color = color || "dark";
    switch (style) {
      case "secondary":
        return color + "-outline";
      case "warning":
        return "danger";
      case "danger":
        return "danger";
      case "primary":
      default:
        return color;
    }
  }

  const ui: IUi = {
    button(content, params = {}) {
      const btn = document.createElement("button");
      btn.append(content);

      btn.classList.add(
        "nsw-button",
        `nsw-button--${buttonStyle(params.style, params.color)}`,
      );

      if (params.type) {
        btn.type = params.type;
      }

      if (params.attrs) {
        applyAttrs(btn, params.attrs);
      }
      if (params.props) {
        applyProps(btn, params.props);
      }
      if (params.on) {
        applyListeners(btn, params.on);
      }
      [];
      return btn;
    },

    modal: Modal.create,
    getModal: Modal.byId,

    notification: Notification.create,
    getNotification: Notification.byId,

    tooltip: Tooltip.create,
    getTooltip: Tooltip.byId,

    popover: Popover.create,
    getPopover: Popover.byId,
  };

  ckan.sandbox.setup((sb) => {
    sb.ui = sb.ui || {};
    Object.assign(sb.ui, ui);
  });
})(window.ckan);
