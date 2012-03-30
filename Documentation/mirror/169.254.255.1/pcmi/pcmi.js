/**
 * Namespace declaration: pcmi
 *
 * This namespace will hold all JavaScript code relevant to the
 * PCMI client.
 */
var pcmi;
if (!pcmi) {
  pcmi = {};
} else if (typeof pcmi != "object") {
  throw new Error("pcmi already exists and is not an object");
}

pcmi.SystemInfo = function() {
  //Singleton class... If instance exists, return it
  if (pcmi.SystemInfo.instance != undefined) {
    return pcmi.SystemInfo.instance;
  }
  
  this.availBytes = 0;
  
  this.setHelpLink = function(languageId) {
    var urlPrefix = getURLPrefixForLanguage(languageId);
    var numId = getURLNumericalIDForLanguage(languageId);
    
    var langId = languageId;
    if (urlPrefix == "" || numId == "") {
      urlPrefix = getURLPrefixForLanguage("en_gb");
      numId = getURLNumericalIDForLanguage("en_gb");
      langId = "en_gb";
    }
    
    var element = document.getElementById('helpLink');
    if (element) {
      element.href = "http://"+urlPrefix+".support.tomtom.com/app/answers/detail/a_id/"+numId+"/?locale="+languageId;
    }
  }
  
  this.drawSpaceLeft = function() {
    var element = document.getElementById('freeSpaceContent');
    if (element) {
      element.innerHTML = Math.round(this.availBytes/1000000) + " MB";
    }
  }
  
  function getURLNumericalIDForLanguage(languageId) {
    var result = "";
    
    var langId = languageId.toLowerCase();
    switch (languageId) {
      case "de_at": result = "14379"; break;
      case "fr_be": result = "14383"; break;
      case "nl_be": result = "14386"; break;
      case "de_ch": result = "14379"; break;
      case "fr_ch": result = "14383"; break;
      case "cz_cz": result = "14378"; break;
      case "de_de": result = "14379"; break;
      case "da_dk": result = "14380"; break;
      case "es_es": result = "14381"; break;
      case "fi_fi": result = "14382"; break;
      case "fr_fr": result = "14383"; break;
      case "en_ie": result = "14394"; break;
      case "it_it": result = "14385"; break;
      case "nl_nl": result = "14386"; break;
      case "po_po": result = "14388"; break;
      case "pt_pt": result = "14389"; break;
      case "sv_se": result = "14390"; break;
      case "tr_tr": result = "14391"; break;
      case "en_gb": result = "14394"; break;
      case "en_au": result = "14377"; break;
      case "gr_gr": result = "14384"; break;
      case "hu_hu": result = "14393"; break;
      case "no_nl": result = "14387"; break;
      case "ru_ru": result = "14392"; break;
      case "en_us": result = "14395"; break;
    }
    
    return result;
  }
  
  function getURLPrefixForLanguage(languageId) {
    var result = "";
    
    var langId = languageId.toLowerCase();
    switch (languageId) {
      case "de_at": result = "de"; break;
      case "fr_be": result = "fr"; break;
      case "nl_be": result = "nl"; break;
      case "de_ch": result = "de"; break;
      case "fr_ch": result = "fr"; break;
      case "cz_cz": result = "cz"; break;
      case "de_de": result = "de"; break;
      case "da_dk": result = "dk"; break;
      case "es_es": result = "es"; break;
      case "fi_fi": result = "fi"; break;
      case "fr_fr": result = "fr"; break;
      case "en_ie": result = "uk"; break;
      case "it_it": result = "it"; break;
      case "nl_nl": result = "nl"; break;
      case "po_po": result = "pl"; break;
      case "pt_pt": result = "pt"; break;
      case "sv_se": result = "se"; break;
      case "tr_tr": result = "tr"; break;
      case "en_gb": result = "uk"; break;
      case "en_au": result = "au"; break;
      case "gr_gr": result = "gr"; break;
      case "hu_hu": result = "hu"; break;
      case "no_nl": result = "no"; break;
      case "ru_ru": result = "ru"; break;
      case "en_us": result = "us"; break;
    }
    
    return result;
  }
  
  pcmi.SystemInfo.instance = this;
}

pcmi.DataProvider = function() {
  var urlBase = "http://169.254.255.1";
  
  this.get = function(relPath, callbackDone, callbackError) {
    sendCommand(relPath, "GET", callbackDone, callbackError)
  }
  
  this.downloadFile = function(relPath, filename) {
    var frame = document.createElement("iframe");
    frame.src = urlBase + "/browser_download" + relPath + "/" + encodeURIComponent(filename);
    frame.style.display = "none"; 
    document.body.appendChild(frame);
  }
  
  this.remove = function(relPath, filename, callbackDone, callbackError) {
    var filepath = relPath + "/" + encodeURIComponent(filename);
    sendCommand(filepath, "DELETE", callbackDone, callbackError)
  }
  
  this.propFind = function(relPath, callbackDone, callbackError) {
    sendCommand(relPath, "PROPFIND", callbackDone, callbackError)
  }
  
  function stateChanged(request, callbackDone, callbackError) {
    if (request.readyState == 4) {
      if (request.status == 200 || request.status == 207) {
        if (callbackDone)
          callbackDone(request);
      } else {
        if (callbackError)
          callbackError(request);
      }
    }
  }
  
  function sendCommand(relPath, method, callbackDone, callbackError) {
    var request = getXmlHttpRequest();
    if (request && relPath && verifyMethod(method)) {
      var url = urlBase + relPath;
      request.open(method, url, true);
      request.onreadystatechange = function() {
        stateChanged(request, callbackDone, callbackError);
      }
      request.send(null);
    }
  }
  
  function verifyMethod(method) {
    var methods = "GET, POST, PUT, DELETE, PROPFIND";
    return (methods.indexOf(method) == -1 ? false : true);
  }

  function getXmlHttpRequest() {
    var xmlHttpRequest;
    try {
      xmlHttpRequest = new XMLHttpRequest();            
    } catch(e) {
      try {
        xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
      } catch(e) {
        try{
          xmlHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
          alert("error opening XMLHTTP")
        }
      }
    }
    return xmlHttpRequest;
  }
}

