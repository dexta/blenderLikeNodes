var ctx;
var mouseD,mouseX,mouseY,mouseOldX,mouseOldY,mouseBN,mouseMX,mouseMY;
var zFac = 1;
var tick = 0;
var oldV = {lastHover:false,lastCollision:false,lastNodeLineLen:0};
var eventList = {};
var allObjects = [];
var offsetX,offsetY;
var WIDTH,HEIGHT;
var backImgOffset = {x:0,y:0};
var eL = {cList:[],action:{}};
function reset_Action() { eL.action =  {on:false,me:-1,typ:"",logic:{vIn:{on:-1,logic:{}},vOut:{on:-2,logic:{}}},lastValue:null};}
reset_Action();
