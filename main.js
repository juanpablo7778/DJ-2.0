sonido="";

muñeca_izquierdax=0;
muñeca_izquierday=0;

muñeca_derechax=0;
muñeca_derechay=0;

puntuacion_muñeca_derecha=0;

puntuacion_muñeca_izquierda=0;
function preload(){
    sonido=loadSound("music.mp3")
}

function play(){
    sonido.play()
sonido.setVolume(1);
sonido.rate(2);

}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    pose=ml5.poseNet(video,cargarmodelo);
    pose.on('pose',ver_resultados);
}

function draw(){
    image(video,0,0,600,500);
fill("red");
stroke("black");
if(puntuacion_muñeca_izquierda > 0 )
{
circle(muñeca_izquierdax,muñeca_izquierday,20);
numero_muñeca_izqierday=Number(muñeca_izquierday);
volumen=floor(numero_muñeca_izqierday)/500;
document.getElementById("volumen").innerHTML="volumen=" + volumen;

sonido.setVolume(volumen)
}
if(puntuacion_muñeca_derecha > 0.2 )
{
circle(muñeca_derechax,muñeca_derechay,20);
if(muñeca_derechax > 0 && muñeca_derechay <= 100 )
{document.getElementById("velocidad").innerHTML="velocidad=0.5x";
sonido.rate(0.5);
}
if(muñeca_derechax > 100 && muñeca_derechay <= 200 )
{document.getElementById("velocidad").innerHTML="velocidad=1x";
sonido.rate(1);
}
if(muñeca_derechax > 200 && muñeca_derechay <= 300 )
{document.getElementById("velocidad").innerHTML="velocidad=1.5x";
sonido.rate(1.5);
}
if(muñeca_derechax > 300 && muñeca_derechay <= 400 )
{document.getElementById("velocidad").innerHTML="velocidad=2x";
sonido.rate(2);
}
if(muñeca_derechay > 400  )
{document.getElementById("velocidad").innerHTML="velocidad=2.5x";
sonido.rate(2.5);
}
} }  
function cargarmodelo(){
    console.log('poseNet se está inicializando');
}

function ver_resultados(results){
if(results.length>0)
{
    console.log(results);
    puntuacion_muñeca_derecha=resuts[0].pose.keypoints[10].score;
    puntuacion_muñeca_izquierda=resuts[0].pose.keypoints[9].score;
muñeca_izquierdax=results[0].pose.leftWrist.x;
muñeca_izquierday=results[0].pose.leftWrist.y;
muñeca_derechax=results[0].pose.rightWrist.x;    
muñeca_derechay=results[0].pose.rightWrist.y;

console.log("coordenada x de muñeca izquierda= " + muñeca_izquierdax + "coordenada y de muñeca izquierda= " + muñeca_izquierday);
console.log("coordenada x de muñeca derecha= " + muñeca_derechax + "coordenada y de muñeca derecha= " + muñeca_derechay )
}
}

