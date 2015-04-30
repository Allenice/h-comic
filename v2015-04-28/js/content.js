// 内页
;(function() {
  
  var slideChildren,
      cursor = 0,
      timeId,
      pageChildren;
	
	// 获取 el 在父节点的位置
  function getIndex(node){
    var i = 0;
    while(node.previousSibling){
      node = node.previousSibling;
      if(node.nodeType === 1){
        i++;
      }
    }
    return i;
  }

  function getChildren(el) {
    var children = [];
    for(var i = 0; i < el.childNodes.length; i++) {
      if(el.childNodes[i].nodeType === 1) children.push(el.childNodes[i]);
    }
    return children;
  }

  function hasClass(ele,cls) {
    return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
  }

  function addClass(ele,cls) {
    if (!hasClass(ele,cls)) ele.className += " "+cls;
  }

  function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
      var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
      ele.className=ele.className.replace(reg,' ');
    }
  }
  
  function slideStart() {
    timeId = setInterval(function() {
      cursor++;
      if(cursor >= slideChildren.length) cursor = 0;
      slideTo(cursor);
    }, 3000);
  }
  
  function slideStop() {
    clearInterval(timeId);
  }
  
  function slideTo(index) {
    for(var i = 0; i < slideChildren.length; i++) {
      slideChildren[i].style.display = i === index ? 'block' : 'none';
      if(i === index) {
        addClass(pageChildren[i], 'cur');
      } else {
        removeClass(pageChildren[i], 'cur');
      }
    }
    
	}
  
  function initPager() {
    var html = '<span class="cur"></span>';
    for(var i = 0; i < slideChildren.length - 1; i++) {
      html += '<span></span>';
    }
    $('pager').innerHTML = html;
    
    pageChildren = getChildren($('pager'));
    
  }
  
  slideChildren = getChildren($('rem-gift-list'));
	initPager();
  
  slideStart();
  
  _attachEvent($('rem-gift-list'), 'mousehover', function(e) {
    slideStop();
  });
   _attachEvent($('rem-gift-list'), 'mouseleave', function(e) {
    slideStart();
  });
  
})();