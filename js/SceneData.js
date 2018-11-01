function SceneData() {
    this.Id = "";
    this.Text = "";
    this.ImageDataList = [];
    this.setXml = function (nodes) {
        var childs;
        this.Id = nodes.getAttribute("id");
        //
        childs = nodes.getElementsByTagName("text");
        if (childs[0]) {
            if (childs[0].firstChild) {
                this.Text = childs[0].firstChild.nodeValue;
            }
        }
        //
        this.ImageDataList = [];
        childs = nodes.getElementsByTagName("images");
        var images = childs[0].getElementsByTagName("image");
        var n = images.length;

        for (var i = 0; i < n; i++) {
            var imageNode = images[i];

            if (imageNode.firstChild) {
                var path = imageNode.firstChild.nodeValue;
                var imageData = new CustomImageData();
                imageData.Path = path;
                this.ImageDataList.push(imageData);
            }
        }
    }
}

function CustomImageData() {
    this.Path;
    this.Image = new Image();
}