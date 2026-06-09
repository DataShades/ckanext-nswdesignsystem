export function applyAttrs(el: HTMLElement, attrs: { [key: string]: string }) {
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
}

export function applyProps(el: HTMLElement, props: { [key: string]: any }) {
  Object.entries(props).forEach(([key, value]) => ((el as any)[key] = value));
}

export function applyListeners(
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

export function button(
  content: Theming.Content,
  params: Theming.IButtonParams = {},
) {
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
