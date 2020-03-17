var Message = {};

(function () {
    var wndMessage,
        wndConfirm;

    Message.success = function (message, options, callback) {
        alertMessage("Success", message, options, callback);
    };

    Message.warning = function (message, options, callback) {
        alertMessage("Warning", message, options, callback);
    };
    Message.delete = function (message, options, callback) {
    	alertMessage("Warning", message, options, callback);
    };

    Message.error = function (message, options, callback) {
        alertMessage("Error", message, options, callback);
    };
    //Message.error = function (message, options, callback) {
    //	alertMessage("Delete", message, options, callback);
    //}; TODO: What is this?  LyudvigV

    Message.show = function (data, options, callback) {
        alertMessage(data.HasError ? "Error" : "Success", data.Message, options, callback);
    };

    Message.failure = function () {
        if (!window.unloading) {
            Message.error("Unknown error occurred!");
        }
    };

    Message.confirm = function (message, yesCallback, options, noCallback) {
        if (!message) {
            return;
        }
        if (!wndConfirm) {
        	wndConfirm = new ModalWindow({ content: "<div class='message_box confirm'><div><div class='message_container'><div><span></span></div><div text></div></div></div><footer><button type='button' class='button no'></button><button type='button' class='button white yes'></button></footer></div>" });
            wndConfirm.element.addClass("message");
        }

        if (!options) {
            options = {};
        }

        wndConfirm.title(options.title || "");
        wndConfirm.element
            .find("[text]").text(message)
            .end()
            .find(".yes")
            .text(options.buttonYesText || "Yes")
            .off("click")
            .on("click", function () {
                wndConfirm.close();
                if ($.isFunction(yesCallback)) {
                    yesCallback();
                }
            })
            .end()
            .find(".no")
            .text(options.buttonNoText || "No")
            .off("click")
            .on("click", function () {
                wndConfirm.close();

                if ($.isFunction(noCallback)) {
                    noCallback();
                }
            });

        wndConfirm.open();
    }

    function alertMessage(type, message, options, callback) {
        if (!message) {
            return;
        }

        if (!wndMessage) {
            wndMessage = new ModalWindow({ content: "<div class='message_box'><div><div class='message_container'><div><span></span></div><div text></div></div></div><footer><button type='button' class='button yes'></button></footer></div>" });
            wndMessage.element.addClass("message");
        }
        
        var title = "";
        switch (type) {
            case "Success":
                title = "Success";
                break;
            case "Warning":
                title = "Warning";
                break;
            case "Error":
                title = "Error";
                break;
        	case "Delete":
        		title = "Delete";
        		break;
        }

        if (!options) {
            options = {};
        }

        wndMessage.title(options.title || title);

        wndMessage.element
            .find(".message_box").attr("class", "message_box " + type.toLowerCase())
            .end()
            .find("[text]").text(message)
            .end()
            .find(".yes")
            .text(options.buttonText || "Close")
            .off("click")
            .on("click", function () {
                wndMessage.close();

                if ($.isFunction(callback)) {
                    callback();
                }
            });

        wndMessage.open();
    }
})();

var Preloader = {
    show: function () {
        var elem = $("#divLoading");
        if (elem.length == 0) {
            elem = $("<div id='divLoading' class='preloader'><div><svg viewBox='0 0 50 50'><circle cx='25' cy='25' r='20' fill='none' stroke-width='5'></circle></svg></div></div>")
                .appendTo(document.body);
        }
        elem.show();
    },

    hide: function () {
        $("#divLoading").hide();
    }
};