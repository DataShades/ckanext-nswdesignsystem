import type * as NswNs from "../../../../../../node_modules/nsw-design-system/dist/js/main";

import { button } from "./util";

export class Modal implements IModal<HTMLElement> {
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
        button(params.dismissLabel, {
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
