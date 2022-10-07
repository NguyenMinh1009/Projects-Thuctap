// function change(){
//     var c = document.getElementById("container")
//     c.innerHTML="<h1>aaa</h1>"
// }
var profileAPI = "http://localhost:8080/api/profiles/";
var postPersonalAPI = "http://localhost:8080/api/postsPersonal";

function handleGetPersonalPage(authorId) {
  listPostByAuthor(authorId, 1).then((data) => {
    if (data === null) {
      console.log(data);
      alert("You need login to continue");
    } else {
      console.log(data);
      listPostByAuthor(authorId, 1).then((data) => {
        if (data === null) {
          console.log("loi listPostByAuthor");
        } else {
          renderPostByAuthor(data);
        }
      });
    }
  });
}

const listPostByAuthor = async (authorId, pageNumber) => {
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
      postPersonalAPI +
        paramOffset +
        offset +
        paramLimit +
        5 +
        paramAuthorId +
        authorId,
      requestOptions
    );
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
const renderPostByAuthor = (listPost) => {
  var listPostsBlock = document.querySelector("#container");
  var posts = listPost.posts;
  console.log(posts)
  var username = posts[0].author.username;
  console.log(username)
  var followedNumber = listPost.followedNumber;
  var followingNumber = listPost.followingNumber;

  var authorId = posts[0].author.id;

  var countPosts = listPost.postsCount;
  var totalPage = Math.ceil(countPosts / 5);

  var pageNumber = listPost.pageNumber;

  var isFollowing = posts[0].author.following;
  var followStatus = "Follow";
  if (isFollowing) {
    followStatus = "UnFollow";
  }
  var htmls =
    `
        <div class="personalPage-header">
            <div class="cover-image"></div>
            <div class="avatar"><i class="fa-solid fa-user"></i></div>
            <div class="personalInfo">
              <div class="username">${username}</div>
              <div class="followInfo">
                <span class="followInfo-followedItem">Follower: ${followedNumber}
                <span class="followInfo-followingItem">Following: ${followingNumber}
              </div>
            </div> 
            <div class="followStatus">
              <input Type="button" onclick="handleFollowUserInPersonal(${authorId}, ${1})" id="followStatus" value="${followStatus}"></input>
            </div>

        </div>
      ` +
    posts.map(function (post) {
      var following = "";
      if (!post.author.following) {
        following = "Follow";
      }
      return `
      <div>
        <div class="post" id="${authorId}">
          <div class="post_header">
            <div class="post_header-iconUser"><i class="fa-solid fa-user"></i></div>
            <h3 class="authorUsername">${post.author.username}</h3>
            <span><a class="post_header-following" onclick="handleFollowUserInPersonal(${post.author.id}, ${pageNumber})">${following}</a></span>
            <p>${post.date}</p>
          </div>
          <hr/>
          <div class="post_body">
            <h4>${post.title}</h4>
            <p>${post.body}</p>
          </div>
          <hr/>
          <div class="post_footer">
            <input class="inputComment" id="inputComment${post.id}" />
            <button class="buttonCreateCmt" onclick="handleCreateComment(${post.id})">Create Comment</button>
             <br/>
            <button class="handleListCmt" onclick="handleAppearListComment(${post.id})">List Comments</button>
            <div class="appearListComment">
              <div class="activeCmt" id="list-comment${post.id}"></div>
              <div class="paginationComment" id="paginationComment${post.id}"></div>
            </div>
          </div>
        </div>
        
      </div>
              `;
    }) +
    `<div class="paginationPost" id="paginationPostAuthor">
        
      </div>`;
  listPostsBlock.innerHTML = htmls;
  renderPagePostByAuthorNumber(authorId, totalPage);
};

function renderPagePostByAuthorNumber(authorId, totalPage) {
  document.getElementById("paginationPostAuthor").innerHTML = ``;

  for (let i = 1; i <= totalPage; i++) {
    document.getElementById("paginationPostAuthor").innerHTML += `
        <div onclick="handleChangePagePostAuthor(${authorId}, ${i})" id="indexPageOfPostAuthor${i}" class="indexPage">${i}</div>
        `;
  }
}

const handleChangePagePostAuthor = (authorId, pageNumber) => {
  listPostByAuthor(authorId, pageNumber).then((listPost) => {
    if (listPost === null) {
      console.log("loi listPostByAuthor");
    } else {
      renderPostByAuthor(listPost);
    }
  });
};

const handleFollowUserInPersonal = (userId, pageNumber) => {
  var status = document.getElementById("followStatus").value;
  if (status == "Follow") {
    followUser(userId).then((dataFollow) => {
      if (dataFollow === null) {
        console.log("loi followUser");
      } else {
        listPostByAuthor(userId, pageNumber).then((listPostPersonal) => {
          if (listPostPersonal === null) {
            console.log("loi listPostByAuthor");
          } else {
            renderPostByAuthor(listPostPersonal);
          }
        });
      }
    });
  } else {
    unFollowUser(userId).then((dataFollow) => {
      if (dataFollow === null) {
        console.log("loi followUser");
      } else {
        listPostByAuthor(userId, pageNumber).then((listPostPersonal) => {
          if (listPostPersonal === null) {
            console.log("loi listPostByAuthor");
          } else {
            renderPostByAuthor(listPostPersonal);
          }
        });
      }
    });
  }
}
