window.addEventListener('DOMContentLoaded', function () {
    attachPhoto();
});

function attachPhoto() {
    $("#takePhoto").click(function () {
        $("#originPhoto").click();
    });

    $("#originPhoto").change(function() {
        for (var i = 0; i < this.files.length; i++) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[i]);
        }
    });

    function imageIsLoaded(e) {
        // var x = 'foo';
        var picture = '<img src="' + e.target.result + '" style="width:200px;" class="userPhoto">'
        $(".collection").append(picture);
    }

}