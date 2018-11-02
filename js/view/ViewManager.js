ViewManager = (function () {
    var ViewManager = function () {
        this.setup();
    };
    var p = ViewManager.prototype;
    p.setup = function () {
        this.init();
    };
    p.init = function () {
    };
    p.start = function(sceneDataList) {

        this.sceneDataList = sceneDataList;
        this._imageCount = 0;
        this._sceneCount = 0;

        this._mainContainer = document.getElementById('main_container');
        this.addScene();
    };

    p.addScene = function() {
        this._imageCount = 0;
        this._sceneData = this.sceneDataList[this._sceneCount];

        this._sceneContainer = document.createElement("div");
        this._sceneContainer.className = "container";

        this._imageContainer = document.createElement("div");
        this._sceneContainer.appendChild(this._imageContainer);

        var textDivision = document.createElement("div");
        textDivision.innerText = this._sceneData.Text;
        textDivision.className = "scene-text";
        this._sceneContainer.appendChild(textDivision);

        this._mainContainer.appendChild(this._sceneContainer);

        this.setSceneTween();
    };
    p.setSceneTween = function() {

        var instace = this;
        function eventHandler() {
            instace.sceneTweenCompleteHandler();
        }

        if(this._removeSceneContainer)
        {
            $(this._removeSceneContainer).css("top" ,"0px").animate({
                top : "-480px"
            }, 1200, "easeOutCubic");
            $(this._sceneContainer).css("top" ,"-480px").delay(800).animate({
                top: "0px"
            }, 1200, "easeOutCubic", eventHandler);
        }
        else
        {
            $(this._sceneContainer).css("top" ,"-480px").delay(800).animate({
                top: "0px"
            }, 1200, "easeOutCubic", eventHandler);
        }
    };
    p.sceneTweenCompleteHandler = function() {
        if(this._removeSceneContainer)
        {
            this._mainContainer.removeChild(this._removeSceneContainer);
            this._removeImageDivision =null;
        }
        this._removeSceneContainer  = this._sceneContainer;

        this.startImageTween();
    };

    p.addImage = function() {
        var imageData = this._sceneData.ImageDataList[this._imageCount];

        this._imageDivision = document.createElement("div");
        this._imageDivision.className = "image-container";
        this._imageDivision.appendChild(imageData.Image);

        this._imageContainer.appendChild(this._imageDivision);
        this.setImageTween();
    };

    p.startImageTween = function() {
        this.addImage();
    };

    p.setImageTween = function(){
        var instance = this;
        function eventHandler() {
            instance.imageTweenCompleteHandler();
        }
        if (this._removeImageDivision) {
            $(this._removeImageDivision).css("left" ,"0px").animate({
                left: "-640px",
                top : "0px"
            }, 1200, "easeInCubic");
            $(this._imageDivision).css("left" ,"640px").delay(800).animate({
                left: "0px",
                top : "0px"
            }, 1200, "easeOutCubic", eventHandler);
        }
        else {
            $(this._imageDivision).css("left" ,"640px").animate({
                left: "0px"
            }, 1200, "easeOutCubic", eventHandler);

        }
    };

    p.imageTweenCompleteHandler = function() {
        if(this._removeImageDivision)
        {
            this._imageContainer.removeChild(this._removeImageDivision);
        }
        this._removeImageDivision = this._imageDivision;
        this._imageDivision = null;

        this._imageCount++;
        if(this._imageCount >= this.sceneDataList[this._sceneCount].ImageDataList.length)
        {
            //_imageCount = 0;
            this.nextScene();
        }
        else
        {
            this.addImage();
        }
    };

    p.nextScene = function() {
        this._sceneCount++;
        if (this._sceneCount >= this.sceneDataList.length) {
            this._sceneCount = 0;
        }
        this.addScene();
    };

    return ViewManager;
})();