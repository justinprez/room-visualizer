let USERS_TT = { // user_id truth table lookup
	parsa: 1,
	justin: 2,
	alex: 3,
}

function check_valid_number(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function sanitize_input( object ){
	// replace return with SQL's santiize function
	return object
}

let TIME_LOOKUP = [
	[ "05:00", "9:59" ],
	[ "10:00", "11:59" ],
	[ "12:00", "15:59" ],
	[ "16:00", "17:59" ],
	[ "18:00", "21:59" ],
	[ "21:00", "23:59" ],
]

function process_requested_times( requested_hours ){ // Function for generating the time filtering query
	let sql_format_function = "strftime"
	let QStart = sql_format_function + "('%H:%M', date_time )"
	let QueryStringToReturn = " AND "
  let checked = 0

	for ( time in requested_hours ) {
		if ( requested_hours[ time ] ){
      checked += 1;
			QueryStringToReturn += QStart + " BETWEEN '" + TIME_LOOKUP[ time ][ 0 ] + "' AND '" + TIME_LOOKUP[ time ][ 1 ] +"' OR "
		}
	}
  if ( checked === 6 || QueryStringToReturn === " AND ") {
    return "";
  }

	return QueryStringToReturn.substring( 0, QueryStringToReturn.length - 3 )
}

function calc_timespent( data ){ // Per room
	let time_spent = [ 0, 0, 0, 0, 0, 0 ]
	var last_entry
	for (i = 1; i < 6; i++) { 
		for ( Entry in data ){
			if ( /* Variable for room_id in data entry */ == i ) {

				if ( last_entry ){ 
					let time_delta = 0 /* replace with ( last_entry 's provided date ) - ( current entry's provided date )*/
					time_spent[ i ] = time_spent[ i ] + delta 
				} 
				last_entry = data
			}
		}
	}

	return time_spent // This data is what you return to the user
}

function handle_request(){ // SERVERSIDE, this should 

	let selected_user = sanitize_input( "a" )
	let time_min = sanitize_input( "b" )
	let time_max = sanitize_input( "c" )
	let time_frames = [ true, true, true, true, true, true ]

	if ( !USERS_TT[ selected_user.toLowerCase() ] ) {
		// Invalid Request; 
		return
	}

	if ( !check_valid_number( time_min ) || !check_valid_number( time_max ) ){
		// Invalid Request; 
		return
	}

	time_min = parseInt( time_min )
	time_max = parseInt( time_max )

	if ( time_max < time_min ) {
		// Invalid request
		return
	}


	// QUERY STRING is what you query the database with
	let QUERY_STRING = "SELECT * FROM MOCK_DATA WHERE user_id = " + parseString( selected_user ) + process_requested_times( time_frames ) + " ORDER BY date_time DESC"


	// Call the function calc_timespent() upon the returned query data, then return that array to the user
	
}