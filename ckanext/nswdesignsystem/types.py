from __future__ import annotations
from collections.abc import Sequence

from typing import Any

from typing_extensions import NotRequired, TypedDict


class NavDict(TypedDict):
    href: str
    label: str
    current: NotRequired[bool]
    active: NotRequired[bool]
    open: NotRequired[bool]
    subnav: NotRequired[SubNavDict]
    attrs: NotRequired[dict[str, Any]]


class SubNavDict(TypedDict):
    label: NotRequired[str]
    description: NotRequired[str]
    children: Sequence[NavDict]
