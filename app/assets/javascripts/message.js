$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="chat-main__messages__message" data-message-id=${message.id}>
          <div class="chat-main__messages__message__info">
            <div class="chat-main__messages__message__info__talker">
              ${message.user_name}
            </div>
            <div class="chat-main__messages__message__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__messages__message__text">
            <p>
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="chat-main__messages__message" data-message-id=${message.id}>
          <div class="chat-main__messages__message__info">
            <div class="chat-main__messages__message__info__talker">
              ${message.user_name}
            </div>
            <div class="chat-main__messages__message__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__messages__message__text">
            <p>
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      var html = buildHTML(message);
      // console.log(message);
    })
  })
});