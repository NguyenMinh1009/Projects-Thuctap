var userAPI = 'http://localhost:8080/api/users/login'

function start() {
    login(authenticate)
}

start();

//functions
function login(callback) {
    fetch(userAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}

function authenticate(){

}