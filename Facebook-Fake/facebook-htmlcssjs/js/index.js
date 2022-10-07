// import dayjs from "dayjs";
var userCurrentAPI = "http://localhost:8080/api/user";

var postAPI = "http://localhost:8080/api/posts";
//----------------------------------------------------

var commentAPI1 = "http://localhost:8080/api/posts/";
var commentAPI2 = "/comments";
var paramOffset = "?offset=";
var paramLimit = "&limit=";
var paramAuthorId = "&authorId=";
//----------------------------------------------------
//api create comment
var createCmtAPI1 = "http://localhost:8080/api/posts/";
var createCmtAPI2 = "/comment";

//---------------------------------------------
function checkLogin() {
  var token = localStorage.getItem("token");
}

//-----------------------------------------------------

const listPost = async (pageNumber) => {
  var myHeaders = new Headers();
  var token = localStorage.getItem("token");
  myHeaders.append("Authorization", "Token " + token);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  if (pageNumber == null) pageNumber = 1;

  let offset = (pageNumber - 1) * 5;

  try {
    let response = await fetch(
      postAPI + paramOffset + offset + paramLimit + 5,
      requestOptions
    );
    if (response && response.status !== 200) {
      throw new Error("Something wrongs with status code: " + response.status);
    }
    let listPost = await response.json();
    return listPost;
  } catch (e) {
    console.log(">>> check catch error: ", e.message);
    return null;
  }
};

//---------------------------------------------------------
var listPostsBlock = document.querySelector("#list-posts");

const renderPost = (listPost) => {
  var posts = listPost.posts;

  var countPosts = listPost.postsCount;
  var totalPage = Math.ceil(countPosts / 5);
  var pageNumber = listPost.pageNumber;

  var htmls =
    posts.map(function (post) {
      var following = "";
      if (!post.author.following) {
        following = "Follow";
      }
      var time = handleTimeToNow(post.date);

      return `
      <div class="post" id="${post.id}">
        <div class="post_header">
          <div class="post_header-iconUser"><i class="fa-solid fa-user"></i></div>
          <h3 class="authorUsername" onclick="handleGetPersonalPage(${post.author.id})">${post.author.username}</h3>
          <span><a class="post_header-following" onclick="handleFollowUser(${post.author.id}, ${pageNumber})">${following}</a></span>
          <p class="post_header-date">${time}</p>
        </div>
        <hr/>
        <div class="post_body">
          <h4>${post.title}</h4>
          <p>${post.body}</p>
        </div>
        <hr/>
        <div class="post_footer">
          <div class="loginToAppear">
            <input class="inputComment" id="inputComment${post.id}" />
            <button class="buttonCreateCmt" onclick="handleCreateComment(${post.id})">Create Comment</button>
          </div>
           <br/>
          <div class="appearListComment">
            <div class="activeCmt" id="list-comment${post.id}"></div>
          </div>
        </div>
      </div>
      
            `;
    }) +
    `<div class="paginationPost" id="paginationPost">
      
    </div>`;
  var z = document.createElement("div");
  z.innerHTML = htmls;
  listPostsBlock.appendChild(z);
};
var scroll = 1;
var buttonOnTop = document.querySelector(".onToTop");

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop > 400) {
    document.getElementById("onToTop").style.display = "block";
    handleGetCurrentUser();
  } else {
    document.getElementById("onToTop").style.display = "none";
    handleGetCurrentUser();
  }

  if (clientHeight + scrollTop >= scrollHeight - 5) {
    scroll++;
    handleRenderListPostLogin(scroll);
  }
});

