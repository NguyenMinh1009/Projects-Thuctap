// function toggleAppearCmtChild() {
//   appearCmtChild.classList.toggle("hide");
// }

var paramParent = "?parent=";

const handleAppearListCommentChild = (postId, parentCmtId) => {
  var listCmtChild = document.getElementById(
    "list-comment-child" + parentCmtId
  );
  var countCmtChildNow = listCmtChild.getElementsByClassName("comment").length;
  document.getElementById("list-comment-child" + parentCmtId).style.display =
    "block";

  if (countCmtChildNow === 0) {
    handleRenderCommentChild(postId, parentCmtId);

  } else {
    handleRenderCommentChild(0, parentCmtId);
  }
};

const handleRenderCommentChild = async (postId, parentCmtId) => {
  var commentsChild = await listCommentChild(postId, parentCmtId);
  await renderCommentChild(commentsChild, parentCmtId);
  await handleGetCurrentUser();

};

const listCommentChild = async (postId, parentCmtId) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    let response = await fetch(
      commentAPI1 + postId + commentAPI2 + paramParent + parentCmtId,
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

const renderCommentChild =  (listCommentChild, parentCmtId) => {
  var comments = listCommentChild.comments;

  postId = listCommentChild.postId;

  var listCommentBlock = document.querySelector(
    "#list-comment-child" + parentCmtId
  );

  var htmls =  comments.map(function (comment) {
    var time = handleTimeToNow(comment.date);
    var commentId = comment.commentId;
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
  listCommentBlock.innerHTML = htmls;
  console.log("sdfa")
};

const handleAppearInputReply = (postId, commentId) => {
  var inputRepBlock = document.querySelector(
    "#inputRepCmt-CreateRepCmt" + commentId
  );

  var checkAppearInputReply = document.getElementById(
    "inputRepCmt-CreateRepCmt" + commentId
  );
  var countCheck =
    checkAppearInputReply.getElementsByClassName("inputComment").length;
  if (countCheck === 0) {
    var htmls = `
    <input class="inputComment" id="inputCmtRep${commentId}" />
    <button class="buttonCreateCmt" onclick="handleCreateCmtRep(${postId}, ${commentId})">Create Comment</button>
    `;
    inputRepBlock.innerHTML = htmls;
  } else {
    inputRepBlock.innerHTML = ``;
  }
};

const handleCreateCmtRep = async (postId, commentId) => {
  var inputCmtRep = document.getElementById("inputCmtRep" + commentId).value;

  if (inputCmtRep !== "") {
    var data = JSON.stringify({
      comment: {
        content: inputCmtRep,
        parent_comment_id: commentId,
      },
    });
    var comment = await createCmtRep(data, postId);
    if (comment === null) {
      document.getElementById("inputCmtRep" + commentId).value = "";
      console.log("loi createCmtRep");
    } else {
      var comments = await listCommentChild(postId, commentId);
      if (comments === null) {
        console.log("loi listCommentChild");
      } else {
        document.getElementById("inputCmtRep" + commentId).value = "";
        renderCommentChild(comments, commentId);
      }
    }
  } else {
    alert("Invalid comment rep");
  }
};

const createCmtRep = async (data, postId) => {
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
