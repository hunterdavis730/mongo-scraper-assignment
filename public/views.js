$(document).ready(() => {
  const renderComments = data => {
    $("#comment-sect").empty();
    for (let i = 0; i < data.length; i++) {
      let divCard = $("<div>").addClass("card special my-1");
      let card = $("<div>").addClass("card-body py-0 specials");
      let username = $("<p>")
        .addClass("card-text py-1")
        .text(`- ${data[i].username}`);
      let div = $("<div>").addClass("d-flex justify-content-between");
      let deleteButton = $("<button type='button'>")
        .addClass("btn btn-outline-dark deleteButton mb-2")
        .attr("data-id", data[i]._id)
        .text("Delete Comment");
      let comment = $("<p>")
        .addClass("card-text py-1")
        .text(data[i].note);
      div.append(username).append(deleteButton);
      card.append(comment).append(div);
      divCard.append(card);
      $("#comment-sect").append(divCard);
    }
  };

  let id;
  $(document).on("click", ".comments", function() {
    id = $(this).data("id");
    console.log(id);
    $.ajax({
      method: "GET",
      url: "/article/notes/" + id
    }).then(resp => {
      console.log("something");
      console.log(resp);
      renderComments(resp);
    });
  });

  $(document).on("click", "#submit-comment", function() {
    const comment = {};
    console.log(id);
    comment.note = $("#note-text")
      .val()
      .trim();
    comment.username = $("#username")
      .val()
      .trim();

    $.ajax({
      method: "POST",
      url: "/article/note/" + id,
      data: comment
    }).then(resp => {
      console.log(resp);
      $.ajax({
        method: "GET",
        url: "/article/notes/" + id
      }).then(resp => {
        console.log("something");
        console.log(resp);
        renderComments(resp);
      });
    });
    $("#note-text").val("");
    $("#username").val("");
  });

  $(document).on("click", ".deleteButton", function() {
    let data = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/comment/delete/" + data
    }).then(resp => {
      console.log(resp);
      console.log(id);
      $.ajax({
        method: "GET",
        url: "/article/notes/" + id
      }).then(resp => {
        console.log("something");
        console.log(resp);
        renderComments(resp);
      });
    });
  });
});
