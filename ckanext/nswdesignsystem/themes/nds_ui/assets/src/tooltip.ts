import type * as NswNs from "../../../../../../node_modules/nsw-design-system/dist/js/main";


export class Tooltip implements ITooltip {
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
