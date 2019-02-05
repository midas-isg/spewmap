"use strict";

(function(SPEW_FORMAT) {
	var CONTEXT = '/spewmap/households/api',
		//TILEHOST = 'http://localhost:9003/',
		TILEHOST = 'https://spew.olympus.psc.edu/spewtiles/',
		//TILEHOST = 'https://spew.olympus.psc.edu/spewtiles_test/',
		theZoom = 14,
		tokenForSummary = {cancel: function(){}},
		qs = queryString(),
		map,
		menuButton = document.getElementById('menu-button'),
		zoomNoteButton = document.getElementById('zoom-note-button'),
		REMAPPED_LABELS = SPEW_FORMAT.REMAPPED_LABELS,
		//SINGULAR_MAPPINGS = SPEW_FORMAT.SINGULAR_MAPPINGS,
		SPEW_US_FORMAT = SPEW_FORMAT.SPEW_US_FORMAT,
		SPEW_IPUMS_FORMAT = SPEW_FORMAT.SPEW_IPUMS_FORMAT;
	
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
		var srcID = COUNTRY_SOURCE_IDS,
			i;
		
		map.on('zoomend', onZoomend);
		onZoomend();
		
		addControls();
		
		for(i = 0; i < srcID.length; i++) {
			addSource(srcID[i]);
			addCircleLayers(srcID[i]);
			addTheLabelLayer(srcID[i]);
		}
		
		function onZoomend() {
			var zoom = map.getZoom(),
				zoomLabel = document.getElementById('zoom-level'),
				zoomNote = document.getElementById('zoom-note');
			
			console.log('zoom=' + zoom + '; bbox='+ JSON.stringify(map.getBounds()));
			
			zoomLabel.innerHTML = zoom.toFixed(5);
			
			if (zoom >= theZoom)
				zoomNote.style.display = 'none';
			else
				zoomNote.style.display = 'block';
			
			return;
		}
		
		map.on('DISABLE-mouseup', function (e) { // Get features under the mouse pointer
			var features = map.queryRenderedFeatures(e.point);
			document.getElementById('features').innerHTML = JSON.stringify(features, null, 2);
		});
	}
	
	function addSource(srcID) {
		map.addSource(srcID, { // Add a third party vector tile source https://www.mapbox.com/mapbox-gl-js/example/third-party/
			'type': 'vector',
			'tiles': [TILEHOST + srcID + '/{z}/{x}/{y}.pbf'],
			'minzoom': 0,
			'maxzoom': theZoom
		});
	}
	
	function addTheLabelLayer(srcID) {
		map.addLayer({
			id: 'label-' + srcID,
			type: 'symbol',
			source: srcID,
			'source-layer': 'hh',
			minzoom: 19, //19
			layout: {
				'text-allow-overlap': true,
				'text-field': '{persons}',
				'text-offset': [0, 0]
			}
		});
	}
	
	function addCircleLayers(srcID) {
		var popup,
			ageID = 'Householder Age',
			raceID = 'Householder Race',
			hhPersonsID = 'Size (Occupants)',
			hhIncomeID = 'Income',
			hhID = 'Household',
			toggleableLayerIds = [
				ageID,
				raceID,
				hhPersonsID,
				hhIncomeID /*+ ' -' + srcID*/,
				hhID
			];
		
		addAgeTileLayer(ageID, srcID);
		addRaceTileLayer(raceID, srcID);
		addIncomeTileLayer(hhIncomeID, srcID);
		addPersonsTileLayer(hhPersonsID, srcID);
		addHouseholdTileLayer(hhID, srcID);
		
		makeCircleLayersToggleable(hhID, srcID);
		
		function addAgeTileLayer(ageID, srcID) {
			var circleColor = [
				'step',
				['get', 'HH_AGE'],
				'rgb(0, 0, 255)', 34,
				'rgb(51, 194, 255)', 44,
				'rgb(230, 152, 0)', 54,
				'rgb(255, 0, 0)', 64,
				'rgb(255, 0, 255)'
			];
			addTileLayer(ageID, srcID, circleColor);
		}
		
		function addRaceTileLayer(raceID, srcID) {
			var circleColor = [
					'match',
					['get', 'HH_RACE'],
					10, 'rgb(212, 44, 44)', //1 .White alone
					20, 'rgb(0, 169, 157)', // 2 .Black or African American alone
					// 30 .American Indian alone
					//??, 'rgb(255, 255, 0)',// 4 .Alaska Native alone
					// 31 .American Indian and Alaska Native tribes specified; or American .Indian or Alaska Native, not specified and no other races
					40, 'rgb(153, 102, 255)',  // 6 .Asian alone
					// 70 .Native Hawaiian and Other Pacific Islander alone
					// 80 .Some Other Race alone
					55, '#ffa500', // 9 .Two or More Races
					'rgb(170, 147, 61)' // Other
				],
				raceCategories = {
					'mapping': {
						//1 : "White",
						//2 : "Black",
						//3 : "American Indian",
						//4 : "Alaskan",
						//5 : "American Indian/Alaskan tribe specified or unspecified",
						//6 : "Asian",
						//7 : "Native Hawaiian and Other Pacific Islander",
						//8 : "Other",
						//9: "Multiracial"
						10: "White",
						20: "Black",
						30: "Indigenous",
						31: "American Indian",
						40: "Asian",
						55: "Multiracial",
						60: "Other"
					},
					'endMapping': "Other"
				};
			
			addTileLayer(raceID, srcID, circleColor, raceCategories);
		}
		
		function addIncomeTileLayer(hhIncomeID, srcID) {
			var circleColor = [
					'step',
					['get', 'HINCP'],
					'rgb(229, 159, 0)', 25000,
					'rgb(168, 116, 0)', 75000,
					'rgb(63, 115, 127)', 125000,
					'rgb(63, 115, 127)', 250000,
					'rgb(11, 181, 255)', 9999997,
					'rgb(128, 128, 128)', 9999998,
					'rgb(128, 128, 128)'
				],
				incomeCategories = {
					'legend': 'Income (x $1000)',
					'mapping': {
						25000: '0-25',
						75000: '25-75',
						125000: '75-125',
						250000: '125-250',
						9999997: '&ge; 250',
						9999998: 'Unknown/missing',
						9999999: 'Not in universe'
					},
					'endMapping': 'Not in universe'
				};
			addTileLayer(hhIncomeID, srcID, circleColor, incomeCategories);
		}
		
		function addPersonsTileLayer(personsID, srcID) {
			var circleColor = [
					'match',
					['get', 'PERSONS'],
					//['get', 'NP'],
					1, rgb(67, 2, 252),
					2, rgb(7, 221, 249),
					3, rgb(242, 201, 15),
					4, rgb(242, 201, 15),
					rgb(239, 20, 93) // other
				],
				sizeCategories = {
					'endMapping': "&ge; 5"
				};
			
			addTileLayer(personsID, srcID, circleColor, sizeCategories);
		}
		
		function addHouseholdTileLayer(id, srcID) {
			addTileLayer(id, srcID, 'orange');
		}
		
		function addLegend(category, circleColor, categoryValues) {
			var legendPanel = document.getElementById('legend-panel'),
				legendItem = document.createElement('div'),
				legendTitle = document.createElement('caption'),
				legendItemTable = document.createElement('table'),
				tableBody = document.createElement('tbody'),
				headerRow = document.createElement('tr'),
				header,
				contentRow = document.createElement('tr'),
				content,
				bubbleCell,
				legendID = category + '-legend',
				categoryLegend = category,
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
			
			legendTitle.classList.add("legend-title");
			legendTitle.innerHTML = "<strong>" + categoryLegend + "</strong>";
			
			legendItemTable.appendChild(legendTitle);
			
			//console.log(legendID);
			//console.log(circleColor);
			//console.log("~~~~~");
			
			if(typeof(circleColor) === "string") {
				header = document.createElement('td');
				header.classList.add("legend-cell");
				header.style.textAlign = "center";
				header.innerHTML = legendID;
				
				content = document.createElement('td');
				content.classList.add('legend-cell');
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
					header.classList.add("legend-cell");
					header.style.textAlign = "center";
					
					content = document.createElement('td');
					content.classList.add("legend-cell");
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
			legendPanel.appendChild(legendItem);
			
			return;
		}
		
		function addTileLayer(layerID, srcID, circleColor, categoryValues) {
			var layerSourceID = layerID + ' -' + srcID;
			
			map.addLayer({
				'id': layerSourceID,
				'type': 'circle',
				'source': srcID,
				'source-layer': 'hh',
				paint: {
					'circle-radius': {
						base: 1.75,
						stops: [ [16, 2], [22, 40] ]
					},
					'circle-color': circleColor
				}
			}, 'waterway-label');
			makeLayerClickable(layerSourceID, srcID);
			
			addLegend(layerID, circleColor, categoryValues);
		}
		
		function makeLayerClickable(id, srcId) {
			function touchClick(e) {
				var coordinates = e.features[0].geometry.coordinates.slice(),
					popupContent = document.createElement('div'),
					tabButton,
					tabs = [
						'human-readable',
						'individuals',
						'raw-data'
					],
					i;
				
				//ga('send', [event], {[eventCategory], [eventAction], [eventLabel], [eventValue]});
				ga(ANALYTICS_TRACKER + '.send', 'event', 'Map', 'click', 'click on household');
				
				popupContent.innerHTML =  html(e);
				
				// Ensure that if the map is zoomed out such that multiple
				// copies of the feature are visible, the popup appears
				// over the copy being pointed to.
				while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
					coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
				}
				
				if(popup) {
					popup.remove();
				}
				
				popup = new mapboxgl.Popup()
					.setLngLat(coordinates)
					.setDOMContent(popupContent)
					.addTo(map);
				
				for(i = 0; i < tabs.length; i++) {
					tabButton = document.getElementById(tabs[i] + '-button');
					
					(function(id){
						tabButton.onclick = function() {
							var tab,
								tabToggleButton,
								j;
							
							for(j = 0; j < tabs.length; j++) {
								tab = document.getElementById(tabs[j] + '-tab');
								tabToggleButton = document.getElementById(tabs[j] + '-button');
								
								tab.hidden = (tabs[j] !== id);
								
								if(tabs[j] === id) {
									tabToggleButton.classList.add('active-tab-button');
									tabToggleButton.classList.remove('tab-button');
								}
								else {
									tabToggleButton.classList.remove('active-tab-button');
									tabToggleButton.classList.add('tab-button');
								}
							}
							
							return;
						};
					})(tabs[i]);
				}
			}
			
			map.on('click', id, touchClick);
			map.on('touchend', id, touchClick);
			
			map.on('mouseenter', id, function () {
				map.getCanvas().style.cursor = 'pointer';
			});
			map.on('mouseleave', id, function () {
				map.getCanvas().style.cursor = null;
			});
			
			function html(e) {
				var obj = e.features[0].properties,
					html = '',
					k,
					values,
					householdSize,
					householdCategories = {},
					i,
					label,
					category,
					raw = {},
					readable = {},
					code,
					currentFormat,
					temp;
				
				html += '<div id="human-readable-button" class="active-tab-button">Household</div>';
				html += '<div id="individuals-button" class="tab-button">Individual</div>';
				html += '<div id="raw-data-button" class="tab-button">Raw</div>';
				
				html += '<div id="tab-content">';
				html += '<div id="human-readable-tab">';
				
				for (k in obj) {
					if (obj.hasOwnProperty(k) && (k.substring(0, 3) !== "HH_")) {
						values = obj[k].toString();
						
						if((values.charAt(0) === '{') || (values.charAt(0) === '[')) {
							values = values.substring(1, obj[k].length - 1).split(',');
						}
						else {
							householdCategories[k] = true;
							
							if(REMAPPED_LABELS[k]){
								householdCategories[REMAPPED_LABELS[k]['label']] = true;
							}
							
							if(values.length > 0) {
								values = [values];
							}
							else {
								values = [null];
							}
						}
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
						
						if(SPEW_FORMAT.CODES[category]) {
							code = SPEW_FORMAT.CODES[category];
						}
						else {
							code = k;
						}
						//code = SPEW_FORMAT.CODES[category] || k;
						
						if(SPEW_IPUMS_FORMAT[category]) {
							currentFormat = SPEW_IPUMS_FORMAT;
						}
						else {
							currentFormat = SPEW_US_FORMAT;
						}
						
						label = label.charAt(0).toUpperCase() + label.substring(1);
						
						//Parse data
						//raw[code] = [];
						raw[k] = [];
						readable[label] = [];
						for(i = 0; i < values.length; i++) {
							readable[label].push(values[i]);
							
							if(currentFormat[category] && currentFormat[category][values[i]]) {
								if(currentFormat[category][values[i]]['concise']) {
									readable[label][i] = currentFormat[category][values[i]]['concise'];
								}
							}
							
							if(values[i] !== "null"){
								temp = parseInt(values[i]);
								
								if(!Number.isNaN(temp)) {
									//raw[code].push(temp);
									raw[k].push(temp);
								}
								else {
									//raw[code].push(values[i]);
									raw[k].push(values[i]);
								}
							}
							else {
								//raw[code].push(null);
								raw[k].push(null);
							}
						}
						
						//Make the human-readable tab rows
						if(code !== "NP") {
							html += '<div>';
							//html += '<span title="' + code + '">';
							html += '<span>';
							html += '<b>' + label + '</b></span>: ';
							
							if(currentFormat[category]) {
								if(values.length > 1) {
									html += '[';
								}
								
								if(currentFormat[category][values[0]] && currentFormat[category][values[0]]['original']) {
									html += '<span title="' + currentFormat[category][values[0]]['original'] + '">';
								}
								else {
									html += '<span>';
								}
								
								if(readable[label][0]) {
									html += readable[label][0];
								}
								else {
									html += values[0];
								}
								
								html += '</span>';
								
								for(i = 1; i < values.length; i++) {
									html += ', ';
									
									if(currentFormat[category][values[i]] && currentFormat[category][values[i]]['original']){
										html += '<span title="' + currentFormat[category][values[i]]['original'] + '">';
									}
									else {
										html += '<span>';
									}
									
									if(readable[label][i]) {
										html += readable[label][i];
									}
									else {
										html += values[i];
									}
									
									html += '</span>';
								}
								
								if(values.length > 1) {
									html += ']';
								}
							}
							else {
								html += obj[k];
							}
							
							html += '</div>';
						}
					}
				}
				
				html += '</div>';
				
				//make the raw data tab
				html += '<div id="raw-data-tab" hidden>';
				for(k in raw) {
					if(raw.hasOwnProperty(k)) {
						html += '<div><strong>' + k + '</strong>: <span>';
						
						if(raw[k].length > 1) {
							html += '[';
							
							html += raw[k][0];
							for(i = 1; i < raw[k].length; i++) {
								html += ', ' + raw[k][i];
							}
							
							html += ']';
						}
						else {
							html += raw[k][0];
							for(i = 1; i < raw[k].length; i++) {
								html += ', ' + raw[k][i];
							}
						}
						
						html += '</span></div>';
					}
				}
				
				//make the individuals tab
				html += '</div><div id="individuals-tab" hidden>[';
				householdSize = parseInt(raw['PERSONS']) || parseInt(raw['NP']);
				
				for(i = 0; i < householdSize; i++) {
					html += '<div>&emsp;{</div>';
					
					for(k in readable) {
						if(readable.hasOwnProperty(k) && (!householdCategories[k])) {
							html += '<div>&emsp;&emsp;<strong>' + k + '</strong>: ' + readable[k][i] + '</div>';
						}
					}
					
					html += '<div>&emsp;}</div>';
				}
				
				html += ']</div></div>';
				
				return html;
			}
		}
		
		function makeCircleLayersToggleable(hhID, srcID) {
			var id2link = {},
				layerID,
				layers,
				link,
				i;
			
			for (i = 0; i < toggleableLayerIds.length; i++) {
				layerID = toggleableLayerIds[i] + ' -' + srcID;
				link = document.getElementById(toggleableLayerIds[i]);
				
				if(!link){
					link = document.createElement('a');
					link.id = toggleableLayerIds[i];
					link.href = '#';
					link.textContent = toggleableLayerIds[i];
					
					layers = document.getElementById('menu');
					layers.appendChild(link);
				}
				
				id2link[layerID] = link;
				
				if (toggleableLayerIds[i] !== hhID){
					hideLayer.call(link, layerID, toggleableLayerIds[i]);
				}
				else {
					showLayer.call(link, layerID, toggleableLayerIds[i]);
				}
				
				(function(clickedLayerID, category) {
					link.addEventListener("click", function (e) {
						var visibility = map.getLayoutProperty(clickedLayerID, 'visibility'),
							otherLayerID,
							i;
						
						//to my knowledge we can probably delete these two lines,
						//but more testing is needed to see if removing causes side effects
						//e.preventDefault();
						//e.stopPropagation();
						
						if (visibility === 'visible') {
							hideLayer.call(this, clickedLayerID, category);
						}
						else {
							for (i = 0; i < toggleableLayerIds.length; i++) {
								otherLayerID = toggleableLayerIds[i] + ' -' + srcID;
								
								if(otherLayerID !== clickedLayerID) {
									hideLayer.call(id2link[otherLayerID], otherLayerID, toggleableLayerIds[i]);
								}
								else {
									showLayer.call(this, clickedLayerID, toggleableLayerIds[i]);
								}
							}
						}
					});
				})(layerID, toggleableLayerIds[i]);
			}
			
			//TODO: refactor showLayer() and hideLayer()
			function showLayer(layerID, layerCategory) {
				this.className = 'active';
				map.setLayoutProperty(layerID, 'visibility', 'visible');
				document.getElementById(layerCategory + '-legend').style.display = 'block';
			}
			
			function hideLayer(layerID, layerCategory) {
				this.className = null;
				map.setLayoutProperty(layerID, 'visibility', 'none');
				document.getElementById(layerCategory + '-legend').style.display = 'none';
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
			var red = rgbToHex(r),
				green = rgbToHex(g),
				blue = rgbToHex(b);
			
			return '#' + red + green + blue;
		}
	}
	
	function addControls() {
		var draw;
		
		map.addControl(new mapboxgl.NavigationControl(), 'top-left');
		draw = newMapboxDraw();
		map.addControl(draw, 'top-left');
		map.on('draw.create', function(e){
			//ga('send', [event], {[eventCategory], [eventAction], [eventLabel], [eventValue]});
			ga(ANALYTICS_TRACKER + '.send', 'event', 'Map', 'draw', 'create draw query');
			updateQueryResult(e);
			
			return;
		});
		map.on('draw.delete', function(e){
			ga(ANALYTICS_TRACKER + '.send', 'event', 'Map', 'delete', 'delete draw query');
			updateQueryResult(e);
			
			return;
		});
		map.on('draw.update', function(e){
			ga(ANALYTICS_TRACKER + '.send', 'event', 'Map', 'update', 'update draw query');
			updateQueryResult(e);
			
			return;
		});
		
		function updateQueryResult(e) {
			var features = document.getElementById('features'),
				closeButton = document.getElementById('features-close-button'),
				featureCollection = draw.getAll(),
				answer = document.getElementById('calculated-area'),
				hasLegalPolygon = false,
				featureArray = featureCollection.features,
				geometryCoordinates,
				i,
				j,
				area,
				rounded_area,
				url,
				combined,
				geometry;
			
			for(i = 0; i < featureArray.length; i++) {
				geometryCoordinates = featureArray[i].geometry.coordinates;
				for(j = 0; j < geometryCoordinates.length; j++){
					if(geometryCoordinates[j].length > 2) {
						hasLegalPolygon = true;
						break;
						break;
					}
				}
			}
			
			if(hasLegalPolygon && featureCollection.features.length > 0) {
				closeButton.onclick = function(){
					closeButton.hidden = true;
					tokenForSummary.cancel();
					draw.deleteAll();
					updateQueryResult(null);
				};
				
				closeButton.hidden = false;
				features.style.display = 'block';
				area = turf.area(featureCollection);
				// restrict to area to 2 decimal points
				rounded_area = Math.round(area*100)/100;
				//answer.innerHTML = '<span> The area of your polygon(s) is <strong>' + rounded_area + '</strong> square meters</span>';
				url = CONTEXT + '/summarize';
				combined = turf.combine(featureCollection);
				geometry = combined.features[0].geometry;
				
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
			var color1 = '#D20C0C',
				color2 = '#000',
				color3 = '#FFF',
				lineStokeActive = {
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
				},
				polygonFillActive = {
					id: 'gl-draw-polygon-fill',
					type: 'fill',
					filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
					paint: {
						'fill-color': color1,
						'fill-outline-color': color1,
						'fill-opacity': 0.1
					}
				},
				polygonOutlineActive = {
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
				},
				vertexPointHalosActive = {
					id: 'gl-draw-polygon-and-line-vertex-halo-active',
					type: 'circle',
					filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
					paint: {
						'circle-radius': 5,
						'circle-color': color3
					}
				},
				vertexPointsActive = {
					id: 'gl-draw-polygon-and-line-vertex-active',
					type: 'circle',
					filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
					paint: {
						'circle-radius': 3,
						'circle-color': color1
					}
				},
				lineStokeInactive = {
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
				},
				polygonFillInactive = {
					id: 'gl-draw-polygon-fill-static',
					type: 'fill',
					filter: ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'static']],
					paint: {
						'fill-color': color2,
						'fill-outline-color': color2,
						'fill-opacity': 0.1
					}
				},
				polygonOutlineInactive = {
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
					var parsedResponse,
						k;
					
					try {
						parsedResponse = JSON.parse(request.responseText);
						
						for(k in parsedResponse) {
							if(parsedResponse.hasOwnProperty(k)) {
								if(REMAPPED_LABELS[k]) {
									parsedResponse[REMAPPED_LABELS[k]['label']] = parsedResponse[k];
									delete parsedResponse[k];
								}
							}
						}
						
						resolve(JSON.stringify(parsedResponse));
					}
					catch(err) {
						resolve(err + "<br>" + request.responseText);
					}
				};
				
				token.cancel = function () {
					request.abort();
					reject(new Error('Cancelled')); // reject the promise
				};
				
				request.onerror = reject;
				request.timeout = reject;//(request.statusText);
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
			var b = {},
				i,
				p;
			
			if (a === '') return {};
			
			for(i = 0; i < a.length; ++i) {
				p=a[i].split('=', 2);
				
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
	
	return;
})(SPEW_FORMAT);
