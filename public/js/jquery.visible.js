
	(function(b){var a=b(window);b.fn.visible=function(c,x,C){if(this.length<1){return}var y=this.length>1?this.eq(0):this,p=y.get(0),q=a.width(),g=a.height(),C=(C)?C:"both",h=x===true?p.offsetWidth*p.offsetHeight:true;if(typeof p.getBoundingClientRect==="function"){var l=p.getBoundingClientRect(),E=l.top>=0&&l.top<g,j=l.bottom>0&&l.bottom<=g,z=l.left>=0&&l.left<q,u=l.right>0&&l.right<=q,d=c?E||j:E&&j,s=c?z||u:z&&u;if(C==="both"){return h&&d&&s}else{if(C==="vertical"){return h&&d}else{if(C==="horizontal"){return h&&s}}}}else{var r=a.scrollTop(),m=r+g,B=a.scrollLeft(),D=B+q,i=y.offset(),v=i.top,w=v+y.height(),A=i.left,o=A+y.width(),e=c===true?w:v,f=c===true?v:w,n=c===true?o:A,k=c===true?A:o;if(C==="both"){return !!h&&((f<=m)&&(e>=r))&&((k<=D)&&(n>=B))}else{if(C==="vertical"){return !!h&&((f<=m)&&(e>=r))}else{if(C==="horizontal"){return !!h&&((k<=D)&&(n>=B))}}}}}})($);