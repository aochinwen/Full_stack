
mapboxgl.accessToken = 'pk.eyJ1IjoicmF5MTExMzIwMDIiLCJhIjoiY2tvY3kwb3Y5MmliZDJub24wdnpjMTB5NiJ9.kPPmudTylSbhH27w2lwsoQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ray11132002/ckocybags0c1m17k88qzwqa6e', // style URL
    center: [103.99676232382323, 1.3478886553251557], // starting position [lng, lat]
    zoom: 13 // starting zoom
});
const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');
    
for (const input of inputs) {
    input.onclick = (layer) => {
    const layerId = layer.target.id;
    map.setStyle('mapbox://styles/' + layerId);
    };
};

//fetch closure from API
async function getClosures() {
    const res = await fetch('/api/v1/closures');
    const data = await res.json();
    console.log('getting closures')

    const closures = data.data.map(closure =>{
        return {
            type: 'Feature',
            geometry : {
                type:'Polygon',
                coordinates : closure.location.coordinates,
                
                },
            properties: {
                Title: closure.Title,
                ProjectOfficer: closure.ProjectOfficer,
                Company: closure.Company,
                Contacts: closure.Contacts,
                Callsign: closure.Callsign,
                Description: closure.Description,
                DateofClosure: closure.DateofClosure,
                TimeofClosure: closure.TimeofClosure,
                Type: closure.Type,
                Remarks: closure.Remarks,
                Status: closure.Status
            }
        };
    });
    loadmap(closures);
    //console.log(closures)
}



// load map with closures
function loadmap(closures){
    map.on('load', () => {
            // Add a data source containing GeoJSON data.
            map.addSource('closures', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': closures,
                        }
                });
                
                // Add a new layer to visualize the polygon.
                map.addLayer({
                    'id': 'closures',
                    'type': 'fill',
                    'source': 'closures', // reference the data source
                    'layout': {},
                    'paint': {
                    'fill-color': '#0080ff', // blue color fill
                    'fill-opacity': 0.5
                    }
                });
                // Add a black outline around the polygon.
                map.addLayer({
                    'id': 'outline',
                    'type': 'line',
                    'source': 'closures',
                    'layout': {},
                    'paint': {
                    'line-color': '#000',
                    'line-width': 2
                    }
            });
        });
    map.on('click', 'closures', (e) => {
        console.log(e.features[0])
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(e.features[0].properties.Title)
        .addTo(map)
    });
    
        
    // Change the cursor to a pointer when
    // the mouse is over the states layer.
    map.on('mouseenter', 'closures', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
        
    // Change the cursor back to a pointer
    // when it leaves the states layer.
    map.on('mouseleave', 'closures', () => {
        map.getCanvas().style.cursor = '';
    });
};

const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });


// function loadPopUp(){
//     map.on('click', 'closures', (e) => {
//         new mapboxgl.Popup()
//         .setLngLat(e.lngLat)
//         .setHTML(e.features[0].properties.Title)
//         .addTo(map);
//     });
        
//     // Change the cursor to a pointer when
//     // the mouse is over the states layer.
//     map.on('mouseenter', 'closures', () => {
//         map.getCanvas().style.cursor = 'pointer';
//     });
        
//     // Change the cursor back to a pointer
//     // when it leaves the states layer.
//     map.on('mouseleave', 'closures', () => {
//         map.getCanvas().style.cursor = '';
//     });
// }


getClosures();
//loadPopUp();