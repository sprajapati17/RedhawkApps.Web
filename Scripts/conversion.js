//$(function () {
//    var i = 0;
//    function progressBar(elem, agencyFile, paymentsFile) {
//        var parent = $(elem).closest('.input_cont'),
//            decor = parent.find('decor'),
//            detail = parent.find('detail'),
//            text = detail.find('span'),
//            textDone = elem.files && elem.files[0].name;
//        parent.attr('process', '');
//        if (agencyFile) {
//            textDone = $('.defaultFile').val();
//        }
//        move();
//        function move() {
//            if (i == 0) {
//                i = 1;
//                var width = 1;
//                var id = setInterval(frame, 10);
//                if (paymentsFile) {
//                    width = 100;
//                    textDone = 'Skipped'
//                }
//                function frame() {
//                    if (width >= 100) {
//                        clearInterval(id);
//                        i = 0;
//                        parent.removeAttr('process').attr('success', '');
//                        text.text(textDone);

//                       if ($('[success=""]').length == 4) {
//                           var primaryButton = parent.closest('.sections').find('.primary');
//                           var primaryButton1 = $($($('.sections')[1]).find('.primary')[0]);
//                           var primaryButton2 = $($('.sections')[2]).find('.primary');
//                        primaryButton.removeAttr('disabled');
//                           primaryButton.click(function () {
//                               primaryButton.parent().attr({'success': '' });
//                               primaryButton.find('i').css('display', 'block');
//                               primaryButton.find('detail').find('text').text('Done')

//                               primaryButton1.removeAttr('disabled');

//                            })
//                           primaryButton1.click(function () {
//                               primaryButton1.parent().attr({ 'success': '' });
//                               primaryButton1.find('i').css('display', 'block');
//                               primaryButton1.find('detail').find('text').text('Done')
//                               primaryButton2.removeAttr('disabled');
//                           })
//                           primaryButton2.click(function () {
//                               primaryButton2.parent().attr({ 'success': '' });
//                               primaryButton2.find('i').css('display', 'block');
//                               primaryButton2.find('detail').find('text').text('Done')
//                           })
//                        }

//                    } else {
//                        width++;
//                        decor.css('width', width + '%');
//                    }

//                }
//            }
//        }
//    }
//    $('.agencie').click(function (event) {
//        var fileInput = $('.agenchyFileBrowser');
//        $("#loadAgency").dialog({
//            resizable: false,
//            height: "auto",
//            width: 400,
//            modal: true,
//            buttons: {
//                "Select Default Agency": function () {

//                    $("#defaultFile").dialog({
//                        resizable: false,
//                        height: "auto",
//                        width: 400,
//                        modal: true,
//                        buttons: {
//                            "OK": function () {
//                                progressBar(fileInput, true)
//                                $(this).dialog("close");
//                            },
//                        }
//                    });
//                    $(this).dialog("close");
//                },
//                "Select an Agency File": function () {

//                    fileInput.attr('type', 'file');
//                    fileInput.click()
//                    fileInput.change(function (e) {
//                        progressBar(e.target)
//                    })
//                    //fileInput.attr('type', 'text');
//                    $(this).dialog("close");
//                }
//            }
//        });
//    });
//    $('.payments').click(function (event) {
//        var fileInput = $('.paymentsFileBrowser');
//        $("#loadPayments").dialog({
//            resizable: false,
//            height: "auto",
//            width: 400,
//            modal: true,
//            buttons: {
//                "Select a Payment File": function () {
//                    fileInput.attr('type', 'file');
//                    fileInput.click()
//                    fileInput.change(function (e) {
//                        progressBar(e.target)
//                    })
//                    //fileInput.attr('type', 'text');
//                    $(this).dialog("close");
//                },
//                "Skip Payment File": function () {
//                    progressBar(fileInput, null,true)
//                    $(this).dialog("close");
//                }
//            }
//        });
//    });

//    $("[type=file]").change(function (e) {
//		progressBar(e.target)

//		debugger;
//		if (e.target.id == "btnConvert601") {

