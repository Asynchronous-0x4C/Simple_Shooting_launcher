let tabs = document.getElementById('tab_control').getElementsByTagName('a');
let lists = document.getElementById('tab_control').getElementsByTagName('li');
let pages=[];
getTagNameChildNodes(document.getElementById('tab_body'),pages,'div');

function changeTab() {
  let targetid = this.href.substring(this.href.indexOf('#')+1,this.href.length);

  for(let i=0; i<pages.length; i++) {
    if( pages[i].id != targetid ) {
       pages[i].style.display = "none";
    }else {
       pages[i].style.display = "block";
    }
  }

  for(let i=0; i<tabs.length; i++) {
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
  let e = $target.childNodes;
  let i = -1;
  let j = 0;
  while (++i < e.length) {
    if(e[i].nodeType == 1) {
      if(e[i].nodeName.toLowerCase() == $tag) {
        $array[j] = e[i];
        j++;
      }
    }
  }
}

for(let i=0; i<tabs.length; i++) {
  tabs[i].onclick = changeTab;
}

tabs[0].onclick();

let theme=(typeof window.api.getSetting("theme")==="undefined")?"light":window.api.getSetting("theme");
setTheme(theme);

function setTheme($theme){
  document.documentElement.setAttribute('theme',$theme);
  if($theme=="dark"){
    window.api.setWindowBackgroundColor("#090909");
  }else{
    window.api.setWindowBackgroundColor("#e6e6e6");
  }
}

function toggleTheme($obj){
  if($obj.checked){
    setTheme("dark");
  }else{
    setTheme("light");
  }
}