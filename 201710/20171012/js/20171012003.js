	function showResult() {
		var result = document.getElementById("result");
		var objs = document.getElementsByName("favorate");
		var str = "";
		for (var i = 0; i < objs.length; i++) {
			if (objs[i].checked) {
				str += objs[i].value + "<br/>"
			}
		}
		result.innerHTML = str;
	}