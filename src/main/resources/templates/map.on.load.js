// center: [-122.447303, 37.753574]
// center: [-79.93441744241865,40.45862873693675]
// zoom: 12,
// center: [center-121.415061, 40.506229]

var map;
// original
map.addLayer({
    'id': 'population',
    'type': 'circle',
    'source': {
        type: 'vector',
        url: 'mapbox://examples.8fgz4egr'
    },
    'source-layer': 'sf2010',
    'paint': {
        // make circles larger as the user zooms from z12 to z22
        'circle-radius': {
            'base': 1.75,
            'stops': [ [12, 2], [22, 180] ]
        },
        // color circles by ethnicity, using a match expression
        // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
        'circle-color': [
            'match',
            ['get', 'ethnicity'],
            'White', '#fbb03b',
            'Black', '#223b53',
            'Hispanic', '#e55e5e',
            'Asian', '#3bb2d0',
            '#ccc'
        ]
    }
});

// points as icons
map.addLayer({
    "id": "points",
    "type": "symbol",
    "source": {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-77.03238901390978, 38.913188059745586]
                },
                "properties": {
                    "title": "Mapbox DC",
                    "icon": "monument"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-122.414, 37.776]
                },
                "properties": {
                    "title": "Mapbox SF",
                    "icon": "harbor"
                }
            }]
        }
    },
    "layout": {
        "icon-image": "{icon}-15",
        "text-field": "{title}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.6],
        "text-anchor": "top"
    }
});

// Polygon & points as circles
map.addSource("national-park", {
    "type": "geojson",
    "data": {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-121.353637, 40.584978],
                        [-121.284551, 40.584758],
                        [-121.275349, 40.541646],
                        [-121.246768, 40.541017],
                        [-121.251343, 40.423383],
                        [-121.326870, 40.423768],
                        [-121.360619, 40.434790],
                        [-121.363694, 40.409124],
                        [-121.439713, 40.409197],
                        [-121.439711, 40.423791],
                        [-121.572133, 40.423548],
                        [-121.577415, 40.550766],
                        [-121.539486, 40.558107],
                        [-121.520284, 40.572459],
                        [-121.487219, 40.550822],
                        [-121.446951, 40.563190],
                        [-121.370644, 40.563267],
                        [-121.353637, 40.584978]
                    ]
                ]
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-121.415061, 40.506229]
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-121.505184, 40.488084]
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-121.354465, 40.488737]
            }
        }]
    }
});

map.addLayer({
    "id": "park-boundary",
    "type": "fill",
    "source": "national-park",
    "paint": {
        "fill-color": "#888888",
        "fill-opacity": 0.4
    },
    "filter": ["==", "$type", "Polygon"]
});

map.addLayer({
    "id": "park-volcanoes",
    "type": "circle",
    "source": "national-park",
    "paint": {
        "circle-radius": 6,
        "circle-color": "#B42222"
    },
    "filter": ["==", "$type", "Point"],
});

// points as circles
map.addSource("national-park", {
    "type": "geojson",
    "data": {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-121.415061, 40.506229]
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-121.505184, 40.488084]
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-121.354465, 40.488737]
            }
        }]
    }
});

map.addLayer({
    "id": "park-volcanoes",
    "type": "circle",
    "source": "national-park",
    "paint": {
        "circle-radius": 6,
        "circle-color": "#B42222"
    },
    "filter": ["==", "$type", "Point"],
});