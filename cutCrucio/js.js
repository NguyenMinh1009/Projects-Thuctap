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

//check format email
function validation(){
	var form = document.getElementById("form");
	var email = document.getElementById("email").value;
	var text = document.getElementById("text");
	var pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

	if(email.match(pattern)){
		form.classList.add("valid");
		form.classList.remove("invalid");
		text.innerHTML="Your Email Address in Valid.";
		text.style.color = "#00ff00";
	}else{
		form.classList.remove("valid");
		form.classList.add("invalid");
		text.innerHTML="Please Enter Valid Email Address";
		text.style.color = "#ff0000";
	}
	if(email==""){
		form.classList.remove("valid");
		form.classList.remove("invalid");
		text.innerHTML="";
		text.style.color = "#00ff00";
	}
}


var userAPI = 'https://api.publicapis.org/entries'
// var userCreateAPI = 'http://localhost:8080/users/addUser'

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

function createUser(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    };
    fetch(userCreateAPI, options)
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
                    <h6>${user.API}</h6>
                </td>
                <td>
                    <h6>${user.Description}</h6>
                </td>
                <td>
                    <p>${user.Auth}</p>
                </td>
                <td>
                    <h1>
                        <i class="fas fa-pen-square"></i>
                        <i class="fas fa-trash-alt"></i>
                    </h1>
                </td>
            </tr>
            `
    });
    listUsersBlock.innerHTML = htmls;
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function () {
        var name = document.querySelector('input[name="name"]').value;
        var email = document.querySelector('input[name="email"]').value;
        var message = document.querySelector('input[name="message"]').value;


        var formData = {
            name: name,
            email: email,
            message: message
        }
        createUser(formData, function () {
            getUsers(renderUser);
        })
    }
}

