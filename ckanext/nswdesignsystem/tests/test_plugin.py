"""Tests for NSW Design System public assets and external subresources."""

import re
from pathlib import Path
from urllib.parse import urljoin

import pytest

from ckan.common import config
from bs4 import BeautifulSoup


_CSS_URL = re.compile(r"url\(\s*['\"]?([^'\" )]+)['\"]?\s*\)")
_FONT_CSS_URL = "/catalog/nswdesignsystem/fonts/fonts.css"
_CHART_TEMPLATE = (
    Path(__file__).parents[1]
    / "themes/nds_ui/templates/macros/nds-ui/data.html"
)


def _backend_path(url):
    root_path = config["ckan.root_path"].replace("{{LANG}}", "").rstrip("/")
    assert url.startswith(root_path + "/")
    return url.removeprefix(root_path)


def _assert_fonts_are_local(app):
    response = app.get("/user/login", status=200)

    assert f'href="{_FONT_CSS_URL}"' in response.text
    assert "fonts.googleapis.com" not in response.text

    stylesheet = app.get(_backend_path(_FONT_CSS_URL), status=200)
    assert ".material-icons {" in stylesheet.text
    assert ".material-icons-outlined {" in stylesheet.text

    for asset_url in _CSS_URL.findall(stylesheet.text):
        assert not asset_url.startswith(("http://", "https://", "//"))
        app.get(_backend_path(urljoin(_FONT_CSS_URL, asset_url)), status=200)

    return response


def _assert_external_subresources_have_sri(response):
    page = BeautifulSoup(response.text, "html.parser")
    resources = page.select("script[src], link[rel~='stylesheet'][href]")

    for resource in resources:
        url = resource.get("src") or resource.get("href")
        if url.startswith(("http://", "https://", "//")):
            assert resource.get("integrity")
            assert resource.get("crossorigin") == "anonymous"


@pytest.mark.ckan_config("ckan.root_path", "/catalog")
@pytest.mark.ckan_config("ckan.webassets.url", "/serve/assets/from/here")
def test_legacy_theme_fonts_are_local(app):
    _assert_fonts_are_local(app)


@pytest.mark.ckan_config("ckan.root_path", "/catalog")
@pytest.mark.ckan_config("ckan.plugins", "theming nswdesignsystem")
@pytest.mark.ckan_config("ckan.ui.theme", "nsw-design-system")
@pytest.mark.ckan_config("ckanext.nswdesignsystem.legacy_enabled", False)
def test_new_theme_fonts_are_local(app):
    response = _assert_fonts_are_local(app)
    _assert_external_subresources_have_sri(response)


@pytest.mark.ckan_config("ckan.root_path", "/catalog")
def test_chart_macro_uses_local_assets(app):
    template = _CHART_TEMPLATE.read_text()

    assert "cdn.jsdelivr.net" not in template
    assert "h.url_for_static('/nswdesignsystem/chartist/index.css')" in template
    assert "h.url_for_static('/nswdesignsystem/chartist/index.js')" in template
    for filename in ("index.css", "index.js"):
        app.get(f"/nswdesignsystem/chartist/{filename}", status=200)
