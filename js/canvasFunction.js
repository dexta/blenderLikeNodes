function clear() {
	ctx = document.getElementById('canvas').getContext('2d');
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	}

function addObject(obj) {
	var len = allObjects.length;
	allObjects[len] = obj;
	return len;
	}
	
function mouseButtonUp() {
	for(var a = 0;a <= allObjects.length;a++) {
		if(!allObjects[a]) { continue;};
		allObjects[a].onClick = false;
		allObjects[a].onHover = false;
		}
	if(eL.action.on && eL.action.logic.vIn.on != -1 && eL.action.logic.vOut.on != -2) {
		var oNo = eL.action.me;
		allObjects[oNo].logic.vIn = eL.action.logic.vIn;
		allObjects[oNo].logic.vOut = eL.action.logic.vOut;
		allObjects[oNo].onCreate = false;
		} else {
			if(eL.action.on) allObjects[eL.action.me] = null; // undefined;
			}
	eL.cList = [];
	clear_nodeLogic();
	update_nodeLogic();
	reset_Action();
	reDraw();
	}

function check_Hover() {
	var hasHover = false;
	for(var a in allObjects) {
		if(!allObjects[a]) { continue;};
		hitResulte = allObjects[a].hover(mouseX,mouseY);
		if(hitResulte != false) { 
			hasHover = true;
			}
		}
	return hasHover;
	}
	
function change_ZoomFactor(newFactor) {
	for(var a in allObjects) {
		if(!allObjects[a]) { continue;};
			console.log("we working on "+a);
			allObjects[a].changeZoom(newFactor);
		}
	}
	
function update_obj(oObj,nLi) {
    for(var n in nLi) {
        if(oObj.hasOwnProperty(n)) {
            if(nLi[n] && typeof nLi[n] == 'object') {
                update_obj(oObj[n],nLi[n]);
                } else {
                    if(nLi[n] instanceof Array) {
                        for(var i in nLi[n]) {
                            update_obj(oObj[n][i],nLi[n][i]);
                        }
                    } else if(typeof nLi[n] == 'function') {
						oObj[n] = nLi[n];
						}
                }
            } else {
                oObj[n] = nLi[n];
            }
        }
	}
	
function handle_node(objNo,settings) {
	if(eL.action.logic.vIn.on == objNo || eL.action.logic.vOut.on == objNo) return false;
	var sX = allObjects[objNo].nodeP[settings.weaveIndex].point.X;
	var sY = allObjects[objNo].nodeP[settings.weaveIndex].point.Y;
	
	var hTyp = (settings.weaveTyp == "vIn")? "vOut":"vIn";
	
	if(eL.action.on == false) {
		eL.action.on = true;
		eL.action.logic[hTyp] = settings;
		eL.action.logic[hTyp].on = objNo;
		eL.action.logic[hTyp].obj = allObjects[objNo].nodeP[settings.weaveIndex].point;
		eL.action.logic[hTyp].logic = allObjects[objNo].logic;
		var n1 = addObject(new canNodeLine(ctx,sX+10,sY-10,sX,sY,sX+20,sY-20,{}));
		allObjects[n1].changeZoom(zFac);
		eL.action.me = n1;
		DEBUG.objSt = allObjects[n1].logic.vIn;
		} else {
			if(eL.action.logic.vIn.weaveTyp == settings.weaveTyp || eL.action.logic.vOut.weaveTyp == settings.weaveTyp) return false;
			eL.action.logic[hTyp] = settings;
			eL.action.logic[hTyp].on = objNo;
			eL.action.logic[hTyp].obj = allObjects[objNo].nodeP[settings.weaveIndex].point;
			eL.action.logic[hTyp].logic = allObjects[objNo].logic;
			var obs = (hTyp == "vIn")? "vOut":"vIn";
			var obObj = eL.action.logic[obs];
			allObjects[objNo].logic[obs][settings.weaveNo].conect = true;
			allObjects[obObj.on].logic[hTyp][obObj.weaveNo].conect = true;
			allObjects[eL.action.me].lineColor = allObjects[eL.action.logic.vIn.on].outaBox.fillColor;
			allObjects[eL.action.me].logic.lastValue = null; // eL.action.logic.vIn.logic.vOut[eL.action.logic.vIn.weaveNo].value;
			}
		return true;
	}

function update_nodeLogic() {
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
	
	for(var f in firstO) {
		firstO[f].updateLogic();
		}
	
	miHit = [false,false,false];
	var doWh = middleO.length;
	var stopC = 0; var hitC = 0;
	console.log("++++++ start the big one of logic unwire +++++++");
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
		lastO[l].updateLogic();
		}
	}


