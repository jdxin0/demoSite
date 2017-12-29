	$(document).ready(function() {
		$(".page_manage_ev .list_tab").click(function() {
			$(this).find("img").addClass("down");
			$(this).find(".list_table").show();
			$(this).siblings().find("img").removeClass("down");
			$(this).siblings().find(".list_table").hide();
		});
	});