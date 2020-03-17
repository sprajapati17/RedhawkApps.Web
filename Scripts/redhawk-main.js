

var onBeforeSend = function (operation, param) {
	var token = document.cookie.split('=');
	param.headers = {
		"Authorization": "bearer " + token[1]
	}
}


// Error Correction 
var errorLogModifyOptionsTemplate = function (container, options) {
	var activityLogPolicyId = options.data.ActivityLogPolicyId;
	var rowIndex = options.rowIndex;
	var fixLabel = "Fix";
	var icon = "fa fa-2 fa-wrench";
	container.attr("activityLogPolicyId", "tp-modify-option-" + activityLogPolicyId);
	if (options.data.ErrorStatus) {
		fixLabel = "Fixed"
		icon = "";
	}
	$('<span data-activityLogPolicyId="' + activityLogPolicyId + '" data-errorCorrectionType="' + options.data.ErrorCorrectionType + '" data-companionPolicyNumber="' + options.data.CompanionPolicyNumber + '" class="rha-grid-control" style="color: green;"><i class="' + icon + ' " ></i><label style="margin-left:4px;">' + fixLabel + '</label></span>')
		.click(function (e) {

			if (options.data.ErrorStatus) {

				var comment = options.data.Comment;
				var personFixed = options.data.PersonFixed;
				var dateFixed = options.data.DateFixed;
				var html = "<label>This error was fixed by " + personFixed + "</label> </br>" +
					"<label>Comment :" + comment + "</label></br>" +
					"<label>Date Fixed : " + dateFixed + "</label>";
				DevExpress.ui.dialog.alert(html, "Fix an Error" + e.currentTarget.dataset.companionpolicynumber);
			}
			else {
				if (e.currentTarget.dataset.errorcorrectiontype == "Diamond") {

					var popup = $("#errorlog-popup").dxPopup("instance");
					popup.option("title", "Fix an error - " + e.currentTarget.dataset.companionpolicynumber);
					popup.option("activityLogPolicyId", e.currentTarget.dataset.activitylogpolicyid);
					popup.show();
				}
				else {
					location.hash = "#getInboundXml?id=" + e.currentTarget.dataset.activitylogpolicyid;
				}
			}

		}).appendTo(container);

	$('<span class="rha-grid-control" style="color: green;"><i class="fa fa-pencil-square-o">View</i></span>')
		.click(function (e) {
			debugger;
			var companionPolicyNumber = options.data.CompanionPolicyNumber;
			var description = options.data.ErrorDescription;
			var fileName = options.data.FileName;
			var html = "<label><b>Companion Policy Number : </b>" + companionPolicyNumber + "</label></br>" +
				"<label style='width:500px;'><b>Description : </b>" + description + "</label></br>" +
				"<label> <b>File Name : </b>" + fileName + "</label></br>";
			DevExpress.ui.dialog.alert(html, "Error Details");
		}).appendTo(container);

	if (options.data.ErrorCorrectionType == "XML") {
		$('<span  class="rha-grid-control" style="color: red;"><i class="fa fa-2 fa-flag" ><label style="margin-left:4px;">Skip</label></i></span>')
			.click(function (e) {
				var popup = $("#errorlogskip-popup").dxPopup("instance");
				popup.option("title", "Skip Error - " + options.data.CompanionPolicyNumber);
				popup.option("activityLogPolicyId", options.data.ActivityLogPolicyId);
				popup.option("Cea_Xml_id", options.data.CEA_Xml_id);
				popup.show();
			})
			.appendTo(container);
	}



}