//			var model = {
//				XmlFilePath: "C:\\CEA\\Demo-Conversion\\Liberty\\601\\RHPortal\\SampleNewBusiness.xml"
//			};
//			var loadPanel = $("#shared-loadpanel")
//				.dxLoadPanel({
//					position: "{my: 'center', at: 'center', of: window}",
//					shading: true
//				})
//				.dxLoadPanel("instance");
//			loadPanel.show();
//			$.ajax({

//				url: kApiUrl + "PreConversion/SaveXmlFile",
//				type: 'POST',
//				data: JSON.stringify(model),
//				dataType: 'json',
//				contentType: 'application/json',
//				success: function (data) {


//					var model2 = {
//						XmlFilePath: "C:\\CEA\\Demo-Conversion\\Liberty\\601\\RHPortal\\Converted_Order_SampleNewBusiness.xml"
//					};

//					$.ajax({
//						url: kApiUrl + "PreConversion/SaveXmlFileToInbound",
//						type: 'POST',
//						data: JSON.stringify(model2),
//						dataType: 'json',
//						contentType: 'application/json',
//						success: function (data) {
//							debugger;
//							loadPanel.hide();
//							if (data.status = 1) {
//								$("#loadResults").dialog({
//									resizable: false,
//									height: "auto",
//									width: 400,
//									modal: true,
//									open: function () {
//										var markup = 'The file has been loaded successfully in conversion xml table.';
//										$(this).html(markup);
//									}
//								});

//							}
//							else {

//								$("#loadResults").dialog({
//									resizable: false,
//									height: "auto",
//									width: 400,
//									modal: true,
//									open: function () {
//										var markup = 'Error while loading file has been loaded in conversion xml table.';
//										$(this).html(markup);
//									}
//								});

//							}


//						},
//						error: function (request, error) {
//							debugger;
//							console.log(error);

//						}
//					});


//				},
//				error: function (request, error) {
//					debugger;
//					console.log(error);

//				}
//			});



//		}

//	})

//	$("#btnExecuteConversion").click(function (e) {

//		var model = {
//			XmlFilePath: "C:\\CEA\\Demo-Conversion\\Liberty\\601\\RHPortal\\Converted_Order_SampleNewBusiness.xml"
//		};

//		var loadPanel = $("#shared-loadpanel")
//			.dxLoadPanel({
//				position: "{my: 'center', at: 'center', of: window}",
//				shading: true
//			})
//			.dxLoadPanel("instance");
//		loadPanel.show();

//		$.ajax({

//			url: kApiUrl + "Conversion/RunConversion",
//			type: 'POST',
//			data: JSON.stringify(model),
//			dataType: 'json',
//			contentType: 'application/json',
//			success: function (data) {
//				if (data.status = 1) {

//					loadPanel.hide();

//					$("#loadResults").dialog({
//						resizable: false,
//						height: "auto",
//						width: 400,
//						modal: true,
//						open: function () {
//							var markup = 'The policy has been saved in Diamond successfully.';
//							$(this).html(markup);
//						}
//					});
//				}
//				else {

//					loadPanel.hide();
//					$("#loadResults").dialog({
//						resizable: false,
//						height: "auto",
//						width: 400,
//						modal: true,
//						open: function () {
//							var markup = 'There was an error while saving the policy in Diamond.';
//							$(this).html(markup);
//						}
//					});

//				}

//			},
//			error: function (request, error) {
//				debugger;
//				console.log(error);

//			}
//		});

//	})

//});


