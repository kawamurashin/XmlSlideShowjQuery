ModelManager = (function () {
    var ModelManager = function () {
        this.setup();
    };
    var p = ModelManager.prototype;
    p.setup = function () {
        this.init();
    };
    p.init = function () {
    };

    p.loadStart = function () {
        var path = "data/data.xml?random=" + Math.random();
        $.ajax(path, {
            "complete": function (e) {
                p.modelLoadImage(e)
            }
        });
    };

    p.modelLoadImage = function (e) {
        var data = e.responseText; // 外部ファイルの内容
        var dpObj = new DOMParser();
        var xml = dpObj.parseFromString(data, "text/xml");
        var sceneNodeList = xml.getElementsByTagName("scene");
        this.sceneDataList = [];
        var n = sceneNodeList.length;
        for (var i = 0; i < n; i++) {
            var sceneNode = sceneNodeList[i];
            var sceneData = new SceneData();
            sceneData.setXml(sceneNode);
            this.sceneDataList.push(sceneData);
        }
        this.loadImage();
    };

    p.loadImage = function () {
        this._imageCount = 0;
        this._sceneCount = 0;
        this.initSceneLoad();
    };

    p.initSceneLoad = function () {
        this._imageCount = 0;
        this.setSceneLoad();
    };

    p.setSceneLoad = function() {
        //_modelManager.sceneDataList[_sceneCount];
        this.initImageLoad();
    };

    p.initImageLoad = function() {
        this._imageCount = 0;
        this.setImageLoad();
    };
    p.setImageLoad = function () {
        function onComplete() {
            p.imageLoadCompleteHandler();
        }

        var sceneData = this.sceneDataList[this._sceneCount];
        var imageData = sceneData.ImageDataList[this._imageCount];
        var path = imageData.Path;
        imageData.Image = new Image();
        imageData.Image.onload = onComplete;
        imageData.Image.src = path;
    };
    p.imageLoadCompleteHandler = function () {
        this._imageCount++;
        if (this._imageCount >= this.sceneDataList[this._sceneCount].ImageDataList.length) {
            this.sceneImageLoadComplete();
        }
        else {
            this.setImageLoad();
        }
    };
    p.sceneImageLoadComplete = function () {
        this._sceneCount++;
        if(this._sceneCount >= this.sceneDataList.length)
        {
            this.loadComplete();
        }
        else
        {
            this.setSceneLoad();
        }
    };

    p.loadComplete = function () {
        var event;
        try {
            event = new Event("complete");
        } catch (e) {
            event = document.createEvent('Event');
            event.initEvent('complete', false, false);
        }
        var elm = document.getElementById("main_container");
        elm.dispatchEvent(event);
    };

    p.getSceneDataList = function () {
        return this.sceneDataList;
    };

    return ModelManager;
})();