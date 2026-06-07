var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
((ckan) => {
    var _Modal_modal, _Notification_toast, _Tooltip_tooltip, _Popover_popover;
    function applyAttrs(el, attrs) {
        Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    }
    function applyProps(el, props) {
        Object.entries(props).forEach(([key, value]) => (el[key] = value));
    }
    function applyListeners(el, listeners) {
        Object.entries(listeners).forEach(([key, value]) => {
            if (typeof value == "function") {
                el.addEventListener(key, value);
            }
            else {
                el.addEventListener(key, value.listener, value.options);
            }
        });
    }
    class Modal {
        constructor(el) {
            this.el = el;
            _Modal_modal.set(this, void 0);
            // @ts-ignore
            __classPrivateFieldSet(this, _Modal_modal, NSW.Dialog.getOrCreateInstance(el), "f");
        }
        destroy() {
            this.close();
            __classPrivateFieldGet(this, _Modal_modal, "f").element.remove();
        }
        show() {
            __classPrivateFieldGet(this, _Modal_modal, "f").openDialog();
        }
        close() {
            __classPrivateFieldGet(this, _Modal_modal, "f").closeDialog();
        }
        static create(content, params = {}) {
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
            const modal = document.body.lastElementChild;
            if (params.title) {
                const heading = document.createElement("h2");
                heading.append(params.title);
                modal.querySelector(".nsw-dialog__title")?.appendChild(heading);
            }
            if (params.dismissible) {
                modal.classList.add("js-dialog-dismiss");
                modal.querySelector(".nsw-dialog__top")?.insertAdjacentHTML("beforeend", `<div class="nsw-dialog__close">
             <button class="nsw-icon-button js-close-dialog">
               <span class="material-icons nsw-material-icons" focusable="false" aria-hidden="true">close</span>
               <span class="sr-only">Close</span>
             </button>
           </div>`);
            }
            modal.querySelector(".nsw-dialog__content")?.append(content);
            const actions = params.actions || [];
            if (params.dismissLabel) {
                actions.unshift(ui.button(params.dismissLabel, {
                    props: { onclick: () => result.close() },
                    style: "secondary",
                }));
            }
            if (actions.length) {
                modal.querySelector(".nsw-dialog__bottom")?.append(...actions);
            }
            const result = new Modal(modal);
            return result;
        }
        static byId(id) {
            const el = document.getElementById(id);
            if (!el) {
                return null;
            }
            return new Modal(el);
        }
    }
    _Modal_modal = new WeakMap();
    class Notification {
        constructor(el) {
            this.el = el;
            _Notification_toast.set(this, void 0);
            // @ts-ignore
            __classPrivateFieldSet(this, _Notification_toast, NSW.Toast.getOrCreateInstance(el), "f");
            this.close();
        }
        destroy() {
            __classPrivateFieldGet(this, _Notification_toast, "f").dismiss();
            __classPrivateFieldGet(this, _Notification_toast, "f").element.remove();
        }
        show() {
            __classPrivateFieldGet(this, _Notification_toast, "f").element.hidden = false;
        }
        close() {
            __classPrivateFieldGet(this, _Notification_toast, "f").element.hidden = true;
        }
        static create(content, props = {}) {
            // @ts-ignore
            const toast = NSW.Toast.create({
                message: typeof content === "string"
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
        static byId(id) {
            const el = document.getElementById(id);
            if (!el) {
                return null;
            }
            return new Notification(el);
        }
    }
    _Notification_toast = new WeakMap();
    class Tooltip {
        constructor(el) {
            this.el = el;
            _Tooltip_tooltip.set(this, void 0);
            // @ts-ignore
            __classPrivateFieldSet(this, _Tooltip_tooltip, NSW.Tooltip.getOrCreateInstance(el), "f");
        }
        close() {
            __classPrivateFieldGet(this, _Tooltip_tooltip, "f").hideTooltip();
        }
        show() {
            __classPrivateFieldGet(this, _Tooltip_tooltip, "f").showTooltip();
        }
        destroy() {
            __classPrivateFieldGet(this, _Tooltip_tooltip, "f").hideTooltip();
        }
        static create(content, props = { target: document.body }) {
            if (typeof content !== "string") {
                throw "Only string tooltips are supported";
            }
            props.target.classList.add("nsw-tooltip");
            props.target.setAttribute("title", content);
            return new Tooltip(props.target);
        }
        static byId(id) {
            const el = document.getElementById(id);
            if (!el) {
                return null;
            }
            return new Tooltip(el);
        }
    }
    _Tooltip_tooltip = new WeakMap();
    class Popover {
        constructor(el) {
            this.el = el;
            _Popover_popover.set(this, void 0);
            // @ts-ignore
            __classPrivateFieldSet(this, _Popover_popover, NSW.Popover.getOrCreateInstance(el), "f");
        }
        close() {
            __classPrivateFieldGet(this, _Popover_popover, "f").hidePopover();
        }
        show() {
            __classPrivateFieldGet(this, _Popover_popover, "f").showPopover();
        }
        destroy() {
            __classPrivateFieldGet(this, _Popover_popover, "f").element.remove();
        }
        static create(content, props = { target: document.body }) {
            const title = props.title ? `<h2>${props.title}</h2>` : "";
            const text = typeof content === "string"
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
        static byId(id) {
            const el = document.getElementById(id);
            if (!el) {
                return null;
            }
            return new Popover(el);
        }
    }
    _Popover_popover = new WeakMap();
    function buttonStyle(style, color) {
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
    const ui = {
        button(content, params = {}) {
            const btn = document.createElement("button");
            btn.append(content);
            btn.classList.add("nsw-button", `nsw-button--${buttonStyle(params.style, params.color)}`);
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
