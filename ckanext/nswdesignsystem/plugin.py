from __future__ import annotations

from collections.abc import Iterable
import ckan.plugins as p
import ckan.plugins.toolkit as tk
import contextlib
from ckan import types


@tk.blanket.helpers
@tk.blanket.blueprints
@tk.blanket.config_declarations
class NswdesignsystemPlugin(p.SingletonPlugin):
    p.implements(p.IConfigurer)

    # IConfigurer

    def update_config(self, config_: types.CKANConfig):
        tk.add_template_directory(config_, "templates")
        tk.add_public_directory(config_, "public")
        tk.add_resource("assets", "nswdesignsystem")

    with contextlib.suppress(ImportError):
        from ckanext.theming.interfaces import ITheme
        from ckanext.theming.lib import Theme

        p.implements(ITheme, inherit=True)

        def register_themes(self) -> Iterable[Theme]:
            from ckanext.nswdesignsystem.themes.nds_ui.theme import make_theme

            return [make_theme()]
