import type * as NswNs from "../../../../../../node_modules/nsw-design-system/dist/js/main";

export class Popover implements IPopover {
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
