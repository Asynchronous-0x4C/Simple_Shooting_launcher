load_release();

function load_release(){
  var release_data;
  var request=new XMLHttpRequest();

  request.onreadystatechange = function(){
    if(request.readyState==4&&request.status==200){
      release_data=JSON.parse(request.responseText);
      updateRelease();
    }else{
      console.log(request.status,request.readyState);
    }
  }
  request.open('GET','https://api.github.com/repos/Asynchronous-0x4C/Simple_Shooting_2.1/releases', true);

  request.send(null);

  function updateRelease(){
    for(var e of document.getElementById('release').getElementsByTagName('li')){
      e.remove();
    }
  
    for(var e of document.getElementsByClassName('Release_Title')){
      e.remove();
    }
    var targetNode=document.getElementById('release');
    var header_child=document.createElement('h2');
    header_child.className="Release_Title";
    var list_child=document.createElement('li');
    list_child.className="Release_List";
    for(var i=0;i<release_data.length;i++){
      var title=targetNode.appendChild(header_child);
      title.textContent=release_data[i].tag_name;
      for(var j=0;j<release_data[0].assets.length;j++){
        if(release_data[i].assets[j].browser_download_url.toString().includes(".zip")){
          var appended=targetNode.appendChild(list_child);
          var button_child=document.createElement('button');
          button_child.className="Release_Name";
          button_child.name=release_data[i].tag_name;
          button_child.id=release_data[i].assets[j].browser_download_url;
          button_child.type='button';
          button_child.textContent=release_data[i].assets[j].browser_download_url;
          button_child.textContent=button_child.textContent.substring(button_child.textContent.lastIndexOf('/')+1,button_child.textContent.length-4);
          button_child.setAttribute('onclick','openMenu(this)');
          appended.appendChild(button_child);
        }
      }
    }
  }
}

function openMenu($obj){
  var log;console.log($obj);
}

function downloadZip($version,$URL){

}