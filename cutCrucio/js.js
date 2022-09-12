const toggleButton = document.getElementById('toggle-button');
const naviList = document.getElementById('navi-list');

toggleButton.addEventListener('click', () => {
    naviList.classList.toggle('active');

})

/*----------------------------------------------------------------------------------------*/


// for (let i = 0; i <= 2; i++) {
//     document.getElementsByClassName('mask')[i].style.display = "none";
// }

function myonmou1() {
    document.querySelector('#team > div > div.col-md-8.row > div:nth-child(1) > img').style.transform = 'scale(1.2)';
    document.querySelector('#team > div > div.col-md-8.row > div:nth-child(1) > div').style.transform = 'scale(1.2)';
    // document.getElementsByClassName('mask')[0].style.display = "block";
}

function myonmou2() {
    document.querySelector('#team > div > div.col-md-8.row > div:nth-child(2) > img').style.transform = 'scale(1.2)';
    document.querySelector('#team > div > div.col-md-8.row > div:nth-child(2) > div').style.transform = 'scale(1.2)';
    // document.getElementsByClassName('mask')[1].style.display = "block";
}

function myonmou3() {
    document.querySelector('#team > div > div.col-md-8.row > div:nth-child(3) > img').style.transform = 'scale(1.2)';
    document.querySelector('#team > div > div.col-md-8.row > div:nth-child(3) > div').style.transform = 'scale(1.2)';
    // document.getElementsByClassName('mask')[2].style.display = "block";
}


function myout() {
    document.querySelector('#team > div > div.col-md-8.row > div:nth-child(1) > img').style.transform = 'scale(1)';
    document.querySelector('#team > div > div.col-md-8.row > div:nth-child(2) > img').style.transform = 'scale(1)';
    document.querySelector('#team > div > div.col-md-8.row > div:nth-child(3) > img').style.transform = 'scale(1)';
}

/*----------------------------------------------------------------------*/

function projectMyonmou1() {
    document.querySelector('#portfolio > div.row.ourPortfolio-listItem > div:nth-child(1) > img').style.transform = 'scale(1.2)';
}
function projectMyonmou2() {
    document.querySelector('#portfolio > div.row.ourPortfolio-listItem > div:nth-child(2) > img').style.transform = 'scale(1.2)';
}
function projectMyonmou3() {
    document.querySelector('#portfolio > div.row.ourPortfolio-listItem > div:nth-child(3) > img').style.transform = 'scale(1.2)';
}
function projectMyonmou4() {
    document.querySelector('#portfolio > div.row.ourPortfolio-listItem > div:nth-child(4) > img').style.transform = 'scale(1.2)';
}
function projectMyonmou5() {
    document.querySelector('#portfolio > div.row.ourPortfolio-listItem > div:nth-child(5) > img').style.transform = 'scale(1.2)';
}
function projectMyonmou6() {
    document.querySelector('#portfolio > div.row.ourPortfolio-listItem > div:nth-child(6) > img').style.transform = 'scale(1.2)';
}
function projectMyonmou7() {
    document.querySelector('#portfolio > div.row.ourPortfolio-listItem > div:nth-child(7) > img').style.transform = 'scale(1.2)';
}
function projectMyonmou8() {
    document.querySelector('#portfolio > div.row.ourPortfolio-listItem > div:nth-child(8) > img').style.transform = 'scale(1.2)';
}

function projectMyout() {
    document.querySelector("#portfolio > div.row.ourPortfolio-listItem > div:nth-child(1) > img").style.transform = 'scale(1)';
    document.querySelector("#portfolio > div.row.ourPortfolio-listItem > div:nth-child(2) > img").style.transform = 'scale(1)';
    document.querySelector("#portfolio > div.row.ourPortfolio-listItem > div:nth-child(3) > img").style.transform = 'scale(1)';
    document.querySelector("#portfolio > div.row.ourPortfolio-listItem > div:nth-child(4) > img").style.transform = 'scale(1)';
    document.querySelector("#portfolio > div.row.ourPortfolio-listItem > div:nth-child(5) > img").style.transform = 'scale(1)';
    document.querySelector("#portfolio > div.row.ourPortfolio-listItem > div:nth-child(6) > img").style.transform = 'scale(1)';
    document.querySelector("#portfolio > div.row.ourPortfolio-listItem > div:nth-child(7) > img").style.transform = 'scale(1)';
    document.querySelector("#portfolio > div.row.ourPortfolio-listItem > div:nth-child(8) > img").style.transform = 'scale(1)';
}


var userAPI = 'http://localhost:8080/users'

function start() {
    getUsers(renderUser)

    handleCreateForm();
}

start();

//functions
function getUsers(callback) {
    fetch(userAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}

function createUser(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
       
    };
    fetch(userAPI, options)
    .then(function (response) {
        return response.json();
    })
    .then(callback)
}

function renderUser(users) {
    var listUsersBlock =
        document.querySelector('#list-users');

    var htmls = users.map(function (user) {
        return `
            <tr>
                <td>
                    <h6>${user.name}</h6>
                </td>
                <td>
                    <h6>${user.email}</h6>
                </td>
                <td>
                    <p>${user.message}</p>
                </td>
                <td>
                    <h1>
                        <i class="fas fa-pen-square"></i>
                        <i class="fas fa-trash-alt"></i>
                    </h1>
                </td>
            </tr>
            `;
    });
    listUsersBlock.innerHTML = htmls;
}

function handleCreateForm(){
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var email = document.querySelector('input[name="email"]').value;
        var message = document.querySelector('input[name="message"]').value;
    

        var formData = {
            name: name,
            email: email, 
            message: message
        }
        createUser(formData)
    }
}



// function CORSSolve() {
//     const xhttp = new XMLHttpRequest()
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             document.getElementById('list-users').innerText =
//                 xhttp.responseText
//         }
//     };
//     xhttp.open("GET", "http://localhost:8080/users", true)
//     xhttp.send()
// }

// CORSSolve();