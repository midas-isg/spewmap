"use strict";

(function() {
	var CONTEXT = '/spewmap/households/api',
		theZoom = 14,
		tokenForSummary = {cancel: function(){}},
		qs = queryString(),
		map,
		menuButton = document.getElementById('menu-button'),
		zoomNoteButton = document.getElementById('zoom-note-button'),
		REMAPPED_LABELS = {
			"age": {
				"label": "householder age",
				"use": "ages"
			},
			"hid": {
				"label": "household id"
			},
			"race": {
				"label": "householder race",
				"use": "races"
			},
			"persons": {
				"label": "size (occupants)"
			}
		},
		SPEW_US_FORMAT = {
			employments: {
				"null": "N/A (less than 16 years old)",
				"1": "Civilian employed, at work",
				"2": "Civilian employed, with a job but not at work",
				"3": "Unemployed",
				"4": "Armed forces, at work",
				"5": "Armed forces, with a job but not at work",
				"6": "Not in labor force"
			},
			grades: {
				"null" : "Not attending school",
				"1" : "Nursery school/preschool",
				"2": "Kindergarten",
				"3": "Grade 1",
				"4": "Grade 2",
				"5": "Grade 3",
				"6": "Grade 4",
				"7": "Grade 5",
				"8": "Grade 6",
				"9": "Grade 7",
				"10": "Grade 8",
				"11": "Grade 9",
				"12": "Grade 10",
				"13": "Grade 11",
				"14": "Grade 12",
				"15": "College undergraduate years (freshman to senior)",
				"16": "Graduate or professional school beyond a bachelor’s degree"
			},
			incomes: {},
			races: {
				"1": "White alone",
				"2": "Black or African American alone",
				"3": "American Indian alone",
				"4": "Alaska Native alone",
				"5": "American Indian and Alaska Native tribes specified; or American .Indian or Alaska Native, not specified and no other races",
				"6": "Asian alone",
				"7": "Native Hawaiian and Other Pacific Islander alone",
				"8": "Some Other Race alone",
				"9": "Two or More Races"
			},
			relationships: {
				"0": "Reference person",
				"1": "Husband/wife",
				"2": "Biological son or daughter",
				"3": "Adopted son or daughter",
				"4": "Stepson or stepdaughter",
				"5": "Brother or sister",
				"6": "Father or mother",
				"7": "Grandchild",
				"8": "Parent-in-law",
				"9": "Son-in-law or daughter-in-law",
				"10": "Other relative",
				"11": "Roomer or boarder",
				"12": "Housemate or roommate",
				"13": "Unmarried partner 41",
				"14": "Foster child",
				"15": "Other nonrelative",
				"16": "Institutionalized group quarters population",
				"17": "Noninstitutionalized group quarters population"
			},
			schools: {
				"null": "(less than 3 years old)",
				"1": "No, has not attended in the last 3 months",
				"2": "Yes, public school or public college",
				"3": "Yes, private school or college or home school"
			},
			sexes: {
				"1": "male",
				"2": "female"
			}
		};
	
	mapboxgl.accessToken = 'pk.eyJ1IjoidHBzMjMiLCJhIjoiVHEzc0tVWSJ9.0oYZqcggp29zNZlCcb2esA';
	map = new mapboxgl.Map({
		style: 'mapbox://styles/mapbox/light-v9',
		zoom: qs['zoom'] || 3, // 9, //NYC // 3, //USA
		center: toCenter(qs) || [-107,43], //[-74.4714737, 40.4724525], // NYC // [-107,43], // USA
		container: 'map'
	});
	
	map.on('load', onLoad);
	
	function toggleZoomNote() {
		var zoomNoteContainer = document.getElementById('zoom-note'),
			zoomNoteText = document.getElementById('zoom-note-text');
		
		zoomNoteText.hidden = !zoomNoteText.hidden;
		
		if(zoomNoteText.hidden) {
			zoomNoteButton.classList.add('zoom-note-button-inactive');
			zoomNoteButton.classList.remove('zoom-note-button-active');
			zoomNoteContainer.style.backgroundColor = 'unset';
		}
		else {
			zoomNoteButton.classList.add('zoom-note-button-active');
			zoomNoteButton.classList.remove('zoom-note-button-inactive');
			zoomNoteContainer.style.backgroundColor = null;
		}
		
		return;
	}
	
	zoomNoteButton.onclick = toggleZoomNote;
	toggleZoomNote();
	
	function hideMenu() {
		var menu = document.getElementById('menu');
		
		menu.style.display = "none";
		menuButton.onclick = showMenu;
		menuButton.style.width = null;
		menuButton.style.borderRadius = null;
		menuButton.style.borderStyle = null;
		
		return;
	}
	
	function showMenu() {
		var menu = document.getElementById('menu');
		
		menu.style.display = "inline-block";
		menuButton.onclick = hideMenu;
		menuButton.style.width = "100%";
		menuButton.style.borderBottomLeftRadius = '0px';
		menuButton.style.borderBottomRightRadius = '0px';
		menuButton.style.borderLeftStyle = 'none';
		menuButton.style.borderRightStyle = 'none';
		
		return;
	}
	
	showMenu();
	
	function onLoad() {
		// var srcId = 'hh'; // usa with array & races-> races & ages ->age
		var srcId = 'usa'; // usa with array & races-> race & ages ->age
		map.on('zoomend', onZoomend);
		onZoomend();
		
		addControls();
		addSource(srcId);
		addCircleLayers(srcId);
		addTheLabelLayer(srcId);
		
		function onZoomend(){
			var zoom = map.getZoom();
			console.log('zoom=' + zoom + '; bbox='+ JSON.stringify(map.getBounds()));
			var zoomLabel = document.getElementById('zoom-level');
			var zoomNote = document.getElementById('zoom-note');
			zoomLabel.innerHTML = zoom.toFixed(5);
			if (zoom >= theZoom)
				zoomNote.style.display = 'none';
			else
				zoomNote.style.display = 'block';
		}
		map.on('DISABLE-mouseup', function (e) { // Get features under the mouse pointer
			var features = map.queryRenderedFeatures(e.point);
			document.getElementById('features').innerHTML = JSON.stringify(features, null, 2);
		});
	}
	
	function addSource(srcId) {
		map.addSource(srcId, { // Add a third party vector tile source https://www.mapbox.com/mapbox-gl-js/example/third-party/
			'type': 'vector',
			'tiles': ['https://spew.olympus.psc.edu/spewtiles/' + srcId + '/{z}/{x}/{y}.pbf'],
			'minzoom': 0,
			'maxzoom': theZoom
		});
	}
	
	function addTheLabelLayer(srcId) {
		map.addLayer({
			id: 'label',
			type: 'symbol',
			source: srcId,
			'source-layer': 'hh',
			minzoom: 19, //19
			layout: {
				'text-allow-overlap': true,
				'text-field': '{persons}',
				'text-offset': [0, 0]
			}
		});
	}
	
	function addCircleLayers(srcId) {
		var ageId = 'Householder Age';
		var raceId = 'Householder Race';
		var hhPersonsId = 'Size (Occupants)';
		var hhIncomeId = 'Income';
		var hhId = 'Household';
		var toggleableLayerIds = [ageId,
			raceId, hhPersonsId, hhIncomeId, hhId];
		
		addAgeTileLayer(ageId, srcId);
		addRaceTileLayer(raceId, srcId);
		addPersonsTileLayer(hhPersonsId, srcId);
		addIncomeTileLayer(hhIncomeId, srcId);
		addHouseholdTileLayer(hhId, srcId);
		
		makeCircleLayersToggleable();
		
		function addAgeTileLayer() {
			var circleColor = [
				'step',
				['get', 'age'],
				'rgb(0, 0, 255)', 34,
				'rgb(51, 194, 255)', 44,
				'rgb(230, 152, 0)', 54,
				'rgb(255, 0, 0)', 64,
				'rgb(255, 0, 255)'
			];
			addTileLayer(ageId, srcId, circleColor);
		}
		
		function addRaceTileLayer() {
			var circleColor = [
					'match',
					['get', 'race'],
					1, 'rgb(212, 44, 44)', //1 .White alone
					2, 'rgb(0, 169, 157)', // 2 .Black or African American alone
					6, 'rgb(153, 102, 255)',  // 6 .Asian alone
					9, '#646464', // 9 .Two or More Races
					'rgb(170, 147, 61)' // other
				],
				raceCategories = {
					'mapping': {
						1 : "White",
						2 : "Black",
						6 : "Asian",
						9: "Other"
					},
					'endMapping': "Multiracial"
				};
			
			addTileLayer(raceId, srcId, circleColor, raceCategories);
		}
		
		function addIncomeTileLayer(id, srcId) {
			var circleColor = [
					'step',
					['get', 'income'],
					'rgb(229, 159, 0)', 25000,
					'rgb(168, 116, 0)', 75000,
					'rgb(63, 115, 127)', 125000,
					'rgb(63, 115, 127)', 250000,
					'rgb(11, 181, 255)'
				],
				incomeCategories = {
					'legend': 'Income (x $1000)',
					'mapping': {
						25000: '0-25',
						75000: '25-75',
						125000: '75-125',
						250000: '125-250'
					},
					'endMapping': '&ge; 250'
				};
			addTileLayer(id, srcId, circleColor, incomeCategories);
		}
		
		function addPersonsTileLayer(id, srcId) {
			var circleColor = [
					'match',
					['get', 'persons'],
					1, rgb(67, 2, 252),
					2, rgb(7, 221, 249),
					3, rgb(242, 201, 15),
					4, rgb(242, 201, 15),
					rgb(239, 20, 93) // other
				],
				sizeCategories = {
					'endMapping': "&ge; 5"
				};
			
			addTileLayer(id, srcId, circleColor, sizeCategories);
		}
		
		function addHouseholdTileLayer(id, srcId) {
			addTileLayer(id, srcId, 'orange');
		}
		
		function addLegend(legendID, circleColor, categoryValues) {
			var menuPanel = document.getElementById('legend-panel'),
				legendItem = document.createElement('div'),
				legendTitle = document.createElement('caption'),
				legendItemTable = document.createElement('table'),
				tableBody = document.createElement('tbody'),
				headerRow = document.createElement('tr'),
				header,
				contentRow = document.createElement('tr'),
				content,
				bubbleCell,
				categoryLegend = legendID,
				categoryMapping,
				categoryEndMapping,
				i;
			
			if(categoryValues) {
				if(categoryValues['legend']){
					categoryLegend = categoryValues['legend'];
				}
				
				categoryMapping = categoryValues['mapping'];
				categoryEndMapping = categoryValues['endMapping'];
			}
			
			legendItem.classList.add("legend");
			legendItem.id = legendID;
			legendItem.style.display = "none";
			
			legendItemTable.style.textAlign = "left";
			//legendItemTable.style.width = "200px";
			legendItemTable.border = "0";
			legendItemTable.cellPadding = "2";
			legendItemTable.cellSpacing = "2";
			
			legendTitle.innerHTML = "<strong>" + categoryLegend + "</strong>";
			
			legendItemTable.appendChild(legendTitle);
			
			//console.log(legendID);
			//console.log(circleColor);
			//console.log("~~~~~");
			
			if(typeof(circleColor) === "string") {
				header = document.createElement('td');
				header.classList.add("legendtext");
				header.style.textAlign = "center";
				header.innerHTML = legendID;
				
				content = document.createElement('td');
				bubbleCell = document.createElement('div');
				bubbleCell.classList.add("bubblecell");
				bubbleCell.style.textAlign = "center";
				bubbleCell.style.backgroundColor = circleColor;
				
				content.appendChild(bubbleCell);
				contentRow.appendChild(content);
				headerRow.appendChild(header);
				
				tableBody.appendChild(contentRow);
				tableBody.appendChild(headerRow);
			}
			else {
				for(i = 2; i < circleColor.length; i += 2) {
					header = document.createElement('td');
					header.classList.add("legendtext");
					header.style.textAlign = "center";
					
					content = document.createElement('td');
					bubbleCell = document.createElement('div');
					bubbleCell.classList.add("bubblecell");
					bubbleCell.style.textAlign = "center";
					
					switch(circleColor[0]) {
						case 'step':
							if(categoryMapping && categoryMapping[circleColor[i+1]]) {
								header.innerHTML = categoryMapping[circleColor[i+1]];
							}
							else {
								if(i === 2) {
									header.innerHTML = "&le; " + circleColor[i+1];
								}
								else if((i+1) < circleColor.length){
									header.innerHTML = (1 + parseInt(circleColor[i-1])) + " - " + circleColor[i+1];
								}
								else {
									if(categoryEndMapping) {
										header.innerHTML = categoryEndMapping;
									}
									else{
										header.innerHTML = "&ge; " + (1 + parseInt(circleColor[i-1]));
									}
								}
							}
							
							bubbleCell.style.backgroundColor = circleColor[i];
							break;
						
						case 'match':
							if((i+1) < circleColor.length) {
								bubbleCell.style.backgroundColor = circleColor[i+1];
								
								if(categoryMapping && categoryMapping[circleColor[i]]) {
									header.innerHTML = categoryMapping[circleColor[i]];
								}
								else {
									header.innerHTML = circleColor[i];
								}
							}
							else {
								bubbleCell.style.backgroundColor = circleColor[i];
								
								if(categoryEndMapping) {
									header.innerHTML = categoryEndMapping;
								}
								else {
									header.innerHTML = "Other";
								}
							}
							break;
						
						default:
							alert("Undefined Format for " + legendID);
							return;
							break;
					}
					
					content.appendChild(bubbleCell);
					contentRow.appendChild(content);
					headerRow.appendChild(header);
					
					tableBody.appendChild(contentRow);
					tableBody.appendChild(headerRow);
				}
			}
			
			legendItemTable.appendChild(tableBody);
			legendItem.appendChild(legendItemTable);
			menuPanel.appendChild(legendItem);
			
			return;
		}
		
		function addTileLayer(id, srcId, circleColor, categoryValues) {
			map.addLayer({
				'id': id,
				'type': 'circle',
				'source': srcId,
				'source-layer': 'hh',
				paint: {
					'circle-radius': {
						base: 1.75,
						stops: [ [16, 2], [22, 40] ]
					},
					'circle-color': circleColor
				}
			}, 'waterway-label');
			makeLayerClickable(id, srcId);
			
			addLegend(id, circleColor, categoryValues);
		}
		
		function makeLayerClickable(id, srcId) {
			map.on('click', id, function (e) {
				var coordinates = e.features[0].geometry.coordinates.slice(),
					popup = document.createElement('div');
				
				popup.innerHTML = '<span>' + html(e) + '</span>';
				
				// Ensure that if the map is zoomed out such that multiple
				// copies of the feature are visible, the popup appears
				// over the copy being pointed to.
				while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
					coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
				}
				
				new mapboxgl.Popup()
				.setLngLat(coordinates)
				.setDOMContent(popup)
				.addTo(map);
			});
			map.on('mouseenter', id, function () {
				map.getCanvas().style.cursor = 'pointer';
			});
			map.on('mouseleave', id, function () {
				map.getCanvas().style.cursor = '';
			});
			
			function html(e) {
				var obj = e.features[0].properties,
					html = '',
					k,
					values,
					i,
					label,
					category;
				
				for (k in obj) {
					if (obj.hasOwnProperty(k)) {
						category = k;
						
						if(REMAPPED_LABELS[k]) {
							label = REMAPPED_LABELS[k]['label'];
							
							if(REMAPPED_LABELS[k]['use']) {
								category = REMAPPED_LABELS[k]['use'];
							}
						}
						else {
							label = k;
						}
						
						html += '<div><span><b>' + label + '</b>: ';
						
						if(SPEW_US_FORMAT[category]) {
							values = obj[k].toString();
							values = values.substring(1, obj[k].length - 1).split(',');
							html += '[ ';
							
							for(i = 0; i < values.length; i++) {
								if(SPEW_US_FORMAT[category][values[i]]) {
									html += SPEW_US_FORMAT[category][values[i]] + '; ';
								}
								else {
									html += values[i] + '; ';
								}
							}
							
							html += ']';
						}
						else {
							html += obj[k];
						}
						
						html += '</span></div>';
					}
				}
				return html;
			}
		}
		
		function makeCircleLayersToggleable() {
			var id2link = {};
			for (var i = 0; i < toggleableLayerIds.length; i++) {
				var layerId = toggleableLayerIds[i];
				
				var link = document.createElement('a');
				link.href = '#';
				link.textContent = layerId;
				id2link[layerId] = link;
				if (layerId !== hhId)
					hide.call(link, layerId);
				else
					show.call(link, layerId);
				
				link.onclick = function (e) {
					var clickedLayer = this.textContent;
					
					e.preventDefault();
					e.stopPropagation();
					var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
					
					if (visibility === 'visible') {
						hide.call(this, clickedLayer);
					} else {
						for (var i = 0; i < toggleableLayerIds.length; i++) {
							var layer = toggleableLayerIds[i];
							hide.call(id2link[layer], layer);
						}
						show.call(this, clickedLayer);
					}
				};
				var layers = document.getElementById('menu');
				layers.appendChild(link);
			}
			
			function show(id) {
				this.className = 'active';
				map.setLayoutProperty(id, 'visibility', 'visible');
				document.getElementById(id).style.display = 'block';
			}
			
			function hide(id) {
				this.className = '';
				map.setLayoutProperty(id, 'visibility', 'none');
				document.getElementById(id).style.display = 'none';
			}
		}
		
		function rgbToHex(rgb) {
			var hex = Number(rgb).toString(16);
			if (hex.length < 2) {
				hex = '0' + hex;
			}
			return hex;
		}
		
		function rgb(r, g, b) {
			var red = rgbToHex(r);
			var green = rgbToHex(g);
			var blue = rgbToHex(b);
			return '#' + red + green + blue;
		}
	}
	
	function addControls() {
		map.addControl(new mapboxgl.NavigationControl(), 'top-left');
		var draw = newMapboxDraw();
		map.addControl(draw, 'top-left');
		map.on('draw.create', updateQueryResult);
		map.on('draw.delete', updateQueryResult);
		map.on('draw.update', updateQueryResult);
		
		function updateQueryResult(e) {
			var features = document.getElementById('features'),
				closeButton = document.getElementById('features-close-button'),
				featureCollection = draw.getAll(),
				answer = document.getElementById('calculated-area');
			
			if (featureCollection.features.length > 0) {
				closeButton.onclick = function(){
					closeButton.hidden = true;
					tokenForSummary.cancel();
					draw.deleteAll();
					updateQueryResult(null);
				};
				
				closeButton.hidden = false;
				features.style.display = 'block';
				var area = turf.area(featureCollection);
				// restrict to area to 2 decimal points
				var rounded_area = Math.round(area*100)/100;
				//answer.innerHTML = '<span> The area of your polygon(s) is <strong>' + rounded_area + '</strong> square meters</span>';
				var url = CONTEXT + '/summarize';
				var combined = turf.combine(featureCollection);
				var geometry = combined.features[0].geometry;
				
				features.innerHTML = "<b>Please wait...</b> <br/> <br/>Loading with the below query: <br/>" + JSON.stringify(geometry, null, 1);
				tokenForSummary.cancel();
				Rx.Observable.fromPromise(postWithCancel(url, tokenForSummary, geometry))
				.subscribe(function (response){
					console.log(response);
					features.innerHTML = "<b>Result of the querying polgon(s):</b><br/>" + JSON.stringify(JSON.parse(response), null, 2);
				});
			}
			else {
				answer.innerHTML = '';
				features.style.display = 'none';
				closeButton.hidden = true;
				
				if (e && e.type !== 'draw.delete') alert("Use the draw tools to draw a polygon!");
			}
		}
		
		function newMapboxDraw() {
			var color1 = '#D20C0C';
			var color2 = '#000';
			var color3 = '#FFF';
			
			var lineStokeActive = {
				id: 'gl-draw-line',
				type: 'line',
				filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
				layout: {
					'line-cap': 'round',
					'line-join': 'round'
				},
				paint: {
					'line-color': color1,
					'line-dasharray': [0.2, 2],
					'line-width': 2
				}
			}, polygonFillActive = {
				id: 'gl-draw-polygon-fill',
				type: 'fill',
				filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
				paint: {
					'fill-color': color1,
					'fill-outline-color': color1,
					'fill-opacity': 0.1
				}
			}, polygonOutlineActive = {
				// This doesn't style the first edge of the polygon, which uses the line stroke styling instead
				id: 'gl-draw-polygon-stroke-active',
				type: 'line',
				filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
				layout: {
					'line-cap': 'round',
					'line-join': 'round'
				},
				paint: {
					'line-color': color1,
					'line-dasharray': [0.2, 2],
					'line-width': 2
				}
			}, vertexPointHalosActive = {
				id: 'gl-draw-polygon-and-line-vertex-halo-active',
				type: 'circle',
				filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
				paint: {
					'circle-radius': 5,
					'circle-color': color3
				}
			}, vertexPointsActive = {
				id: 'gl-draw-polygon-and-line-vertex-active',
				type: 'circle',
				filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
				paint: {
					'circle-radius': 3,
					'circle-color': color1
				}
			};
			var lineStokeInactive = {
				id: 'gl-draw-line-static',
				type: 'line',
				filter: ['all', ['==', '$type', 'LineString'], ['==', 'mode', 'static']],
				layout: {
					'line-cap': 'round',
					'line-join': 'round'
				},
				paint: {
					'line-color': color2,
					'line-width': 3
				}
			}, polygonFillInactive = {
				id: 'gl-draw-polygon-fill-static',
				type: 'fill',
				filter: ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'static']],
				paint: {
					'fill-color': color2,
					'fill-outline-color': color2,
					'fill-opacity': 0.1
				}
			}, polygonOutlineInactive = {
				id: 'gl-draw-polygon-stroke-static',
				type: 'line',
				filter: ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'static']],
				layout: {
					'line-cap': 'round',
					'line-join': 'round'
				},
				paint: {
					'line-color': color2,
					'line-width': 3
				}
			};
			
			return new MapboxDraw({
				displayControlsDefault: false,
				styles: [
					// ACTIVE (being drawn)
					lineStokeActive,
					polygonFillActive,
					polygonOutlineActive,
					vertexPointHalosActive,
					vertexPointsActive,
					// INACTIVE (static, already drawn)
					lineStokeInactive,
					polygonFillInactive,
					polygonOutlineInactive
				],
				controls: {
					polygon: true,
					trash: true
				}
			});
		}
	}
	
	function requestWithCancel(method, url, token, body) {
		var request = new XMLHttpRequest();
		request.open(method, url);
		if (body){
			request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			body = JSON.stringify(body);
		}
		request.send(body);
		return new Promise(
			function (resolve, reject) {
				request.onload = function () {
					resolve(request.responseText);
				};
				token.cancel = function () {
					request.abort();
					reject(new Error('Cancelled')); // reject the promise
				};
				request.onerror = reject;
			}
		);
	}
	
	function getWithCancel(url, token) { // the token is for cancellation
		return requestWithCancel('GET', url, token);
	}
	
	function postWithCancel(url, token, body) { // the token is for cancellation
		return requestWithCancel('POST', url, token, body);
	}
	
	function queryString() {
		return (function(a) {
			if (a === '') return {};
			var b = {};
			for (var i = 0; i < a.length; ++i)
			{
				var p=a[i].split('=', 2);
				if (p.length === 1)
					b[p[0]] = '';
				else
					b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
			}
			return b;
		})(window.location.search.substr(1).split('&'));
	}
	
	function toCenter(qs) {
		var text = qs['center'],
			tokens;
		if (text && text.includes(',')){
			tokens = text.split(',');
			return [tokens[0].valueOf(), tokens[1].valueOf()];
		}
		return null
	}
})();
