export class Notification implements INotification {
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
