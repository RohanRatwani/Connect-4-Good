(this.webpackJsonpfastthumbs=this.webpackJsonpfastthumbs||[]).push([[0],{156:function(t,e,n){"use strict";n.r(e),n.d(e,"createSwipeBackGesture",(function(){return i}));var r=n(19),a=n(64),i=(n(46),function(t,e,n,i,s){var u=t.ownerDocument.defaultView;return Object(a.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(t){return t.startX<=50&&e()},onStart:n,onMove:function(t){var e=t.deltaX/u.innerWidth;i(e)},onEnd:function(t){var e=t.deltaX,n=u.innerWidth,a=e/n,i=t.velocityX,c=n/2,o=i>=0&&(i>.2||t.deltaX>c),h=(o?1-a:a)*n,f=0;if(h>5){var d=h/Math.abs(i);f=Math.min(d,540)}s(o,a<=0?.01:Object(r.j)(0,a,.9999),f)}})})}}]);
//# sourceMappingURL=0.97aed65b.chunk.js.map