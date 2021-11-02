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
const d_Time = document.getElementById("detail-Time");
const d_Type = document.getElementById("detail-Type");
const d_Contractor = document.getElementById("detail-Contractor");
const d_ConContacts = document.getElementById("detail-ConContacts");
const d_ConCompany = document.getElementById("detail-ConCompany");
const d_Category = document.getElementById('detail-Category')
var DateTime = luxon.DateTime;
var clickedStateId = null;


mapboxgl.accessToken = 'pk.eyJ1IjoicmF5MTExMzIwMDIiLCJhIjoiY2tvY3kwb3Y5MmliZDJub24wdnpjMTB5NiJ9.kPPmudTylSbhH27w2lwsoQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ray11132002/ckocybags0c1m17k88qzwqa6e', // style URL
    center: [103.99676232382323, 1.3478886553251557], // starting position [lng, lat]
    bearing: -66.97,
    zoom: 13, // starting zoom
    preserveDrawingBuffer: true
});

filters = { expired: ['>=', 'EndofClosure', DateTime.now().ts], hideApproved: ['!=', 'Status', 'Approved'], hidePending: ['!=', 'Status', 'Pending'] }
var layers = ['pending', 'approved', 'outline','standRestriction','standClosure'];


const standClosure = {
    'id': 'standClosure',
    'type': 'fill',
    'source': 'closures', // reference the data source
    'layout': {},
    'paint': {
        'fill-color': [
            'case',
            ['boolean', ['feature-state', 'click'], false],
            '#f6ff52',
            '#FF0000'
        ],
        'fill-opacity': 0.5,
    },
    'filter': ["all", ['>=', 'EndofClosure', DateTime.now().ts],['==', 'Category', 'standclosure']]
};

const standRestriction = {
    'id': 'standRestriction',
    'type': 'fill',
    'source': 'closures', // reference the data source
    'layout': {},
    'paint': {
        'fill-color': [
            'case',
            ['boolean', ['feature-state', 'click'], false],
            '#f6ff52',
            '#fdfd96'
        ],
        'fill-opacity': 0.5,
    },
    'filter': ["all", ['>=', 'EndofClosure', DateTime.now().ts],['==', 'Category', 'standrestriction']]
};

const approved = {
    'id': 'approved',
    'type': 'fill',
    'source': 'closures', // reference the data source
    'layout': {},
    'paint': {
        'fill-color': [
            'case',
            ['boolean', ['feature-state', 'click'], false],
            '#f6ff52',
            '#64bdbb'
        ],
        'fill-opacity': 0.5,
    },
    'filter': ["all", ['==', 'Status', 'Approved'], ['>=', 'EndofClosure', DateTime.now().ts],['==', 'Category', 'taxilane']]
};

//["all",["==", 'damage', 0],[">=", 'senior_population', 20]]

const pending = {
    'id': 'pending',
    'type': 'fill',
    'source': 'closures', // reference the data source
    'layout': {},
    'paint': {
        'fill-color': [
            'case',
            ['boolean', ['feature-state', 'click'], false],
            '#f6ff52',
            '#fbd2d7'
        ],
        'fill-opacity': 0.5,
    },
    'filter': ["all", ['==', 'Status', 'Pending'], ['>=', 'EndofClosure', DateTime.now().ts],['==', 'Category', 'taxilane']]
};

const outline = {
    'id': 'outline',
    'type': 'line',
    'source': 'closures',
    'layout': {},
    'paint': {
        'line-color': [
            'case',
            ['boolean', ['feature-state', 'select'], false],
            '#f6ff52',
            '#000'
        ],
        'line-width': 2
    },
    'filter': ["all", ['>=', 'EndofClosure', DateTime.now().ts]]
};

function filterToggle(layer, filterParam) {
    let index = layer.filter.indexOf(filterParam);
    if (index !== -1) {
        layer.filter.splice(index, 1);
    } else {
        layer.filter.push(filterParam)
    }
    console.log(layer.filter)
};

const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');

for (const input of inputs) {
    input.onclick = (layer) => {
        const layerId = layer.target.id;
        getClosures();
        map.setStyle('mapbox://styles/' + layerId);
    };
};

//fetch closure from API
async function getClosures() {
    let authToken = localStorage.getItem('taxiway_token')
    const res = await fetch('/api/v1/closures', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': authToken
        },
    });

    if (res.status === 403)
        alert('You are not authorized to perform this action')
    else if (res.status === 401)
        location.href = '/login.html'

    const data = await res.json();
    console.log('getting closures')

    const closures = data.data.map(closure => {
        let feature = closure.location.replace('/', '');
        const geo = JSON.parse(feature)

        geo.forEach(element => {
            element.properties = {
                Title: closure.Title,
                Category: closure.Category,
                Company: closure.Company,
                ProjectOfficer: closure.ProjectOfficer,
                Contacts: closure.Contacts,
                ConCompany: closure.ConCompany,
                Contractor: closure.Contractor,
                ConContacts: closure.ConContacts,
                Callsign: closure.Callsign,
                Description: closure.Description,
                DateofClosure: DateTime.fromISO(closure.DateofClosure).ts,
                EndofClosure: DateTime.fromISO(closure.EndofClosure).ts,
                StartTime: closure.StartTime,
                EndTime: closure.EndTime,
                Type: closure.Type,
                Remarks: closure.Remarks,
                Status: closure.Status
            }
        });
        //geo.features.feature.properties = 
        return geo;
    });
    loadmap(closures);
}



