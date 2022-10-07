var registerAPI = "http://localhost:8080/api/users";

var btnOpenRegister = document.querySelector(".messRegister");
var modalRegister = document.querySelector(".modalRegister");
var btnCloseRegister = document.querySelector(".btnCloseRegister");
//var btnCloseRegister2 = document.querySelector(".RegisterBtn");
var iconCloseRegister = document.querySelector(".iconCloseRegister");

function toggleModalRegister() {
  modalRegister.classList.toggle("hide");
}

btnOpenRegister.addEventListener("click", toggleModalRegister);
btnCloseRegister.addEventListener("click", toggleModalRegister);
// btnCloseRegister2.addEventListener("click", toggleModalRegister);
iconCloseRegister.addEventListener("click", toggleModalRegister);
modalRegister.addEventListener("click", function (e) {
  if (e.target == e.currentTarget) {
    toggleModalRegister();
  }
});

const handleRegister = async () => {
  var inputEmail = document.getElementById("inputEmailRegister").value;
  var inputPassword = document.getElementById("inputPasswordRegister").value;
  var fullName = document.getElementById("inputFullNameRegister").value;
  var raw = JSON.stringify({
    user: {
      email: inputEmail,
      password: inputPassword,
      username: fullName,
    },
  });
  if (inputEmail === "" || inputPassword === "" || fullName === "") {
    alert("Invalid input register");
  } else {
    await register(raw).then((data) => {
      if (data === null) {
        alert("Email exist");
      } else {
        document.getElementById("inputEmailRegister").value = "";
        document.getElementById("inputPasswordRegister").value = "";
        document.getElementById("inputFullNameRegister").value = "";
        setToken(data);

        handleGetCurrentUser();
        listPost(1).then((listPost) => {
          if (listPost === null) {
            console.log("Loi listPost");
          } else {
            toggleModalRegister();
            toggleModalLogin();
            renderPost(listPost);
          }
        });
      }
    });
  }
};

const register = async (raw) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    let response = await fetch(registerAPI, requestOptions);
    if (response && response.status !== 200) {
      throw new Error("Something wrongs with status code: " + response.status);
    }
    let user = await response.json();
    return user;
  } catch (e) {
    console.log(">>> check catch error: ", e.message);
    return null;
  }
};

//check format email
function validation(){
	var form = document.getElementById("modalRegister_body");
	var email = document.getElementById("inputEmailRegister").value;
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
	if(email===""){
		form.classList.remove("valid");
		form.classList.remove("invalid");
		text.innerHTML="";
		text.style.color = "#00ff00";
	}
}
