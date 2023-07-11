
nds-node-path = node_modules/nsw-design-system/dist/
nds-ckan-path = ckanext/nswdesignsystem/assets/vendor/

copy-vendor:
	cp -f $(nds-node-path)js/main.js $(nds-ckan-path)
	cp -f $(nds-node-path)css/main.css $(nds-ckan-path)
