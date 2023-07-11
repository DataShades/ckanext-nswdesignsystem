from __future__ import annotations

import ckan.plugins.toolkit as tk
from typing_extensions import Literal, NotRequired, TypedDict, overload

class SimpleLinkDict(TypedDict):
    href: str
    label: str

class GroupedSimpleLinkDict(TypedDict):
    href: str
    label: str
    children: list[SimpleLinkDict]


class NavigationLinkDict(TypedDict):
    href: str
    label: str
    subnav: NotRequired[NavigationLinkDict]


class NavigationSubnavDict(TypedDict):
    label: NotRequired[str]
    description: NotRequired[str]
    children: list[NavigationLinkDict]


def nswdesignsystem_header_links(type: Literal["navigation"]) -> list[NavigationLinkDict]:
    links = {
        "navigation": _navigation_header_links,
    }
    return links.get(type, [])


_navigation_header_links: list[NavigationLinkDict] = [
    {"href": "/", "label": "Dashboard"},
    {"href": "/", "label": "My Requests", "subnav": {"children": [
        {"href": "/", "label": "Link 1"},
        {"href": "/", "label": "Link 2"},
        {"href": "/", "label": "Link 3"},
    ]}},
    {"href": "/", "label": "My Data Products", "subnav": {"children": [
        {"href": "/", "label": "Link 1"},
        {"href": "/", "label": "Link 2"},
        {"href": "/", "label": "Link 3"},
    ]}},
    {"href": "/", "label": "My Groups", "subnav": {"children": [
        {"href": "/", "label": "Link 1"},
        {"href": "/", "label": "Link 2"},
        {"href": "/", "label": "Link 3"},
    ]}},
    {"href": "/", "label": "Browse by", "subnav": {"children": [
        {"href": "/", "label": "Link 1"},
        {"href": "/", "label": "Link 2"},
        {"href": "/", "label": "Link 3"},
    ]}},
    {"href": "/", "label": "Support", "subnav": {"children": [
        {"href": "/", "label": "Link 1"},
        {"href": "/", "label": "Link 2"},
        {"href": "/", "label": "Link 3"},
    ]}},
    {"href": "/", "label": "Help"},
]


@overload
def nswdesignsystem_footer_links(type: Literal["upper"]) -> list[GroupedSimpleLinkDict]:
    ...

@overload
def nswdesignsystem_footer_links(type: Literal["lower", "social"]) -> list[SimpleLinkDict]:
    ...


def nswdesignsystem_footer_links(type: Literal["upper", "lower", "social"]) -> list[SimpleLinkDict] | list[GroupedSimpleLinkDict]:
    links: dict[str, list[SimpleLinkDict] | list[GroupedSimpleLinkDict]] = {
        "upper": _upper_footer_links,
        "lower": _lower_footer_links,
        "social": _social_footer_links,
    }

    return links.get(type, [])


_upper_footer_links: list[GroupedSimpleLinkDict] = [
    {"label": "Popular", "href": "#", "children": [
        {"href": "/contact-the-premier", "label": "Contact the Premier"},
        {"href": "/contact-a-minister", "label": "Contact a Minister"},
        {"href": "/about-nsw", "label": "About NSW"},
        {"href": "/state-flag", "label": "State flag"},
        {"href": "/state-funerals", "label": "State Funerals"},
        {"href": "/buy-regional", "label": "Buy Regional"},
        {"href": "/life-events", "label": "Life events"},
        {"href": "/nsw-government-directory", "label": "NSW Government directory"},
        {"href": "/service-nsw-locations", "label": "Service NSW locations"},
    ]},
    {"label": "What's happening", "href": "#", "children": [
        {"href": "/news", "label": "News"},
        {"href": "/ministerial-media-releases", "label": "Ministerial media releases"},
        {"href": "/projects-and-initiatives", "label": "Projects and initiatives"},
        {"href": "/have-your-say", "label": "Have your say"},
        {"href": "/nsw-school-and-public-holidays", "label": "NSW school and public holidays"},
        {"href": "/find-a-job-in-nsw-government", "label": "Find a job in NSW Government"},
        {"href": "/i-work-for-nsw", "label": "I work for NSW"},
    ]},
    {"label": "Departments", "href": "#", "children": [
        {"href": "/customer-service", "label": "Customer Service"},
        {"href": "/communities-and-justice", "label": "Communities and Justice"},
        {"href": "/education", "label": "Education"},
        {"href": "/health", "label": "Health"},
        {"href": "/planning-industry-and-environment", "label": "Planning, Industry and Environment"},
        {"href": "/premier-and-cabinet", "label": "Premier and Cabinet"},
        {"href": "/regional-nsw", "label": "Regional NSW"},
        {"href": "/transport", "label": "Transport"},
        {"href": "/treasury", "label": "Treasury"},
    ]},
]

_lower_footer_links: list[SimpleLinkDict] = [
    {"href": "/accessibility", "label": "Accessibility"},
    {"href": "/copyright", "label": "Copyright"},
    {"href": "/disclaimer", "label": "Disclaimer"},
    {"href": "/privacy", "label": "Privacy"},
    {"href": "/content-sources", "label": "Content sources"},
    {"href": "/rss", "label": "RSS"},
    {"href": "/contact-us", "label": "Contact us"},
]
_social_footer_links: list[SimpleLinkDict] = [

]
