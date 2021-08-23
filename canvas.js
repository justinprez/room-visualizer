room_display_data = {
						1: [ 12, 12, 110, 110 ],
						2: [ 130, 12, 155, 110 ],
						3: [ 12, 182, 100, 107 ],
						4: [ 117, 224, 70, 65 ],
						5: [ 193, 157, 93, 132 ],
						6: [ 115, 125, 75, 95 ],
					}

function get_color( type, int ){ // The color coding
	if ( type == "d" ){
		if( int < 3 ){
			return "rgba( 0, 0, 255, 0.5 )"
		}
		if( int > 3 && int < 10 ){
			return "springgreen"
		}
		if( int > 10 && int < 14 ){
			return "rgba( 255, 255, 0, 0.5 )"
		}
		if( int > 14 ){
			return "rgba( 255, 0, 0, 0.5 )"
		}
	}

	if ( type == "w" ){
		if( int === 1 ){
			return "rgba( 0, 0, 255, 0.5 )"
		}
		if( int === 2 ){
			return "springgreen"
		}
		if( int === 3 ){
			return "rgba( 255, 255, 0, 0.5 )"
		}
		if( int === 4 ){
			return "rgba( 255, 0, 0, 0.5 )"
		}
	}

	if ( type == "m" ){
		if( int <= 1 ){
			return "rgba( 0, 0, 255, 0.5 )"
		}
		if( int >= 2 && int <= 3 ){
			return "springgreen"
		}
		if( int >= 4 && int <= 5  ){
			return "rgba( 255, 255, 0, 0.5 )"
		}
		if( int > 6 ){
			return "rgba( 255, 0, 0, 0.5 )"
		}
	}
}

function time_convert( type, time ){ // d, w, m
	if( type === "d" ){
		return time / 60
	}
	if( type === "w" ){
		return time / 60 / 24 / 7
	}
	if( type === "m" ){
		return time / 60 / 24 / 7 / 30
	}
}

window.visualize_data = function( data_array ){
	for( i = 1; i < 6; i++ ){
		let mode = $( "#freqselect" ).val();
		console.log( mode );
		window.fill_room( i, get_color( mode, Math.floor( time_convert( mode, data_array[ i ] ))) )
	};
}

window.handle_incoming_data = function(){
	window.visualize_data( incoming_data );
}

$( function() {
	let dpi = window.devicePixelRatio;
	let c = document.getElementById("ccvns");
	let ctx = c.getContext("2d");
	let img = new Image();
	img.src = 'floor.png';
	c.height = c.width; 

	window.reset_room = function(){
		ctx.clearRect( 0, 0, c.width, c.height );
		ctx.scale( 1, 1 );
		ctx.drawImage(img, 0, 0, c.width, c.height );
	};

	window.fill_room = function( room_id, color ){
		let dat = room_display_data[ room_id ];
		ctx.fillStyle = color;
		ctx.fillRect( dat[ 0 ], dat[ 1 ], dat[ 2 ], dat[ 3 ] );
	};

	img.onload = function(){
		window.reset_room();

		if( false ){ // Room Coords debug display
			for( RoomData in room_display_data ) { 
				fill_room( RoomData, "rgba( 255, 0, 0, 1 )")
			}
			ctx.fillStyle = "black";
			ctx.font = "15px Arial";

			for( RoomData in room_display_data ) { 
				let dat = room_display_data[ RoomData ];
				ctx.fillText( RoomData, dat[ 0 ] + ( dat[ 2 ] / 2 ), dat[ 1 ] + ( dat[ 3 ] / 2 ) );
			}   
		}
	}
} )