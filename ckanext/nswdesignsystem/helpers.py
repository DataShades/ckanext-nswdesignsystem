from __future__ import annotations

import glob
import logging
import os
from typing import Iterable

from typing_extensions import Literal

import ckan.plugins.toolkit as tk

from . import placeholders, types

log = logging.getLogger(__name__)

tpl_folder = os.path.join(os.path.dirname(__file__), "templates")


def nswdesignsystem_header_links(type: Literal["navigation"]) -> list[types.NavDict]:
    """Navigation links for the header section."""
    links = {
        "navigation": placeholders.navigation_header_links,
    }
    return links.get(type, [])


def nswdesignsystem_footer_links(
    type: Literal["upper", "lower", "social"]
) -> list[types.NavDict]:
    """Navigation links for the footer section."""
    links = {
        "upper": placeholders.upper_footer_links,
        "lower": placeholders.lower_footer_links,
        "social": placeholders.social_footer_links,
    }

    return links.get(type, [])


def nswdesignsystem_demo_links() -> list[types.NavDict]:
    """Navigation links for the demo page."""
    demos = [
        "footer", "header", "main_navigation", "masthead", "side_navigation", "tabs", "accordion",
        "breadcrumbs", "buttons", "callout", "cards", "content_blocks", "dialog", "file_upload", "filters",
        "forms", "global_alert", "hero_banner", "hero_search", "in_page_alert", "in_page_navigation",
        "link_list", "list_item", "loader", "pagination", "progress_indicator", "results_bar",
        "select", "status_labels", "steps", "table", "tags", "tooltip",

    ]
    return [
        {
            "label": "NSW Digital Design System",
            "href": "#",
            "subnav": {
                "children": [
                    {
                        "label": "Layouts",
                        "href": "#",
                        "subnav": {
                            "children": [
                                {
                                    "href": tk.h.url_for("nswdesignsystem.layouts", layout="full"),
                                    "label": "Full",
                                    "attrs": {"target": "_blank"},
                                },
                                {
                                    "href": tk.h.url_for("nswdesignsystem.layouts", layout="two-column-left"),
                                    "label": "Two columns, left sidebar",
                                    "attrs": {"target": "_blank"},
                                },
                                {
                                    "href": tk.h.url_for("nswdesignsystem.layouts", layout="two-column-right"),
                                    "label": "Two columns, right sidebar",
                                    "attrs": {"target": "_blank"},
                                },
                            ]
                        },
                    },
                    {
                        "label": "Components",
                        "href": tk.h.url_for("nswdesignsystem.components"),
                        "subnav": {
                            "children": [
                                {
                                    "href": tk.h.url_for(
                                        "nswdesignsystem.demo", component=component
                                    ),
                                    "label": " ".join(
                                        component.split("_")
                                    ).capitalize(),
                                }
                                for component in sorted(demos)
                            ]
                        },
                    },
                    {
                        "label": "Templates",
                        "href": "#",
                        "subnav": {
                            "children": [
                                {
                                    "href": tk.h.url_for("nswdesignsystem.templates", template="search"),
                                    "label": "Search",
                                    "attrs": {"target": "_blank"},
                                },
                                {
                                    "href": tk.h.url_for("nswdesignsystem.templates", template="filters"),
                                    "label": "Filters",
                                    "attrs": {"target": "_blank"},
                                },
                                {
                                    "href": tk.h.url_for("nswdesignsystem.templates", template="events"),
                                    "label": "Events",
                                    "attrs": {"target": "_blank"},
                                },
                                {
                                    "href": tk.h.url_for("nswdesignsystem.templates", template="content"),
                                    "label": "Content",
                                    "attrs": {"target": "_blank"},
                                },

                            ]
                        },
                    },

                ]
            },
        }
    ]


def nswdesignsystem_get_active_path(links: Iterable[types.NavDict], current: str) -> list[int]:
    result = _search_current_path(links, current)
    return result

def _search_current_path(links: Iterable[types.NavDict], current: str) -> list[int]:
    for idx, item in enumerate(links):
        if item["href"] == current:
            return [idx]

        if "subnav" in item:
            if path := _search_current_path(item["subnav"]["children"], current):
                return [idx] + path

    return []

def nswdesignsystem_demo_code(component: str) -> str:
    """Source code of the preview template of the comonent."""
    filepath = os.path.join(tpl_folder, tk.h.nswdesignsystem_demo_template(component))
    with open(filepath) as src:
        return src.read()


def nswdesignsystem_demo_template(component: str) -> str:
    """Filepath of the preview template for the component."""
    return f"nswdesignsystem/demo/{component}.preview.html"


def nswdesignsystem_demo_details(component: str) -> str:
    """Filepath of the details template for the component."""
    return f"nswdesignsystem/demo/{component}.details.html"


def nswdesignsystem_demo_variants(component: str) -> list[str]:
    """All available variations of the component."""
    names = glob.glob(
        os.path.join(tpl_folder, tk.h.nswdesignsystem_demo_template(f"{component}*"))
    )
    return sorted([os.path.basename(name).split(".")[0] for name in names], key=len)
