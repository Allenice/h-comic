$(function() {

  $.get('/api/list/', function (jsonData) {
    var html = '';
    if(jsonData.status === 'success') {
      jsonData.data.forEach(function (item) {
        html += '<li><a href="conent.html?comic='+ item +'">'+ item +'</a></li>'
      });
      $('#comic-list').html(html);
    }
  });

});