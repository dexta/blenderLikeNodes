//######################################################################
//#####################   Build My Own Objects   #######################
//######################################################################

canObj = function(ctx,X,Y) {
	this.onClick = false;
	this.onHover = false;
	this.hoverFac = 1.1;
	this.X = X;
	this.Y = Y;
	this.C = ctx;
	this.zFac = 1;
	}
// canObj.prototype.toggleClick = function(){ this.onClick = (this.onClick) ? false : true; }

canRect = function(ctx,X,Y,W,H,conf) {
	this.constructor(ctx,X,Y);
	this.width = W;
	this.height = H;
	this.fillColor = "rgba(255,255,255,0.4)";
	this.borderColor = "rgba(205,205,205,0.7)";
	for(c in conf) { this[c] = conf[c];}

	this.pointInBox = function(x,y,offset) {
		var Wh = Math.floor((this.width*offset)/2);
		var Hh = Math.floor((this.height*offset)/2);
		if((x>=(this.X-Wh)) && (y>=(this.Y-Hh)) && (x<=(this.X+Wh)) && (y<=(this.Y+Hh))) {
			return true;
			}
		return false;
		}
	
	this.collision = function(x,y) {
		if(this.pointInBox(x,y,1)) {
			this.onClick = true;
			return true;
			}
		this.onClick = false;
		return false;
		}

	this.hover = function(x,y) {
		if(this.pointInBox(x,y,this.hoverFac)) {
			this.onHover = true;
			return true;
			}
		this.onHover = false;
		return false;
		}

	this.move = function(px,py,vx,vy) {
		this.X += vx;	this.zX += vx;
		this.Y += vy;	this.zY += vy;
		}
		
	this.drawABox = function(offset) {
		this.C.beginPath();
		this.C.rect(this.X-((this.width/2)*offset),this.Y-((this.height/2)*offset),this.width*offset,this.height*offset);
		this.C.fillStyle = this.fillColor;
		this.C.fill();
		this.C.lineWidth = 2;
		this.C.strokeStyle = this.borderColor;
		this.C.stroke();
		}
		
	this.draw = function() {
		if(this.onHover) {
			this.drawABox(this.hoverFac);			
		} else {
			this.drawABox(1);
			}
		}
		
	this.changeZoom = function(newFactor) {
		if(this.zFac == 1) {
			this.zX = this.X;	this.zY = this.Y;	this.zW = this.width;	this.zH = this.height;
			}
		if(newFactor == 1) {
			this.X = this.zX;	this.Y = this.zY;	this.width = this.zW;	this.height = this.zH;
			return;
			}
		this.zFac = newFactor;
		this.X = this.zX*this.zFac;	this.Y = this.zY*this.zFac;	this.height = this.zH*this.zFac;	this.width = this.zW*this.zFac;	
		}
	}
	
canRect.prototype = new canObj();

canCircle = function(ctx,X,Y,R,conf) {
	this.constructor(ctx,X,Y);
	this.radius = R;
	this.fillColor = "rgba(255,25,25,0.5)";
	this.borderColor = "rgba(255,255,255,0.8)";
	for(c in conf) { this[c] = conf[c];}
	
	this.pointInCircle = function(x,y,offset) {
		var rz = Math.pow(this.radius*offset,2);
		var tc = (Math.pow((x-this.X),2))+(Math.pow((y-this.Y),2));
		if(rz>=tc) return true;
		return false;
		}
	this.collision = function(x,y) {
		if(this.pointInCircle(x,y,1)) {
			this.onClick = true;
			return true;
			}
		this.onClick = false;
		return false;
		}
	this.hover = function(x,y) {
		if(this.pointInCircle(x,y,this.hoverFac)) {
			this.onHover = true;
			return true;
			}
		this.onHover = false;
		return false;
		}

	this.move = function(px,py,vx,vy) {
		this.X += vx;	this.zX += vx;
		this.Y += vy;	this.zY += vy;
		}
		
	this.drawACircle = function(offset) {
		this.C.beginPath();
		this.C.arc(this.X,this.Y,this.radius+offset,100,360,false);
		this.C.fillStyle = this.fillColor;
		this.C.fill();
		this.C.lineWidth = 2;
		this.C.strokeStyle = this.borderColor;
		this.C.stroke();		
		}

	this.draw = function() {
		if(this.onHover) {
			this.drawACircle(this.hoverFac);
		} else {
			this.drawACircle(0);
			}
		}
	
	this.changeZoom = function(newFactor) {
		if(this.zFac == 1) {
			this.zX = this.X;	this.zY = this.Y;	this.zR = this.radius;
			}
		if(newFactor == 1) {
			this.X = this.zX;	this.Y = this.zY;	this.radius = this.zR;
			return;
			}
		this.zFac = newFactor;
		this.X = this.zX*this.zFac;	this.Y = this.zY*this.zFac;	this.radius = this.zR*this.zFac;
		}
	}
