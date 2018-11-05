ControllerManager = (function () {
    var ControllerManager = function () {
        this.setup();
    };
    var p = ControllerManager.prototype;
    p.setup = function () {
        this.init();
    };
    p.init = function () {

    };
    p.start = function()
    {
        var instance = this;
        function eventHandler(e)
        {
            instance.xmlLoadCompleteHandler(e);
        }
        var elm = document.getElementById("main_container");
        elm.addEventListener("complete", eventHandler);
        this._modelManager = new ModelManager;
        this._modelManager.loadStart();
    };

    p.xmlLoadCompleteHandler = function (e) {
        var sceneDataList = this._modelManager.getSceneDataList();
        var viewManager = new ViewManager();
        viewManager.start(sceneDataList);
    };

    return ControllerManager;
})();