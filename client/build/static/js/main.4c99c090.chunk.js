(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{33:function(e,t,n){e.exports=n(61)},38:function(e,t,n){},56:function(e,t,n){},61:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(23),o=n.n(r),l=(n(38),n(28)),u=n(6),i=n(24),s=n(25),m=n(31),p=n(26),d=n(32),f=n(27),h=n.n(f),v=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(m.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(c)))).state={message:""},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;h.a.get("/api/helloworld").then(function(t){e.setState({message:t.data})})}},{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement("h1",null,this.state.message))}}]),t}(a.Component);n(56);var w=function(){return c.a.createElement("div",{className:"App"},c.a.createElement(l.a,null,c.a.createElement(u.c,null,c.a.createElement(u.a,{exact:!0,path:"/",component:v}))))};o.a.render(c.a.createElement(w,null),document.getElementById("root"))}},[[33,1,2]]]);
//# sourceMappingURL=main.4c99c090.chunk.js.map