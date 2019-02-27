function addLoadEvent(func){
	var oldOnload=window.onload;
	if(typeof(oldOnload)!='function'){
		window.onload=func;
	}
	else{
		window.onload=function(){
			oldOnload();
			func();
		}
	}
}
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}
	else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}
function addClass(element,value){
	if(!element.className){
		element.className=value;
	}
	else{
		var newClass=element.className;
		newClass+=" ";
		newClass+=value;
		element.className=newClass;
	}
}
function highlightPage(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var headers=document.getElementsByTagName("header");
	if(headers.length==0) return false;
	var navs=headers[0].getElementsByTagName("nav");
	if(navs.length==0) return false;
	var links=navs[0].getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		var linkurl=links[i].getAttribute("href");
		if(window.location.href.indexOf(linkurl)!=-1){
			links[i].className="here";
			//一箭双雕，把该链接对应的界面的body设置为对应名称的id
			var linktext=links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);
		}
	}
}

function moveElement(elementId,final_x,final_y,interval){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	var elem=document.getElementById(elementId);
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	if(!elem.style.top){
		elem.style.top="0px";
	}
	if(!elem.style.left){
		elem.style.left="0px";
	}
	var x=parseInt(elem.style.left);
	var y=parseInt(elem.style.top);
	if(x==final_x&&y==final_y)
		return true;
	if(x<final_x){
		var dist=Math.ceil((final_x-x)/10);
		x+=dist;
	}
	if(x>final_x){
		var dist=Math.ceil((x-final_x)/10);
		x-=dist;
	}
	if(y<final_y){
		var dist=Math.ceil((final_y-y)/10);
		y+=dist;
	}
	if(y>final_y){
		var dist=Math.ceil((y-final_y)/10);
		y-=dist;
	}
	elem.style.top=y+"px";
	elem.style.left=x+"px";
	var repeat="moveElement('"+elementId+"',"+final_x+","+final_y+","+interval+")";
	elem.movement=setTimeout(repeat,interval);

}

