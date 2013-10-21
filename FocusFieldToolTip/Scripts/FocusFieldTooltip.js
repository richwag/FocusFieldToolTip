/*jshint nomen:false*/
(function ($) {
    /// <reference path="/Scripts/jquery-2.0.3.js"/>
    /// <reference path="/Scripts/jquery-ui-1.10.3.js"/>
    var className = "focusFieldTooltip",
        template = "<div class='ui-tooltip ui-widget ui-corner-all ui-widget-content'></div>";
    /*
    This widget represents a tooltip that shows when the field it's associated with has focus.
    */
    $.widget("richw.focusFieldTooltip", {
        /*
        showEffect: The effect (can be null) used when showing the tooltip. Detauls to fadeIn.
        hideEffect: Same as showEffect but used when tooltip is being hidden.
        content: The text of the tooltip. Can be a callback function or the actual content (html or text).
        position: jQuery ui positioning of tooltip relative to field.
        template: literal or jquery selector for the html that will be used to construct the tooltip. content is placed 
        inside of this template.
        */
        options: {
            showEffect: "fadeIn",
            hideEffect: "fadeOut",
            content: "",
            position: { my: "left center", at: "right+20 center", collision: "flip" }
        },

        _create: function () {
            var that = this;

            this.toolTip = $(template)
                .clone()
                .attr("id", this.toolTipId())
                .css({ display: "none" })
                .appendTo(this.element.parent());

            if (!this.toolTip.hasClass(className)) {
                this.toolTip.addClass(className);
            }

            this.element
                .attr("aria-describedby", this.toolTipId())
                .focusin(function () {
                    that.hideAllToolTips();
                    that.showToolTip();
                })
                .focusout(function () {
                    that.hideToolTip();
                })
                .blur(function () {
                    that.hideToolTip();
                });

            this._refresh();
        },

        _refresh: function () {
            this.toolTip.html(typeof this.options.content == "function" ? this.options.content() : this.options.content);
            this._trigger("change");
        },

        _setOptions: function () {
            this._superApply(arguments);
            this._refresh();
        },

        showToolTip: function () {
            if ($.trim(this.toolTip.text()).length) {
                this.toolTip.stop()
                    .css({ display: "block", opacity: 0 })
                    .position($.extend({ of: this.element }, this.options.position))
                    .animate({ opacity: 1 });
            }
        },

        hideToolTip: function () {
            var that = this;
            this.toolTip.stop().animate({ opacity: 0 }, function () { that.toolTip.hide(); });
        },

        hideAllToolTips: function () {
            this.element.parents("form").find("." + className).each(function() {
                $(this).hide();
            });
        },

        toolTipId: function () {
            return this.element.attr("id") + "_focusfieldtooltip";
        },

        _destroy: function () {
            this.toolTip.remove();
        }
    });
})(jQuery);

