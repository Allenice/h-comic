$(function () {
  function getUrlParam(paramName, url) {
    var search = url ? (url.split('?')[1] || '') : window.location.search;
    return decodeURI(
      (new RegExp(paramName + '=(.+?)(&|$)').exec(search) || [, ''])[1]
    );
  }
  
  var comic = getUrlParam('comic');
  
  $.get('/api/comic/' + comic, function (jsonData) {
    var html = '';
    jsonData.data.forEach(function (item) {
      html += '<li><img src="'+ item +'" alt="'+ item +'"/></li>';
    });

    $('#img-list').html(html);
  });
});