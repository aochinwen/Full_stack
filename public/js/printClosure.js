
let ProjectTitle = document.getElementById('project-title');
let R_ConCompany = document.getElementById('contractor-company');
let R_OfficerCompany = document.getElementById('officer-company');
let R_ContractorName = document.getElementById('contractor-name');
let R_OfficerName = document.getElementById('officer-name');
let firstClosure = {}
let R_Contacts = document.getElementById('report-contacts')

function printClosure(){
    document.getElementById("divClosureTable").style.display = "block"
    layers = ['pending', 'approved'];
    alert('Click on closure to add to table')
    var selectedStateId = null;
    let Title = [];
    //populate detail panel
    layers.forEach(layer => {
        map.on('click', layer, (e) => {
            console.log(Title)
            var features = map.querySourceFeatures('closures', {
                Layer: ['pending','approved'],
                filter: ["==", "Title", e.features[0].properties.Title]
            });
            console.log(features)
            console.log("printClosure")
            
            if (e.features.length > 0) {
                console.log('ok1')
                console.log(Title)
                // if something was clicked before, it'll turn select to false 
                if (Title.includes(e.features[0].properties.Title)){
                    console.log('not ok')
                    features.forEach(element => {
                        map.setFeatureState(
                            { source: 'closures', id: element.id },
                            { select: false }
                        );
                    });
                    Title = Title.filter(a => a !== e.features[0].properties.Title)
                    deleteFromTable(e);
                } else{
                    console.log('ok1')
                    features.forEach(element => {
                        selectedStateId = element.id;
                        map.setFeatureState(
                            { source: 'closures', id: selectedStateId },
                            { select: true }
                        );
                    });
                    
                    Title.push(e.features[0].properties.Title)
                    addToTable(e);
                }
                
            }
            
        });
    });
}

function populateDetail(Table,e){
    firstrow = Table.getElementsByTagName("tr")[0];
    firstTitle = firstrow.getElementsByTagName("td")[0];
    ProjectTitle.innerHTML = firstTitle.innerHTML
    R_ConCompany.innerHTML = e.features[0].properties.ConCompany
    R_OfficerCompany.innerHTML = e.features[0].properties.Company
    R_ContractorName.innerHTML = e.features[0].properties.Contractor
    R_OfficerName.innerHTML = e.features[0].properties.ProjectOfficer
    R_Contacts.innerHTML = `Project Officer: ${e.features[0].properties.ProjectOfficer} (${e.features[0].properties.Contacts}) Contractor: ${e.features[0].properties.Contractor} (${e.features[0].properties.ConContacts}) / ${e.features[0].properties.Callsign}`

}

function addToTable(e){
    let Table = document.getElementById('closureTable').getElementsByTagName('tbody')[0];
    let newRow = Table.insertRow(-1);
    console.log(typeof(e.features[0].properties))
    if (firstClosure.length==0){
        Object.assign(firstClosure,e.features[0].properties);
    }
    let printData = [
        e.features[0].properties.Title,
        e.features[0].properties.Status,
        e.features[0].properties.ProjectOfficer,
        e.features[0].properties.Description,
        moment(e.features[0].properties.DateofClosure).format('YYYY MMMM Do') + " till "+ moment(e.features[0].properties.EndofClosure).format('YYYY MMMM Do'),
        e.features[0].properties.StartTime + "~" + e.features[0].properties.EndTime,
        e.features[0].properties.Type,
        e.features[0].properties.Remarks
    ];
    for (i=0; i<8; i++){
        let newCell = newRow.insertCell(i)
        let newText = document.createTextNode(printData[i]);
        newCell.appendChild(newText)
    }
    console.log(Table.rows.length)
    if (Table.rows.length<2){
        console.log(firstClosure)
        populateDetail(Table,e)
    }
    

}

function deleteFromTable(e){
    let rowCount = document.getElementById('closureTable').rows.length
    let Table = document.getElementById('closureTable').getElementsByTagName('tbody')[0]
    for (i=0; i<rowCount-1;i++){
        if (Table.rows[i].cells[0].innerHTML==e.features[0].properties.Title){
            document.getElementById('closureTable').deleteRow(i+1)
            return
        } else{
            console.log("nothing to delete??")
        }
    }
}

function createPDF() {
    document.getElementById('detail').style.display="none";
    document.getElementById('style-selector').style.display='none';
    document.getElementById('state-legend').style.display='none';
    document.getElementById('print-btn').style.display='none';
    window.print();
    document.location.href="/";
}