$(function () {

	debugger;
	var i = 0,
		reports = $('#reports'),
		interval = null,
		data = {};

	////==== TEMPORARY ====
	//data.IsPreConversionExecutionCompleted = false;
	//data.IsConversionExecutionCompleted = true;
	//data.IsReconciliationCompleted = true;

	//data.PreConversionFileName = "F1";
	//data.PreConversionPaymentFileName = "F2";
	//data.IsPreConversionPaymentSkipped = true;
	//data.PreConversionAgencyFileName = "F3";
	//data.PreConversionDefaultAgency = "A3";
	//data.PreConversionAgencyPolicyFileName = "F4";
	//==== TEMPORARY ====

	//window.getApiUrl = function () {
	//	var apiUrl = null;
	//	$.ajax({
	//		url: "Conversion/GetApiUrl",
	//		method: "Get",
	//		async: false,
	//		success: function (response) {
	//			apiUrl = response;
	//		},
	//		error: function (response) {

	//		},
	//	});
	//	return apiUrl;
	//}

	//window.Operation = {
	//	UploadPreConversion601: "UploadPreConversion601",
	//	UploadPreConversionPayment: "UploadPreConversionPayment",
	//	UploadPreConversionAgency: "UploadPreConversionAgency",
	//	UploadPreConversionAgencyPolicy: "UploadPreConversionAgencyPolicy",
	//	ExecutePreConversion: "ExecutePreConversion",
	//	ExecuteConversion: "ExecuteConversion",
	//	ExecuteReconciliation: "ExecuteReconciliation"
	//}

	//"Execute Pre-Conversation" button disabled
	//"Execute Conversion" button disabled
	//"Execute Reconciliation" button disabled
	//All Report Buttons invisible





	/////////////////////////////////////////
	//if the conversion is for first time////
	///////////////////////////////////////





	$('.agencie').click(function (event) {
		var fileInput = $('.agenchyFileBrowser');
		$("#loadAgency").dialog({
			resizable: false,
			height: "auto",
			width: 400,
			modal: true,
			buttons: {
				"Select Default Agency": function () {

					$("#defaultFile").dialog({
						resizable: false,
						height: "auto",
						width: 400,
						modal: true,
						buttons: {
							"OK": function () {
								progressBar(fileInput, true)
								$(this).dialog("close");
							},
						}
					});
					$(this).dialog("close");
				},
				"Select an Agency File": function () {

					fileInput.attr('type', 'file');
					fileInput.click()
					fileInput.change(function (e) {
						progressBar(e.target)
					})
					//fileInput.attr('type', 'text');
					$(this).dialog("close");
				}
			}
		});
	});
	$('.payments').click(function (event) {
		var fileInput = $('.paymentsFileBrowser');
		$("#loadPayments").dialog({
			resizable: false,
			height: "auto",
			width: 400,
			modal: true,
			buttons: {
				"Select a Payment File": function () {
					fileInput.attr('type', 'file');
					fileInput.click()
					fileInput.change(function (e) {
						progressBar(e.target)
					})
					//fileInput.attr('type', 'text');
					$(this).dialog("close");
				},
				"Skip Payment File": function () {
					progressBar(fileInput, null, true)
					$(this).dialog("close");
				}
			}
		});
	});
	$("[type=file]").change(function (e) {
		
		progressBar(e.target)

		if (e.target.id == "btnConvert601") {
			
			var model = {
				XmlFilePath: "C:\\CEA\\Demo-Conversion\\Liberty\\601\\RHPortal\\SampleNewBusiness.xml"
			};
			var loadPanel = $("#shared-loadpanel")
				.dxLoadPanel({
					position: "{my: 'center', at: 'center', of: window}",
					shading: true
				})
				.dxLoadPanel("instance");
			loadPanel.show();

			enableResetAll(true);
			debugger;
			$.ajax({

				url: kApiUrl + "Conversion/Pre/SaveXmlFile",
				type: 'POST',
				data: JSON.stringify(model),
				dataType: 'json',
				contentType: 'application/json',
				success: function (data) {
					debugger;
					var model2 = {
						XmlFilePath: "C:\\CEA\\Demo-Conversion\\Liberty\\601\\RHPortal\\Converted_Order_SampleNewBusiness.xml"
					};

					$.ajax({
						url: kApiUrl + "Conversion/Pre/SaveXmlFileToInbound",
						type: 'POST',
						data: JSON.stringify(model2),
						dataType: 'json',
						contentType: 'application/json',
						success: function (data) {
							debugger;
							loadPanel.hide();
							if (data.status = 1) {
								$("#loadResults").dialog({
									resizable: false,
									height: "auto",
									width: 400,
									modal: true,
									open: function () {
										var markup = 'The file has been loaded successfully in conversion xml table.';
										$(this).html(markup);
									}
								});

							}
							else {

								$("#loadResults").dialog({
									resizable: false,
									height: "auto",
									width: 400,
									modal: true,
									open: function () {
										var markup = 'Error while loading file has been loaded in conversion xml table.';
										$(this).html(markup);
									}
								});

							}


						},
						error: function (request, error) {
							debugger;
							console.log(error);

						}
					});


				},
				error: function (request, error) {
					debugger;
					console.log(error);

				}
			});



		}

	})

	
	$("#btnExecuteConversion").click(function (e) {

		var model = {
			XmlFilePath: "C:\\CEA\\Demo-Conversion\\Liberty\\601\\RHPortal\\Converted_Order_SampleNewBusiness.xml"
		};

		var loadPanel = $("#shared-loadpanel")
			.dxLoadPanel({
				position: "{my: 'center', at: 'center', of: window}",
				shading: true
			})
			.dxLoadPanel("instance");
		loadPanel.show();

		$.ajax({

			url: kApiUrl + "Conversion/RunConversion",
			type: 'POST',
			data: JSON.stringify(model),
			dataType: 'json',
			contentType: 'application/json',
			success: function (data) {
				if (data.status = 1) {

					loadPanel.hide();

					$("#loadResults").dialog({
						resizable: false,
						height: "auto",
						width: 400,
						modal: true,
						open: function () {
							var markup = 'The policy has been saved in Diamond successfully.';
							$(this).html(markup);
						}
					});
				}
				else {

					loadPanel.hide();
					$("#loadResults").dialog({
						resizable: false,
						height: "auto",
						width: 400,
						modal: true,
						open: function () {
							var markup = 'There was an error while saving the policy in Diamond.';
							$(this).html(markup);
						}
					});

				}

			},
			error: function (request, error) {
				debugger;
				console.log(error);

			}
		});

	})
	function progressBar(elem, agencyFile, paymentsFile) {
		debugger;
		var parent = $(elem).closest('.input_cont'),
			decor = parent.find('decor'),
			detail = parent.find('detail'),
			text = detail.find('span'),
			textDone = elem.files && elem.files[0].name;
		parent.attr('process', '');
		if (agencyFile) {
			textDone = $('.defaultFile').val();
		}
		move();
		function move() {
			if (i == 0) {
				i = 1;
				var width = 1;
				var id = setInterval(frame, 10);
				if (paymentsFile) {
					width = 100;
					textDone = 'Skipped'
				}
				function frame() {
					if (width >= 100) {
						clearInterval(id);
						i = 0;
						parent.removeAttr('process').attr('success', '');
						text.text(textDone);

						if ($('[success=""]').length == 4) {
							var primaryButton = parent.closest('.sections').find('.primary');
							var primaryButton1 = $($($('.sections')[1]).find('.primary')[0]);
							var primaryButton2 = $($('.sections')[2]).find('.primary');
							primaryButton.removeAttr('disabled');
							primaryButton.click(function () {
								primaryButton.parent().attr({ 'success': '' });
								primaryButton.find('i').css('display', 'block');
								primaryButton.find('detail').find('text').text('Done')

								primaryButton1.removeAttr('disabled');

							})
							primaryButton1.click(function () {
								primaryButton1.parent().attr({ 'success': '' });
								primaryButton1.find('i').css('display', 'block');
								primaryButton1.find('detail').find('text').text('Done')
								primaryButton2.removeAttr('disabled');
							})
							primaryButton2.click(function () {
								primaryButton2.parent().attr({ 'success': '' });
								primaryButton2.find('i').css('display', 'block');
								primaryButton2.find('detail').find('text').text('Done')
							})
						}

					} else {
						width++;
						decor.css('width', width + '%');
					}

				}
			}
		}
	}

	//$('#btnExecuteSingleTransaction').click(function () {
	//	debugger;
	//	//location.hash = "Conversion/#ExecuteSingleTransaction";

	//});

	refreshData();



	window.getApiUrl = function () {
		var apiUrl = null;
		$.ajax({
			url: "Conversion/GetApiUrl",
			method: "Get",
			async: false,
			success: function (response) {
				apiUrl = response;
			},
			error: function (response) {

			},
		});
		return apiUrl;
	}

	window.Operation = {
		UploadPreConversion601: "UploadPreConversion601",
		UploadPreConversionPayment: "UploadPreConversionPayment",
		UploadPreConversionAgency: "UploadPreConversionAgency",
		UploadPreConversionAgencyPolicy: "UploadPreConversionAgencyPolicy",
		ExecutePreConversion: "ExecutePreConversion",
		ExecuteConversion: "ExecuteConversion",
		ExecuteReconciliation: "ExecuteReconciliation"
	}


	

	function refreshData() {
		var api = kApiUrl ? kApiUrl : window.getApiUrl();
		//$.getJSON(api + "Conversion/Status", {
		//    tags: "mount rainier",
		//    tagmode: "any",
		//    format: "json"
		//})
		//    .done(function (data) {

		//need to change in api
		var a = 2;
		if (a == 1) {


			enablePreConversionButtons(false);
			enablePreConversionButton(false);
			enableConversionButton(false); s
			enableReconciliationButton(false);
			showReconciliationReportButtons(false);

			setPreConversion601ButtonText(data.PreConversionFileName);
			setPreConversionPaymentButtonText(data.PreConversionPaymentFileName, data.IsPreConversionPaymentSkipped);
			setPreConversionAgencyButtonText(data.PreConversionAgencyFileName, data.PreConversionDefaultAgency);
			setPreConversionAgencyPolicyButtonText(data.PreConversionAgencyPolicyFileName);

			if (data.IsPreConversionExecutionCompleted) {
				if (data.IsConversionExecutionCompleted) {
					if (data.IsReconciliationCompleted) {
						//All Report Buttons visible
						showReconciliationReportButtons(true);
					}
					else {
						//"Execute Reconciliation" button enabled
						enableReconciliationButton(true);
					}
				}
				else {
					//"Execute Reconciliation" button enabled
					enableConversionButton(true);
				}
			}
			else {
				//All buttons(1 - 4) enabled
				enablePreConversionButtons(true);
				enablePreConversionButton(GetPreConversionButtonEnabled());
			}
		}
		else {

			

		}
		//})
		//.fail(function (e) {

		//})
	}



	/////////////////////////////////////////
	//if the conversion has performed already///
	///////////////////////////////////////

	
	function setPreConversion601ButtonText(fileName) {
		debugger;
		$('.fileName').text(fileName);
		$('.fileName').closest('.input_cont').attr('success', '');

		

	}

	function setPreConversionPaymentButtonText(fileName, skipped) {
		var text = null;
		if (skipped) {
			text = 'Skipped';
		}
		else {
			text = fileName;
		}
		$('.paymentsFileName').text(text);
	}

	function setPreConversionAgencyButtonText(fileName, defaultAgency) {
		var text = null;
		if (defaultAgency) {
			text = defaultAgency;
		}
		else {
			text = fileName;
		}
		$('.agenciesFileName').text(text);
	}

	function setPreConversionAgencyPolicyButtonText(fileName) {
		$('.policyFileName').text(fileName);
	}

	function enablePreConversionButtons(enabled) {
		var ctl = $('.preConversion');
		if (enabled) {
			ctl.find('.input_cont').removeAttr('completed', '').removeAttr('disabled');
			ctl.find('.input_cont').each(function (index, item) {
				var text = $(item).find('.text');
				if (text.text() == '') {
					$(item).removeAttr('completed', '').removeAttr('success', '');
				}
			})
		}
		else {

			ctl.find('.input_cont').each(function (index, item) {
				$('.preConversion').find('.input_cont').attr('completed', '').attr('success', '').attr('disabled', '');
			})
		}
	}

	function enablePreConversionButton(enabled) {
		var ctl = $('.executePreConversionButton');
		if (enabled) {
			ctl.removeAttr('disabled');
		}
		else {
			ctl.attr('disabled', '');
		}
	}
	function GetPreConversionButtonEnabled() {
		return ($('.fileName').text() != '' && $('.paymentsFileName').text() != '' && $('.agenciesFileName').text() != '' && $('.policyFileName').text() != '')
	}

	function enableConversionButton(enabled) {
		var ctl = $('.executeConversionbutton');
		if (enabled) {
			ctl.removeAttr('disabled');
		}
		else {
			ctl.attr('disabled', '');
		}
	}

	function enableReconciliationButton(enabled) {
		var ctl = $('.executeReconciliationButton');
		if (enabled) {
			ctl.removeAttr('disabled');
		}
		else {
			ctl.attr('disabled', '');
		}
	}

	function enableExecuteSingleTransaction(enabled) {
		var ctl = $('.executeSingleTransactionButton');
		if (enabled) {
			ctl.removeAttr('disabled');
		}
		else {
			ctl.attr('disabled', '');
		}
	}

	function showReconciliationReportButtons(show) {
		if (show) {
			reports.css('display', 'block');
		}
		else {
			reports.css('display', 'none');
		}
	}

	function showProcess(elem) {
		var parent = $(elem).closest('.input_cont').length > 0 ? $(elem).closest('.input_cont') : $(elem).prev('.input_cont'),
			detail = parent.find('detail'),
			text = detail.find('span'),
			decor = parent.find('decor');
		parent.attr('process', '');
		move();
		function move() {
			var width = 1;
			interval = setInterval(frame, 20);
			text.text('Processing');
			function frame() {
				width++;
				if (width == 99) {
					width = 1;
				}
				decor.css('width', width + '%');
				$('.input_cont').css("pointer-events", "none");
			}
		}
	}

	function hideProcess(elem, inputText) {
		var parent = $(elem).closest('.input_cont').length > 0 ? $(elem).closest('.input_cont') : $(elem).prev('.input_cont');

		$('.input_cont').css("pointer-events", "auto");
		clearInterval(interval);
		parent.removeAttr('process').attr('success', '');

		enablePreConversionButton(GetPreConversionButtonEnabled());
	}

	function uploadData(elem, fileData) {
		//var operation = data.Operation;
		$.ajax({
			url: "/Conversion/Upload",
			data: fileData,
			async: false,
			type: "POST",
			contentType: false,
			processData: false,
			success: function (response) {
				hideProcess(elem);
				if (response.HasError) {
					//TODO: ShowError....
					alert(response.Error);
				}
				else {
					data = response;
					refreshData();
				}
			},
			error: function (response) {
				hideProcess(elem);
				//alert("Global Error: " + response.statusText);
			},
		});
	}

	function enableResetAll(enabled) {

		debugger;
		
		if (enabled) {
			document.getElementById("btnResetAll").removeAttribute("Hidden");
		}
		
	}


	$(".selectPreConversion601").change(function (e) {
		var elem = e.target;

		if (elem.files.length == 0)
			return;

		var file = elem.files[0];
		var fileData = new FormData();

		data.Operation = Operation.UploadPreConversion601;
		data.PreConversionFileName = file.name;

		fileData.append(file.name, file);
		fileData.append('request', JSON.stringify(data));

		console.log(data.PreConversionFileName);
		$(elem).closest('.input_cont').removeAttr('success');
		showProcess(elem);
		uploadData(elem, fileData);


	})

	$('.selectPreConversionPayment').click(function (event) {
		data.Operation = Operation.UploadPreConversionPayment;
		var fileInput = $('.paymentsFileBrowser');
		$("#loadPayments").dialog({
			resizable: false,
			height: "auto",
			width: 400,
			modal: true,
			buttons: {
				"Select Payment File": function () {
					fileInput.click()
					fileInput.change(function (e) {
						fileInput.prev('.input_cont').removeAttr('success');
						var elem = e.target;

						if (elem.files.length == 0)
							return;

						var file = elem.files[0];
						var fileData = new FormData();

						data.PreConversionPaymentFileName = file.name;
						data.IsPreConversionPaymentSkipped = false;

						fileData.append(file.name, file);
						fileData.append('request', JSON.stringify(data));

						$(elem).closest('.input_cont').removeAttr('success');
						showProcess(elem);
						uploadData(elem, fileData);
					})
					$(this).dialog("close");
				},
				"Skip Payment File": function () {
					fileInput.prev('.input_cont').removeAttr('success');
					var fileData = new FormData();

					data.IsPreConversionPaymentSkipped = true;
					data.PreConversionPaymentFileName = null;

					fileData.append('request', JSON.stringify(data))

					$(fileInput).closest('.input_cont').removeAttr('success');

					showProcess(fileInput);
					uploadData(fileInput, fileData);

					$(this).dialog("close");
				}
			}
		});
	});

	$('.selectPreConversionAgency').click(function (event) {
		data.Operation = Operation.UploadPreConversionAgency;
		var fileInput = $('.agenchyFileBrowser');
		$("#loadAgency").dialog({
			resizable: false,
			height: "auto",
			width: 400,
			modal: true,
			buttons: {
				"Select Default Agency": function () {
					$("#defaultAgency").dialog({
						resizable: false,
						height: "auto",
						width: 400,
						modal: true,
						buttons: {
							"OK": function (e) {
								fileInput.prev('.input_cont').removeAttr('success');
								var fileData = new FormData();

								data.PreConversionAgencyFileName = null;
								data.PreConversionDefaultAgency = $('.defaultAgency').val();

								fileData.append('request', JSON.stringify(data))

								$(fileInput).closest('.input_cont').removeAttr('success');
								showProcess(fileInput);
								uploadData(fileInput, fileData);

								$(this).dialog("close");
							},
						}
					});
					$(this).dialog("close");
				},
				"Select Agency File": function () {
					setTimeout(() => {
						fileInput.click()
						fileInput.change(function (e) {
							fileInput.prev('.input_cont').removeAttr('success');
							var elem = e.target;

							if (elem.files.length == 0)
								return;

							var file = elem.files[0];
							var fileData = new FormData();

							data.PreConversionAgencyFileName = file.name;
							data.PreConversionDefaultAgency = null;

							fileData.append(file.name, file);
							fileData.append('request', JSON.stringify(data));

							$(elem).closest('.input_cont').removeAttr('success');
							showProcess(elem);
							uploadData(elem, fileData);
						})
						$(this).dialog("close");
					})
				}
			}
		});
	});

	$('.selectPreConversionAgencyPolicy').change(function (e) {
		var elem = e.target;

		if (elem.files.length == 0)
			return;

		var file = elem.files[0];
		var fileData = new FormData();

		data.Operation = Operation.UploadPreConversionAgencyPolicy;
		data.PreConversionAgencyPolicyFileName = file.name;

		fileData.append(file.name, file);
		fileData.append('request', JSON.stringify(data));

		$(elem).closest('.input_cont').removeAttr('success');

		showProcess(elem);
		uploadData(elem, fileData);
	})

	$('.executePreConversionButton').click(function () {
		enableConversionButton(true);
		enablePreConversionButton(false);
		enablePreConversionButtons(false);
		$('.preConversion').find('.input_cont').css("pointer-events", "none");
	});

	$('.executeConversionbutton').click(function () {
		enableConversionButton(false);
		enableReconciliationButton(true);
	});

	$('.executeReconciliationButton').click(function () {
		showReconciliationReportButtons(true);
		enableReconciliationButton(false);
		enableExecuteSingleTransaction(true);

	});

	$('#btnResetAll').click(function () {
		debugger;
		document.getElementById("btn1").removeAttribute("success");
		document.getElementById("btn2").removeAttribute("success");
		document.getElementById("btn3").removeAttribute("success");
		document.getElementById("btn4").removeAttribute("success");
		document.getElementById("file1").innerHTML = "";
		document.getElementById("file2").innerHTML = "";
		document.getElementById("file3").innerHTML = "";
		document.getElementById("file4").innerHTML = "";
		

	});

	
});