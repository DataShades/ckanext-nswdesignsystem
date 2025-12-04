[![Tests](https://github.com/LinkDigital/ckanext-nswdesignsystem/workflows/Tests/badge.svg?branch=main)](https://github.com/LinkDigital/ckanext-nswdesignsystem/actions)

# ckanext-nswdesignsystem

Collection of tools for styling CKAN using [NSW Design System](https://digitalnsw.github.io/nsw-design-system/)


Compatibility with core CKAN versions:

| CKAN version | Compatible? |
|--------------|-------------|
| 2.9          | no          |
| 2.10         | yes         |

## Installation

To install ckanext-nswdesignsystem:

1. Install it via pip:
   ```sh
   pip install ckanext-nswdesignsystem
   ```

1. Add `nswdesignsystem` to the `ckan.plugins` setting in your CKAN
   config file

## Usage

When plugin enabled, visit `/nswdesignsystem/components` URL of the application. It
lists implemented components with the code examples.

![Component demo](/screenshots/demo.png?raw=true)

Components often rely on macros which can be overriden if component requires
customization. Check examples if you need the main macros for the component and
then look at the macro source, to find out, which additional macros it uses.

Some of components use helper functions defined in the curent
extension. Usually these are components that require some default data:
collection of links or content. For example, `footer` macro gets links for
`upper`, `lower`, and `social` sections from `nswdesignsystem_footer_links`
helper. Such helpers should be chained to use links that make a sense for the
particular portal.

Finally, some macros, like `masthead`, can be used either as function:

```jinja2
{{ masthead() }}
```

or using `call` block:

```jinja2
{% call masthead() %}
    {# additional content for masthead #}
{% endcall %}
```


Eventually you can override quite low-level part of the macro/helper/template
structure, so always keep an eye on changelog. If any of the application parts
have backward incompatible changes, it will be mentioned there.

## Config settings

None at present


## Development

To install ckanext-nswdesignsystem for development, activate your CKAN virtualenv and
do:

```sh
git clone https://github.com/DataShades/ckanext-nswdesignsystem.git
cd ckanext-nswdesignsystem
pip install -e.
```

Follow [conventional commits specification](https://www.conventionalcommits.org/en/v1.0.0/). Namely:

* commit with a new feature start with: `feat: <feature description(without angles)>`
* commit with a bugfix start with: `fix: <bug description(without angles)>`
* commit with anything not important for changelog: `chore: <short message(without angles)>`

### Update version of NSW design system library

Do not copy the source manually without further notices, because it will be
hard to identify the current version of the NSW design system. Instead, update
the version of the library using `npm`:

```sh
npm up nsw-design-system
```

Now you have the latest version of the library inside `node_modules`. Next,
copy it to assets folder using make-rule:

```sh
make vendor
```

Update the NSW Design System source files in assets using following command:

```sh
make nsw-source
```

Pay attention to the output of the command. This extension applies a number of
changes to the library. For example, it adds expanded default state to search
filters. These changes can be applied via patches from `patches` folder. `make
vendor` lists expected modifications like this:

```
Add conditional setting aria-expanded and hidden on filter button only if it is not already expanded:
        patches/default-expanded-filters.patch
```

When it's done, add feature commit `feat: nswdesignsystem vX.Y.Z` with all the changes.

## Tests

To run the tests, do:

    pytest


## Releasing a new version of ckanext-nswdesignsystem

If ckanext-nswdesignsystem should be available on PyPI you can follow these steps to publish a new version:

1. Update the version number in the `setup.cfg` file. See [PEP
   440](http://legacy.python.org/dev/peps/pep-0440/#public-version-identifiers)
   for how to choose version numbers.

1. Make sure you have the latest version of necessary packages:
   ```sh
   pip install -U twine build git-changelog -r dev-requirements.txt
   ```

1. Update changelog:
   ```sh
   make changelog
   ```

1. Create a source and binary distributions of the new version
   ```sh
   python -m build
   ```

1. Upload the source distribution to PyPI:
   ```sh
   twine upload dist/*
   ```

1. Commit any outstanding changes:
   ```sh
   git commit -a
   git push
   ```

1. Tag the new release of the project on GitHub with the version number from
   the `setup.cfg` file. For example if the version number in `setup.cfg` is
   0.0.1 then do:

       git tag v0.0.1
       git push --tags

## License

[AGPL](https://www.gnu.org/licenses/agpl-3.0.en.html)
