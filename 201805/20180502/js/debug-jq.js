function debug(msg){
	var log = $("#debuglog");
	if (log.length==0) {
		log = $("<div id='debuglog'><h1>Debug Log</h1></div>");
		log.appendTo(document.body);
	}
	log.append($("<pre/>").text(msg));
}