"use strct";

const { ipcMain } = require("electron");

const fs=require("fs");

const fs_ex=require("fs-extra");

const { download } = require("electron-dl");

const electron = require("electron");

const path = require("path");

const unzipper=require("unzipper");

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

let setting;

app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  mainWindow = new BrowserWindow({width: 1280, height: 720, useContentSize: true,backgroundColor:"#e6e6e6",
  webPreferences:{nodeIntegration: false,contextIsolation: true,preload: path.join(__dirname,"./preload.js")}});
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  if(fs.existsSync("./src/data")){
    if(!fs.existsSync("./src/data/setting.json")){
      const init='{"version":[],"theme":"light"}';
      fs.writeFileSync("./src/data/setting.json",init);
    }
  }else{
    fs.mkdir("data",(err)=>{console.log(err);});
    const init='{"version":[],"theme":"light"}';
    fs.writeFileSync("./src/data/setting.json",init);
  }
  try{
    setting=JSON.parse(fs.readFileSync("./src/data/setting.json"));
  }catch(err){
    console.log(err);
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

ipcMain.handle("existSetting",(event)=>{
  try {
    fs.statSync(app.getPath("userData")+"/config.json");
    return true
  } catch(err) {
    if(err.code === 'ENOENT') return false
  }
});

ipcMain.handle("existVersion",async(event,$version)=>{
  let versions=setting["version"];
  for(let i=0;i<versions.length;i++){
    if(versions[i]==$version)return true;
  }
  return false;
});

ipcMain.handle("saveSetting",async(event,$key,$value)=>{console.log($value)
  setting[$key]=$value;
  fs.writeFileSync("./src/data/setting.json",JSON.stringify(setting));
});

ipcMain.handle("getSetting",async(event,$key)=>{
  return setting[$key];
});

ipcMain.handle("setBackground",async(event,$color)=>{
  mainWindow.setBackgroundColor($color);
});

ipcMain.handle("downloadFile",async(event,$dir,$url,$name)=>{
  await download(mainWindow, $url, {
    directory: $dir,
    filename: $name,
  });
  let stream=fs.createReadStream($dir + "\\" + $name);
  stream.pipe(unzipper.Extract({ path: $dir + "\\" + $name.substring(0, $name.lastIndexOf(".")) }));
  stream.on("close",function(){
    fs.unlinkSync($dir+"\\"+$name);
  });
  return $dir+"\\"+$name;
});

ipcMain.handle("getDirectry",async(event)=>{
  return __dirname;
});

ipcMain.handle("removeVersion",async(event,$path)=>{
  fs_ex.remove($path,(err)=>{
    console.log(err,$path);
  });
});