//Skip the Error
var onSkipErrorLogEdit = function () {
	var popup = $("#errorlogskip-popup").dxPopup("instance");

	// validate form
	var form = $("#skip-errorlog-form").dxForm("instance");
	var result = form.validate();
	if (!result.isValid)
		return;
	else {
		var model = {
			ActivityLogPolicyId: popup._options.activityLogPolicyId,
			CEA_Xml_Id: popup._options.Cea_Xml_id,
			Comment: form._options.formData.Comment,

			DiamondUserId: $("#DiamondUserId").val(),
			DiamondUserName: $("#DiamondUserName").val()
		}

		$.ajax({
			url: kApiUrl + "SkipErrorLogs",
			headers: { 'authorization': 'Bearer ' + token },
			method: "Post",
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(model),
			success: function (response) {

				if (response.Status) {
					form.resetValues();
					$("#error-log-gridview").dxDataGrid("getDataSource").reload();

					DevExpress.ui.notify({
						message: response.Message, width: 500,
						shading: false, minWidth: 350, displayTime: 90000,
						position: { at: 'top', of: $('#notification-panel'), offset: '0 0' }
					}, "success", 1000);
				}
				else {
					form.resetValues();
					DevExpress.ui.notify({
						message: response.Message, width: 500,
						shading: false, minWidth: 350, displayTime: 100,
						position: { at: 'top', of: $('#notification-panel'), offset: '0 0' }
					}, "error", 1000);
				}

				popup.hide();

			},
			error: function (response) {
			},
		});

	}


}


var onCancelSkipErrorLog = function (container, options) {
	var popup = $("#errorlogskip-popup").dxPopup("instance");
	var form = $("#skip-errorlog-form").dxForm("instance");
	form.resetValues();
	popup.hide();
}


// need to work more on this.
var errorTransactionModifyOptionsTemplate = function (container, options) {
	Notification("#notificationContainer", 'Success', "Processing Status updated successfully ", true);

	var CEAXmlId = options.data.CeaXmlId;
	var rowIndex = options.rowIndex;
	var fixLabel = "Fix";
	var icon = "fa fa-2 fa-wrench";
	container.attr("id", "tp-modify-option-" + CEAXmlId);
	$('<span data-ceaXMlId="' + options.data.CeaXmlId + '" data-processingStatus="' + options.data.ProcessingStatus + '" data-companionPolicyNumber="' + options.data.CompanionPolicyNumber + '" class="rha-grid-control" style="color: green;"><i class="' + icon + ' " ></i><label style="margin-left:4px;">' + fixLabel + '</label></span>')
		.click(function (e) {
			var popup = $("#transcation-update-processingstatus-popup").dxPopup("instance");
			popup.option("title", "Update Processing Status");
			popup.option("CEA_Xml_id", options.data.CeaXmlId);
			popup.option("ProcessingStatus", options.data.ProcessingStatus);
			popup.show();

		}).appendTo(container);


}



function toolbar_transcation_grid(e) {

	var dataGrid = e.component;
	e.toolbarOptions.items.unshift({
		location: "before",
		widget: "dxSelectBox",
		options: {
			width: 200,
			items: [{
				value: "CompanionPolicyNumber",
				text: "Companion Policy Number"
			}, {
				value: "FileDate",
				text: "File date"
			}],
			displayExpr: "text",
			valueExpr: "value",
			value: "searchKey",
			onValueChanged: function (e) {
			}
		}
	},
		{
			location: "before",
			widget: "dxTextBox",
			options: {
				width: 200,
				placeholder: "search",
				id: "companionpolicynumbertxtbox"

			}
		},

		{
			location: "before",
			widget: "dxDateBox",
			options: {
				elementAttr: { "id": "fileStartDate" },
				icon: "find",
				type: "date",
				pickerType: "date",
				placeholder: "Start Date",
				value: new Date()
			}
		},

		{
			location: "before",
			widget: "dxDateBox",
			options: {
				elementAttr: { "id": "fileEndDate" },

				pickerType: "date",
				type: "date",
				placeholder: "End Date",
				value: new Date()
			}
		},
		{
			location: "before",
			widget: "dxButton",
			options: {
				icon: "find",
				text: "Search"
			}
		}
	);
}

var onSearchKeyInit = function () {

	$("#fileEndDate").dxDateBox("instance").option("visible", false);

}

var onCancelErrorLogEdit = function (container, options) {
	var popup = $("#errorlog-popup").dxPopup("instance");

	var form = $("#fix-errorlog-form").dxForm("instance");
	form.resetValues();
	popup.hide();
}


