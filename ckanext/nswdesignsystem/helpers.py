from __future__ import annotations
import os
import glob
import logging
import ckan.plugins.toolkit as tk
from typing_extensions import Literal
from . import types, placeholders

log = logging.getLogger(__name__)

tpl_folder = os.path.join(os.path.dirname(__file__), "templates")


def nswdesignsystem_header_links(type: Literal["navigation"]) -> list[types.NavDict]:
    """Navigation links for the header section.
    """
    links = {
        "navigation": placeholders.navigation_header_links,
    }
    return links.get(type, [])


def nswdesignsystem_footer_links(type: Literal["upper", "lower", "social"]) -> list[types.NavDict]:
    """Navigation links for the footer section.
    """
    links = {
        "upper": placeholders.upper_footer_links,
        "lower": placeholders.lower_footer_links,
        "social": placeholders.social_footer_links,
    }

    return links.get(type, [])


def nswdesignsystem_demo_code(component: str) -> str:
    """Source code of the preview template of the comonent.
    """
    filepath = os.path.join(tpl_folder, tk.h.nswdesignsystem_demo_template(component))
    with open(filepath) as src:
        return src.read()


def nswdesignsystem_demo_template(component: str) -> str:
    """Filepath of the preview template for the component.
    """
    return f"nswdesignsystem/demo/{component}.preview.html"


def nswdesignsystem_demo_details(component: str) -> str:
    """Filepath of the details template for the component.
    """
    return f"nswdesignsystem/demo/{component}.details.html"

def nswdesignsystem_demo_variants(component: str) -> list[str]:
    """All available variations of the component.
    """
    names = glob.glob(os.path.join(tpl_folder, tk.h.nswdesignsystem_demo_template(f"{component}*")))
    return sorted([
        os.path.basename(name).split(".")[0]
        for name in names
    ], key=len)
