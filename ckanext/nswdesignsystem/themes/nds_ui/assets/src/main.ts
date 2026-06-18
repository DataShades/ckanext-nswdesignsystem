/// <reference path="../../../../../../../../core/ckanext-theming/types.d.ts" />
import type * as NswNs from "../../../../../../node_modules/nsw-design-system/dist/js/main";

import { button } from "./util";
import { Modal } from "./modal";
import { Notification } from "./notification";
import { Tooltip } from "./tooltip";
import { Popover } from "./popover";
import { Autocomplete } from "./autocomplete";

((ckan) => {
  const ui: IUi = {
    button: button,

    modal: Modal.create,
    getModal: Modal.byId,

    notification: Notification.create,
    getNotification: Notification.byId,

    tooltip: Tooltip.create,
    getTooltip: Tooltip.byId,

    popover: Popover.create,
    getPopover: Popover.byId,

    autocomplete: Autocomplete.create,
    getAutocomplete: Autocomplete.byId,
  };

  ckan.sandbox.setup((sb) => {
    sb.ui = sb.ui || {};
    Object.assign(sb.ui, ui);
  });
})(window.ckan);
