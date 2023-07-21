from __future__ import annotations

from typing_extensions import NotRequired, TypedDict

class NavDict(TypedDict):
    href: str
    label: str
    subnav: NotRequired[SubNavDict]


class SubNavDict(TypedDict):
    label: NotRequired[str]
    description: NotRequired[str]
    children: list[NavDict]
