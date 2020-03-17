var number = 1;
var num = 0;
var findTextArray = [];

function next() {
	num++;
	if (num >= findTextArray.length) {
		num = 0;
	}
	debugger;
	findTextArray[num].childNodes[1].scrollIntoView({ behavior: 'smooth' });

	document.getElementById("number").innerHTML = num + 1;

}
function previous() {
	num--;
	if (num < 0) {
		num = findTextArray.length - 1;
	}
	findTextArray[num].childNodes[1].scrollIntoView({ behavior: 'smooth' })
	document.getElementById("number").innerHTML = num + 1;
}


function findElement() {

	$(".element").removeClass('find-element');
	$(".tag").removeClass('find-element');
	var findText = $('#find-Element').dxTextBox('instance').option('value');
	if (findText == "") {
		document.getElementById("number").innerHTML = 0;
		document.getElementById("length").innerHTML = 0;
	}
	else {
		num = 0;
		findTextArray = [];
		$('.element').removeClass('collapsed');
		$('.children').css('display', "");
		$('.element[data-name*="' + findText + '"]').removeClass('collapsed');
		$('.element[data-name*="' + findText + '"]').children('.tag.opening').addClass('find-element');
		var elements = $('.element[data-name*="' + findText + '"]');
		$.each(elements, function (key, value) {
			findTextArray.push(elements[key]);
		});
		var element = document.querySelector('[data-name*="' + findText + '"]');

		if (element == null) {
			document.getElementById("number").innerHTML = 0 + "/";
			document.getElementById("length").innerHTML = 0;
		}
		else {
			document.getElementById("number").innerHTML = number + "/";
			document.getElementById("length").innerHTML = findTextArray.length;

		}
	}

	findTextArray[num].childNodes[1].scrollIntoView({ behavior: 'smooth' })
}