from __future__ import annotations

import ckan.plugins as p
import ckan.plugins.toolkit as tk


@tk.blanket.helpers
@tk.blanket.blueprints
class NswdesignsystemPlugin(p.SingletonPlugin):
    p.implements(p.IConfigurer)

    # IConfigurer

    def update_config(self, config_):
        tk.add_template_directory(config_, "templates")
        tk.add_public_directory(config_, "public")
        tk.add_resource("assets", "nswdesignsystem")
