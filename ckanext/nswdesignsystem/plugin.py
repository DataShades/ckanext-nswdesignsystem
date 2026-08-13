from __future__ import annotations


from typing_extensions import override
import ckan.plugins as p
import ckan.plugins.toolkit as tk

from ckan import types
from ckanext.theming.lib import Theme
from ckanext.theming.interfaces import ITheme
from ckanext.theming.plugin import themed_plugin
from ckanext.nswdesignsystem.themes.nds_ui.theme import make_theme as make_library
from ckanext.nswdesignsystem.themes.nsw_design_system.theme import (
    make_theme as make_full_theme,
)


@themed_plugin
@tk.blanket.helpers
@tk.blanket.blueprints
@tk.blanket.config_declarations
class NswdesignsystemPlugin(ITheme, p.IConfigurer, p.SingletonPlugin):
    # IConfigurer
    @override
    def update_config(self, config: types.CKANConfig):
        if config["ckanext.nswdesignsystem.legacy_enabled"]:
            tk.add_template_directory(config, "templates")
            tk.add_public_directory(config, "public")
            tk.add_resource("assets", "nswdesignsystem")

    @override
    def register_themes(self) -> list[Theme]:
        return [make_library(), make_full_theme()]
