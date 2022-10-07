function handleHome(pageNumber) {
  listPost(pageNumber).then((listPost) => {
    if (listPost === null) {
      console.log("loi listPost");
    } else {
      var listPostsBlock = document.querySelector("#container");
      var htmls = `
      <div class="list-posts" id="list-posts"></div>
  `;
      listPostsBlock.innerHTML = htmls;

      renderPost(listPost);
    }
  });
}

