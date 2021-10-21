const closureForm = document.getElementById('closure-form');
const Title = document.getElementById('closure-title');
const ProjectOfficer = document.getElementById('closure-projectofficer');
const Company = document.getElementById('closure-company');
const Contacts = document.getElementById('closure-contacts');
const Callsign = document.getElementById('closure-callsign');
const Description = document.getElementById('closure-description');
const DateofClosure = document.getElementById('closure-DateofClosure');
const EndofClosure = document.getElementById('closure-EndofClosure');
const Type = document.getElementById('closure-type');
const Remarks = document.getElementById('closure-remarks');
const Location = document.getElementById('closure-location')


// send POST to API to add closure
async function addClosure_POST(e) {
    e.preventDefault();

    if (Title.value === "" || ProjectOfficer.value === "" || Contacts.value === ""){
        alert('Please fill in missing fields');
    }

    if (location.value === "" ){
        alert('Please draw closure');
    }
    let coordinates = {"type": "Polygon", "coordinates": JSON.parse(sessionStorage.getItem("polyCoord"))}

    const sendBody = {
        Title: Title.value,
        ProjectOfficer: ProjectOfficer.value,
        Company: Company.value,
        Contacts: Contacts.value,
        Callsign: Callsign.value,
        Description: Description.value,
        DateofClosure: DateofClosure.value,
        EndofClosure: EndofClosure.value,
        Type: Type.value,
        Remarks: Remarks.value,
        location: coordinates
    }


    try {
        const res = await fetch('/api/v1/closures',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendBody)
        });
        if (res.status === 400){
            throw Error('Server error')
        }

        alert('Closure added!');
        window.location.href = '/index.html';
    } catch (error) {
        console.log(error)
    }
}


closureForm.addEventListener('submit', addClosure_POST)