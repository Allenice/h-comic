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

  function showPage(page) {
    var list = data.slice((page-1) * 10, page * 10),
        html = '';
    list.forEach(function (item) {
      html += '<li><img data-src="'+ item +'" src="//:0" /></li>';
    });
    $('#img-list').html(html);
    $('#progress').html(curPage + '/' + pageCount);
    $(window).scrollTop(0).trigger('scroll');
    window.localStorage.setItem(comic, page);
  }

  var comic = getUrlParam('comic'),
      curPage = parseInt(window.localStorage.getItem(comic)) - 1 || 0,
      pageCount = 0,
      data;
  
  $.get('/api/comic/' + comic, function (jsonData) {
    data = jsonData.data;
    pageCount = Math.ceil(data.length / 10);
    curPage++;
    showPage(curPage);
  });

  var timeId;
  $(window).on('scroll', function() {
    clearTimeout(timeId);
    timeId = setTimeout(function() {
      loadImage();
    }, 300);
  }).trigger('scroll');

  $('#prev').click(function() {
    if(curPage <= 1) return;
    curPage--;
    showPage(curPage);
  });

  $('#next').click(function() {
    if(curPage >= 10) return;
    curPage++;
    showPage(curPage);
  });

});