var onFixErrorLogEdit = function (container, options) {

	var popup = $("#errorlog-popup").dxPopup("instance");

	// validate form
	var form = $("#fix-errorlog-form").dxForm("instance");
	var result = form.validate();
	if (!result.isValid)
		return;
	else {
		var model = {
			ActivityLogPolicyId: popup._options.activityLogPolicyId,
			Comment: form._options.formData.Comment,
			DiamondUserId: $("#DiamondUserId").val(),
			DiamondUserName: $("#DiamondUserName").val()
		}

		$.ajax({
			url: kApiUrl + "/UpdateErrorLogs",
			headers: { 'authorization': 'Bearer ' + token },
			method: "Post",
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(model),
			success: function (response) {
				if (response.Status) {
					form.resetValues();
					$("#error-log-gridview").dxDataGrid("getDataSource").reload();

					DevExpress.ui.notify({
						message: "Error has been fixed successfully", width: 500,
						shading: false, minWidth: 350, displayTime: 90000,
						position: { at: 'top', of: $('#notification-panel'), offset: '0 0' }
					}, "success", 1000);
				}
				else {
					form.resetValues();
					DevExpress.ui.notify({
						message: response.Message, width: 500,
						shading: false, minWidth: 350, displayTime: 100,
						position: { at: 'top', of: $('#notification-panel'), offset: '0 0' }
					}, "error", 1000);
				}

				popup.hide();

			},
			error: function (response) {
			},
		});
	}


}

var onCancelXmlEditor = function (container, options) {
	var popup = $("#xmleditor-popup").dxPopup("instance");
	popup.hide();
}

var onSaveXmlEditor = function (container, options) {
	var popup = $("#xmleditor-popup").dxPopup("instance");
	popup.hide();
}



// Transcation

var onUpdateProcessingStatus = function () {


	var popup = $("#transcation-update-processingstatus-popup").dxPopup("instance");

	// validate form
	var form = $("#update-transcation-form").dxForm("instance");
	var result = form.validate();
	if (!result.isValid)
		return;
	else {
		var model = {
			CeaXmlId: popup._options.CEA_Xml_id,
			ProcessingStatus: form._options.formData.ProcessingStatus,
			Comment: form._options.formData.Comment
		}

		$.ajax({
			url: kApiUrl + "UpdateProcessingStatus",
			headers: { 'authorization': 'Bearer ' + token },
			method: "Post",
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(model),
			success: function (response) {
				Notification("#notificationContainer", 'Success', "Processing Status updated successfully ", true);
				//$("#error-log-gridview").dxDataGrid("instance").refresh();
				form.resetValues();
				onSearchTransaction();

			},
			error: function (response) {
				form.resetValues();
			},
		});
		popup.hide();
	}

}

var onSearchTransaction = function (container, options) {
	var formModel = $("#search-transaction-form").dxForm("instance");
	var datagridModel = $("#transcation-gridview").dxDataGrid("instance");
	var status = null;
	if (formModel._options.formData.ProcessingStatus != null) {
		if (formModel._options.formData.ProcessingStatus.length > 0) {
			status = formModel._options.formData.ProcessingStatus.toString()
		}
	}

	var model = {
		CompanionPolicyNumber: formModel._options.formData.CompanionPolicyNumber,
		FileStartDate: formModel._options.formData.FileStartDate,
		FileEndDate: formModel._options.formData.FileEndDate,
		ComapanyId: formModel._options.formData.Company,
		ProcessingStatus: status
	}

	var optionModel = {
		Skip: 0,
		Take: datagridModel._options.paging.pageSize
	}

	$.ajax({
		url: kApiUrl + "SearchTranscation",
		headers: { 'authorization': 'Bearer ' + token },
		method: "POST",
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(model),
		success: function (response) {
			debugger;
			datagridModel.option("dataSource", response.data);
		
			//$("#error-log-gridview").dxDataGrid("instance").refresh();
		},
		error: function (response) {
		},
	});

}

var onCancelTransaction = function () {

	$("#search-transaction-form").dxForm("instance").resetValues();

}

