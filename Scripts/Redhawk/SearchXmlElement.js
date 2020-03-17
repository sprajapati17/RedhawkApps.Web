$("#findNext").hide();
var findTextArray = [];
var num = 1;


$("#find-Element").dxTextBox({
	placeholder: "Find Element",
	onEnterKey: function () {
		$("#btnFind").click();
		$('#btnFind').focus();
	},

});