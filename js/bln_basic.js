bln_innerDrawBox = function(ctx,X,Y,W,H,logic,confBox,confText,confCircle) {
	this.constructor(ctx,X,Y);
	this.C = ctx;
	this.width = W;
	this.height = H;
	this.logic = new logic;
	this.confBox = confBox;
	this.confText = confText;
	this.confCircle = confCircle;
	
	this.lenVal = {};
	this.lenVal.vIn = this.logic.vIn.length;
	this.lenVal.vOut = this.logic.vOut.length;
	

	this.nodeP = [];
	
	for(var v in ['vIn','vOut']) {
		var vStr = (v<1)? 'vIn': 'vOut';
		var vLen = 	this.logic[vStr].length;
		//console.log("vString "+vStr+ " - vLen "+vLen);
		var hDis = (this.height/(vLen+1));
		var newX = (v<1)? this.X-(this.width/2): this.X+(this.width/2);

		var newY = this.Y;
		var textX = (v<1)? newX + 9 : newX - 9;
		var textYp = this.confText.fontSize/3;
		//console.log("fonts size "+this.confText.fontSize+" and a half "+textYp);
		this.confText.alignR = (v<1)? false : true;
		for(var i=0;i<vLen;i++) {
			//console.log("in i "+i);
			newY = this.Y-(this.height/2)+(hDis*(i+1));
			this.nodeP.push({ 	point: new canCircle(ctx,newX,newY,4,this.confCircle),
								text: new canText(ctx,textX,newY+textYp,this.logic[vStr][i].name,this.confText),
								typ: {valTyp:vStr,valNo:i}
							 });
			this.logic[vStr][i].gui = this.nodeP[this.nodeP.length-1];
			}
		}

	this.outaBox = new canRect(this.C,X,Y,W,H,this.confBox);


	this.collision = function(x,y) {
		var hit = false;
		var hitNodeNo = -1;
		for(var h=0;h<this.nodeP.length;h++) {
			if(this.nodeP[h]["point"].collision(x,y)) {
				if(!this.logic.canConect(this.nodeP[h]["typ"].valTyp,this.nodeP[h]["typ"].valNo)) continue;
				hit = true;
				hitNodeNo = h;
				}
			}
		if(hit) {
			return {weaveIndex:hitNodeNo,weaveNo:this.nodeP[hitNodeNo]["typ"].valNo,weaveTyp:this.nodeP[hitNodeNo]["typ"].valTyp};
		 	}
		if(this.outaBox.collision(x,y)) return true;
		return false;
		}
	
	this.hover = function(x,y) {
		var isHover = false;
		for(var h=0;h<this.nodeP.length;h++) {
			var bHover = this.nodeP[h]["point"].hover(x,y);
			if(bHover) isHover = true;
			}
		return (isHover)? true : this.outaBox.hover(x,y);
		}
		
	this.move = function(px,py,vx,vy) {
		this.outaBox.move(px,py,vx,vy);
		for(h in this.nodeP) {
			this.nodeP[h]["point"].move(px,py,vx,vy);
			this.nodeP[h]["text"].move(px,py,vx,vy);
			}
		}
	this.draw = function() {
		this.outaBox.draw();
		for(var h=0;h<this.nodeP.length;h++) {
			this.nodeP[h]["point"].draw();
			this.nodeP[h]["text"].draw();
			}
		}
		
	this.changeZoom = function(newFactor) {
		this.outaBox.changeZoom(newFactor);
		for(var h=0;h<this.nodeP.length;h++) {
			this.nodeP[h]["point"].changeZoom(newFactor);
			this.nodeP[h]["text"].changeZoom(newFactor);
			}
		}
	}
bln_innerDrawBox .prototype = new canObj();