var onClearTransactionPopupform = function () {

	//	$("#search-transaction-form").dxForm("instance").resetValues();
}





//Error Fixed 


function CreateXonomyCompare(inboundXml, inboundArcXml, inboundXmlElements) {
	var model = inboundXmlElements;
	$("#xmlEditorA").empty();
	$("#xmlEditorB").empty();
	var editorA = document.getElementById("xmlEditorA");
	var editorB = document.getElementById("xmlEditorB");
	Xonomy.render(inboundXml, editorA, CreateUnEditableDocSpec(false, model));
	Xonomy.render(inboundArcXml, editorB, CreateUnEditableDocSpec(false, model));

	var ids = $(".attributes").find("[data-name=hasChanged]");
	for (var i = 0; i < ids.length; i++) {
		var dataid = ids[i].id;
		var parentId = $('#' + dataid + '').parents('.element.hasText').attr('id');
		$('#' + parentId + '').children('.children').addClass('compare-element');
	}

}
var errorLogFixedViewOptionsTemplate = function (container, options) {

	var errorCorrectionType = options.data.ErrorCorrectionType;

	$('<span class="rha-grid-control" style="color: green;"><i class="fa fa-pencil-square-o">View</i></span>')
		.click(function (e) {

			if (errorCorrectionType == "Diamond") {
				var comment = options.data.Comment;
				var html = "<label style='width:500px'><b>Comment :</b>" + comment + "</label>";
				DevExpress.ui.dialog.alert(html, "Error Correction Details");

			}

			if (errorCorrectionType == "XML") {
				var i = options.data.CEA_Xml_id;
				var activityPolicyLogId = options.data.ActivityLogPolicyId;

				$.ajax({
					url: kApiUrl + "CompareInboundXml",
					headers: { 'authorization': 'Bearer ' + token },
					data: { "ceaXmlId": i, "activityLogPolicyId": activityPolicyLogId },
					contentType: "application/json",
					method: "GET",
					success: function (data) {
						if (data.InboundXML == null || data.InboundArchXML == null) {

							var comment = options.data.Comment;
							var html = "<label style='width:500px'><b>Comment :</b>" + comment + "</label>";
							DevExpress.ui.dialog.alert(html, "Error Correction Details");

						}
						else {
							var popup = $("#compare-xml-popup").dxPopup("instance");
							popup.option("title", "Compare XML ");
							popup.show();
							CreateXonomyCompare(data.InboundXML, data.InboundArchXML, data.InboundXmlElements);

						}

					}
				})
			}

		}).appendTo(container);


}

var onCancelComparePopup = function (container, options) {
	var popup = $("#compare-xml-popup").dxPopup("instance");

	popup.hide();
}


//dashboard
function GetDateFromDatePicker(data) {
	var month = (data.getMonth() + 1).toString();
	var day = data.getDate().toString();
	var year = data.getFullYear().toString();
	var date = year + "/" + month + "/" + day;
	return date;
}


var getLoginDomain = function () {
	return $("#loginDomain").val();
}
//////////////////////////////////////////////
// Conversion Search /////////////////////////
///////////////////////////////////////////////

var onConversionSearchTransaction = function (container, options) {

	debugger;

	var formModel = $("#conversion-search-transaction-form").dxForm("instance");
	var datagridModel = $("#conversionsearchresult-grid").dxDataGrid("instance");
	var status = null;
	if (formModel._options.formData.ProcessingStatus != null) {
		if (formModel._options.formData.ProcessingStatus.length > 0) {
			status = formModel._options.formData.ProcessingStatus.toString()
		}
	}

	var model = {
		CompanionPolicyNumber: formModel._options.formData.CompanionPolicyNumber,
		PolicyNumber: formModel._options.formData.PolicyNumber,
		ProcessingStatus: status
	}

	var optionModel = {
		Skip: 0,
		Take: datagridModel._options.paging.pageSize
	}

	$.ajax({
		url: kApiUrl + "Conversion/Search",
		headers: { 'authorization': 'Bearer ' + token },
		method: "POST",
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(model),
		success: function (response) {
			debugger;
			datagridModel.option("dataSource", response.ConversionSearchModelResultList);

			//$("#error-log-gridview").dxDataGrid("instance").refresh();
		},
		error: function (response) {
		},
	});

}

