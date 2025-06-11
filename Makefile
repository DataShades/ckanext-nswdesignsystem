.DEFAULT_GOAL := help
.PHONY = help


nds_node_path = node_modules/nsw-design-system/dist
nds_ckan_path = ckanext/nswdesignsystem/assets/vendor

hljs_ckan_path = ckanext/nswdesignsystem/assets/vendor
hljs_supported_languages = django python css javascript


help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

vendor:  ## copy NSW Design System JS/CSS from node_modules into CKAN assets
	cp -f "$(nds_node_path)/js/main.js" "$(nds_ckan_path)/nswdesignsystem.js"
	cp -f "$(nds_node_path)/css/main.css" "$(nds_ckan_path)/nswdesignsystem.css"
	@echo "Add conditional setting aria-expanded and hidden on filter button only if it is not already expanded:"
	@echo -e "\tpatches/default-expanded-filters.patch"

hljs:  ## build and copy highlight.js into CKAN assets
	npm explore highlight.js -- npm i; \
	npm explore highlight.js -- node tools/build.js $(hljs_supported_languages); \
	hljs_node_path=$$(npm explore highlight.js -- pwd); \
	cp -f "$${hljs_node_path}/build/demo/styles/a11y-dark.css" "$(hljs_ckan_path)/hljs.css"; \
	cp -f "$${hljs_node_path}/build/highlight.js" "$(hljs_ckan_path)/hljs.js";


changelog:  ## compile changelog
	git changelog -c conventional -o CHANGELOG.md $(if $(bump),-B $(bump))
