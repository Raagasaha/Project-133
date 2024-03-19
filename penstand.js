penstand_img = "";
status = "";
objects = [];

function preload() {
penstand_img = loadImage("penstand.avif");
}

function setup() {
    canvas = createCanvas(600, 400 );
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(penstand_img, 0, 0, 640, 420);

    if(status != "")
    {
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}

function modelLoaded() {
    console.log("Model Loaded!!");
    status = true;
    objectDetector.detect(penstand_img, gotResult);
    
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function back() {
    window.location = "firstpage.html";
}


