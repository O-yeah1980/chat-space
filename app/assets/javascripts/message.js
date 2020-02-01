$(function(){
  last_message_id = $('.chat-main__messages__message:last').data("message-id");
  console.log(last_message_id);
  var buildHTML = function(message){
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
          <div class="chat-main__messages__message__content">
            <p class="chat-main__messages__message__content__text">
              ${message.content}
            </p>
            <img class="chat-main__messages__message__content__image" src=${message.image} >
          </div>
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

  var reloadMessages = function() {
    last_message_id = $('.chat-main__messages__message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.chat-main__messages__message').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    });
  };
  // setInterval(reloadMessages, 7000);
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});