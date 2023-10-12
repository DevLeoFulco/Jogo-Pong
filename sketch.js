//variaveis da bolinha
let xBolinha =300;
let yBolinha =200;
let diametro = 28;
let raio = diametro/2;

//variaveis de velocidade
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da raquete
let raqueteComprimento = 10;
let raqueteAltura = 90;
let xRaquete = 3;
let yRaquete = 150;

//variaveis do oponente
let xRaqueteOpo = 585;
let yRaqueteOpo = 150;
let velocidadeYOpo;

let colidiu = false;
let chanceDeErrar=0;
//variaveis do placar
let meusPontos=0;
let pontosOpo=0;

//sons do jogo
let raquete;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  raquete = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  colisaoBorda();
  mostraRaquete (xRaquete, yRaquete);
  movimentoRaquete();
  colisaoRaquete();
  colisaoComRaquete(xRaquete,yRaquete);
  mostraRaqueteOpo(xRaqueteOpo,yRaqueteOpo);
  movimentaRaqueteOpo ();
  colisaoComRaquete(xRaqueteOpo,yRaqueteOpo);
  mostraPlacar();
  marcaPonto();
  //bolinhaNaoFicaPresa();
}

function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro);
}

function movimentaBolinha (){
  xBolinha+=velocidadeXBolinha;
  yBolinha+=velocidadeYBolinha;
}

function colisaoBorda(){
  if (xBolinha+raio>width||xBolinha-raio<0){
    velocidadeXBolinha*= -1;
  }
  if (yBolinha+raio>height||yBolinha-raio<0){
    velocidadeYBolinha*= -1;
  }
}

function mostraRaquete(x,y){
  rect(x,y,raqueteComprimento,raqueteAltura);
}

function movimentoRaquete(){
  if(keyIsDown(UP_ARROW)){
     yRaquete-= 10;
     }
  if (keyIsDown(DOWN_ARROW)){
      yRaquete+= 10;
      }
}

function mostraRaqueteOpo() {
    rect(xRaqueteOpo, yRaqueteOpo, raqueteComprimento, raqueteAltura);
}

function colisaoRaquete(){
  if(xBolinha-raio<xRaquete+raqueteComprimento &&
    yBolinha-raio<yRaquete+raqueteAltura &&
    yBolinha+raio>yRaquete){
    velocidadeXBolinha*= -1;
    raquete.play();
  }
}
function colisaoComRaquete(x,y){
  colidiu = collideRectCircle(x,y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha*= -1;
    raquete.play();
  }
}

function movimentaRaqueteOpo(){
  velocidadeYOpo = yBolinha -yRaqueteOpo - raqueteComprimento / 2 - 30;
  yRaqueteOpo += velocidadeYOpo + chanceDeErrar
  calculaChanceDeErrar()

}

function mostraPlacar(){
  stroke(255);
  textAlign (CENTER);
  textSize (16);
  fill (color(250,140,0));
  rect (130,10,40,20);
  fill (255);
  text (meusPontos,150,26);
  fill (color(250,140,0));
  rect (430,10,40,20);
  fill (255);
  text (pontosOpo, 450,26);
 
}

function marcaPonto(){
  if(xBolinha>587){
     meusPontos+=1;
    ponto.play();
     }
  if (xBolinha<14){
    pontosOpo+=1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosOpo >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}


function bolinhaNaoFicaPresa(){
    if (XBolinha - raio < 0){
    XBolinha = 23
    }
}
