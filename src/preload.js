const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('api',{
  existSettingFile:async()=>await ipcRenderer.invoke("existSetting"),
  existVersion:async($version)=>await ipcRenderer.invoke('existVersion',$version),
  saveSetting:async($key,$value)=>await ipcRenderer.invoke('saveSetting',$key,$value),
  getSetting:async($key)=>await ipcRenderer.invoke('getSetting',$key),
  setWindowBackgroundColor:async($color)=>await ipcRenderer.invoke('setBackground',$color),
  downloadFile:async($dir,$url,$name)=>await ipcRenderer.invoke('downloadFile',$dir,$url,$name),
  getDirectry:async()=>await ipcRenderer.invoke('getDirectry'),
  removeVersion:async($path)=>await ipcRenderer.invoke('removeVersion',$path)
});