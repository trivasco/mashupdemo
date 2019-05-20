/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1);
var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
require.config({
	baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
});

require(["js/qlik"], function (qlik) {
	qlik.setOnError(function (error) {
		$('#popupText').append(error.message + "<br>");
		$('#popup').fadeIn(1000);
	});
	$("#closePopup").click(function () {
		$('#popup').hide();
	});

	//function clearall
	$("[data-qcmd]").on('click', function () {
		var $element = $(this);
		switch ($element.data('qcmd')) {
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
				var title = $("#bmtitle").val(), desc = $("#bmdesc").val();
				app.bookmark.create(title, desc);
				$('#createBmModal').modal('hide');
				break;
		}
	});

	//open apps -- inserted here --
	var app = qlik.openApp('bf7877fd-f92b-429b-b546-f5f9a116cf38', config);

	//get objects -- inserted here --
	app.getObject('div1', 'fzrxtjq');
	app.getObject('div2', 'nvqpV');

	//create at runtime
	app.visualization.create(
		'scatterplot',
		[
			"[Sales Rep Name]",
			{"qDef": {"qDef": "=((Sum([Sales Quantity]*[Sales Price]))-(Sum([Sales Cost Amount])))/(Sum([Sales Price]* [Sales Quantity]))", "qLabel": "Margin%", "showInPercent": true}},
			/*"=((Sum([Sales Quantity]*[Sales Price]))-(Sum([Sales Cost Amount])))/(Sum([Sales Price]* [Sales Quantity]))",*/
			"=Sum([Sales Quantity]*[Sales Price])",
			"=Sum([Sales Quantity])"

		],
		{
			"showTitles": true,
			"title": "Sales vs Margin by sales rep	",
			"refLine": {
				"refLinesX": [
					{
						"show": true,
						"label": "Margin Target",
						"color": "#f93f17",
						"refLineExpr": {
							"label": ".45",
							"value": 0.45
						},
						"cId": "SFmPUz",
						"$$hashKey": "L7J"
					}
				],
				"refLinesY": []
			},
			"gridLine": {
				"auto": true,
				"spacing": 2
			},
			"xAxis": {
				"show": "labels",
				"label": "auto",
				"dock": "bottom",
				"spacing": 0.5,
				"autoMinMax": false,
				"minMax": "min",
				"min": 0,
				"max": 10
			},
			"yAxis": {
				"show": "labels",
				"label": "auto",
				"dock": "left",
				"spacing": 0.5,
				"autoMinMax": false,
				"minMax": "min",
				"min": 0,
				"max": 10
			}

		}

	).then(function (vis) {
		vis.show("otf1");
	});


	//create at runtime 2
	app.visualization.create(
		'linechart',
		[

			"YYYYMM",
			"=Sum (ARSalesPerDay)"
			/*"Avg Sales Per Day"*/
		],
		{
			"showTitles": true,
			"title": "Average Sales per Day",
			"lineType": "area",
			"stackedArea": false,
			"separateStacking": true,
			"nullMode": "gap",
			"dataPoint": {
				"show": true,
				"showLabels": true
			},
			"gridLine": {
				"auto": true,
				"spacing": 2
			},
			"color": {
				"auto": true,
				"mode": "primary",
				"singleColor": "#4477aa",
				"persistent": false,
				"measureScheme": "sg",
				"reverseScheme": false,
				"dimensionScheme": "12"
			},
			"legend": {
				"show": false,
				"dock": "auto",
				"showTitle": true
			},
			"dimensionAxis": {
				"show": "labels",
				"label": "auto",
				"dock": "bottom"
			},
			"measureAxis": {
				"show": "labels",
				"label": "horizontal",
				"dock": "left",
				"spacing": 0.75,
				"autoMinMax": true,
				"minMax": "min",
				"min": 0,
				"max": 10
			}

		}
	).then(function (vis) {
		vis.show("otf2");
	});

});