function clear_nodeLogic() {
	var myNodeLines = [];
	for(var a in allObjects) {
		if(allObjects[a] instanceof canNodeLine) myNodeLines.push(a);
		}
	var nLen = myNodeLines.length;
	if(nLen == 0 || oldV.lastNodeLineLen == nLen) return 0;
	oldV.lastNodeLineLen = nLen;
	var hits = [];var toDel = -1;
	for(var m in myNodeLines) {
		if(!allObjects[m]) continue;
		var mm = myNodeLines[m];
		for(var n in myNodeLines) {
			if(!allObjects[a] || m == n) continue;
			var nn = myNodeLines[n];
			if((allObjects[mm].logic.vIn.on == allObjects[nn].logic.vIn.on && allObjects[mm].logic.vOut.on == allObjects[nn].logic.vOut.on) &&
			   (allObjects[mm].logic.vIn.weaveIndex == allObjects[nn].logic.vIn.weaveIndex &&  allObjects[mm].logic.vOut.weaveIndex == allObjects[nn].logic.vOut.weaveIndex)) {
					toDel = (mm>nn)? mm : nn;
					allObjects[toDel] = null;
				}
			}
		}
	}
	
function check_Collision() {
	var hasHit = false;
	eL.cList = [];
	for(var a in allObjects) {
		if(!allObjects[a]) { continue;};
		hitResulte = allObjects[a].collision(mouseX,mouseY);
		if(hitResulte != false) { 
			hasHit = true;
			eL.cList.push(a);
			if(hitResulte == true) continue;	
			gDEB = hitResulte;
			hastHit = handle_node(a,hitResulte);	
			}
		}
	return hasHit;
	}

function move_OnCanvas() {
	if(mouseBN == 2) {
		for(var a = 0;a <= allObjects.length;a++) {
			if(!allObjects[a]) { continue;};
			allObjects[a].move(mouseX,mouseY,mouseMX,mouseMY);
			}
		} else {
			var singleMove = eL.cList[0] || -1;
			if(singleMove>-1) {
				allObjects[singleMove].move(mouseX,mouseY,mouseMX,mouseMY);
				}
		}
	}

function draw() {
	var dFirst = [];
	var dLast = [];
	for(var a = 0;a <= allObjects.length;a++) {
		if(!allObjects[a]) { continue;};
		if(allObjects[a] instanceof canNodeLine) {
			dFirst.push(a);
			} else {
				dLast.push(a);
				}
		}
	for(var f in dFirst) {
		allObjects[dFirst[f]].draw();
		}
	for(var l in dLast) {
		allObjects[dLast[l]].draw();
		}
	}	
	
function eventLoop() {
	tick ++;
	var reHover = false; var reCollision = false;
	mouseMX *= -1; mouseMY *= -1;
	reHover = check_Hover();
	if(mouseD) {
		reCollision = (eL.cList.length==0 || eL.action.on)? check_Collision(): false;
		if(eL.action.on) { 
			eL.cList[0] = eL.action.me;
			reCollision = true;
			}
		move_OnCanvas();
		if(mouseBN == 2) {
			backImgOffset.x += mouseMX;
			backImgOffset.y += mouseMY;
			$(".canvas").css("backgroundPosition",''+backImgOffset.x+'px '+backImgOffset.y+'px');
			reHover = true;
			}
		} // end if(mouseD)
	if(reHover || reCollision || oldV.lastHover) {
		reDraw();
		$("#debug5").html("x "+mouseX+" y "+mouseY+" ox "+mouseOldX+" oy "+mouseOldY+" mx "+mouseMX+" my "+mouseMY);
		}
	oldV.lastHover = reHover;
	mouseMX = 0;	mouseMY = 0;
	mouseOldX = mouseX;
	mouseOldY = mouseY;	
	}

function debugMSG(no,value) {
	$("#debug"+no).html(value);
	}

function reDraw() {
	clear();
	draw();
	}

function StartX() {
	ctx = document.getElementById('canvas').getContext('2d');
	//htmlCanWidth = $("#canvasContainer").css("width");
	//$("#canvas").width(htmlCanWidth);
	WIDTH = $("#canvas").width();
	HEIGHT = $("#canvas").height();
	//console.log("breite "+WIDTH);   // $("#canvasContainer").css("width"));
	var extraOpp = {hoverFac:1.05,borderColor:"rgba(142,142,142,0.9)",fillColor:"rgba(166,100,105,0.8)"};
	var themeSetting = CONFIG.themeGet("box",extraOpp);
	themeSetting.nodeHoverFac = 1.6;
	//addObject( new bln_Box(ctx,250,150,105,145,themeSetting));
	themeSetting.fillColor = "rgba(100,100,255,0.9)";

	//addObject( new bln_Box(ctx,260,160,115,165,themeSetting));

	
	//addObject(new canRect(ctx,750,150,123,123,themeSetting))
	
	reDraw();
	setInterval(eventLoop,(1000/42));
}
