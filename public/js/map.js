const d_detail = document.getElementById("detail")
const d_Title = document.getElementById("detail-Title");
const d_ProjectOfficer = document.getElementById("detail-ProjectOfficer");
const d_Company = document.getElementById("detail-Company");
const d_Contacts = document.getElementById("detail-Contacts");
const d_Callsign = document.getElementById("detail-Callsign");
const d_Description = document.getElementById("detail-Description");
const d_StartofClosure = document.getElementById("detail-StartofClosure");
const d_EndofClosure = document.getElementById("detail-EndofClosure");
const d_Remarks = document.getElementById("detail-Remarks");
const d_Status = document.getElementById("detail-Status");


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
        getClosures();
        map.setStyle('mapbox://styles/' + layerId);
        console.log("attempt to get closures after style change")
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
                EndofClosure: closure.EndofClosure,
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
    console.log('loading closures')
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
                'fill-color': [
                    'case',
                    ['boolean',['feature-state', 'clicked'], true],
                    '#64bdbb', // if selected true, paint in blue
                    '#888888' // else paint in gray
                ], // blue color fill
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
    map.on('style.load', () => {
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
                    'fill-color': [
                        'case',
                        ['boolean',['feature-state', 'clicked'], true],
                        '#64bdbb', // if selected true, paint in blue
                        '#888888' // else paint in gray
                    ], // blue color fill
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
        d_detail.style.display="block";
        d_Title.innerHTML=e.features[0].properties.Title
        d_ProjectOfficer.innerHTML=e.features[0].properties.ProjectOfficer
        d_Company.innerHTML=e.features[0].properties.Company
        d_Contacts.innerHTML=e.features[0].properties.Contacts
        d_Callsign.innerHTML=e.features[0].properties.Callsign
        d_Description.innerHTML=e.features[0].properties.Description
        // var date = new Date(Date.UTC(e.features[0].properties.DateofClosure));
        // console.log(new Intl.DateTimeFormat('en-GB').format(date));
        // options.timeZone = 'Asia/Singapore';
        d_StartofClosure.innerHTML=moment(e.features[0].properties.DateofClosure).format('YYYY MMMM Do');
        d_EndofClosure.innerHTML=moment(e.features[0].properties.EndofClosure).format('YYYY MMMM Do');
        d_Remarks.innerHTML=e.features[0].properties.Remarks
        d_Status.innerHTML=e.features[0].properties.Status

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

const titlePopup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });
var draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
        polygon: true,
        trash: true
    }
 });
 map.addControl(draw);

var drawButton = document.getElementById('confirmPolygon');

drawButton.onclick = function() {
    var data = draw.getAll();
    var polyCoord = turf.meta.coordAll(data);
    sessionStorage.setItem("polyCoord", JSON.stringify(polyCoord))
    document.getElementById('closure-location').value = polyCoord;
    
    if (polyCoord.length > 4) {
            var answer = document.getElementById('coordinates');
            answer.innerHTML = 'coordinates: '
            polyCoord.forEach(coord => {
                answer.append("["+coord+"]"+" ")
            })
            document.querySelector('#confirmPolygon a').innerHTML = "Update Mark-up";
            let form = document.getElementById('closure-form');
            if (form.style.display === "none"){
                document.getElementById("closure-form").style.display = "block";
            } 
        } else {
            alert("Use the draw tools to draw a polygon!");
            
        }
};

getClosures();