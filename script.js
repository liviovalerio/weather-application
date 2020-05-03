let town;
var options = {
    enableHighAccuracy: true
}
if('geolocation' in navigator){
    navigator.geolocation.watchPosition((position) => {
        let lattitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=313db54332243f97fd92c0f47ea45453&units=metric`;
        let requete = new XMLHttpRequest();
        requete.open('GET', url);
        requete.responseType = 'json';
        requete.send();

        requete.onload = () => {
            if (requete.readyState === XMLHttpRequest.DONE) {
                if(requete.status === 200) {
                    let response = requete.response;
                    console.log(response)
                    let temperature = response.main.temp;
                    town = response.name
                    document.querySelector('#ville').textContent = town;
                    document.querySelector('#temperature_label').textContent = temperature
                } else {
                    alert("Il y a un problème avec l'API!")
                }
            }
        }
    }, erreur, options)
} else {
    // Dans le cas où l'utilisateur n'a pas la géolocalisation sur son pc
    erreur();
}

function erreur() {
    town = 'Paris';
    getTemperature(town);
}

let button = document.querySelector('#changer');

function getTemperature(town) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=313db54332243f97fd92c0f47ea45453&units=metric`
    let requete = new XMLHttpRequest();
    requete.open('GET', url);
    requete.responseType = 'json';
    requete.send();

    requete.onload = () => {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if(requete.status === 200) {
                let response = requete.response;
                console.log(response)
                let temperature = response.main.temp;
                town = response.name
                document.querySelector('#ville').textContent = town;
                document.querySelector('#temperature_label').textContent = temperature
            } else {
                alert("Il y a un problème avec l'API!")
            }
        }
    }
}

button.addEventListener('click', () => {
    town = prompt('Pouvez-vous choisir une ville?');
    getTemperature(town)
})
