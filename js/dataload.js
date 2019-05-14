/*global require*/
/*
 * Bootstrap-based responsive mashup
 * @owner Erik Wetterberg (ewg)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );

/*var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};*/


var config = {
	host: "solution.qliktech.com",
	prefix: "/",
	port: 80,
	isSecure: false

};

//to avoid errors in workbench: you can remove this when you have added an app
var app;
require.config( {
	/*baseUrl: (config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "" ) + config.prefix + "resources"*/
	baseUrl: "http://solution.qliktech.com/resources"
} );

require( ["js/qlik"], function ( qlik ) {
	console.log("It worked, we are in! ")

	qlik.setOnError( function ( error ) {
		$('#popupText').append(error.message +"<br>");
        popup();
	} );
     var bool = false;
    function popup(){
        if(bool){
            return;
        }
        bool = true;
        $('#popup').delay(1000).fadeIn(1000);
        $('#popup').delay(11000).fadeOut(1000);
    }
    $( "#closePopup" ).click(function() {
        $('#popup').hide();
    });
    if ($('ul#qbmlist li').length == 0){
        $('#qbmlist').append("<li><a href='#'>No bookmarks available</a></li>");
    }
	//
    $("body").css("overflow: hidden;")
	function AppUi ( app ) {
		var me = this;
		this.app = app;
		app.global.isPersonalMode( function ( reply ) {
			me.isPersonalMode = reply.qReturn;
		} );
		app.getAppLayout( function ( layout ) {
			$( "#title" ).html( layout.qTitle );
			$( "#title" ).attr("title", "Last reload:" + layout.qLastReloadTime.replace( /T/, ' ' ).replace( /Z/, ' ' ) );
			//TODO: bootstrap tooltip ??
		} );
		app.getList( 'SelectionObject', function ( reply ) {
			$( "[data-qcmd='back']" ).parent().toggleClass( 'disabled', reply.qSelectionObject.qBackCount < 1 );
			$( "[data-qcmd='forward']" ).parent().toggleClass( 'disabled', reply.qSelectionObject.qForwardCount < 1 );
		} );
		app.getList( "BookmarkList", function ( reply ) {
			var str = "";
			reply.qBookmarkList.qItems.forEach( function ( value ) {
				if ( value.qData.title ) {
					str += '<li><a href="#" data-id="' + value.qInfo.qId + '">' + value.qData.title + '</a></li>';
				}
			} );
			str += '<li><a href="#" data-cmd="create">Create</a></li>';
			$( '#qbmlist' ).html( str ).find( 'a' ).on( 'click', function () {
				var id = $( this ).data( 'id' );
				if ( id ) {
					app.bookmark.apply( id );
				} else {
					var cmd = $( this ).data( 'cmd' );
					if ( cmd === "create" ) {
						$('#createBmModal' ).modal();
					}
				}
			} );
		} );
		$( "[data-qcmd]" ).on( 'click', function () {
			var $element = $( this );
			switch ( $element.data( 'qcmd' ) ) {
				//app level commands
				case 'clearAll':
					app.clearAll();
					break;
				case 'back':
					app.back();
					break;
				case 'forward':
					app.forward();
					break;
				case 'lockAll':
					app.lockAll();
					break;
				case 'unlockAll':
					app.unlockAll();
					break;
				case 'createBm':
					var title = $("#bmtitle" ).val(), desc = $("#bmdesc" ).val();
					app.bookmark.create( title, desc );
					$('#createBmModal' ).modal('hide');
					break;
			}
		} );
	}
	//callbacks -- inserted here --
	function Iamdone(reply, app){
		console.log (reply);
	}

	//open apps -- inserted here --
	var app = qlik.openApp('95004574-7351-4262-8c0f-722936e148d1', config);

	//get objects -- inserted here --
	app.getObject('div1','EjWYT');
	app.getObject('div2','juBGKPt');

if(app) {
		new AppUi( app );
	}

}, function (err){
	console.log(err);
} );