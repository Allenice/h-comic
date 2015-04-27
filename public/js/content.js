$(function () {
  function getUrlParam(paramName, url) {
    var search = url ? (url.split('?')[1] || '') : window.location.search;
    return decodeURI(
      (new RegExp(paramName + '=(.+?)(&|$)').exec(search) || [, ''])[1]
    );
  }

  function onImgLoad() {
    console.log('onLoad');
  }

  function loadImage() {
    $('img[data-src]').each(function() {
      if($(this).visible(true)) {
        $(this).on('load', onImgLoad);
        $(this).attr('src', $(this).data('src')).removeAttr('data-src');
      }
    });
  }
  
  var comic = getUrlParam('comic');
  
  $.get('/api/comic/' + comic, function (jsonData) {
    var html = '';
    jsonData.data.forEach(function (item) {
      html += '<li><img data-src="'+ item +'" alt="'+ item +'" src="//:0" /></li>';
    });

    $('#img-list').html(html);
  });


  var timeId;
  $(window).on('scroll', function() {
    clearTimeout(timeId);
    timeId = setTimeout(function() {
      loadImage();
    }, 300);
  }).trigger('scroll');

});