/**
 * Class declaration pcmi.TranslationProvider
 *
 * 
 */
pcmi.TranslationProvider = function(language) {
  //Singleton class... If instance exists, return it
  if (pcmi.TranslationProvider.instance != undefined) {
    return pcmi.TranslationProvider.instance;
  }
  
  var relPath = null;
  var dataProvider = null;
  var listeners = new Array();
  var dataReady = false;
  var translations = {};

  if (language == null) {
    var regexS = "[\\?&]locale=([a-z][a-z]_[a-z][a-z])";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    var tmpList = [];
    var sysInfo = new pcmi.SystemInfo();
    if(results != null) {
      sysInfo.setHelpLink(results[1]);
      
      tmpList = results[1].split('_');
      language = tmpList[0] + "-" + tmpList[1].toUpperCase();  
    } else {
      sysInfo.setHelpLink("en_gb");
      language = "en-GB";
    }
  }
  
	relPath = "/pcmi/language/" + mapLanguage(language) + ".json";
  
  dataProvider = new pcmi.DataProvider();
  dataProvider.get(relPath, parseReply, handleError);
  
  this.addListener = function(listener) {
    listeners.push(listener);
  }
  
  this.isDataReady = function() {
    return dataReady;
  }  
  
  this.getTranslations = function() {
    if (!dataReady)
      return null
    
    return translations;
  }
  
  this.getLocalizedString = function(category, id) {
    if (!dataReady)
      return null
    
    var result = "";
    try {
      result = translations[category][id].value;
    } catch(e) {
      //debug output here
    }
    
    return result;
  }
  
  function notifyDataRetrieved() {
    dataReady = true;
    for (var i=0; i<listeners.length; ++i)
      listeners[i].notifyDataReady();
  }
  
  function parseReply(reply) {
    //Todo: Parse the reply...
    translations = eval("(" + reply.responseText + ")");
    notifyDataRetrieved();
  }
  
  var triedEnglish = false;
  function handleError(error) {
    if (error.status == 404 && !triedEnglish) {
      triedEnglish = true;
      dataProvider.get("/pcmi/language/en-GB.json", parseReply, handleError);
    }
  }
  
  function mapLanguage(language) {
    switch(language) {
    case "nl-BE": language = "nl-NL"; break;
    case "en-IE":
    case "en-AU":
    case "en-CA":
    case "en-NZ":
    case "en-ZA":
    case "en-MY":
    case "en-SG": language = "en-GB"; break;
    case "fr-BE":
    case "fr-LU":
    case "fr-CH":
    case "fr-CA":
    case "fr-MA": language = "fr-FR"; break;
    case "de-AT":
    case "de-CH": language = "de-DE"; break;
    case "it-CH": language = "it-IT"; break;
    case "nn-NO":
    case "en-NO": language = "no-NO"; break;
    case "es-AR": language = "es-ES"; break;
    default: break;
    }
    return language;
  }
  
  //Register the single instance
  pcmi.TranslationProvider.instance = this;
}

pcmi.FileItem = function(name) {
  this.dir = false;
  this.name = name;
  this.size = 0;
  this.modified = "";
  this.path = "";
  
  this.voiceName = "";
  this.voiceGender = 0;
  this.voiceFlag = 0;
}

/**
 * Class declaration pcmi.DataProvider
 *
 * 
 */
pcmi.FileListProvider = function(dir, caller) {
  var dirPath = dir;
  var listener = caller;
  var fileItems = new Array();
  var dataReady = false;
  var sortAlgorithm = sortFileItems;
  
  var dataProvider = new pcmi.DataProvider();
  getFileListInfo();
  
  this.refreshData = function() {
    dataReady = false;
    getFileListInfo();
  }
  
  this.getFileItemAtIndex = function(idx) {
    if (idx>=0 && idx<fileItems.length)
      return fileItems[idx];
    else
      return null;
  }
  
  this.listSize = function() {
    return fileItems.length;
  }
  
  this.getFile = function(idx) {
    if (idx>=0 && idx<fileItems.length) {
      var fileItem = fileItems[idx];
      dataProvider.downloadFile(fileItem.path, fileItem.name, handleRemoveReply);
    }
  }
  
  this.removeFile = function(idx, handleError) {
    if (idx>=0 && idx<fileItems.length) {
      var fileItem = fileItems[idx];
      dataProvider.remove(fileItem.path, fileItem.name, handleRemoveReply, handleError);
    }
  }
  
  this.isDataReady = function() {
    return dataReady;
  }
  
  this.fileExists = function(fileName) {
    if (!dataReady)
      return false;
      
    for (var i=0; i<fileItems.length; ++i) {
      if (fileItems[i].name.toLowerCase() == fileName.toLowerCase())
        return true;
    }
    return false;
  }
  
  this.setSortAlgorithm = function(newSortAlgorithm) {
    sortAlgorithm = newSortAlgorithm;
  }
  
  function handleRemoveReply() {
    dataReady = false;
    getFileListInfo();
  }
  
  function getFileListInfo() {
    dataProvider.propFind(dirPath, handlePropFindReply, dummyHandleError);
  }
  
  function dummyHandleError() {}
  
  function handlePropFindReply(reply) {
    var xml = reply.responseXML;
    var elements = xml.getElementsByTagName('prop');

    // Get the left-over disk space
    var availElements = xml.getElementsByTagName('pcmi:availbytes');
    if (availElements.length == 0) { // Some browsers need a different tag name
      availElements = xml.getElementsByTagName('availbytes');
    }
    if (availElements.length > 0) {
      var sysInfo = new pcmi.SystemInfo(); //get singleton instance
      sysInfo.availBytes = getNodeText(availElements[0]);
      sysInfo.drawSpaceLeft();
    }
    
    fileItems.splice(0, fileItems.length); //clear the array
    for (var i = 0; i < elements.length; ++i) {
      var nodes = elements[i].childNodes;
      var item = new pcmi.FileItem("");
      
      for (var j = 0; j < nodes.length; ++j) {
        var node = nodes[j];
        var nodeName = getNodeName(node);
        var nodeText = getNodeText(node);
        
        if(nodeName == "displayname") {
          if (nodeText.charAt(dirPath.length) == '/') {
            item.name = nodeText.substring(dirPath.length+1, nodeText.length);
          } else {
            item.name = nodeText.substring(dirPath.length, nodeText.length);
          }
          item.path = dirPath;
        }
        else if (nodeName == "getcontentlength" && nodeText != "") {
          item.size = nodeText;
        }
        else if(nodeName == "getlastmodified" && nodeText != "") {
          item.modified = nodeText;
        }
        else if(nodeName == "voicename"  && nodeText != "") {
          item.voiceName = nodeText;
        }
        else if(nodeName == "voicegender"  && nodeText != "") {
          item.voiceGender = nodeText;
        }
        else if(nodeName == "voiceflag"  && nodeText != "") {
          item.voiceFlag = nodeText;
        }
      } //end of tags loop

      if (dirPath != item.name && item.name !="")     
        fileItems.push(item);    
    }
    
    fileItems.sort(sortAlgorithm);
    
    dataReady = true;
    if (listener)
      listener.notifyDataReady();
  }
  
  function sortFileItems(itemA, itemB) {
    var aUpper = String(itemA.name).toUpperCase();
    var bUpper = String(itemB.name).toUpperCase();
  
    if (aUpper > bUpper) return 1
    else if (bUpper > aUpper) return -1
    else return 0  
  }
  
  function getNodeName(node) {
    if (node.nodeName)
      return node.nodeName;
    else if (node.localName)
      return node.localName;
  }
  
  function getNodeText(node) {
    if (node.text)
      return node.text;
    else if (node.textContent)
      return node.textContent;
  }
}

