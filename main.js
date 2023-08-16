statusOfSongFiles2 = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;
statusOfSongFiles  = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

song1 = "";
song2 = "";

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload(){
    song1 = loadSound("HarryPotterThemeSong.mp3");
    song2 = loadSound("ShapeOfYou.mp3");
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#8210c9");
    stroke("#8210c9");
    if(scoreLeftWrist > 0.2) {
    circle(leftWristX,leftWristY,20);
    song1.play()
    song2.stop()
    document.getElementById("song").innerHTML = "Playing Song 1";

    if(scoreRightWrist > 0.2) {
        circle(rightWristX,rightWristY,20);
        song2.play()
        song1.stop()
        document.getElementById("song").innerHTML = "Playing Song 2"
     }
    }
}

    function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+ scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY =" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY =" + rightWristY);
    }
}
