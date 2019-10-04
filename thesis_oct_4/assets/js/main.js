
window.addEventListener('DOMContentLoaded', function () {
    casePhoto();
});

function casePhoto(){
    $(".section").append("<h1>Role: Photographer<br>Please take a photo of your favorite artwork in the show</h1>");
    $(".section").append("<div class='collection'></div>");
    $(".section").append("<input id='originPhoto' type='file' accept='image/*' capture='camera' style='width: 0; height: 0; overflow: hidden;' />");
    $(".section").append("<div class='buttons'></div>");
    $(".buttons").append("<div id='takePhoto' class='button'>TAKE PHOTO</div>");
    $(".buttons").append("<div id='addPhoto' class='button'>ADD TO COLLECTION</div>");
    attachPhoto();

    $('#addPhoto').on('click', function(){
        // let val = $(".collection").val;
        // console.log(val);
        $(".collection").empty();
        alert("Your photos have been added to the collection");
    });
}

// reference: https://jsfiddle.net/jpadc82h/
function attachPhoto() {
    $("#takePhoto").click(function () {
        $("#originPhoto").click();
    });

    $("#originPhoto").change(function() {
        for (var i = 0; i < this.files.length; i++) {
            var reader = new FileReader();
            reader.onload = photoTaken;
            reader.readAsDataURL(this.files[i]);
        }
    });

    function photoTaken(e) {
        var picture = '<img src="' + e.target.result + '" class="userPhoto">'
        $(".collection").append(picture);
    }
}