/**
 * Class declaration pcmi.FileListViewer
 *
 * 
 */
pcmi.FileListViewer = function(dir, tableId, varId, sortAlgorithm) {
	var dataProvider = new pcmi.FileListProvider(dir, this);
  var translationProvider = new pcmi.TranslationProvider();
  
  if (sortAlgorithm) {
    dataProvider.setSortAlgorithm(sortAlgorithm);
  }
  
  if (dataProvider.isDataReady() && translationProvider.isDataReady()) {
    draw();
  } else {
    translationProvider.addListener(this);
  }
  
	var table = document.getElementById(tableId);
  var btnType = {"remove":0, "copy":1};
  var varName = varId;
  
	this.notifyDataReady = function() {
    if (dataProvider.isDataReady() && translationProvider.isDataReady())
      draw();
  }
  
  this.buttonPressed = function(type, rowIdx) {
    
    var fileItem = dataProvider.getFileItemAtIndex(rowIdx);
    var numberOfAssociatedFiles=0;
      
    //analysis for merged list positions (like in case of voices)
    if ((fileItem.name.search(/\.(vif)$/i) > 0) && (varName == "voiceList"))
    {        
      if ((rowIdx >= 1) && (dataProvider.getFileItemAtIndex(rowIdx-1).name == fileItem.name.replace(".vif",".chk")))
      {
        numberOfAssociatedFiles++;
          
        if ((rowIdx >= 2) && (dataProvider.getFileItemAtIndex(rowIdx-2).name == fileItem.name.replace(".vif",".bmp")))
        {
          numberOfAssociatedFiles++;
        }
      }
    }
    else if ((fileItem.name.search(/\.(ov2|ogg|rpf|vif)$/i) > 0) && (varName == "poiList"))
    {
      if ((rowIdx >= 1) && (dataProvider.getFileItemAtIndex(rowIdx-1).name == fileItem.name.replace(/\.(ov2|ogg|rpf|vif)$/i,".bmp")))
      {
        numberOfAssociatedFiles++;
      }
    }
  
    switch (type) {
      case btnType.remove:
        if (confirm(translationProvider.getLocalizedString("questions", "PCMIQueryRemoveContent"))) {
          startProgressScreen();
          while(numberOfAssociatedFiles>=0)
          {
            dataProvider.removeFile(rowIdx-numberOfAssociatedFiles, handleError);
            numberOfAssociatedFiles--;    
          }
        }
        break;
      case btnType.copy:
        while(numberOfAssociatedFiles>=0)
        {
          dataProvider.getFile(rowIdx-numberOfAssociatedFiles);
          numberOfAssociatedFiles--;
        }
        break;
    }
  }

  this.keyPressed = function(type, rowIdx, event){
    var keynum=0;

    if(event.keyCode)
    {
      keynum=event.keyCode;
    }    
    else if(e.keyCode)
    {
      keynum=e.keyCode;
    }

    if(keynum == 13)
    {
      this.buttonPressed(type, rowIdx);
    }
  }
  
  
  this.onUploadEvent = function(hiddenFrameId, toolBarId, fileInputId, displayId) {
    stopProgressScreen();
    
    //do error checking
    var frame = window.frames[hiddenFrameId];
    if (frame) {
      var html = frame.document.body.innerHTML;
      if (html != "") {
        searchAndReportError(html);
      }
      
      //reset displayed selected file(s) to empty
      if (fileInputId != undefined) {
        var fileInput = document.getElementById(fileInputId);
        fileInput.parentNode.innerHTML = fileInput.parentNode.innerHTML;
        this.onFileInputChanged(fileInputId, displayId, toolBarId);
      }
    }
    
    dataProvider.refreshData();
  }
  
  this.onFileInputChanged = function(inputId, displayId, toolBarId) {
		if (inputId && displayId) {
      var fileString = "";
      var maxLength  = 60;
      if (window.File && window.FileList) {
        var file_list = document.getElementById(inputId).files;
        for (var i=0,file;file=file_list[i];i++) {
          if ('name' in file) {
            fileString += file.name;
          } else {
            fileString += file.fileName;
          }
          if (i < file_list.length - 1) {
            fileString += ", ";
          }
        }
      } else {
        fileString += getFilename(document.getElementById(inputId).value);
      }
      
      if (fileString != "") {
        if (fileString.length > maxLength) {
          fileString = fileString.substring(0, maxLength)+"...";
        }
        document.getElementById(displayId).innerHTML = fileString;
      }
      
      if (toolBarId) {
        var toolbar = document.getElementById(toolBarId);
        var uploadBtn = toolbar.children[0];
        if (fileString != "") {
          activateButton(uploadBtn);
		  uploadBtn.focus();
        } else {
          document.getElementById(displayId).innerHTML = "";
          deActivateButton(uploadBtn);
        }
      }
    }
  }
  
  this.isValidFile = function(formId, dataType) {
    if (formId && dataType) {
      var form = document.getElementById(formId);
      if (form) {
        var fileNames = new Array();
        if (window.File && window.FileList) {
          var file_list = form.file.files;
          for (var i=0,file;file=file_list[i];i++) {
            if ('name' in file) {
              fileNames.push(file.name);
            } else {
              fileNames.push(file.fileName);
            }
          }
        } else {
          var filename = getFilename(form["file"].value);
          if (filename != "")
            fileNames.push(filename);
        }
        
        if (fileNames.length == 0)
          return false; //no files were selected
        
        var containsZippedFiles = false;
        var invalid = new Array();
        var exists = new Array();
        for (var i=0; i<fileNames.length; ++i) {
          var filename = fileNames[i];
          if (filename == "")
            return false;
          
          //check file validity
          if (!isValidExtension(dataType, filename)) {
            invalid.push(filename);
          } else if (dataProvider.fileExists(filename)) {
            exists.push(filename);
          }
        }
        
        //do error reporting
        if (invalid.length > 0) { //invalid files found
          var msg;
          if (containsZippedFiles) {
            if (fileNames.length > 1) { //multiple files selected
              msg = translationProvider.getLocalizedString("messages", "PCMIUnsupportedZipFiles");
              for (var i=0; i<invalid.length; ++i) {
                if (i == 0) msg += "\n";
                msg += invalid[i]+"\n";
              }
            } else { //single file selected
              msg = translationProvider.getLocalizedString("errors", "PCMIErrorUnzip");
            }
          } else { //no zipped files amongst selection
            if (fileNames.length > 1) { //multipe files selected
              msg = translationProvider.getLocalizedString("messages", "PCMIUnsupportedFiles");
              for (var i=0; i<invalid.length; ++i) {
                if (i == 0) msg += "\n";
                msg += invalid[i]+"\n";
              }
            } else { //single file selected
              msg = translationProvider.getLocalizedString("errors", "PCMIErrorInvalidContent");
            }
          }
          alert(msg);
          return false;
        } else if (exists.length > 0) { //no invalid files, but at least one already existing file
          var msg;
          if (fileNames.length > 1) { //multiple files selected
            msg = translationProvider.getLocalizedString("questions", "PCMIQueryOverwriteFiles");
            for (var i=0; i<exists.length; ++i) {
              if (i == 0) msg += "\n";
              msg += exists[i]+"\n";
            }
          } else { //single file selection
            msg = translationProvider.getLocalizedString("questions", "PCMIQueryOverwriteFile");
          }
          
          if (!confirm(msg)) {
            return false;
          }
        }
        startProgressScreen();
        return true; //everything is Ok
      }
      
      return false;
    }
    
    return false; //invalid call
  }
  
  function startProgressScreen() {
    var progressScreen = document.getElementById("progressScreen");
    var progressInfo   = document.getElementById("progressInfo");
    if (progressScreen && progressInfo) {
      progressScreen.style.visibility = "visible";
      progressInfo.style.visibility = "visible";
    }
  }
  
  function stopProgressScreen() {
    var progressScreen = document.getElementById("progressScreen");
    var progressInfo   = document.getElementById("progressInfo");
    if (progressScreen && progressInfo) {
      progressScreen.style.visibility = "hidden";
      progressInfo.style.visibility = "hidden";
    }
  }
  
  function activateButton(btn) {
		if (btn && btn.className == "uploadToolBarButtonInActive") {
			btn.className = "uploadToolBarButtonActive";
		}
	}
	
	function deActivateButton(btn) {
		if (btn && btn.className == "uploadToolBarButtonActive") {
			btn.className = "uploadToolBarButtonInActive";
		}
	}
  
  function getFilename(fullPath) {
    var filename = "";
    if (fullPath) {
      fullPath = fullPath.replace(/\\/g, "/"); //only use forward slash separators
      var lastSlashIdx = fullPath.lastIndexOf('/');
      if (lastSlashIdx != -1) {
        filename = fullPath.substr(lastSlashIdx+1);
      } else {
        filename = fullPath;
      }
    }
    return filename;
  }
  
  function isValidExtension(dataType, filename) {
    switch (dataType) {
      case "poi":     return filename.search(/\.(ov2|bmp|ogg|rpf|vif|zip)$/i) > 0;
      case "colour":  return filename.search(/\.(clr|ver|zip)$/i) > 0;
      case "vehicle": return filename.search(/\.(bmp|ver|zip)$/i) > 0;
      case "warning": return filename.search(/\.(ogg|ver|wav|zip)$/i) > 0;
      case "image":   return filename.search(/\.(bmp|jpg|ver|zip)$/i) > 0;
      case "voice":   return filename.search(/\.(bmp|chk|vif|zip)$/i) > 0;
      default:
        return false;
    }
  }
  
  function isZipFile(filename) {
    return filename.search(/\.zip$/i) > 0;
  }
  
  function handleError(reply) {
    stopProgressScreen();
    if (reply) {
      searchAndReportError(reply.responseText);
    }
  }
  
  function searchAndReportError(content) {
    if (content.search(/BUSY/i) > 0)
      alert(translationProvider.getLocalizedString("errors", "PCMIErrorMyTomTomBusy"));
    else if (content.indexOf("507") > 0 || content.search(/SIZE/i) > 0)
      alert(translationProvider.getLocalizedString("errors", "PCMIErrorNotEnoughSpace"));
    else if (content.search(/RESTRICT_FILENAME/i) > 0)
      alert(translationProvider.getLocalizedString("errors", "PCMIErrorInvalidContent"));
    else if ((content.search(/RESTRICT_FORBIDDEN_CONTENT/i) > 0) || (content.search(/RESTRICT_INCOMPATIBLE_CONTENT/i) > 0))
      alert(translationProvider.getLocalizedString("errors", "PCMIErrorForbiddenContent"));
    else if (content.indexOf("404") > 0 || content.search(/NOT FOUND/i) > 0)
      alert(translationProvider.getLocalizedString("errors", "PCMIErrorFileNotFound"));
    else if (content.indexOf("200") == 0 || content.indexOf("207") == 0)
      alert(translationProvider.getLocalizedString("errors", "PCMIErrorUnknown"));
  }
  
  // function to escape special XML characters
  function htmlEncode(text) {
    var text_new = text.replace(/&/g, "&amp;");
    text_new = text_new.replace(/</g, "&lt;");
    text_new = text_new.replace(/>/g, "&gt;");

    return text_new;
  }
  
  function fitString(string, maxLength) {
    var result = string;
    if (string.length > maxLength) {
      var surplus = string.length - maxLength;
      var sequenceLength = maxLength/2;
      result = string.substring(0, sequenceLength)+"..."+string.substring(sequenceLength+surplus, string.length);
    }
    return result;
  }
  
  function draw() {
    if (table) {
      var html = "";
      var fileItem = null;
      
      var newRow = null;
      var newCell = null;
      var nFiles = dataProvider.listSize();
      var filename = "";
      var fileSize = 0;
      
      var rowsSkipped=0;
      var rowIndex=0;
      
      var columnCount=5;
      var columnOffset=0;
      var filenameFieldStyle="filenameField";
      if (varName == "voiceList")
      {
        columnCount=6;
        columnOffset=1;
        filenameFieldStyle="narrowFilenameField";
      }
      
      //var voiceHead = {"iconVoiceFemY":0, "iconVoiceFemO":1, "iconVoiceMal":2};
      var voiceHeadIcon = new Array();
      voiceHeadIcon.push("SilFem.bmp");
      voiceHeadIcon.push("SilFemOld.bmp");
      voiceHeadIcon.push("SilMale.bmp");
      
      if (nFiles > 0) {
        var fileIndex = 0;
        for (; fileIndex<nFiles; ++fileIndex) {
          fileItem = dataProvider.getFileItemAtIndex(fileIndex);
          
          filename = fitString(fileItem.name, 26);
          
          if (varName == "voiceList")
          {
              if ((filename.search(/\.(chk)$/i) > 0) && (fileIndex < nFiles-1))  //if its a .chk withan associated .vif file, dont show it on the list
              {
                if (dataProvider.getFileItemAtIndex(fileIndex+1).name.replace(".vif",".chk") == filename)
                {
                  rowsSkipped++;
                  continue;
                }
              }
              else if ((filename.search(/\.(bmp)$/i) > 0) && (fileIndex < nFiles-2))
              {
                if ((dataProvider.getFileItemAtIndex(fileIndex+1).name.replace(".chk",".bmp") == filename) 
                    && (dataProvider.getFileItemAtIndex(fileIndex+2).name.replace(".vif",".bmp") == filename))
                {
                  rowsSkipped++;
                  continue;
                }
              }
          }
          else if (varName == "poiList")
          {
            if ((filename.search(/\.(bmp)$/i) > 0) && (fileIndex < nFiles-1))
            {
              if (dataProvider.getFileItemAtIndex(fileIndex+1).name.replace(/\.(ov2|ogg|rpf|vif)$/i,".bmp") == filename)
              {
                rowsSkipped++;
                continue;
              }
            }
          }
          
          rowIndex=fileIndex-rowsSkipped;
          
          newRow = replaceRow(rowIndex);          
        
          if (rowIndex%2 == 0)
            newRow.className = "oddRow";
          else
            newRow.className = "evenRow";
			
          newCell = newRow.insertCell(0);
          newCell.className = "tabbing";
          
		  newCell = newRow.insertCell(1);
          
          switch (varName)
		  {
			case "poiList":
              if ((filename.search(/\.(ov2|ogg|rpf|vif)$/i) > 0) && dataProvider.fileExists(filename.replace(/\.(ov2|ogg|rpf|vif)$/i,".bmp")))
              {
                newCell.innerHTML="<img class='thumbnail' src='/personal/pois/"+htmlEncode(filename.replace(/\.(ov2|ogg|rpf|vif)$/i,".bmp"))+"' alt='.'/>";
              }
              else
              {
			    newCell.innerHTML="<img class='thumbnail' src='img/pcmi_poi_thumb.PNG' alt='.'/>";
              }
			break;
			
			case "voiceList":
              if ((filename.search(/\.(vif)$/i) > 0) && (fileIndex >= 1) && (dataProvider.getFileItemAtIndex(fileIndex-1).name == filename.replace(".vif",".chk")))
              {
                if ((fileIndex >= 2) && (dataProvider.getFileItemAtIndex(fileIndex-2).name == filename.replace(".vif",".bmp")))
                {
                  newCell.innerHTML="<img class='thumbnail' src='/personal/voices/"+htmlEncode(filename.replace(".vif",".bmp"))+"' alt='.'/>";
                }
                else if (fileItem.voiceGender)
                {
                  var voiceGender=fileItem.voiceGender%3;
                  newCell.innerHTML="<img class='thumbnail' src='img/"+voiceHeadIcon[voiceGender]+"' alt='.'/>";
                }
                else
                {
                  newCell.innerHTML="<img class='thumbnail' src='img/pcmi_voice_thumb.PNG' alt='.'/>";
                }
                
                newCell = newRow.insertCell(2);
                
                if (fileItem.voiceFlag)
                {
                  newCell.innerHTML="<img class='thumbnail' src='img/"+fileItem.voiceFlag+".png' alt='.'/>";
                }
                else
                {
                  newCell.innerHTML="<img class='thumbnail' src='img/pcmi_voice_flag_thumb.PNG' alt='.'/>";
                }
              }
              else
              {
                newCell.innerHTML="<img class='thumbnail' src='img/pcmi_voice_thumb.PNG' alt='.'/>";
                newCell = newRow.insertCell(2);
                newCell.innerHTML="<img class='thumbnail' src='img/pcmi_voice_flag_thumb.PNG' alt='.'/>";
              }
			break;
			
			case "colourList":
			  newCell.innerHTML="<img class='thumbnail' src='img/pcmi_colour_thumb.PNG' alt='.'/>";
			break;
			
			case "imageList":
			  newCell.innerHTML="<img class='thumbnail' src='/personal/photos/"+htmlEncode(filename)+"' alt='.'/>";
			break;
			
			case "vehicleList":
			  newCell.innerHTML="<img class='thumbnail' src='/personal/cars/"+htmlEncode(filename)+"' alt='.'/>";
			break;
			
			case "warningList":
			  newCell.innerHTML="<img class='thumbnail' src='img/pcmi_warning_thumb.PNG' alt='.'/>";
			break;
		  }
        
          newCell = newRow.insertCell(2+columnOffset);
          newCell.className = filenameFieldStyle;
          if ((fileItem.voiceName) && dataProvider.fileExists(fileItem.name.replace(".vif",".chk")))
          {
            filename = fitString(fileItem.voiceName, 26);
          }
          else
          {
            filename = fitString(fileItem.name, 26);
          }
          newCell.innerHTML = htmlEncode(filename);
        
          newCell = newRow.insertCell(3+columnOffset);
          newCell.className = "sizeField";
          fileSize = Math.round(fileItem.size/1024);          
          if ((fileItem.name.search(/\.(vif)$/i) > 0) && (varName == "voiceList"))
          {        
            if (fileIndex >= 1)
            {
              var fileItem2 = dataProvider.getFileItemAtIndex(fileIndex-1);
              if (fileItem2.name == fileItem.name.replace(".vif",".chk"))
              {
                fileSize += Math.round(fileItem2.size/1024);
                            
                if (fileIndex >= 2)
                {
                  var fileItem3 = dataProvider.getFileItemAtIndex(fileIndex-2);
                  if (fileItem3.name == fileItem.name.replace(".vif",".bmp"))
                  {
                    fileSize += Math.round(fileItem3.size/1024);
                  }
                }
              }
            }            
          }
          else if ((fileItem.name.search(/\.(ov2|ogg|rpf|vif)$/i) > 0) && (varName == "poiList"))
          {
            if (fileIndex >= 1)
            {
              var fileItem2 = dataProvider.getFileItemAtIndex(fileIndex-1);
              if (fileItem.name.replace(/\.(ov2|ogg|rpf|vif)$/i,".bmp") == fileItem2.name)
              {
                fileSize += Math.round(fileItem2.size/1024);
              }
            }
          }
          
          newCell.innerHTML = (fileSize > 0 ? fileSize : 1) + " KB";
        
          newCell = newRow.insertCell(4+columnOffset);
          newCell.className = "buttonField";
          newCell.innerHTML = button(btnType.copy, fileIndex); //buttons float right so do rightmost first
          
          var lowCaseName = fileItem.name.toLowerCase();
          if (lowCaseName != "favorites.ov2") { //hack: Favorites.ov2 should not be removable
            newCell.innerHTML += button(btnType.remove, fileIndex);
          }
        }
    
        rowIndex=fileIndex-rowsSkipped;
        
        //table always ends with row containing just the separating hairline
        newRow = replaceRow(rowIndex++); //increase rowIndex for surplus deletion below
        newRow.className = "emptyRow";
        newRow.insertCell(0).colSpan = columnCount;
      
        //when updating after a delete action, the list might be longer than
        //the list of files to display. Delete the surplus...
        for (;rowIndex<table.rows.length;++rowIndex)
          table.deleteRow(rowIndex);
      } else {
        newRow = replaceRow(0);
        newCell = newRow.insertCell(0);
        newCell.className = "noContent";
        newCell.innerHTML = translationProvider.getLocalizedString("messages", "PCMIMessageNoItemInstalled");
      }
    }
    stopProgressScreen();
  }
  
  function replaceRow(rowIdx) {
    if (table.rows[rowIdx])
      table.deleteRow(rowIdx);
    return table.insertRow(rowIdx);
  }
  
  function button(type, rowIdx) {
    var html = "";
    var label = "";
    
    html += "<div class='button' style='float: right;' onclick='"+varName+".buttonPressed("+type+", "+rowIdx+")' tabindex=1 onkeypress='"+varName+".keyPressed("+type+", "+rowIdx+", event)' >";
    if (type == btnType.remove) {
      html += "<img class='buttonLeft' src='img/remove_button_left.png' alt='.' />";
      html +=	"<div class='buttonMiddle' style='padding-left: 8px'>";
      html += "<span class='buttonLabel'>"+getLabelForType(type)+"</span></div>";
      html += "<img class='buttonRight' src='img/action_button_right.png' alt='.' />";
    } else {
      html += "<img class='buttonLeft' src='img/action_button_left.png' alt='.' />";
      html +=	"<div class='buttonMiddle' style='padding-right: 8px'>";
      html += "<span class='buttonLabel'>"+getLabelForType(type)+"</span></div>";
      html += "<img class='buttonRight' src='img/copy_button_right.png' alt='.' />";
		}   
		html += "</div>";
    
    return html;
  }
  
  function getLabelForType(type) {
    var result = "";
    switch (type) {
      case btnType.remove:
        result = translationProvider.getLocalizedString("labels", "PCMIButtonRemove");
        break;
      case btnType.copy:
        result = translationProvider.getLocalizedString("labels", "PCMIButtonBackup");
        break;
    }
    return result;
  }  
}

