$.ajaxSetup({
    xhr: function () { // 使える場合はMicrosoft.XMLHTTP, 使えない場合はXMLHttpRequest
        try {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            return new XMLHttpRequest();
        }
    }
});
var _imageCount = 0;
var _sceneCount = 0;
var _sceneData;
//
var _mainContainer;
var _sceneContainer;
var _removeSceneContainer;
//
var _imageContainer;
//
var _imageDivision;
var _removeImageDivision;
//start
var path = "data/data.xml?random=" + Math.random();
var sceneDataList;
$.ajax(path, {
    "complete": function (e) {
        var data = e.responseText; // 外部ファイルの内容
        var dpObj = new DOMParser();
        var xml = dpObj.parseFromString(data, "text/xml");
        var sceneNodeList = xml.getElementsByTagName("scene");
        sceneDataList = [];
        var n = sceneNodeList.length;
        for (var i = 0; i < n; i++) {
            var sceneNode = sceneNodeList[i];
            var sceneData = new SceneData();
            sceneData.setXml(sceneNode);
            sceneDataList.push(sceneData);
        }
        loadImage();
    }
});

function loadImage() {
    _imageCount = 0;
    _sceneCount = 0;

    initSceneLoad();
}

function initSceneLoad() {

    _imageCount = 0;
    imageLoad();
}

function imageLoad() {
    function onComplete() {
        imageLoadComplete();
    }
    var sceneData = sceneDataList[_sceneCount];
    var imageData = sceneData.ImageDataList[_imageCount];
    var path = imageData.Path;
    imageData.Image = new Image();
    imageData.Image.onload = onComplete;
    imageData.Image.src = path;
}

function imageLoadComplete() {
    _imageCount++;
    if (_imageCount >= sceneDataList[_sceneCount].ImageDataList.length) {
        sceneImageLoadComplete();
    }
    else {
        imageLoad();
    }
}

function sceneImageLoadComplete() {
    _sceneCount++;
    if (_sceneCount >= sceneDataList.length) {
        loadComplete();
    }
    else {
        initSceneLoad();
    }
}
function loadComplete() {
    layout();
}

function layout() {
    _imageCount = 0;
    _sceneCount = 0;

    _mainContainer = document.getElementById('main_container');
    addScene();
}

function addScene() {
    _imageCount = 0;
    _sceneData = sceneDataList[_sceneCount];

    _sceneContainer = document.createElement("div");
    _sceneContainer.className = "container";

    _imageContainer = document.createElement("div");
    _sceneContainer.appendChild(_imageContainer);

    var textDivision = document.createElement("div");
    textDivision.innerText = _sceneData.Text;
    textDivision.className = "scene-text";
    _sceneContainer.appendChild(textDivision);

    _mainContainer.appendChild(_sceneContainer);

    setSceneTween();
}
function setSceneTween() {
    if(_removeSceneContainer)
    {
        $(_removeSceneContainer).css("top" ,"0px").animate({
            top : "-480px"
        }, 1200, "easeOutCubic");
        $(_sceneContainer).css("top" ,"-480px").delay(800).animate({
            top: "0px"
        }, 1200, "easeOutCubic", sceneTweenCompleteHandler);
    }
    else
    {
        $(_sceneContainer).css("top" ,"-480px").delay(800).animate({
            top: "0px"
        }, 1200, "easeOutCubic", sceneTweenCompleteHandler);
    }
}
function sceneTweenCompleteHandler() {
    if(_removeSceneContainer)
    {
        _mainContainer.removeChild(_removeSceneContainer);
        _removeImageDivision =null;
    }
    _removeSceneContainer  = _sceneContainer;

    startImageTween();
}

function addImage() {
    var imageData = _sceneData.ImageDataList[_imageCount];
    _imageDivision = document.createElement("div");
    _imageDivision.className = "image-container";
    _imageDivision.appendChild(imageData.Image);

    _imageContainer.appendChild(_imageDivision);
    setImageTween();
}

function startImageTween() {
    addImage();
}

function setImageTween() {
    if (_removeImageDivision) {
        $(_removeImageDivision).css("left" ,"0px").animate({
            left: "-640px",
            top : "0px"
        }, 1200, "easeInCubic");
        $(_imageDivision).css("left" ,"640px").delay(800).animate({
            left: "0px",
            top : "0px"
        }, 1200, "easeOutCubic", imageTweenCompleteHandler);
    }
    else {
        $(_imageDivision).css("left" ,"640px").animate({
            left: "0px"
        }, 1200, "easeOutCubic", imageTweenCompleteHandler);

    }
}


function imageTweenCompleteHandler() {
    if(_removeImageDivision)
    {
        _imageContainer.removeChild(_removeImageDivision);
    }
    _removeImageDivision = _imageDivision;
    _imageDivision = null;

    _imageCount++;
    if(_imageCount >= sceneDataList[_sceneCount].ImageDataList.length)
    {
        //_imageCount = 0;
        nextScene();
    }
    else
    {
        addImage();
    }
}

function nextScene() {
    _sceneCount++;
    if (_sceneCount >= sceneDataList.length) {
        _sceneCount = 0;
    }
    this.addScene();
}
