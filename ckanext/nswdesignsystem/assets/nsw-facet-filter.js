ckan.module("nsw-facet-filter", function ($, _) {
    "use strict";

    return {
        options: {
            visible: 5,
            name: ''
        },

        initialize: function () {
            $.proxyAll(this, /_on/);
            
            this.visibleLimit = parseInt(this.options.visible, 10) || 5;
            this.input = this.el
            this.parent = $(this.el).closest('.nsw-filters__item');
            this.children = this.parent.find('.nsw-form__group');
            this.all_filters = this.parent.find('.nsw-filters__all');
            this.show_more = this.parent.find('.nsw-filters__more');

            $(this.input).on("input", this._onInputChange);
        },
        _onInputChange: function () {
            const val = this.input.val().toLowerCase();
            this.children.each((idx) => {
                this.children[idx].hidden = !~(
                this.children[idx]
                    .querySelector(".nsw-form__checkbox-label")
                    .textContent.toLowerCase() || ""
                ).indexOf(val);
            });

            var visibleItems = this.children.filter(function(idx,item) {
                return !item.hasAttribute('hidden');
            });
            if (visibleItems.length <= this.visibleLimit) {
                this.all_filters.removeClass('nsw-display-none');
                this.show_more.addClass('nsw-display-none');
            } else {
                this.all_filters.addClass('nsw-display-none');
                this.show_more.removeClass('nsw-display-none');
            }
        },
    };
});