var onConversionCancelTransaction = function () {

	$("#conversion-search-transaction-form").dxForm("instance").resetValues();

}



function CreateXonomyForConversionXml(inboundXml, inboundXmlElements) {
	debugger;
	var model = inboundXmlElements;
	$("#ceaConversionXml").empty();
	var editorA = document.getElementById("ceaConversionXml");
	Xonomy.render(inboundXml, editorA, CreateUnEditableDocSpec(false, model));
}


var conversionXmlTransactionModifyOptionsTemplate = function (container, options) {
	//Notification("#notificationContainer", 'Success', "Processing Status updated successfully ", true);

	debugger;
	var CEAXmlId = options.data.CEAXmlId;
	var rowIndex = options.rowIndex;
	var fixLabel = "Fix";
	var icon = "fa fa-2 fa-wrench";
	container.attr("id", "tp-modify-option-" + CEAXmlId);

	$('<span data-ceaXMlId="' + options.data.CeaXmlId + '" class="rha-grid-control" style="color: green;"><i class="' + icon + ' " ></i><label style="margin-left:4px;">Fix</label></span>')
		.click(function (e) {
			debugger;
			var popup = $("#conversion-update-processingstatus-popup").dxPopup("instance");
			popup.option("title", "Update Processing Status");
			popup.option("CEA_Xml_id", options.data.CEAXmlId);
			popup.option("ProcessingStatus", options.data.ProcessingStatus);
			popup.show();

		}).appendTo(container);

	$('<span data-CEAXmlId="' + CEAXmlId + '"   class="rha-grid-control" style="color: green;"><i class="' + icon + ' " ></i><label style="margin-left:4px;">View</label></span>')
		.click(function (e) {
			debugger;
			var i = options.data.CEAXmlId;

			$.ajax({
				url: kApiUrl + "Conversion/GetConversionXml",
				headers: { 'authorization': 'Bearer ' + token },
				data: { "ceaXmlId": i, },
				contentType: "application/json",
				method: "GET",
				success: function (data) {
					debugger;
					var popup = $("#conversion-xml-popup").dxPopup("instance");
						popup.option("title", "Conversion XML ");
						popup.show();
					CreateXonomyForConversionXml(data.InboundXMLString, data.InboundXmlElements);
					
				}
			});

				
		}).appendTo(container);


}


var onClearTransactionPopupform = function () {

	//	$("#search-transaction-form").dxForm("instance").resetValues();
}




var onConversionUpdateProcessingStatus = function () {


	var popup = $("#conversion-update-processingstatus-popup").dxPopup("instance");

	// validate form
	var form = $("#update-conversion-form").dxForm("instance");
	var result = form.validate();
	if (!result.isValid)
		return;
	else {
		var model = {
			CeaXmlId: popup._options.CEA_Xml_id,
			ProcessingStatus: form._options.formData.ProcessingStatus,
			Comment: form._options.formData.Comment
		}

		$.ajax({
			url: kApiUrl + "Conversion/UpdateProcessingStatus",
			headers: { 'authorization': 'Bearer ' + token },
			method: "Post",
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(model),
			success: function (response) {
				Notification("#notificationContainer", 'Success', "Processing Status updated successfully ", true);
				//$("#error-log-gridview").dxDataGrid("instance").refresh();
				form.resetValues();
				onSearchTransaction();

			},
			error: function (response) {
				form.resetValues();
			},
		});
		popup.hide();
	}

}



var onConvCancelSkipErrorLog = function (container, options) {
	var popup = $("#conversion-update-processingstatus-popup").dxPopup("instance");
	var form = $("#skip-errorlog-form").dxForm("instance");
	form.resetValues();
	popup.hide();
}


var onCancelConversionXmlPopup = function (container, options) {
	var popup = $("#conversion-xml-popup").dxPopup("instance");

	popup.hide();
}