var token ="eyJhbGciOiJIUzUxMiJ9.eyJwYXlsb2FkIjp7InVzZXJJZCI6MSwiZW1haWwiOiJtaW5oQGdtYWlsLmNvbSJ9LCJleHAiOjE2NjQ1MDE3NDEsImlhdCI6MTY2NDQxNTM0MX0.87X87iiaOsjMPrKXeeG7ay1IyEeBdzMtQHrEYd9vha-6Sp78fFqfYjQSpBPuhgIHQYXas2sFwwk2c1AJBBA-Cg";

var followAPI = "http://localhost:8080/api/profiles/";
var followAPI2 = "/follow";

function handleFollowUser(userId, pageNumber) {
  followUser(userId).then((data) => {
    if (data === null) {
      alert("You need login to continue");
    }
    else{
      listPost(pageNumber).then((listPost) => {
        if (listPost === null) {
          console.log("loi listPost");
        }
        else{
          renderPost(listPost)
        }
      })
    }
  })
}

const followUser = async (userId) => {
  var myHeaders = new Headers();
  var token = localStorage.getItem("token");
  myHeaders.append("Authorization", "Token " + token);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    let response = await fetch(followAPI + userId + followAPI2, requestOptions);
    if (response && response.status !== 200) {
      throw new Error("Something wrongs with status code: " + response.status);
    }
    let data = await response.json();
    return data;
  } catch (e) {
    console.log(">>> check catch error: ", e.message);
    return null;
  }
}
const unFollowUser = async (userId) => {
  var myHeaders = new Headers();
  var token = localStorage.getItem("token");
  myHeaders.append("Authorization", "Token " + token);

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    let response = await fetch(followAPI + userId + followAPI2, requestOptions);
    if (response && response.status !== 200) {
      throw new Error("Something wrongs with status code: " + response.status);
    }
    let data = await response.json();
    return data;
  } catch (e) {
    console.log(">>> check catch error: ", e.message);
    return null;
  }

}
