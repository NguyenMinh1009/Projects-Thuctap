var btnOpenLogOut = document.querySelector(".handleLogOut");
var modalLogOut = document.querySelector(".modalLogOut");
var btnCloseLogOut = document.querySelector(".btnCloseLogOut");
var btnCloseLogOut2 = document.querySelector(".LogOutBtn");
var iconCloseLogOut = document.querySelector(".iconCloseLogOut");

function toggleModalLogOut() {
  modalLogOut.classList.toggle("hide");
}

btnOpenLogOut.addEventListener("click", toggleModalLogOut);
btnCloseLogOut.addEventListener("click", toggleModalLogOut);
btnCloseLogOut2.addEventListener("click", toggleModalLogOut);
iconCloseLogOut.addEventListener("click", toggleModalLogOut);
modalLogOut.addEventListener("click", function (e) {
  if (e.target === e.currentTarget) {
    toggleModalLogOut();
  }
});

const handleLogOut = async () => {
  localStorage.setItem("token", "qwer");
  await handleGetCurrentUser();
  listPostsBlock.innerHTML=''

   var posts= await listPost(1)
    if (posts === null) {
      console.log("Loi listPost");
    } else {
      await renderPost(posts);
    }
  // handleRenderListPostLogin();
};
