from __future__ import annotations
from typing import Any

from flask import Blueprint

import ckan.plugins.toolkit as tk

bp = Blueprint("nswdesignsystem", __name__)


@bp.route("/nswdesignsystem/pilot")
def pilot():
    """List of all available components/intro.
    """
    if not tk.h.check_access("sysadmin"):
        return tk.abort(403)

    return tk.render("nswdesignsystem/pilot.html")


@bp.route("/nswdesignsystem/pilot/<component>")
def demo(component: str):
    """Preview and code example for the component and its variants.
    """
    if not tk.h.check_access("sysadmin"):
        return tk.abort(403)

    data: dict[str, Any] = {
        "component": component,
        "use_iframe": False,
    }

    return tk.render("nswdesignsystem/demo.html", data)


@bp.route("/nswdesignsystem/pilot/<component>/embed")
def embed(component: str):
    """Standalone preview of the component.
    """
    if not tk.h.check_access("sysadmin"):
        return tk.abort(403)

    tpl: str = tk.h.nswdesignsystem_demo_template(component)
    data = {
        "demo_template": tpl,
    }
    return tk.render("nswdesignsystem/embed.html", data)
