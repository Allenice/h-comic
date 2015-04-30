;(function() {

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

  // 滚动效果
  function initScroll(el) {
    var timeTick = 5000 / 90,
        top = 0,
        length = getChildren(el).length;

    setInterval(function() {
      top--;
      el.style.top = top + 'px';
      if(top < -(length * 30) ) top = 90;
    }, timeTick);
  }
  
  // tab 切换
  function onTabClick(e, tabItems) {
    var target = e.target || e.srcElement;
    if(target.tagName === 'LI') {
      if(hasClass(target, 'cur')) return;

      for(var i = 0; i < this.childNodes.length; i++) {
        if(this.childNodes[i].tagName === 'LI') {
          removeClass(this.childNodes[i], 'cur');
        }
      }
      addClass(target, 'cur');

      // 显示对应 tab 的内容
      var index = getIndex(target);

      for(i = 0; i < tabItems.length; i++) {
        tabItems[i].style.display = i === index ? 'block' : 'none';
      }
    }
  }

  // tab 切换
  _attachEvent($('tab-header1'), 'click', function(e) {
    onTabClick.call(this, e, getChildren($('tab-items1')));
  });
  _attachEvent($('tab-header2'), 'click', function(e) {
    onTabClick.call(this, e, getChildren($('tab-items2')));
  });
 

  // 滚动
  initScroll($('scroll1'));
  initScroll($('scroll2'));

})();