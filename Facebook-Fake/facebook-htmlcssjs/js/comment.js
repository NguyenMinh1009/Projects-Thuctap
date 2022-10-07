const listComment = async (postId, pageNumber) => {
  if (pageNumber == null) {
    pageNumber = 1;
  }
  let offset = (pageNumber - 1) * 3;

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    let response = await fetch(
      commentAPI1 +
        postId +
        commentAPI2 +
        paramOffset +
        offset +
        paramLimit +
        3,
      requestOptions
    );
    if (response && response.status !== 200) {
      throw new Error("Something wrongs with status code: " + response.status);
    }
    let listComment = await response.json();
    return listComment;
  } catch (e) {
    console.log(">>> check catch error: ", e.message);
    return null;
  }
};

async function handleAppearListComment(postId) {
  var listComments = await listComment(postId, 1);
  await renderComment(listComments, false);
}

const renderComment = (listComment, checkCreate) => {
  var comments = listComment.comments;

  postId = listComment.postId;

  var listCommentBlock = document.querySelector("#list-comment" + postId);

  var htmls = comments.map(function (comment) {
    var time = handleTimeToNow(comment.date);
    var commentId = comment.commentId;

    var countReplies = "";
    var countCmtChild = comment.countCommentChild;
    if (countCmtChild !== 0) {
      return `
          <div class="comment">
            <div class="comment_header">
                <h4 class="authorUsernameCmt" onclick="handleGetPersonalPage(${comment.authorCmt.id})">${comment.authorCmt.username}</h4>
                <p>${time}</p>
            </div>
            <div class="comment_body">
            <p>${comment.content}</p>
            </div>
          </div>
          <div class="comment_footer">
            <button class="reply-button loginToAppear" onclick="handleAppearInputReply(${postId},${commentId})">Reply</button>
            <div>
              <button class="countCommentChild" onclick="handleAppearListCommentChild(${postId},${commentId})"><i class="fa-solid fa-arrows-turn-right"></i> ${countCmtChild} Replies</button>
              <div class="list-comment-child" id = "list-comment-child${commentId}"></div>
              <div class="inputRepCmt-CreateRepCmt" id="inputRepCmt-CreateRepCmt${commentId}"></div>
            </div>
          </div>
                `;
    } else {
      return `
      <div class="comment">
        <div class="comment_header">
            <h4 class="authorUsernameCmt" onclick="handleGetPersonalPage(${comment.authorCmt.id})">${comment.authorCmt.username}</h4>
            <p>${time}</p>
        </div>
        <div class="comment_body">
        <p>${comment.content}</p>
        </div>
      </div>
      <div class="comment_footer">
        <button class="reply-button loginToAppear" onclick="handleAppearInputReply(${postId},${commentId})">Reply</button>
        <div>
          <div class="list-comment-child" id = "list-comment-child${commentId}"></div>
          <div class="inputRepCmt-CreateRepCmt" id="inputRepCmt-CreateRepCmt${commentId}"></div>
        </div>
      </div>
            `;
    }
  });
  //----------------------------------------------------------------------------
  // for (let i = 0; i < comments.length; i++) {
  //   var countCmtChild = comments[i].countCommentChild;
  //   var commentId = comments[i].commentId;
  //   if (countCmtChild === 0) {
  //     document.getElementById("list-comment-child" + commentId).style.display =
  //       "none";
  //   }
  // }
  //----------------------------------------------------------------------------
  var totalComments = listComment.commentsCount;

  if (checkCreate === false) {
    var c = document.createElement("div");
    c.innerHTML = htmls;
    listCommentBlock.appendChild(c);
    if (totalComments > 3) {
      var countNow = countCommentNow(postId);
      if (countNow <= totalComments) {
        var soMore = document.createElement("div");
        soMore.innerHTML = `
          <div class="soMore" id="soMore">
              <button class="soMore-button" onclick="handleChangePageComment(${postId})"> so more...</button>
          </div>
          `;
        listCommentBlock.appendChild(soMore);
        //   -----------------------------------------------------------------
        var comment = document.getElementById("list-comment" + postId);
        var countDeleteSoMore = comment.getElementsByClassName("soMore").length;

        if (countNow > 3) {
          var array = comment.getElementsByClassName("soMore");
          for (let i = 0; i < array.length; i++) {
            console.log(array[i]);
          }
          comment.getElementsByClassName("soMore")[
            countDeleteSoMore - 2
          ].style.display = "none";
        }
        if (countNow === totalComments) {
          comment.getElementsByClassName("soMore")[
            countDeleteSoMore - 1
          ].style.display = "none";

          var soMore = document.createElement("div");
          soMore.innerHTML = `
              <div class="compact" id="compact">
                  <button class="compact-button" onclick="">compact</button>
              </div>
              `;
          listCommentBlock.appendChild(soMore);
          console.log("ads");
        }
      }
    }
  } else {
    listCommentBlock.innerHTML = htmls;

    if (totalComments > 3) {
      var countNow = countCommentNow(postId);
      if (countNow <= totalComments) {
        var soMore = document.createElement("div");
        soMore.innerHTML = `
            <div class="soMore" id="soMore">
                <button class="soMore-button" onclick="handleChangePageComment(${postId})">so more</button>
            </div>
            `;
        listCommentBlock.appendChild(soMore);
        //   -----------------------------------------------------------------
        var comment = document.getElementById("list-comment" + postId);
        var countDeleteSoMore = comment.getElementsByClassName("soMore").length;

        // console.log("countNow " + countNow);
        if (countNow > 3) {
          comment.getElementsByClassName("soMore")[
            countDeleteSoMore - 2
          ].style.display = "none";
        }
        if (countNow === totalComments) {
          comment.getElementsByClassName("soMore")[
            countDeleteSoMore - 1
          ].style.display = "none";

          var soMore = comment.createElement("div");
          soMore.innerHTML = `
                <div class="compact" id="compact">
                    <button class="compact-button" onclick="">compact</button>
                </div>
                `;
          listCommentBlock.appendChild(soMore);
        }
      }
    }
  }
};
// -------------------------------------------------------

//----------------------------------------
function handleChangePageComment(postId) {
  var count = countCommentNow(postId);

  var pageNumber = Math.ceil(count / 3) + 1;

  listComment(postId, pageNumber).then((listComment) => {
    if (listComment === null) {
      console.log("loi listComment");
    } else {
      renderComment(listComment, false);
    }
  });
}

const countCommentNow = (postId) => {
  var listComment = document.getElementById(`list-comment${postId}`);
  countComment = listComment.getElementsByClassName("comment").length;
  return countComment;
};
//-------Create comment------------
const createCmt = async (data, postId) => {
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
    let response = await fetch(
      createCmtAPI1 + postId + createCmtAPI2,
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

const handleCreateComment = async (postId) => {
  var inputComment = document.getElementById("inputComment" + postId).value;
  if (inputComment != "") {
    var data = JSON.stringify({
      comment: {
        content: inputComment,
      },
    });
    var comment = await createCmt(data, postId);
    if (comment === null) {
      document.getElementById("inputComment" + postId).value = "";
      alert("You need login to continue");
    } else {
      var comments = await listComment(postId, 1);
      if (comments === null) {
        console.log("loi listComment");
      } else {
        document.getElementById("inputComment" + postId).value = "";
        renderComment(comments, true);
      }
    }
  } else {
    alert("Invalid comment!!!");
  }
};