function prepareSlideshow(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("intro")) return false;
	var intro=document.getElementById("intro");
	var slideshow=document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var frame=document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);
	var preview=document.createElement("img");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("id","preview");
	//preview.style.top="0px";
	//preview.style.left="0px";
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	//var links=intro.getElementsByTagName("a");
	var links=document.getElementsByTagName("a");
	if(links.length==0) return false;
	for(var i=0;i<links.length;i++){
		links[i].onmouseover=function(){
			var url=this.getAttribute("href");
			if(url.indexOf("index.html")!=-1)
				moveElement("preview",0,0,5);
			if(url.indexOf("about.html")!=-1)
				moveElement("preview",-150,0,5);
			if(url.indexOf("photos")!=-1)
				moveElement("preview",-300,0,5);
			if(url.indexOf("live.html")!=-1)
				moveElement("preview",-450,0,5);
			if(url.indexOf("contact.html")!=-1)
				moveElement("preview",-600,0,5);
		}
		
	}
}
function showSection(id){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	//必须要把所有的section取出来一一设置，因为如果只设置这次点击的section的话，
	//那么之前点击过的section的display属性还是block，这样就会显示出两个section，所以要对每个section重置属性，
	//是这个id就显示，不是就不显示。
	var sections=document.getElementsByTagName("section");
	for(var i=0;i<sections.length;i++){
		if(sections[i].getAttribute("id")!=id)
			sections[i].style.display="none";
		else
			sections[i].style.display="block";
	}
}
function prepareInternalnav(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var articles=document.getElementsByTagName("article");
	if(articles.length==0) return false;
	var navs=articles[0].getElementsByTagName("nav");
	if(navs.length==0) return false;
	var links=navs[0].getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		var sectionId=links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display="none";
		links[i].secId=sectionId;
		links[i].onclick=function(){
			showSection(this.secId);
			return false;
		}
	}
}
function showPic(link){
	if(!document.getElementById) return true;
	if(!document.getElementsByTagName) return true;
	if(!document.getElementById("placeholder")) return true;
	var url=link.getAttribute("href");
	var placeholder=document.getElementById("placeholder");
	placeholder.setAttribute("src",url);
	//修改description
	if(!document.getElementById("description")) return false;
	var description=document.getElementById("description");
	var text;
	if(!link.getAttribute("title"))
		text="";
	else
		text=link.getAttribute("title");
	if(description.firstChild.nodeType==3)
		description.firstChild.nodeValue=text;
	return false;

}
function preparePlaceholder(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery=document.getElementById("imagegallery");
	var placeholder=document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.gif");
	placeholder.setAttribute("alt","my image gallery");
	var description=document.createElement("p");
	description.setAttribute("id","description");
	var txt=document.createTextNode("Choose an image!");
	description.appendChild(txt);
	insertAfter(description,gallery);
	insertAfter(placeholder,description);
}
function prepareGallery(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery=document.getElementById("imagegallery");
	var links=gallery.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
			//为了实现点击成功后就不在跳出之前的页面
			return showPic(this);
		}
	}
}
function stripeTables(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementsByTagName("table")) return false;
	var tables=document.getElementsByTagName("table");
	for(var i=0;i<tables.length;i++){
		var odd=false;
		var rows=tables[i].getElementsByTagName("tr");
		for(var j=0;j<rows.length;j++){
			if(odd==true){
				addClass(rows[j],"odd");
				odd=false;
			}
			else
				odd=true;
		}
	}
}
function highlightRows(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementsByTagName("tr")) return false;
	var rows=document.getElementsByTagName("tr");
	for(var i=0;i<rows.length;i++){
		rows[i].oldclass=rows[i].className;
		rows[i].onmouseover=function(){
			addClass(this,"highlight");
		}
		rows[i].onmouseout=function(){
			this.className=this.oldclass;
		}
	}
}
function displayAbbreviations(){
	if(!document.getElementsByTagName||!document.createElement||!document.createTextNode)
		return false;
	var abbrs=document.getElementsByTagName("abbr");
	if(abbrs.length==0) return false;
	var defs=new Array();
	for(var i=0;i<abbrs.length;i++){
		var key=abbrs[i].lastChild.nodeValue;
		var value=abbrs[i].getAttribute("title");
		defs[key]=value;
	}
	var dlist=document.createElement("dl");
	for(key in defs){
		var definition=defs[key];
		var dtitle=document.createElement("dt");
		var dt_text=document.createTextNode(key);
		dtitle.appendChild(dt_text);
		var ddes=document.createElement("dd");
		var dd_text=document.createTextNode(definition);
		ddes.appendChild(dd_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddes);
	}
	var header=document.createElement("h3");
	var head_text=document.createTextNode("Abbreviations:");
	header.appendChild(head_text);
	if(!document.getElementsByTagName("article")) return false;
	var articles=document.getElementsByTagName("article");
	var article=articles[0];
	article.appendChild(header);
	article.appendChild(dlist);
}
function focusLabels(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName("Label")) return false;
	var labels=document.getElementsByTagName("label");
	for(var i=0;i<labels.length;i++){
		labels[i].onclick=function(){
			var elementId=this.getAttribute("for");
			if(!document.getElementById(elementId)) return false;
			var element=document.getElementById(elementId);
			element.focus();
		}
	}
}
function isFilled(field){
	if(field.value.replace(" ","").length==0) return false;
	var placeholder=field.getAttribute("placeholder");
	if(field.value==placeholder)
		return false;
	else
		return true;
}
function isEmail(field){
	if(field.value.indexOf("@")!=-1&&field.value.indexOf(".")!=-1)
		return true;
	else 
		return false;
}
function validateForm(form){
	for(var i=0;i<form.length;i++){
		var element=form.elements[i];
		if(element.required=="required"){
			if(!isFilled(element)){
				alert("please fill in the "+element.name+" field!");
			}
		}
		if(element.type=='email'){
			if(!isEmail(element)){
				elert("The "+element.name+" field must be a valid email address!");
				return false;
			}
		}
	}
	return true;
}
function getHTTPObject(){
	if(typeof(XMLHttpRequest)=="undefined"){
		XMLHttpRequest=function(){
			try{ return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
				catch(e){}
			try{ return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
				catch(e){}
			try{ return new ActiveXObject("Msxml2.XMLHTTP");}
				catch(e){}
			return false;
		}
	}
	return new XMLHttpRequest();
}
function displayAjaxLoading(element){
	while(element.hasChildNodes()){
		element.removeChild(element.lastChild);
	}
	var content=document.createElement("img");
	content.setAttribute("src","images/loading.gif");
	content.setAttribute("alt","Loading...");
	element.appendChild(content);
}
function submitFormWithAjax(form,target){
	var request=getHTTPObject();
	if(!request) return false;
	displayAjaxLoading(target);
	var dataParts=Array();
	for(var i=0;i<form.elements.length;i++){
		var element=form.elements[i];
		dataParts[i]=element.name+'='+encodeURIComponent(element.value);
	}
	var data=dataParts.join('&');
	request.open("POST",form.getAttribute("action"),true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.onreadystatechange=function(){
		if(request.readyState==4){
			if(request.status==200||request.status==0){
				var matches=request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if(matches.length>0){
					target.innerHTML=matches[1];
				}
				else{
					target.innerHTML="<p>Oops,there was an error.</p>";
				}
			}
			else
				target.innerHTML="<p>"+request.status+"</p>";
		}
	}
	request.send(data);
	return true;
}
function prepareForms(){
	for(var i=0;i<document.forms.length;i++){
		var item=document.forms[i];
		item.onsubmit=function(){
			if(!validateForm(this)) return false;
			var articles=document.getElementsByTagName("article");
			if(articles.length==0) return false;
			var article=articles[0];
			if(submitFormWithAjax(this,article)) return false;
			return true;
		}
	}
}
addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);