pcmi.TextWriter = function() {
  var translationProvider = new pcmi.TranslationProvider();
  
  if (translationProvider.isDataReady()) {
    draw();
  } else {
    translationProvider.addListener(this);
  }
  
  this.notifyDataReady = function() {
    draw();
  }
  
  //helper function for writing correct text on "Add More" button
  this.writeAddMoreButtonText = function(element, dataType) {
    if (translationProvider.isDataReady()) {
      element.innerHTML = getAddButtonLabel(dataType);
    }
  }
  
  function getAddButtonLabel(dataType) {
    switch (dataType) {
      case "poi":     return translationProvider.getLocalizedString("labels", "PCMIButtonAddPoi");
      case "colour":  return translationProvider.getLocalizedString("labels", "PCMIButtonAddColourScheme");
      case "vehicle": return translationProvider.getLocalizedString("labels", "PCMIButtonAddVehicle");
      case "voice":   return translationProvider.getLocalizedString("labels", "PCMIButtonAddVoice");
      case "warning": return translationProvider.getLocalizedString("labels", "PCMIButtonAddWarningSound");
      case "image":   return translationProvider.getLocalizedString("labels", "PCMIButtonAddImage");
    }
  }
  
  function draw() {
    if (translationProvider.isDataReady()) {
      var elements = document.getElementsByTagName('*');
      for (var i=0; i<elements.length; ++i) {
        if (elements[i].className)
          drawClassName(elements[i]);
        if (elements[i].id)
          drawIdName(elements[i]);
      }
    }
  }
  
  function drawIdName(element) {
    var textContent = "";
    switch (element.id) {
      case "updatingString":
        textContent = translationProvider.getLocalizedString("messages", "PCMIProgressScreenUpdating"); break;
      case "waitingString":
        textContent = translationProvider.getLocalizedString("messages", "PCMIProgressScreenPleaseWait"); break;
      case "freeSpaceLabel":
        textContent = translationProvider.getLocalizedString("labels", "PCMIHeaderFreeSpace"); break;
      case "helpLabel":
        textContent = translationProvider.getLocalizedString("labels", "PCMIButtonHelp"); break;
      case "pcmiTitle":
        textContent = translationProvider.getLocalizedString("labels", "PCMIHeaderPage"); break;
      case "poiHeader":
        textContent = translationProvider.getLocalizedString("labels", "PCMIHeaderPoiSection"); break;
      case "voicesHeader":
        textContent = translationProvider.getLocalizedString("labels", "PCMIHeaderVoicesSection"); break;
      case "coloursHeader":
        textContent = translationProvider.getLocalizedString("labels", "PCMIHeaderColoursSection"); break;
      case "vehiclesHeader":
        textContent = translationProvider.getLocalizedString("labels", "PCMIHeaderVehiclesSection"); break;
      case "warningsHeader":
        textContent = translationProvider.getLocalizedString("labels", "PCMIHeaderWarningsSection"); break;
      case "imagesHeader":
        textContent = translationProvider.getLocalizedString("labels", "PCMIHeaderImagesSection"); break;
      case "ButtonLabelAddPOI":
        textContent = getAddButtonLabel("poi"); break;
      case "ButtonLabelAddColour":
        textContent = getAddButtonLabel("colour"); break;
      case "ButtonLabelAddVehicle":
        textContent = getAddButtonLabel("vehicle"); break;
      case "ButtonLabelAddWarning":
        textContent = getAddButtonLabel("warning"); break;
      case "ButtonLabelAddVoice":
        textContent = getAddButtonLabel("voice"); break;
      case "ButtonLabelAddImage":
        textContent = getAddButtonLabel("image"); break;
    }
    if (textContent != "") {
      element.innerHTML = textContent;
      
      // Title of page does not always fit on one line... If so, shrink the font
      if (element.id == "pcmiTitle") {
        var titleDiv = document.getElementById(element.id);
        if (titleDiv.clientWidth > 620)
          titleDiv.style.fontSize = '18px';
      }
    }
  }
  
  function drawClassName(element) {
    switch (element.className) {
      case "uploadAreaTitle":
        element.innerHTML = "<h2>"+translationProvider.getLocalizedString("labels","PCMIHeaderFileName")+"</h2>"; 
        break;
      case "ButtonLabelBrowse":
        element.innerHTML = translationProvider.getLocalizedString("labels", "PCMIButtonBrowse"); 
        break;
      case "ButtonLabelUpload":
        element.innerHTML = translationProvider.getLocalizedString("labels", "PCMIButtonInstall");
        break;
    }
  }
}

