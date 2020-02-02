$(function(){
  let buildHTML = function(message){
    if ( message.image ) {
      let html =
       `<div class="chat-main__messages__message" data-message-id=${message.id}>
          <div class="chat-main__messages__message__info">
            <div class="chat-main__messages__message__info__talker">
              ${message.user_name}
            </div>
            <div class="chat-main__messages__message__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__messages__message__content">
            <p class="chat-main__messages__message__content__text">
              ${message.content}
            </p>
            <img class="chat-main__messages__message__content__image" src=${message.image} >
          </div>
        </div>`
      return html;
    } else {
      let html =
       `<div class="chat-main__messages__message" data-message-id=${message.id}>
          <div class="chat-main__messages__message__info">
            <div class="chat-main__messages__message__info__talker">
              ${message.user_name}
            </div>
            <div class="chat-main__messages__message__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__messages__message__content">
            <p class="chat-main__messages__message__content__text">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      let html = buildHTML(message);
      $('.chat-main__messages').append(html);
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージを入力してください");
      $('.form__submit').prop('disabled', false);
    });
  })

  let reloadMessages = function() {
    last_message_id = $('.chat-main__messages__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__messages').append(insertHTML);
        $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert("通信エラーです");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});