const handleOnToTop = () => {
  // window.scrollTo(0,0)

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

const handleRenderListPostLogin = async (pageNumber) => {
  var data = await listPost(pageNumber);
  if (data === null) {
    console.log("Loi listpost");
  } else {
    await renderPost(data);
    var arrayPosts = data.posts;
    for (let i = 0; i < arrayPosts.length; i++) {
      var postId = arrayPosts[i].id;
      await handleAppearListComment(postId);
    }
  }
};

function handleGetCurrentUser() {
  getCurrentUser().then((data) => {
    renderCurrentUser(data);
  });
}

const getCurrentUser = async () => {
  var myHeaders = new Headers();
  var token = localStorage.getItem("token");
  myHeaders.append("Authorization", "Token " + token);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    let response = await fetch(userCurrentAPI, requestOptions);
    if (response && response.status !== 200) {
      throw new Error("Something wrongs with status code: " + response.status);
    }
    let data = await response.json();
    return data;
  } catch (e) {
    console.log(">>> check catch error: ", e.message);
    return null;
  }
};

const renderCurrentUser = (currentUser) => {
  var username = "";
  if (currentUser === null) {
    username = "Ban chua dang nhap";
    document.getElementById("handleLogOut").style.display = "none";
    document.getElementById("handleLogIn").style.display = "block";
    var array = document.getElementsByClassName("loginToAppear");
    for (let i = 0; i < array.length; i++) {
      array[i].style.display = "none";
    }
    document.getElementById("open-modal-btn").style.display = "none";
  } else {
    username = currentUser.user.username;
    document.getElementById("handleLogOut").style.display = "block";
    document.getElementById("handleLogIn").style.display = "none";
    var array = document.getElementsByClassName("loginToAppear");
    for (let i = 0; i < array.length; i++) {
      array[i].style.display = "block";
    }
    document.getElementById("open-modal-btn").style.display = "block";
  }

  document.getElementById("usernameLogginInfo").value = username;
};

async function handleGetPersonalProfile() {
  getCurrentUser().then((data) => {
    if (data === null) {
      alert("You can login to continue");
    } else {
      id = data.user.id;
      handleGetPersonalPage(id);
    }
  });
}
async function start() {
  await handleRenderListPostLogin(1);
  await handleGetCurrentUser();
}
start();

//----------Create Post--------------------
const createPost = async (data) => {
  var myHeaders = new Headers();
  var token = localStorage.getItem("token");
  myHeaders.append("Authorization", "Token " + token);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };
  try {
    let response = await fetch(postAPI, requestOptions);
    if (response && response.status !== 200) {
      throw new Error("Something wrongs with status code: " + response.status);
    }
    let data = await response.json();
    return data;
  } catch (e) {
    console.log(">>> check catch error: ", e.message);
    return null;
  }
};

//-------------render modal create new post-------------------
var btnOpen = document.querySelector(".open-modal-btn");
var modal = document.querySelector(".modal");
var btnClosePost = document.querySelector(".CloseBtnPost");
var btnClosePost = document.querySelector(".CreateBtnPost");
var iconClosePost = document.querySelector(".iconClosePost");

function toggleModal() {
  modal.classList.toggle("hide");
}

btnOpen.addEventListener("click", toggleModal);
btnClosePost.addEventListener("click", toggleModal);
iconClosePost.addEventListener("click", toggleModal);
modal.addEventListener("click", function (e) {
  if (e.target == e.currentTarget) {
    toggleModal();
  }
});

//------------------------------------------------------
const handleCreatePostForm = async () => {
  var inputTitlePost = document.getElementById("inputTitle").value;
  var inputBodyPost = document.getElementById("inputBody").value;

  if (inputTitlePost != "" && inputBodyPost != "") {
    var formData = JSON.stringify({
      posts: {
        title: inputTitlePost,
        body: inputBodyPost,
      },
    });
    var data = await createPost(formData);
    if (data === null) {
      document.getElementById("inputTitle").value = "";
      document.getElementById("inputBody").value = "";
      alert("You need login to continue");
    } else {
      var posts = await listPost(1);
      if (listPost === null) {
        console.log("loi listPost");
      } else {
        document.getElementById("inputTitle").value = "";
        document.getElementById("inputBody").value = "";

        await renderPost(posts);

      }

    }
  } else {
    alert("Invalid create new post!!!");
  }
};
