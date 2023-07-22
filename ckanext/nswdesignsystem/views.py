from __future__ import annotations

from typing import Any

from flask import Blueprint

import ckan.plugins.toolkit as tk

bp = Blueprint("nswdesignsystem", __name__)


@bp.route("/nswdesignsystem/components")
def components():
    """List of all available components/intro."""
    if not tk.h.check_access("sysadmin"):
        return tk.abort(403)

    return tk.render("nswdesignsystem/components.html")


@bp.route("/nswdesignsystem/components/<component>")
def demo(component: str):
    """Preview and code example for the component and its variants."""
    if not tk.h.check_access("sysadmin"):
        return tk.abort(403)

    data: dict[str, Any] = {
        "component": component,
        "use_iframe": False,
    }

    return tk.render("nswdesignsystem/demo.html", data)


@bp.route("/nswdesignsystem/components/<component>/embed")
def embed(component: str):
    """Standalone preview of the component."""
    if not tk.h.check_access("sysadmin"):
        return tk.abort(403)

    tpl: str = tk.h.nswdesignsystem_demo_template(component)
    data = {
        "demo_template": tpl,
    }
    return tk.render("nswdesignsystem/embed.html", data)