bln_Box = function(ctx,X,Y,W,H,conf) {
	this.constructor(ctx,X,Y);
	this.width = W;
	this.height = H;
	this.fillColor = "rgba(255,255,255,0.4)";
	this.borderColor = "rgba(205,205,205,0.7)";
	
	this.nodeP = [];
	this.Text = "Test";
	this.Font = " Source Code Pro 'optimer'";
	this.FontSize = "18px";
	this.TextColor = "rgb(150,150,220)";
	this.nodeFillColor = "rgba(255,55,55,0.95)";
	this.nodeBorderColor = "rgba(255,205,205,0.9)";
	this.nodeHoverFac = 5.2;
	this.Value = new bln_logicBox();
	
	for(c in conf) { this[c] = conf[c];}

	
	
	var valuesI = ['vIn','vOut'];
	for(var v=0;v<valuesI.length;v++) {
		var cLen = this.Value[valuesI[v]].length;
		var hDis = ((this.height/(cLen+1)));
		var lX = (valuesI[v] == 'vIn')? this.X-(this.width/2): this.X+(this.width/2);
		var textX = (valuesI[v] == 'vIn')? lX + 6 : lX - 6;
		var lY = this.Y;
		var alginRight = (valuesI[v] == 'vIn')? false : true;
		var teConf = CONFIG.themeGet("text",{alignR:alginRight,fontSize:"15px"});
		var ciConf = CONFIG.themeGet("circle",{fillColor:this.nodeFillColor,borderColor:this.nodeBorderColor,hoverFac:this.nodeHoverFac});
		DEBUG.shell(valuesI[v]+" conf Text "+teConf.alignR);
		for(var i=0;i<this.Value[valuesI[v]].length;i++) {
			var lY = this.Y-(this.height/2)+(hDis*(i+1));
			this.nodeP.push({ 	point: new canCircle(this.C,lX,lY,4,ciConf),
								text: new canText(this.C,textX,lY+3,this.Value[valuesI[v]][i].name,teConf),
								typ: {valTyp:valuesI[v],valNo:i}
							 });
				}
			}
	
	this.collision = function(x,y) {
		var Wh = Math.floor(this.width/2);
		var Hh = Math.floor(this.height/2);
		var hit = false;
		var hitNodeNo = -1;
		for(var h=0;h<this.nodeP.length;h++) {
			if(this.nodeP[h]["point"].collision(x,y)) {
				hit = true;
				hitNodeNo = h;
				}
			}
		if(hit) {
			return {weaveIndex:hitNodeNo,weaveNo:this.nodeP[hitNodeNo]["typ"].valNo,weaveTyp:this.nodeP[hitNodeNo]["typ"].valTyp};
		 	}
		
		if((x>=(this.X-Wh)) && (y>=(this.Y-Hh)) && (x<=(this.X+Wh)) && (y<=(this.Y+Hh))) {
			this.onClick = true;
			return true;
			}
		this.onClick = false;		
		return false;
		}
	
	this.hover = function(x,y) {
		var isHover = false;
		for(var h=0;h<this.nodeP.length;h++) {
			var bHover = this.nodeP[h]["point"].hover(x,y);
			if(bHover) isHover = true;
			}
			
		return isHover;
		}
		
	this.move = function(px,py,vx,vy) {
		this.X += vx;
		this.Y += vy;
		
		for(h in this.nodeP) {
			this.nodeP[h]["point"].move(px,py,vx,vy);
			this.nodeP[h]["text"].move(px,py,vx,vy);
		}
		if(this.onClick) {
			//this.X += Math.floor(vx*((px-this.X)/10));
			//this.Y += Math.floor(vy*((py-this.Y)/10));
			}
		}
	this.draw = function() {
		this.C.beginPath();
		this.C.rect(this.X-(this.width/2),this.Y-(this.height/2),this.width,this.height);
		this.C.fillStyle = this.fillColor;
		this.C.fill();
		this.C.lineWidth = 2;
		this.C.strokeStyle = this.borderColor;
		this.C.stroke();
		for(var h=0;h<this.nodeP.length;h++) {
			this.nodeP[h]["point"].draw();
			this.nodeP[h]["text"].draw();
			}
		}
		
	this.changeZoom = function(newFactor) {
		if(this.zFac == 1) {
			this.zX = this.X;	this.zY = this.Y;	this.zW = this.W;	this.zH = this.H;
			}
		if(newFactor == 1) {
			this.X = this.zX;	this.Y = this.zY;	this.W = this.zW;	this.H = this.zH;
			return;
			}
		this.zFac = newFactor;
		this.X *= this.zFac;	this.Y *= this.zFac;	this.H *= this.zFac;	this.W *= this.zFac;
		
		for(var h=0;h<this.nodeP.length;h++) {
			this.nodeP[h]["point"].changeZoom(newFactor);
			this.nodeP[h]["text"].changeZoom(newFactor);
			}
		}
	}
	
	
bln_Box.prototype = new canObj();
