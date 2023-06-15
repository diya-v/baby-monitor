status="";
object=[];
alarm="";
function setup(){
    canvas = createCanvas(600,600);
    canvas.center();
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Detecting Object";
    video = createCapture(VIDEO);
    video.size(400,300);
    video.hide();
}

function preload(){
    alarm = loadSound("alarm.mp3");
}

function draw(){
    image(video, 0, 0, 600, 600);
    if(status != "")
    {
        r= random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(video, gotResult);
        for(i=0; i<object.length; i++)
        {
            document.getElementById("status").innerHTML="Status: Object Detected";

            fill(r,g,b);
            percent=floor(object[i].confidence * 100);
            stroke("blue");
            noFill();
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            text(object[i].label + " "+ percent + "%", object[i].x+10, object[i].y+20);

            if(object[i].label=="person")
            {
                document.getElementById("status").innerHTML="Baby Detected";
                alarm.stop();
            }
            else{
                document.getElementById("status").innerHTML="Baby Not Detected";
                alarm.play();
            }

        }
        if(object[i]<0)
        {
            document.getElementById("status").innerHTML="Baby Not Detected";
            alarm.play();
        }
    }
}

function modelLoaded(){
    console.log("model loaded");
    status= true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
    console.log(results);
    object=results;
    }
}