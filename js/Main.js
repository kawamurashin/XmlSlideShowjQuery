$.ajaxSetup({
    xhr: function () { // 使える場合はMicrosoft.XMLHTTP, 使えない場合はXMLHttpRequest
        try {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            return new XMLHttpRequest();
        }
    }
});
var controllerManager  = new ControllerManager();
controllerManager.start();