//-----------------------------API-------------------------
var createAnswerAPI1 = "http://localhost:8080/api/question/";
var createAnswerAPI2 = "/answer";
//------------------------------------------------------

var QuestionBlock = document.querySelector("#listAnswer");

var indexAnswer = 0;
const handleAddAnswer = () => {
  var htmls = `
        <div class="answerItem">
            <input type="text"  class="inputAnswer" id ="inputAnswer${indexAnswer}" />
            <input class="chooseAnswer" type="radio" name="correctAnswer" id="chooseAnswer${indexAnswer}" value="${indexAnswer}"/>
        </div>
        `;
  var answer = document.createElement("div");
  answer.innerHTML = htmls;
  QuestionBlock.appendChild(answer);
  indexAnswer++;

};

const createAnswer = async (answer, questionId) => {
  var myHeaders = new Headers();
  var token = localStorage.getItem("token");
  myHeaders.append("Authorization", "Token " + token);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: answer,
    redirect: "follow",
  };
  try {
    let response = await fetch(
      createAnswerAPI1 + questionId + createAnswerAPI2,
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

const listAnswer = async (questionId) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    let response = await fetch(
      createAnswerAPI1 + questionId + createAnswerAPI2,
      requestOptions
    );
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

const renderAnswer = (listAnswer) => {

  var lAnswer = listAnswer.answers;
  var questionId = listAnswer.questionId;
  
  var listAnswerBlock = document.querySelector("#list-answer" + questionId);

  var htmls = lAnswer.map(function (answer) {
    var contentAnswer = answer.content
    
    return `
          <div class="answer">
            <div class="contentAnswer">${contentAnswer}</div>
            <input class="chooseAnswerInHome" type="radio" value="${answer.answerId}" name="answerInQuestion${questionId}"/>
          </div>
            `;
  });
  listAnswerBlock.innerHTML = htmls
};