pcmi.FormViewer = function(dataType, action, listId, uploadAreaId) {
  var translationProvider = new pcmi.TranslationProvider();  
  var _dataType = dataType;
  var _action = action;
  var _listId = listId;
  var _uploadAreaId = uploadAreaId;
  var formCurHeight = 0;
  var formFinalHeight = 110;
  var formAnimStepSize = 4;
  var formAnimTimeOut = 10;
  
  if (translationProvider.isDataReady()) {
    draw();
  } else {
    translationProvider.addListener(this);
  }
  
  this.notifyDataReady = function() {
    draw();
  }
  
  this.toggleUploadArea = function(area, button, dataType, varName, event) {
	var keynum=0;
	var mouseclick=false;

	if(event.type == "click")
	{
		mouseclick=true;
	}
	else if (event.type == "keypress")
	{
	  if(event.keyCode)
      {
        keynum=event.keyCode;
      }
	}    
	
    if ((mouseclick == true) || (keynum == 13))
	{
      if (formCurHeight > 0) {
        this.collapseUploadArea(area, button, dataType, varName);
      } else {
        this.expandUploadArea(area, button, dataType, varName);
      }
	}
  }
  
  this.expandUploadArea = function(area, button, dataType, varName) {
    document.getElementById(area).style.height = formCurHeight+ "px";
    if (formCurHeight < formFinalHeight) {
      formCurHeight += formAnimStepSize;
      setTimeout(varName+".expandUploadArea('"+area+"','"+button+"','"+dataType+"','"+varName+"')", formAnimTimeOut);
    } else {
      var btn = document.getElementById(button);
      var labelIdx = btn.children.length -1; //last element of button is label
      btn.children[0].src = "img/close_minus.png";
      btn.children[labelIdx].innerHTML = translationProvider.getLocalizedString("labels", "PCMIButtonClose");

      document.getElementById(getTemplateVarValue("$(inputField)")).tabIndex=1;
      document.getElementById(getTemplateVarValue("$(installButton)")).tabIndex=1;
	  document.getElementById(getTemplateVarValue("$(inputField)")).focus();
    }
  }
  
  this.collapseUploadArea = function(area, button, dataType, varName) {
    document.getElementById(area).style.height = formCurHeight+ "px";
    if (formCurHeight > 0) {
      formCurHeight -= formAnimStepSize;
      setTimeout(varName+".collapseUploadArea('"+area+"','"+button+"','"+dataType+"','"+varName+"')", formAnimTimeOut);
    } else {
      var btn = document.getElementById(button);
      var labelIdx = btn.children.length -1; //last element of button is label
      btn.children[0].src = "img/add_plus.png";
      textWriter.writeAddMoreButtonText(btn.children[labelIdx], dataType);

      document.getElementById(getTemplateVarValue("$(inputField)")).tabIndex=-1;
      document.getElementById(getTemplateVarValue("$(installButton)")).tabIndex=-1;
    }
  }
  
  function isValidAction() {
    return true;
  }
  
  function isValidDataType() {
    return true;
  }
  
  function draw() {
    var html = document.getElementById("formTemplate").innerHTML;
    var regex = /\$\([a-z][a-z]*\)/gi;
    var results = html.match(regex);
   
    for (var i=0; i<results.length; ++i) {
      html = html.replace(results[i], getTemplateVarValue(results[i]));
    }
    
    var uploadArea = document.getElementById(_uploadAreaId);
    uploadArea.innerHTML = html;
    
    var frameId = getTemplateVarValue("$(TargetIFrame)");
    var toolBarId = getTemplateVarValue("$(ToolbarId)");
    var browseButtonId = getTemplateVarValue("$(BrowseButtonId)");
    var displayId = getTemplateVarValue("$(FileSelectDisplay)");
    var hiddenIframe = uploadArea.children[0];
    
    //IE7 and lower will not allow us to set the "onload" event using "setAttribute". As the latter
    //method is preferred, we only do it in an alternative fashion for IE7 (or lower)
    if (navigator.appName == "Microsoft Internet Explorer" && getInternetExplorerVersion() < 8) {
      hiddenIframe.attachEvent("onload", function() {
          var vr = eval(_listId);
          vr.onUploadEvent(frameId, toolBarId, browseButtonId , displayId);
        });
    } else {
      //Use preferred method
      hiddenIframe.setAttribute("onload", _listId+".onUploadEvent('"+frameId+"','"+toolBarId+"','"+browseButtonId+"','"+displayId+"')");
    }
  }
  
  function getInternetExplorerVersion() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
      var ua = navigator.userAgent;
      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
        rv = parseFloat( RegExp.$1 );
    }
    return rv;
  }

  function getTemplateVarValue(templateVar) {
    var result = "";
    switch (templateVar) {
      case "$(FormId)":            result = _dataType+"Form"; break;
      case "$(Action)":            result = _action; break;
      case "$(TargetIFrame)":      result = _dataType+"HiddenFrame"; break;
      case "$(ToolbarId)":         result = _dataType+"ToolBar"; break;
      case "$(BrowseButtonId)":    result = _dataType+"BrowseButton"; break;
      case "$(FileSelectDisplay)": result = _dataType+"SelectDisplay"; break;
      case "$(UploadButtonId)":    result = _dataType+"UploadButton"; break;
      case "$(HiddenFrameId)":     result = _dataType+"HiddenFrame"; break;
      case "$(ListId)":            result = _listId; break;
      case "$(DataType)":          result = _dataType; break;
      case "$(installButton)":	result = _dataType+"InstallButton"; break;
      case "$(inputField)":  	result = _dataType+"InputField"; break;      
      default:                     result = "";
    }
    return result;
  }

  this.keyPress = function(event, button){    
    var keynum=0;
	
    if(event.keyCode)
    {
      keynum=event.keyCode;
    }    
    else if(e.keyCode)
    {
      keynum=e.keyCode;
    }

    if(keynum == 13)
    {
      if(button == 0)
      {
        document.getElementById(getTemplateVarValue("$(BrowseButtonId)")).click();
      }
      else if(button == 1)
      {
        document.getElementById(getTemplateVarValue("$(UploadButtonId)")).click();
      }
    }
  }

}

function sortPOIFileItems(itemA, itemB) {
  var aUpper = String(itemA.name).toUpperCase();
  var bUpper = String(itemB.name).toUpperCase();

  if (aUpper == "FAVORITES.OV2") {
    return -1;
  } else if (bUpper == "FAVORITES.OV2") {
    return 1;
  }
  if (aUpper > bUpper) return 1;
  else if (bUpper > aUpper) return -1;
  else return 0;
}

function resetAllFileInput() {
  var inputs = document.getElementsByTagName("input");
  for (var i=0; i<inputs.length; ++i) {
    inputs[i].value = "";
  }
}

function openHelpLink(event){
  var keynum=0;
	
  if(event.keyCode)
  {
    keynum=event.keyCode;
  }
  else if(e.keyCode)
  {
    keynum=e.keyCode;
  }

  if(keynum == 13)
  {
    window.open(document.getElementById("helpLink").href, '_blank');
  }
}
