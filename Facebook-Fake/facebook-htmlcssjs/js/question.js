//-----------------------------API-------------------------
var createQuestionAPI = "http://localhost:8080/api/question/";
var questionAPI = "http://localhost:8080/api/question/";
//-------------render modal create new question ------------------
var btnOpenQuestion = document.querySelector(".open-modalQuestion-btn");
var modalQuestion = document.querySelector(".modalQuestion");
var btnCloseQuestion = document.querySelector(".CloseBtnQuestion");
// var btnCloseQuestion2 = document.querySelector(".CreateBtnQuestion");
var iconCloseQuestion = document.querySelector(".iconCloseQuestion");

function toggleModalQuestion() {
  modalQuestion.classList.toggle("hide");
}

btnOpenQuestion.addEventListener("click", toggleModalQuestion);
btnCloseQuestion.addEventListener("click", toggleModalQuestion);
iconCloseQuestion.addEventListener("click", toggleModalQuestion);
modal.addEventListener("click", function (e) {
  if (e.target == e.currentTarget) {
    toggleModalQuestion();
  }
});

const createQuestion = async (data, qCategory) => {
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
    let response = await fetch(questionAPI + qCategory, requestOptions);
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

const listQuestion = async () => {
  var myHeaders = new Headers();
  var token = localStorage.getItem("token");
  myHeaders.append("Authorization", "Token " + token);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    let response = await fetch(questionAPI, requestOptions);
    if (response && response.status !== 200) {
      throw new Error("Something wrongs with status code: " + response.status);
    }
    let questions = await response.json();
    return questions;
  } catch (e) {
    console.log(">>> check catch error: ", e.message);
    return null;
  }
};

const renderQuestion = (listQuestion) => {
  var questions = listQuestion.questions;

  var listQuestionBlock = document.querySelector("#list-questions");
  var htmls = questions.map(function (question) {
    var following = "";
    if (!question.author.following) {
      following = "Follow";
    }
    var time = handleTimeToNow(question.date);
    return `
    <div class="post" id="${question.id}">
      <div class="post_header">
        <div class="post_header-iconUser"><i class="fa-solid fa-user"></i></div>
        <h3 class="authorUsername" onclick="">${question.author.username}</h3>
        <span><a class="post_header-following" onclick="">${following}</a></span>
        <p class="post_header-date">${time}</p>
      </div>
      <hr/>
      <div class="post_body">
        <h4>${question.content}</h4>
      </div>
      <hr/>
      <div class="appearListAnswer">
        <div class="appearListAnswer-title">
          <div class="listAnswerTitle">Answer</div>
          <div class="listChooseTitle">Correct answer</div>
        </div>
        <div class="activeAnswer" id="list-answer${question.id}"></div>
        <button class="buttonSaveAnswer loginToAppear" onclick="handleReplyQuestion(${question.id})">Reply</button>
      </div>
    </div>

`;
  });

  listQuestionBlock.innerHTML = htmls;
};

const handleReplyQuestion = async (questionId) => {
  var dataAnswer = await listAnswer(questionId);
  var answers = dataAnswer.answers;
  var flagChoose = false;
  try {
    var answerUser = document.querySelector(
      `input[name="answerInQuestion${questionId}"]:checked`
    ).value;
    flagChoose = true;
  } catch (error) {
    alert("you need choose answer to continue");
  }
  if (flagChoose === true) {
    var correctAnswer = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].isCheck === true) {
        correctAnswer = answers[i].answerId;
      }
    }
    console.log(answerUser);
    console.log(correctAnswer);
    if (answerUser == correctAnswer) {
      alert("you answered correctly");
    } else {
      alert("You answered wrong");
    }
  }
};

const handleCreateQuestion = async () => {
  var inputQuestion = document.getElementById("inputQuestion").value;

  if (inputQuestion === "") {
    alert("You need enter question to continue");
  } else {
    try {
      var inputQCategory = document.querySelector(
        'input[name="qCategory"]:checked'
      ).value;

      var listAnswer = document.getElementsByClassName("inputAnswer");
      var sizeListAnswer = listAnswer.length;
      if (sizeListAnswer < 2) {
        alert("1 question needs at least 2 answers");
      } else {
        try {
          var inputCorrectAnswer = document.querySelector(
            'input[name="correctAnswer"]:checked'
          ).value;
          //check null input answer
          var flagNullInputAnswer = false;
          for (let i = 0; i < sizeListAnswer; i++) {
            if (listAnswer[i].value === "") {
              flagNullInputAnswer = true;
              break;
            }
          }
          if (flagNullInputAnswer === true) {
            alert("Invalid answer");
          } else {
            //check ok tat ca ==>  call API
            var dataQuestion = JSON.stringify({
              question: {
                content: inputQuestion,
              },
            });
            //call create question
            var dataResponseQuestion = await createQuestion(
              dataQuestion,
              inputQCategory
            );
            if (dataResponseQuestion === null) {
              //api create question error
              console.log("Loi create question");
            } else {
              //api create question successful
              var idNewQuestion = dataResponseQuestion.question.id;
              for (let i = 0; i < sizeListAnswer; i++) {
                var flagCorrectAnswer = false;
                if (i == inputCorrectAnswer) flagCorrectAnswer = true;
                var dataAnswer = JSON.stringify({
                  answer: {
                    content: listAnswer[i].value,
                    isCheck: flagCorrectAnswer,
                  },
                });
                //call api create answer
                var dataResponseAnswer = await createAnswer(
                  dataAnswer,
                  idNewQuestion
                );
                if (dataResponseAnswer === null) {
                  console.log("Loi create answer");
                }
              }
              document.getElementById("inputQuestion").value = "";
              toggleModalQuestion();
              handleAppearListQuestion();
            }
          }
        } catch (error) {
          alert("You need choose 1 correct answer");
        }
      }
    } catch (error) {
      alert("You need choose question category to continue");
    }
  }
};

const handleAppearListQuestion = async () => {
  listPostsBlock.innerHTML = "";
  var dataQuestion = await listQuestion();
  if (dataQuestion === null) {
    console.log("loi listQuestion");
  } else {
    await renderQuestion(dataQuestion);
    var questions = dataQuestion.questions;
    for (let i = 0; i < questions.length; i++) {
      var questionId = questions[i].id;
      var dataAnswer = await listAnswer(questionId);
      if (dataAnswer === null) {
        console.log("loi listAnswer");
      } else {
        await renderAnswer(dataAnswer);
  handleGetCurrentUser();

      }
    }
  }
};
