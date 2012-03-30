#!/bin/bash
wget --output-document="pois.html" http://169.254.255.1/pcmi/personal/pois
exit
        var poiList = new pcmi.FileListViewer("/personal/pois", "poiTable", "poiList", sortPOIFileItems);
        var poiForm = new pcmi.FormViewer("poi", "/personal/pois", "poiList", "uploadPOIArea");
        var voiceList = new pcmi.FileListViewer("/personal/voices", "voiceTable", "voiceList", null);
        var voiceForm = new pcmi.FormViewer("voice", "/personal/voices", "voiceList", "uploadVoicesArea");
        var colourList = new pcmi.FileListViewer("/personal/schemes", "colourTable", "colourList", null);
        var colourForm = new pcmi.FormViewer("colour", "/personal/schemes", "colourList", "uploadColoursArea");
        var imageList = new pcmi.FileListViewer("/personal/photos", "imageTable", "imageList", null);
      var imageForm = new pcmi.FormViewer("image", "/personal/photos", "imageList", "uploadImagesArea");
        var vehicleList = new pcmi.FileListViewer("/personal/cars", "vehicleTable", "vehicleList", null);
      var vehicleForm = new pcmi.FormViewer("vehicle", "/personal/cars", "vehicleList", "uploadVehiclesArea");
        var warningList = new pcmi.FileListViewer("/personal/sounds", "warningTable", "warningList", null);
      var warningForm = new pcmi.FormViewer("warning", "/personal/sounds", "warningList", "uploadWarningsArea");
