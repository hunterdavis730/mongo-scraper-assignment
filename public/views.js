$(document).ready(() => {
  let id;
  $(document).on("click", ".comments", function() {
    id = $(this).data("id");
    console.log(id);
    $.ajax({
      method: "GET",
      url: "/article/notes/" + id
    }).then(resp => {
      console.log(resp);
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
    console.log(comment);
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
        console.log(resp);
      });
    });
  });
});
