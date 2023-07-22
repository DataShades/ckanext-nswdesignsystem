from __future__ import annotations

from . import types

navigation_header_links: list[types.NavDict] = [
    {"href": "#", "label": "Dashboard"},
    {
        "href": "#",
        "label": "My Requests",
        "subnav": {
            "children": [
                {"href": "#", "label": "Link 1"},
                {"href": "#", "label": "Link 2"},
                {"href": "#", "label": "Link 3"},
            ]
        },
    },
    {
        "href": "#",
        "label": "My Data Products",
        "subnav": {
            "children": [
                {"href": "#", "label": "Link 1"},
                {"href": "#", "label": "Link 2"},
                {"href": "#", "label": "Link 3"},
            ]
        },
    },
    {
        "href": "#",
        "label": "My Groups",
        "subnav": {
            "children": [
                {"href": "#", "label": "Link 1"},
                {"href": "#", "label": "Link 2"},
                {"href": "#", "label": "Link 3"},
            ]
        },
    },
    {
        "href": "#",
        "label": "Browse by",
        "subnav": {
            "children": [
                {"href": "#", "label": "Link 1"},
                {"href": "#", "label": "Link 2"},
                {"href": "#", "label": "Link 3"},
            ]
        },
    },
    {
        "href": "#",
        "label": "Support",
        "subnav": {
            "children": [
                {"href": "#", "label": "Link 1"},
                {"href": "#", "label": "Link 2"},
                {"href": "#", "label": "Link 3"},
            ]
        },
    },
    {"href": "#", "label": "Help"},
]

upper_footer_links: list[types.NavDict] = [
    {
        "label": "Popular",
        "href": "#",
        "subnav": {
            "children": [
                {"href": "/contact-the-premier", "label": "Contact the Premier"},
                {"href": "/contact-a-minister", "label": "Contact a Minister"},
                {"href": "/about-nsw", "label": "About NSW"},
                {"href": "/state-flag", "label": "State flag"},
                {"href": "/state-funerals", "label": "State Funerals"},
                {"href": "/buy-regional", "label": "Buy Regional"},
                {"href": "/life-events", "label": "Life events"},
                {
                    "href": "/nsw-government-directory",
                    "label": "NSW Government directory",
                },
                {"href": "/service-nsw-locations", "label": "Service NSW locations"},
            ]
        },
    },
    {
        "label": "What's happening",
        "href": "#",
        "subnav": {
            "children": [
                {"href": "/news", "label": "News"},
                {
                    "href": "/ministerial-media-releases",
                    "label": "Ministerial media releases",
                },
                {
                    "href": "/projects-and-initiatives",
                    "label": "Projects and initiatives",
                },
                {"href": "/have-your-say", "label": "Have your say"},
                {
                    "href": "/nsw-school-and-public-holidays",
                    "label": "NSW school and public holidays",
                },
                {
                    "href": "/find-a-job-in-nsw-government",
                    "label": "Find a job in NSW Government",
                },
                {"href": "/i-work-for-nsw", "label": "I work for NSW"},
            ]
        },
    },
    {
        "label": "Departments",
        "href": "#",
        "subnav": {
            "children": [
                {"href": "/customer-service", "label": "Customer Service"},
                {
                    "href": "/communities-and-justice",
                    "label": "Communities and Justice",
                },
                {"href": "/education", "label": "Education"},
                {"href": "/health", "label": "Health"},
                {
                    "href": "/planning-industry-and-environment",
                    "label": "Planning, Industry and Environment",
                },
                {"href": "/premier-and-cabinet", "label": "Premier and Cabinet"},
                {"href": "/regional-nsw", "label": "Regional NSW"},
                {"href": "/transport", "label": "Transport"},
                {"href": "/treasury", "label": "Treasury"},
            ]
        },
    },
]

lower_footer_links: list[types.NavDict] = [
    {"href": "/accessibility", "label": "Accessibility"},
    {"href": "/copyright", "label": "Copyright"},
    {"href": "/disclaimer", "label": "Disclaimer"},
    {"href": "/privacy", "label": "Privacy"},
    {"href": "/content-sources", "label": "Content sources"},
    {"href": "/rss", "label": "RSS"},
    {"href": "/contact-us", "label": "Contact us"},
]

social_footer_links: list[types.NavDict] = []
