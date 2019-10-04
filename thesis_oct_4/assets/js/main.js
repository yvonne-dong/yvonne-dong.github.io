window.addEventListener('DOMContentLoaded', function () {
    attachPhoto();
});

function attachPhoto() {
    $("#takePhoto").click(function () {
        $("#originPhoto").click();
    });

    $("#originPhoto").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = photoIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });

    function photoIsLoaded(e) {
        // var x = 'foo';
        var picture = '<img src="' + e.target.result + '" style="width: 200px" class="userPhoto">'
        $(".collection").append(picture);
    }

}