var btnOpenLogin = document.querySelector(".handleLogIn");
var modalLogin = document.querySelector(".modalLogin");
var btnCloseLogin = document.querySelector(".btnCloseLogin");
// var btnCloseLogin2 = document.querySelector(".LoginBtn");
var iconCloseLogin = document.querySelector(".iconCloseLogin");

function toggleModalLogin() {
  modalLogin.classList.toggle("hide");
}

btnOpenLogin.addEventListener("click", toggleModalLogin);
btnCloseLogin.addEventListener("click", toggleModalLogin);
// btnCloseLogin2.addEventListener("click", toggleModalLogin);
iconCloseLogin.addEventListener("click", toggleModalLogin);
modalLogin.addEventListener("click", function (e) {
  if (e.target == e.currentTarget) {
    toggleModalLogin();
  }
});

var loginAPI = "http://localhost:8080/api/users/login";

const handleLogin = async () => {
  var inputEmail = document.getElementById("inputEmail").value;
  var inputPassword = document.getElementById("inputPassword").value;
  var raw = JSON.stringify({
    user: {
      email: inputEmail,
      password: inputPassword,
    },
  });
  if (inputEmail === "" || inputPassword === "") {
    alert("invalid input login");
  } else {
    await login(raw).then((data) => {
      if (data === null) {
        alert("Email or password incorrect");
      } else {
        toggleModalLogin();
        document.getElementById("inputEmail").value = "";
        document.getElementById("inputPassword").value = "";
        setToken(data);
      }
    });
    await handleGetCurrentUser();
    var posts = await listPost(1);
    if (posts === null) {
      console.log("Loi listPost");
    } else {
      await renderPost(posts);
    }
  }
};

const login = async (raw) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    let response = await fetch(loginAPI, requestOptions);
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

function setToken(user) {
  var token = user.user.token;
  localStorage.setItem("token", token);
}

//
