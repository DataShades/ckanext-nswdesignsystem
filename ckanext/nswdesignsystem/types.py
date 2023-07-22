from __future__ import annotations

from typing import Any

from typing_extensions import NotRequired, TypedDict


class NavDict(TypedDict):
    href: str
    label: str
    subnav: NotRequired[SubNavDict]
    attrs: NotRequired[dict[str, Any]]


class SubNavDict(TypedDict):
    label: NotRequired[str]
    description: NotRequired[str]
    children: list[NavDict]
