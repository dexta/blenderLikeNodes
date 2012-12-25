//load Some objects
//created 12.11.25 @dexta.de

var confLogic = bln_logicOut;
var confBox = CONFIG.themeGet("text",{});
var confText = CONFIG.themeGet("text",{});;
var confCircle = CONFIG.themeGet("text",{});;

function startSomeToLoad() {
	console.log("start loading new ....");

	for(var x=0;x<10;x++) {
		confLogic = function() {
			this.vOut = [
			{	name: ""+x,
				type: "int",
				value: x,
				conect: {}
				}
				];
			};
			
		confLogic.prototype = new bln_logicOut();
		addObject( new bln_innerDrawBox(ctx,50,50+(x*25),23,23,confLogic,confBox,confText,confCircle));
		}
		
	confLogic = bln_logicIn;
	for(var z=0;z<5;z++) {
		addObject( new bln_innerDrawBox(ctx,850,75+(z*47),42,42,confLogic,confBox,confText,confCircle));
		}
	
	confLogic = bln_logicAdd;	
	addObject( new bln_innerDrawBox(ctx,150,105,75,135,confLogic,confBox,confText,confCircle));

	
	confLogic = function() { this.vIn = [{name:"C"},{name:"D"}]; }
	confLogic.prototype = new bln_logicAdd;
	neConf = addObject( new bln_innerDrawBox(ctx,290,230,75,135,confLogic,confBox,confText,confCircle));

	confLogic = function() { 
		this.vIn = [{name:"E"},{name:"F"}]; 
		this.vOut = [{name:"-   ="}]; 
		this.locCode = function() {
			return this.vOut[0].value = this.vIn[0].value - this.vIn[1].value;
			}
		}
	confLogic.prototype = new bln_logicAdd;
	confBox.fillColor = "RGBA(250,200,200,0.6)";
	addObject( new bln_innerDrawBox(ctx,460,175,75,135,confLogic,confBox,confText,confCircle));	

	confLogic = function() { 
		this.vIn = [{name:"G"},{name:"H"}]; 
		this.vOut = [{name:":   ="}]; 
		this.locCode = function() {
			return this.vOut[0].value = this.vIn[0].value / this.vIn[1].value;
			}
		}
	confLogic.prototype = new bln_logicAdd;
	confBox.fillColor = "RGBA(200,220,200,0.6)";
	neConf = addObject( new bln_innerDrawBox(ctx,610,105,75,135,confLogic,confBox,confText,confCircle));


	
	confLogic = function() { 
		this.vIn = [{name:"I"},{name:"J"}]; 
		this.vOut = [{name:"*   ="}];
		this.locCode = function() {
			return this.vOut[0].value = this.vIn[0].value * this.vIn[1].value;
			}
		}
	confLogic.prototype = new bln_logicAdd;
	confBox.fillColor = "RGBA(210,200,230,0.6)";
	neConf = addObject( new bln_innerDrawBox(ctx,750,230,75,135,confLogic,confBox,confText,confCircle));
	
	
	
	console.log(" .... new object are loaded [errors see before]");
	draw();
	}


$(document).ready(function() {
	setTimeout(startSomeToLoad,100);
	});

//var giveawayV = [];
//var miHit = [false,false,false];
function giveAway_old() {
	giveawayV = [];
	var firstO = [];
	var middleO = [];
	var lastO = [];
	
	for(var a in allObjects) {
		if(allObjects[a] instanceof canNodeLine) {
			if(allObjects[a].logic.vIn.logic.vIn.length == 0) {
				firstO.push(allObjects[a]);
				} else if(allObjects[a].logic.vOut.logic.vOut.length == 0) {
					lastO.push(allObjects[a]);
					} else {
						middleO.push(allObjects[a]);
						}
			}
		}
	giveawayV.push(firstO);
	giveawayV.push(middleO);
	giveawayV.push(lastO);	
	
	for(var f in firstO) {
		//console.log("start do !");
		//var getV = firstO[f].logic.vIn.logic.vOut[firstO[f].logic.vIn.weaveNo].value;
		//console.log("pass the getV");
		
		//console.log("test some obj"+firstO[f].logic.vOut);
		//firstO[f].logic.vOut.logic.vIn[firstO[f].logic.vOut.weaveNo].value = getV;
		
		//console.log(firstO[f].logic.vOut.logic.locCode());
		firstO[f].updateLogic();
		
		}
	
	miHit = [false,false,false];
	var doWh = middleO.length;
	var stopC = 0; var hitC = 0;
	while(!miHit[2] && doWh>0) {
		miHit[0] = false;
		for(var m in middleO) {
			miHit[0] = middleO[m].updateLogic();
			if(miHit[0]) {
				console.log("Hit: "+m);
				hitC ++;
				//break;
				}
			}
		if(!miHit[0] && !miHit[1]) { miHit[1] = true;
			} else if(!miHit[0] && miHit[1]) { miHit[2] = true;
				} else { miHit[1] = false; miHit[2] =false; } 
		console.log("0: "+miHit[0]+" 1: "+miHit[1]+" 2: "+miHit[2]);
		stopC ++;console.log("stop Count "+stopC+" && hit Count "+hitC);
		if(stopC>10 || hitC == doWh) break;
		}

	for(var l in lastO) {
		//console.log("put weaveNO "+lastO[l].logic.vIn.weaveNo);
		//var putV = lastO[l].logic.vIn.logic.vOut[lastO[l].logic.vIn.weaveNo].value;
		//console.log("put value "+putV);
		//lastO[l].logic.vOut.logic.vIn[lastO[l].logic.vOut.weaveNo].value = putV;
		//lastO[l].logic.vOut.logic.vIn[lastO[l].logic.vOut.weaveNo].name = putV;
		//lastO[l].logic.vOut.logic.vIn[lastO[l].logic.vOut.weaveNo].gui.text.textStr = putV;
		//console.log(lastO[l].logic.vOut.logic.locCode());
		lastO[l].updateLogic();
		}
	reDraw();
	}

