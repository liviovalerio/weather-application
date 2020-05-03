let town = 'Liège';
let button = document.querySelector('#changer');
let url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=313db54332243f97fd92c0f47ea45453&units=metric`

function getTemperature(town) {
    let requete = new XMLHttpRequest();
    requete.open('GET', url);
    requete.responseType = 'json';
    requete.send();

    requete.onload = () => {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if(requete.status === 200) {
                let response = requete.response;
                console.log(response);
                let temperature = response.main.temp;
                document.querySelector('#temperature_label').textContent = temperature
            } else {
                alert("Il y a un problème avec l'API!")
            }
        }
    }
}

getTemperature(town);
document.querySelector('#ville').textContent = town;

button.addEventListener('click', () => {
    town = prompt('Pouvez-vous choisir une ville?');
    url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=313db54332243f97fd92c0f47ea45453&units=metric`;
    getTemperature(town)
    document.querySelector('#ville').textContent = town;
})
