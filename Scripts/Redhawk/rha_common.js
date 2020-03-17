

function NotificationListForValidation(id, type, message, status) {
	$(id).empty();
	if (status) {
		jQuery('<div/>', {
			id: 'notification',
			class: 'dx-resizable notification-container dx-toast-content col-md-12',
		}).appendTo(id);

		jQuery('<div/>', {
			id: 'message',
			class: 'dx-toast-icon',
		}).appendTo('#notification');

		jQuery('<div/>', {
			id: 'message',
			class: 'dx-toast-message',
		}).appendTo('#notification');

		if (type == 'warning') {
			$("#notification").addClass("dx-toast-warning");
			$("#notification .dx-toast-message").html(function () {
				var temp = "<h4>Validation!</h4>";
				for (var i = 0; i < message.length; i++) {
					temp += "<li>" + message[i] + "</li>";
				}
				return temp;
			});
			$("#notification").show();
		}
		else if (type == 'error') {
			$("#notification").addClass("dx-toast-error");
			$("#notification .dx-toast-message").html(message);
			$("#notification").show();

			//$("#errorNotification .dx-toast-message").html(message);
			//$(".notification-container #errorNotification").show();
		}
		else if (type == 'success') {
			$("#notification").addClass("dx-toast-success");
			$("#notification .dx-toast-message").html(message);
			$("#notification").show();

			//$("#successNotification .dx-toast-message").html(message);
			//$(".notification-container #successNotification").show();
		}
		else if (type == 'info') {
			$("#notification").addClass("dx-toast-info");
			$("#notification .dx-toast-message").html(message);
			$("#notification").show();

			//$("#infoNotification .dx-toast-message").html(message);
			//$(".notification-container #infoNotification").show();
		}
	}
	else {
		$(id).empty();
	}


}


function Notification(id, type, message, status) {
	$(id).empty();
	if (status) {
		jQuery('<div/>', {
			id: 'notification',
			class: 'dx-resizable notification-container dx-toast-content col-md-12',
		}).appendTo(id);

		jQuery('<div/>', {
			id: 'message',
			class: 'dx-toast-icon',
		}).appendTo('#notification');

		jQuery('<div/>', {
			id: 'message',
			class: 'dx-toast-message',
		}).appendTo('#notification');

		if (type == 'warning') {

			$("#notification").addClass("dx-toast-warning");
			$("#notification .dx-toast-message").html(message);
			$("#notification").show();
		}
		else if (type == 'error') {
			$("#notification").addClass("dx-toast-error");
			$("#notification .dx-toast-message").html(message);
			$("#notification").show();

			//$("#errorNotification .dx-toast-message").html(message);
			//$(".notification-container #errorNotification").show();
		}
		else if (type == 'success') {
			$("#notification").addClass("dx-toast-success");
			$("#notification .dx-toast-message").html(message);
			$("#notification").show();

			//$("#successNotification .dx-toast-message").html(message);
			//$(".notification-container #successNotification").show();
		}
		else if (type == 'info') {
			$("#notification").addClass("dx-toast-info");
			$("#notification .dx-toast-message").html(message);
			$("#notification").show();

			//$("#infoNotification .dx-toast-message").html(message);
			//$(".notification-container #infoNotification").show();
		}
	}
	else {
		$(id).empty();
	}


}
