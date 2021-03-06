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
const Location = document.getElementById('closure-location');
const StartTime = document.getElementById('closure-StartTime');
const EndTime = document.getElementById('closure-EndTime')
const Contractor = document.getElementById('closure-contractor')
const ConContacts = document.getElementById('closure-concontacts')
const ConCompany = document.getElementById('closure-concompany')
const Category = document.getElementById('closure-category')


// send POST to API to add closure
async function addClosure_POST(e) {
    e.preventDefault();

    if (Title.value === "" || ProjectOfficer.value === "" || Contacts.value === "") {
        alert('Please fill in missing fields');
    }

    if (location.value === "") {
        alert('Please draw closure');
    }
    let coordinates = sessionStorage.getItem("polyData")

    const sendBody = {
        Title: Title.value,
        Category: Category.value,
        ProjectOfficer: ProjectOfficer.value,
        Company: Company.value,
        Contacts: Contacts.value,
        Contractor: Contractor.value,
        ConCompany: ConCompany.value,
        ConContacts: ConContacts.value,
        Callsign: Callsign.value,
        Description: Description.value,
        DateofClosure: DateofClosure.value,
        EndofClosure: EndofClosure.value,
        StartTime: StartTime.value,
        EndTime: EndTime.value,
        Type: Type.value,
        Remarks: Remarks.value,
        location: coordinates
    }


    try {
        let authToken = localStorage.getItem('taxiway_token')
        const res = await fetch('/api/v1/closures', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': authToken
            },
            body: JSON.stringify(sendBody)
        });
        if (res.status === 400) {
            throw Error('Server error')
        }
        else if (res.status === 403)
            alert('You are not authorized to perform this action')
        else if (res.status === 401)
            location.href = '/login.html'

        alert('Closure added!');
        window.location.href = '/index.html';
    } catch (error) {
        console.log(error)
    }
}


closureForm.addEventListener('submit', addClosure_POST)