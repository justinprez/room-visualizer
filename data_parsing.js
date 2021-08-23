function parse_data_request(){
	let person_id = $( "#person_select option:selected" ).text();
	let time_in = $( "#time_in" ).val();
	let time_out = $( "#time_out" ).val();
	let time_frames = [ $("#t1").val() == "on", $("#t2").val() == "on", $("#t3").val() == "on", $("#t4").val() == "on", $("#t5").val() == "on", $("#t6").val() == "on"]

	// Send Request with these parameters^^^, then call window.handle_incoming_data( data ) upon what the server returns

}