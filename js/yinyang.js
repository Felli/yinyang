// Generated by CoffeeScript 1.3.3
var YinYang,cbSplit,__bind=function(e,t){return function(){return e.apply(t,arguments)}},__hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var n in t)__hasProp.call(t,n)&&(e[n]=t[n]);r.prototype=t.prototype;e.prototype=new r;e.__super__=t.prototype;return e};YinYang=function(){function e(){this.build=__bind(this.build,this);this.setup()}e.version="0.2.7";e.plugins={};e.filters={};e.templates={};e.onvarsetHandler={};e.createFilter=function(t){var n,r,i;r=t.split(":");i=r.shift();r=function(){var e,t,i;i=[];for(e=0,t=r.length;e<t;e++){n=r[e];n.match(/^[1-9][0-9]*$/)?i.push(Number(n)):i.push(n.replace(/^\s*('|")|("|')\s*$/g,""))}return i}();return e.filters[i]!=null?new e.filters[i](r):new e.filter(r)};e.getTemplate=function(t){return e.templates[t]!=null?e.templates[t]:null};e.createTemplate=function(t,n){var r;r=t.replace(/[^\/]+$/,"");n=n.replace(/(href|src)="((?![a-z]+:\/\/|\.\/|\/|\#).*?)"/g,function(){return""+arguments[1]+'="'+r+arguments[2]+'" '});return this.templates[t]=new e.Template(n)};e.guid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t,n;t=Math.random()*16|0;n=e==="x"?t:t&3|8;return n.toString(16)}).toUpperCase()};e.onvarset=function(e,t){if(t)return this.onvarsetHandler[e]=t;if(this.onvarsetHandler[e]!=null)return this.onvarsetHandler[e]()};e.prototype.template=null;e.prototype.document_meta={};e.prototype.selfload=!1;e.prototype.setup=function(){var e,t,n,r,i,s;i=$("meta");s=[];for(n=0,r=i.length;n<r;n++){e=i[n];if($(e).attr("content")==null)continue;t=$(e).attr("name")||$(e).attr("property");if(t==="yinyang:selfload"&&$(e).attr("content")==="true")s.push(this.selfload=!0);else{t=t.replace(/[^a-zA-Z0-9_]/g,"_");s.push(this.document_meta[t]=$(e).attr("content"))}}return s};e.prototype.fetch=function(e){var t,n=this;if(this.selfload){t=$("html").html();t=t.replace(/#%7B(.*?)%7D/gm,"#{$1}");t=t.replace(/<script.*?>.*?<\/script>/gim,"");this.redrawAll(this.build(location.href,t))}if(e)return $.ajax({url:e,success:function(t){return n.redrawAll(n.build(e,t))}})};e.prototype.build=function(t,n){this.template=e.createTemplate(t,n);return this.template.display(this)};e.prototype.redrawAll=function(e){var t,n,r,i,s;$("body").html(e.split(/<body.*?>|<\/body>/ig)[1]);$("head>*").not("script").remove();$("head").prepend(e.split(/<head.*?>|<\/head>/ig)[1]);i=$(e.match(/<body.*?>/i)[0].replace(/^\<body/i,"<div"))[0].attributes;s=[];for(n=0,r=i.length;n<r;n++){t=i[n];t.name==="class"?s.push($("body").addClass(t.value)):t.value&&t.value!=="null"?s.push($("body").attr(t.name,t.value)):s.push(void 0)}return s};return e}();YinYang.filter=function(){function e(e){this.args=e}e.prototype._process=function(e){switch(this.args.length){case 0:return this.process(e);case 1:return this.process(e,this.args[0]);case 2:return this.process(e,this.args[0],this.args[1]);default:return this.process(e,this.args[0],this.args[1],this.args[2])}};e.prototype.process=function(e){return e};return e}();YinYang.plugin=function(){function e(e,t,n){this.template=e;this.var_name=t;this.arg=n;this.process()}e.prototype.process=function(){return this.setValue(this.arg)};e.prototype.setValue=function(e){this.template.setValue(this.var_name,e);this.template.processPlaceholder(this.var_name,e);return YinYang.onvarset(this.var_name)};return e}();$("head").append("<style>body {background:#FFF} body * {display:none}</style>");$(function(){var e,t;e=$("link[rel=template]").attr("href");t=new YinYang;return t.fetch(e)});YinYang.Template=function(){function e(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v;u=function(){var e,t;e=YinYang.plugins;t=[];for(i in e){s=e[i];t.push(i)}return t}().join("|");d=e.match(new RegExp('<meta.*? name="('+u+')\\.[a-z][a-zA-Z0-9_\\.]+".*?>',"gim"))||[];for(l=0,h=d.length;l<h;l++){r=d[l];f=$(r).attr("name");o=f.split(".")[0];t=$(r).attr("content");this.datasource[f]=new YinYang.plugins[o](this,f,t)}a=this.root=new YinYang.TemplateRoot(this);v=e.split(/(<!--\{.+?\}-->|\#\{.+?\})/gim);for(c=0,p=v.length;c<p;c++){n=v[c];n!=null&&(a=a.add(n))}}e.prototype.values={meta:{},ajax:{},hsql:{}};e.prototype.placeholders={};e.prototype.datasource={};e.prototype.root=null;e.prototype.display=function(e){this.values.meta=e.document_meta;return this.root.display()};e.prototype.setValue=function(e,t){var n,r,i,s,o;r=e.split(".");i=r.pop();s=this.values;while(n=r.shift())s=(o=s[n])!=null?o:"";return s[i]=t};e.prototype.setValues=function(e){var t,n,r;r=[];for(t in e){if(!__hasProp.call(e,t))continue;n=e[t];r.push(this.values[t]=n)}return r};e.prototype.getValue=function(e,t){var n,r,i;t==null&&(t=this.values);r=e.split(".");while(n=r.shift())t=(i=t[n])!=null?i:"";return t};e.prototype.valueExists=function(e,t){var n,r,i;t==null&&(t=this.values);r=e.split(".");while(t!=null&&(n=r.shift()))t=(i=t[n])!=null?i:null;return t!=null};e.prototype.addPlaceholder=function(e,t,n){return this.placeholders[e]={name:t,callback:n}};e.prototype.processPlaceholder=function(e,t){var n,r,i;i=this.placeholders;for(r in i){n=i[r];if(!n.name.match(new RegExp("^"+e+"($|\\.|\\[)")))continue;n.callback(t);delete this.placeholders[r]}return!0};return e}();YinYang.TemplateRoot=function(){function e(e,t,n,r){this.template=e;this.parent=t!=null?t:null;this.value=n!=null?n:"";this.ignore=r!=null?r:!1;this.children=[]}e.prototype.add=function(e){var t;t={pend:/<!--\{end\}-->/,more:/<!--\{more\}-->/,pvar:/<!--\{(@[a-zA-Z0-9_\.\#>=\[\]]+|[a-zA-Z][a-zA-Z0-9_\.]*)(\|.*?)*\}-->/,ivar:/\#\{(@[a-zA-Z0-9_\.\#>=\[\]]+|[a-zA-Z][a-zA-Z0-9_\.]*)(\|.*?)*\}/,loop:/<!--\{[a-zA-Z][a-zA-Z0-9_\.]* in (@[a-zA-Z0-9_\.\#>=\[\]]+|[a-zA-Z][a-zA-Z0-9_\.]*)\}-->/};if(e.match(t.pend)){this.ignore=!1;return this.parent}if(e.match(t.more)){this.ignore=!0;return this}return this.ignore?this:e.match(t.pvar)?this._add("child",new YinYang.TemplateVar(this.template,this,e.replace(/<!--{|}-->/g,""),!0)):e.match(t.ivar)?this._add("self",new YinYang.TemplateVar(this.template,this,e.replace(/\#\{|\}/g,""))):e.match(t.loop)?this._add("child",new YinYang.TemplateLoop(this.template,this,e.replace(/<!--{|}-->/g,""))):this._add("self",new YinYang.TemplateText(this.template,this,e))};e.prototype._add=function(e,t){this.children.push(t);switch(e){case"child":return t;case"self":return this}};e.prototype.display=function(e){var t,n,r;e==null&&(e={});n=function(){var n,r,i,s;i=this.children;s=[];for(n=0,r=i.length;n<r;n++){t=i[n];s.push(t.display(e))}return s}.call(this).join("");r=/(<(table|thead|tbody|tr).*?>)\s*<span\s+class="loading"\s+id="(.+?)"><\/span>/;return n.replace(r,function(){var e;e={table:"tbody",thead:"tr",tbody:"tr",tr:"td"};return""+arguments[1]+"<"+e[arguments[2]]+' class="loading" id="'+arguments[3]+'"></'+e[arguments[2]]+">"})};return e}();YinYang.TemplateLoop=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}__extends(t,e);t.prototype.display=function(e){var t,n,r;this.placeholder_id=YinYang.guid();r=this.value.split(/\s+in\s+/),n=r[0],t=r[1];if(this.template.valueExists(t,e))return this.displayLoop(e,n,this.template.getValue(t,e));if(this.template.valueExists(t))return this.displayLoop(e,n,this.template.getValue(t));if(t.match(/^(ajax|hsql)\./))return this.diaplayPlaceholder(e,n,t);typeof console!="undefined"&&console!==null&&console.log("not found:"+this.value);typeof console!="undefined"&&console!==null&&console.log(e);return""};t.prototype.displayLoop=function(e,t,n){var r,i,s,o,u;return function(){var a,f,l;l=[];for(a=0,f=n.length;a<f;a++){i=n[a];l.push(function(){var n,a,f,l;f=this.children;l=[];for(n=0,a=f.length;n<a;n++){r=f[n];o={};for(s in e){u=e[s];o[s]=u}o[t]=i;l.push(r.display(o))}return l}.call(this).join(""))}return l}.call(this).join("")};t.prototype.diaplayPlaceholder=function(e,t,n){var r=this;this.template.addPlaceholder(this.placeholder_id,n,function(n){var i;i=r.displayLoop(e,t,n);return $("#"+r.placeholder_id).before(i).remove()});return'<span class="loading" id="'+this.placeholder_id+'"></span>'};return t}(YinYang.TemplateRoot);YinYang.TemplateVar=function(e){function t(e,t,n,r){var i,s;this.template=e;this.parent=t!=null?t:null;this.value=n!=null?n:"";this.ignore=r!=null?r:!1;s=this.value.split("|");this.value=s.shift();this.filters=function(){var e,t,n;n=[];for(e=0,t=s.length;e<t;e++){i=s[e];n.push(YinYang.createFilter(i))}return n}();this.children=[]}__extends(t,e);t.prototype.display=function(e){var t,n,r,i,s;this.localValues=e;n=this.value.substring(0,1)==="@"?this.displayDom():this.displayVar();s=this.filters;for(r=0,i=s.length;r<i;r++){t=s[r];n=t._process(n)}return n};t.prototype.displayDom=function(){return $(this.value.substring(1)).html()};t.prototype.displayVar=function(){return this.template.getValue(this.value,this.localValues)||this.template.getValue(this.value)};return t}(YinYang.TemplateRoot);YinYang.TemplateText=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}__extends(t,e);t.prototype.display=function(){return this.value};return t}(YinYang.TemplateRoot);YinYang.plugins.ajax=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}__extends(t,e);t.prototype.process=function(){var e=this;return $.getJSON(this.arg).success(function(t){typeof console!="undefined"&&console!==null&&console.log("ajax success: "+e.var_name);return e.setValue(t)}).error(function(){return typeof console!="undefined"&&console!==null?console.log("ajax error: "+e.var_name):void 0})};return t}(YinYang.plugin);YinYang.plugins.hsql=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}__extends(t,e);t.prototype.process=function(){var e=this;return $.getJSON("/hsql.php?q="+t).success(function(t){typeof console!="undefined"&&console!==null&&console.log("hsql success: "+e.var_name);return e.setValue(t)}).error(function(){return typeof console!="undefined"&&console!==null?console.log("hsql error: "+e.var_name):void 0})};return t}(YinYang.plugin);YinYang.filters["default"]=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}__extends(t,e);t.prototype.process=function(e,t){t==null&&(t="");return e||t};return t}(YinYang.filter);YinYang.filters.nl2br=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}__extends(t,e);t.prototype.process=function(e){return e.replace(/\r\n|\n|\r/gim,"<br />")};return t}(YinYang.filter);YinYang.filters.truncate=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}__extends(t,e);t.prototype.process=function(e,t,n){t==null&&(t=80);n==null&&(n="...");return e.length>t?e.substring(0,t-n.length)+n:e};return t}(YinYang.filter);YinYang.filters.beforetag=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}__extends(t,e);t.prototype.process=function(e,t){t==null&&(t="hr");return e.split(new RegExp("(<"+t+".*?>)","im"))[0]};return t}(YinYang.filter);YinYang.filters.aftertag=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}__extends(t,e);t.prototype.process=function(e,t){t==null&&(t="hr");return e.split(new RegExp("(<"+t+".*?>)","im"))[2]};return t}(YinYang.filter);if(!cbSplit){cbSplit=function(e,t,n){var r,i,s,o,u,a,f;if(Object.prototype.toString.call(t)!=="[object RegExp]")return cbSplit._nativeSplit.call(e,t,n);a=[];s=0;r=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.sticky?"y":"");t=RegExp(t.source,r+"g");e+="";cbSplit._compliantExecNpcg||(f=RegExp("^"+t.source+"$(?!\\s)",r));if(n==null||+n<0)n=Infinity;else{n=Math.floor(+n);if(!n)return[]}while(u=t.exec(e)){i=u.index+u[0].length;if(i>s){a.push(e.slice(s,u.index));!cbSplit._compliantExecNpcg&&u.length>1&&u[0].replace(f,function(){var e,t,n,r;r=[];for(e=t=1,n=arguments.length-2;1<=n?t<=n:t>=n;e=1<=n?++t:--t)arguments[e]==null&&r.push(u[e]=void 0);return r});u.length>1&&u.index<e.length&&Array.prototype.push.apply(a,u.slice(1));o=u[0].length;s=i;if(a.length>=n)break}t.lastIndex===u.index&&t.lastIndex++}s===e.length?(o||!t.test(""))&&a.push(""):a.push(e.slice(s));return a.length>n?a.slice(0,n):a};cbSplit._compliantExecNpcg=/()??/.exec("")[1]!=null;cbSplit._nativeSplit=String.prototype.split}String.prototype.split=function(e,t){return cbSplit(this,e,t)};