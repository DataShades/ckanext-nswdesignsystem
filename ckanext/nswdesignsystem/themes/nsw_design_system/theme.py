from __future__ import annotations

import os

from ckanext.theming.lib import Theme

here = os.path.dirname(__file__)


def make_theme(name: str = "nsw-design-system"):
    return Theme(name, here, parent="nds-ui")
