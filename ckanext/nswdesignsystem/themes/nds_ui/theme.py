from __future__ import annotations
import os
from ckanext.theming.lib import Theme


def make_theme(name: str = "nds-ui"):
    return Theme(name, os.path.dirname(__file__))
