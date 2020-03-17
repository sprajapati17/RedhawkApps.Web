(function () {
    var container = $("<div class='ovrl_wnd_cont'>"),
        windowTemplate = "<div><div><header><p></p><span></span></header><div></div></div></div>";

    $(function () {
        container.prependTo(document.body);
    });

    $.fn.getModalWindow = function () {
        return this.data("modalWindow");
    };

    ModalWindow.options = {
        destroyOnClose: false
    };

    window.ModalWindow = ModalWindow;

    //ModalWindow.prototype = Object.create(kendo.Observable.prototype);

    $.extend(ModalWindow.prototype, {
        open: function () {
            this.element.addClass("open").appendTo(container);

            this.trigger("open");

            return this;
        },

        close: function () {
            this.trigger("close");

            if (this.options.destroyOnClose) {
                this.element.remove();
            }
            else {
                this.element.removeClass("open");
                if (this.element.prev(".open").length > 0) {
                    this.element.prependTo(container);
                }
            }

            return this;
        },

        title: function (title) {
            this.header.children("p").text(title);

            return this;
        },

        content: function (content) {
            this.contentElement.html(content);

            return this;
        }
    });

    function ModalWindow(options) {
        var that = this;
        debugger;
        this.options = $.extend(true, {}, ModalWindow.options, options);

        that.init();

        that.element = $(windowTemplate).appendTo(container);
        that.element.data("modalWindow", that);

        that.header = that.element.find("div > header")
        that.contentElement = that.element.find("> div > div");

        that.element.find("> div > header> span").click(function () {
            that.close();
        });

        if (that.options.title) {
            that.title(that.options.title);
            delete that.options.title;
        }

        if (that.options.content) {
            that.content(that.options.content);
            delete that.options.content;
        }
    }
})();