// load map with closures
function loadmap(closures) {
    console.log('loading closures')
    const mapStates = ['load', 'style.load']
    mapStates.forEach(State => {
        map.on(State, () => {
            // Add a data source containing GeoJSON data.
            map.addSource('closures', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: closures.flat(),
                },
                'generateId': true
            });
            // Add a new layer to visualize the polygon.
            map.addLayer(approved);

            map.addLayer(pending);
            map.addLayer(standRestriction);
            map.addLayer(standClosure);
            // Add a black outline around the polygon.
            map.addLayer(outline);

            //create hover effect
            layers.forEach(layer => {
                map.on('mousemove', layer, (e) => {
                    if (e.features.length > 0) {
                        if (clickedStateId) {
                            map.setFeatureState(
                                { source: 'closures', id: clickedStateId },
                                { click: false }
                            );
                        }
                        clickedStateId = e.features[0].id;
                        map.setFeatureState(
                            { source: 'closures', id: clickedStateId },
                            { click: true }
                        );
                    }
                })
                map.on('mouseleave', layer, () => {
                    // Change the cursor back to a pointer
                    // when it leaves the states layer.
                    map.getCanvas().style.cursor = '';
                    //change polygon to original color when mouse leave
                    if (clickedStateId !== null) {
                        map.setFeatureState(
                            { source: 'closures', id: clickedStateId },
                            { click: false }
                        );
                    }
                    clickedStateId = null;
                });
                // Change the cursor to a pointer when
                // the mouse is over the states layer.
                map.on('mouseenter', layer, () => {
                    map.getCanvas().style.cursor = 'pointer';
                });
            });
        });
    });

    //populate detail panel
    layers.forEach(layer => {
        map.on('click', layer, (e) => {
            // console.log("now is " + DateTime.now().ts)
            // console.log(e)
            // console.log("the closure time is " + e.features[0].properties.EndofClosure)
            // console.log(DateTime.now().ts>e.features[0].properties.EndofClosure)
            console.log(e.features[0].properties.Category)
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties.Title)
                .addTo(map)
            d_detail.style.display = "block";
            d_Title.innerHTML = e.features[0].properties.Title;
            d_ProjectOfficer.innerHTML = e.features[0].properties.ProjectOfficer;
            d_Company.innerHTML = e.features[0].properties.Company;
            d_Contacts.innerHTML = e.features[0].properties.Contacts;
            d_Callsign.innerHTML = e.features[0].properties.Callsign;
            d_Description.innerHTML = e.features[0].properties.Description;
            d_StartofClosure.innerHTML = DateTime.fromMillis(e.features[0].properties.DateofClosure).toFormat('LLL dd yyyy');
            d_EndofClosure.innerHTML = DateTime.fromMillis(e.features[0].properties.EndofClosure).toFormat('LLL dd yyyy');
            if (e.features[0].properties.StartTime) {
                d_Time.innerHTML = e.features[0].properties.StartTime + "~" + e.features[0].properties.EndTime;
            } else {
                d_Time.innerHTML = "no time specified"
            };
            d_ConContacts.innerHTML = e.features[0].properties.ConContacts;
            d_Contractor.innerHTML = e.features[0].properties.Contractor;
            d_Type.innerHTML = e.features[0].properties.Type;
            d_Remarks.innerHTML = e.features[0].properties.Remarks;
            d_Status.innerHTML = e.features[0].properties.Status;
            d_ConCompany.innerHTML = e.features[0].properties.ConCompany;
            d_Category.innerHTML = e.features[0].properties.Category;
        });
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

drawButton.onclick = function () {
    var data = draw.getAll();
    var polyCoord = turf.meta.coordAll(data);
    sessionStorage.setItem("polyCoord", JSON.stringify(polyCoord))
    sessionStorage.setItem("polyData", JSON.stringify(data.features))
    document.getElementById('closure-location').value = JSON.stringify(data.features);
    if (polyCoord.length > 4) {
        var answer = document.getElementById('coordinates');
        answer.innerHTML = 'coordinates: '
        polyCoord.forEach(coord => {
            answer.append("[" + coord + "]" + " ")
        })
        document.querySelector('#confirmPolygon a').innerHTML = "Update Mark-up";
        let form = document.getElementById('closure-form');
        if (form.style.display === "none") {
            document.getElementById("closure-form").style.display = "block";
        }
    } else {
        alert("Use the draw tools to draw a polygon!");

    }
};
getClosures();