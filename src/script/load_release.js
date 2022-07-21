let actionVersion=[];

load_release();

function load_release(){
  let release_data;
  let request=new XMLHttpRequest();

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
    for(let e of document.getElementById('release').getElementsByTagName('article')){
      e.remove();
    }
  
    for(let e of document.getElementsByClassName('Release_Title')){
      e.remove();
    }
    for(let e of document.getElementsByClassName("Install")){
      e.remove();
    }
    for(let e of document.getElementsByClassName("unInstall")){
      e.remove();
    }
    for(let e of document.getElementsByClassName("reInstall")){
      e.remove();
    }
    let targetNode=document.getElementById('release');
    let header_child=document.createElement('h2');
    header_child.className="Release_Title";
    let article_child=document.createElement('article');
    article_child.className="List_article";
    for(let i=0;i<release_data.length;i++){
      let title=targetNode.appendChild(header_child);
      title.textContent=release_data[i].tag_name;
      for(let j=0;j<release_data[0].assets.length;j++){
        if(release_data[i].assets[j].browser_download_url.toString().includes(".zip")){
          let appended=targetNode.appendChild(article_child);
          let button_child=document.createElement('button');
          button_child.className="Release_Name";
          button_child.name=release_data[i].tag_name;
          button_child.id=release_data[i].assets[j].browser_download_url;
          button_child.type='button';
          button_child.textContent=release_data[i].assets[j].browser_download_url;
          button_child.textContent=button_child.textContent.substring(button_child.textContent.lastIndexOf('/')+1,button_child.textContent.length-4);
          button_child.setAttribute('onclick','openMenu(this)');
          appended.appendChild(button_child);
          let uninstall_button=document.createElement("button");
          uninstall_button.setAttribute("data-path",button_child.id);
          uninstall_button.id=button_child.name+"_uninstall";
          uninstall_button.type="button";
          uninstall_button.className="unInstall";
          uninstall_button.name=button_child.name;
          uninstall_button.textContent="unInstall";
          uninstall_button.setAttribute('onclick','unInstall(this,this.name)');
          button_child.parentNode.appendChild(uninstall_button);
          uninstall_button.style.display="none";
          let reinstall_button=document.createElement("button");
          reinstall_button.setAttribute("data-path",button_child.id);
          reinstall_button.id=button_child.name+"_reinstall";
          reinstall_button.type="button";
          reinstall_button.className="reInstall";
          reinstall_button.name=button_child.name;
          reinstall_button.textContent="reInstall";
          reinstall_button.setAttribute('onclick','reInstall(this.name,this.id)');
          button_child.parentNode.appendChild(reinstall_button);
          reinstall_button.style.display="none";
          let install_button=document.createElement("button");
          install_button.setAttribute("data-path",button_child.id);
          install_button.id=button_child.name+"_install";
          install_button.type="button";
          install_button.className="Install";
          install_button.name=button_child.name;
          install_button.textContent="Install";
          install_button.setAttribute('onclick','download(this,this.name)');
          button_child.parentNode.appendChild(install_button);
          install_button.style.display="none";
        }
      }
    }
  }
}

function openMenu($obj){
  let Return=false;
  for(let e of $obj.parentNode.getElementsByClassName("Install")){
    if(e.style.display=="block")Return=true;
    e.style.display="none";
  }
  for(let e of $obj.parentNode.getElementsByClassName("unInstall")){
    if(e.style.display=="block")Return=true;
    e.style.display="none";
  }
  for(let e of $obj.parentNode.getElementsByClassName("reInstall")){
    if(e.style.display=="block")Return=true;
    e.style.display="none";
  }
  if(Return)return;
  let exist=window.api.existVersion($obj.name).then(val=>addButton(val));
  function addButton($bool){
    if($bool){
      let uninstall_button=document.getElementById($obj.name+"_uninstall");
      uninstall_button.style.display="block";
      let reinstall_button=document.getElementById($obj.name+"_reinstall");
      reinstall_button.style.display="block";
    }else{
      let install_button=document.getElementById($obj.name+"_install");
      install_button.style.display="block";
    }
  }
}

function download($obj,$version){
  const $URL=$obj.dataset.path;
  for(let e of $obj.parentNode.getElementsByClassName("reInstall")){
    e.style.display="none";
  }
  for(let e of $obj.parentNode.getElementsByClassName("unInstall")){
    e.style.display="none";
  }
  for(let e of $obj.parentNode.getElementsByClassName("Install")){
    e.style.display="none";
  }
  window.api.getDirectry().then(val=>window.api.downloadFile(val+'\\data',$URL,$version+'.zip'))
  .then(val=>{window.api.getSetting("version").then(val=>{val.push($version);window.api.saveSetting("version",val)})});
}

function unInstall($obj,$version){
  for(let e of $obj.parentNode.getElementsByClassName("reInstall")){
    e.style.display="none";
  }
  for(let e of $obj.parentNode.getElementsByClassName("unInstall")){
    e.style.display="none";
  }
  for(let e of $obj.parentNode.getElementsByClassName("Install")){
    e.style.display="none";
  }
  window.api.getDirectry().then(val=>window.api.removeVersion(val+'\\data\\'+$version))
  .then(val=>{window.api.getSetting("version").then(val=>{val=val.filter(item=>item!==$version);window.api.saveSetting("version",val)})})
}