$(function(){
  $('#user-search-field').on("keyup", function(){
    let input = $('#user-search-field').val();
    console.log(input);
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input }
    })
    .done(function(users) {
      console.log("success");
    })
    .fail(function() {
      console.log("failed");
    })
  });
});