canCircle.prototype = new canObj();


canText = function(ctx,X,Y,Text,conf) {
	this.constructor(ctx,X,Y);
	this.textStr = Text;
	this.color = "rgb(25,25,25)";
	this.font = " Source Code Pro"; //" 'optimer'";
	this.fontSize = "14";
	this.alignR = false;
	for(c in conf) { this[c] = conf[c];}
	this.collision = function(x,y) {
		return false;
		}
	this.move = function(px,py,vx,vy) {
		this.X += vx; 	this.zX += vx;
		this.Y += vy;	this.zY += vy;
		}
	this.draw = function() {
		this.C.font = this.fontSize+"px"+this.font;
		this.C.textAlign = (this.alignR)? "right" : "left";
		this.C.strokeStyle = this.color;
		this.C.strokeText(this.textStr,this.X,this.Y);
		}
		
	this.changeZoom = function(newFactor) {
		if(this.zFac == 1) {
			this.zX = this.X;	this.zY = this.Y;	this.zFontSize = this.fontSize;
			}
		if(newFactor == 1) {
			this.X = this.zX;	this.Y = this.zY;	this.fontSize = this.zFontSize;
			return;
			}
		this.zFac = newFactor;
		this.X = this.zX*this.zFac;	this.Y = this.zY*this.zFac;	this.fontSize = this.zFontSize*this.zFac;
		}
	}
canText.prototype = new canObj();

canNodeLine = function(ctx,X,Y,inX,inY,outX,outY,conf) {
	this.constructor(ctx,X,Y);
	this.inX = inX;
	this.inY = inY;
	this.outX = outX;
	this.outY = outY;
	this.logic = {vIn:{},vOut:{}};
	//this.vIn = {};
	//this.vOut = {};
	this.onCreate = true;
	
	this.lineColor = "RGBA(250,250,250,0.7)";	
	this.lineWidth = 3;
	for(c in conf) { this[c] = conf[c];}

	this.move = function(px,py,vx,vy) {
		if(this.onCreate) {
			this.outX = px;
			this.outY = py;
			} 
		}
	
	this.draw = function() {
		if(!this.onCreate) {
			this.inX = this.logic.vIn.obj.X;
			this.inY = this.logic.vIn.obj.Y;
			this.outX = this.logic.vOut.obj.X;
			this.outY = this.logic.vOut.obj.Y;
		}
		this.X = this.inX+((this.inX-this.outX)/2);
		this.Y = this.inY+((this.inY-this.outY)/2);
		this.C.lineWidth = this.lineWidth;
		this.C.strokeStyle = this.lineColor;
		this.C.beginPath();
		this.C.moveTo(this.inX,this.inY);
		var midX = this.inX+((this.outX-this.inX)/2);
		var midY = this.inY+((this.outY-this.inY)/2);
		//this.C.bezierCurveTo(	this.inX,this.inY,	midX,this.inY,	midX,midY);
		//this.C.bezierCurveTo(	midX,midY,			midX,this.outY,	this.outX,this.outY);
		this.C.bezierCurveTo(	midX,this.inY, midX,this.outY,	this.outX,this.outY);
		this.C.stroke();
		}
	
	this.collision = function() { return false; }
	this.hover = function() { return false; }
	
	this.updateLogic = function() {
		var getV = this.logic.vIn.logic.vOut[this.logic.vIn.weaveNo].value;
		if(getV == this.logic.lastValue) return false;
		this.logic.vOut.logic.vIn[this.logic.vOut.weaveNo].value = getV;
		this.logic.vOut.logic.locCode();
		this.logic.lastValue = getV;
		return true;
		}
	this.changeZoom = function(newFactor) { 
		if(this.zFac == 1) this.zLineWidth = this.lineWidth;
		if(newFactor == 1) this.lineWidth = this.zLineWidth;
		this.zFac = newFactor;
		this.lineWidth = this.zLineWidth*this.zFac;
		}
	}
canNodeLine.prototype = new canObj();


// thanks to http://stackoverflow.com/questions/4848310/getting-mouse-position-with-javascript-within-canvas
Element.prototype.leftTopScreen = function () {
                var x = this.offsetLeft;
                var y = this.offsetTop;

                var element = this.offsetParent;

                while (element !== null) {
                    x = parseInt (x) + parseInt (element.offsetLeft);
                    y = parseInt (y) + parseInt (element.offsetTop);

                    element = element.offsetParent;
                }

                return new Array (x, y);
            }
