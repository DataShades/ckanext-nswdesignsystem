from __future__ import annotations


from typing_extensions import override
import ckan.plugins as p
import ckan.plugins.toolkit as tk
import contextlib
from ckan import types
from ckanext.theming.plugin import ThemingMixin


@tk.blanket.helpers
@tk.blanket.blueprints
@tk.blanket.config_declarations
class NswdesignsystemPlugin(ThemingMixin, p.SingletonPlugin):
    p.implements(p.IConfigurer)

    # IConfigurer
    @override
    def update_config(self, config: types.CKANConfig):
        super().update_config(config)

        if config["ckanext.nswdesignsystem.legacy_enabled"]:
            tk.add_template_directory(config, "templates")
            tk.add_public_directory(config, "public")
            tk.add_resource("assets", "nswdesignsystem")

    with contextlib.suppress(ImportError):
        from ckanext.theming.interfaces import ITheme
        from ckanext.theming.lib import Theme

        p.implements(ITheme, inherit=True)

        @override
        def register_themes(self) -> list[Theme]:
            themes = super().register_themes()

            from ckanext.nswdesignsystem.themes.nds_ui.theme import (
                make_theme as make_library,
            )
            from ckanext.nswdesignsystem.themes.nsw_design_system.theme import (
                make_theme as make_full_theme,
            )

            return themes + [make_library(), make_full_theme()]
