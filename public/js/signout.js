function signOut(){
    localStorage.setItem('taxiway_role','')
    localStorage.setItem('taxiway_token','')
    location.reload()
}