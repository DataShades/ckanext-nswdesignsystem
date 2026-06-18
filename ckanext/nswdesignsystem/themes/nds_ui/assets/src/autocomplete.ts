/// <reference path="../../../../../../../../core/ckanext-theming/types.d.ts" />

export class Autocomplete implements IAutocomplete {
  constructor(public el: HTMLElement, public instance: any) {}

  select(value: string, label?: string) {
    this.instance.select(value, label || value);
  }

  unselect(value: string) {
    this.instance.remove(value);
  }

  onchange(callback: (values: string[]) => void) {
    const handler = (e: any) => {
      const values = e.detail.values.map((v: any) => v.value);
      callback(values);
    };
    this.el.addEventListener("autocomplete:change", handler);
  }

  destroy() {
    this.instance.teardown();
    // @ts-ignore
    const instances = window.ckan.module.instances["theming-autocomplete"] || [];
    const idx = instances.indexOf(this.instance);
    if (idx !== -1) {
      instances.splice(idx, 1);
    }
  }

  static create(
    element: HTMLElement | string,
    params: Theming.IAutocompleteParams = {},
  ): Autocomplete {
    const el = typeof element === "string"
      ? (document.getElementById(element) || document.querySelector(element)) as HTMLElement
      : element;

    if (!el) {
      throw new Error("Autocomplete element not found");
    }

    const existing = Autocomplete.byId(el);
    if (existing) {
      return existing;
    }

    el.setAttribute("data-module", "theming-autocomplete");
    if (params.source) el.setAttribute("data-module-source", params.source);
    if (params.options) el.setAttribute("data-module-options", JSON.stringify(params.options));
    if (params.allowMultiple !== undefined) el.setAttribute("data-module-allow-multiple", String(params.allowMultiple));
    if (params.allowNew !== undefined) el.setAttribute("data-module-allow-new", String(params.allowNew));
    if (params.selected) el.setAttribute("data-module-selected", JSON.stringify(params.selected));
    if (params.idKey) el.setAttribute("data-module-id-key", params.idKey);
    if (params.labelKey) el.setAttribute("data-module-label-key", params.labelKey);
    if (params.joined !== undefined) el.setAttribute("data-module-joined", String(params.joined));
    if (params.separator) el.setAttribute("data-module-separator", params.separator);
    if (params.minChars !== undefined) el.setAttribute("data-module-min-chars", String(params.minChars));
    if (params.debounce !== undefined) el.setAttribute("data-module-debounce", String(params.debounce));

    // @ts-ignore
    window.ckan.module.initializeElement(el);

    const newInstance = Autocomplete.byId(el);
    if (!newInstance) {
      throw new Error("Failed to initialize autocomplete module");
    }
    return newInstance;
  }

  static byId(id_or_el: string | HTMLElement): Autocomplete | null {
    const el = typeof id_or_el === "string"
      ? (document.getElementById(id_or_el) || document.querySelector(id_or_el)) as HTMLElement
      : id_or_el;

    if (!el) {
      return null;
    }

    // @ts-ignore
    const instances = window.ckan.module.instances["theming-autocomplete"] || [];
    const instance = instances.find((inst: any) => inst.el[0] === el);
    if (instance) {
      return new Autocomplete(el, instance);
    }
    return null;
  }
}
