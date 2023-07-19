from __future__ import annotations

from flask import Blueprint

import ckan.plugins.toolkit as tk

bp = Blueprint("nswdesignsystem", __name__)


@bp.route("/nswdesignsystem/pilot")
def pilot():
    if not tk.h.check_access("sysadmin"):
        return tk.abort(403)

    return tk.render("nswdesignsystem/pilot.html")


@bp.route("/nswdesignsystem/pilot/<component>")
def demo(component: str):
    if not tk.h.check_access("sysadmin"):
        return tk.abort(403)

    data = {
        "component": component,
        "use_iframe": False,
    }

    return tk.render("nswdesignsystem/demo.html", data)


@bp.route("/nswdesignsystem/pilot/<component>/embed")
def embed(component: str):
    if not tk.h.check_access("sysadmin"):
        return tk.abort(403)

    tpl = tk.h.nswdesignsystem_demo_template_for_component(component)
    data = {
        "demo_template": tpl,
    }
    return tk.render("nswdesignsystem/embed.html", data)
