var tabs = document.getElementById('tab_control').getElementsByTagName('a');
var lists = document.getElementById('tab_control').getElementsByTagName('li');
var pages=[];
getTagNameChildNodes(document.getElementById('tab_body'),pages,'div');

function changeTab() {
  var targetid = this.href.substring(this.href.indexOf('#')+1,this.href.length);

  for(var i=0; i<pages.length; i++) {
    if( pages[i].id != targetid ) {
       pages[i].style.display = "none";
    }else {
       pages[i].style.display = "block";
    }
  }

  for(var i=0; i<tabs.length; i++) {
    tabs[i].style.zIndex = "0";
    tabs[i].parentNode.style.backgroundColor = "transparent";
    tabs[i].parentNode.style.borderLeftColor="transparent";
    tabs[i].style.color = "gray";
  }
  this.style.zIndex = "10";
  this.parentNode.style.backgroundColor="#d0d0d0";
  this.parentNode.style.borderLeftColor="#0080ff";
  this.style.color="#0080ff";

  return false;
}

function getTagNameChildNodes($target,$array,$tag) {
  var e = $target.childNodes;
  var i = -1;
  var j = 0;
  while (++i < e.length) {
    if(e[i].nodeType == 1) {
      if(e[i].nodeName.toLowerCase() == $tag) {
        $array[j] = e[i];
        j++;
      }
    }
  }
}

for(var i=0; i<tabs.length; i++) {
  tabs[i].onclick = changeTab;
}

tabs[0].onclick();