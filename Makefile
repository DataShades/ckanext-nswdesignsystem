
nds_node_path = node_modules/nsw-design-system/dist
nds_ckan_path = ckanext/nswdesignsystem/assets/vendor
hljs_ckan_path = ckanext/nswdesignsystem/assets/vendor

copy-vendor:
	cp -f "$(nds_node_path)/js/main.js" "$(nds_ckan_path)/"
	cp -f "$(nds_node_path)/css/main.css" "$(nds_ckan_path)/"

build-highlightjs:
	npm explore highlight.js -- npm i; \
	npm explore highlight.js -- node tools/build.js django python css javascript; \
	hljs_node_path=$$(npm explore highlight.js -- pwd); \
	cp -f "$${hljs_node_path}/build/demo/styles/a11y-dark.css" "$(hljs_ckan_path)/hljs.css"; \
	cp -f "$${hljs_node_path}/build/highlight.js" "$(hljs_ckan_path)/hljs.js";


changelog:
	git changelog -c conventional -o CHANGELOG.md
