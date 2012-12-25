var conObj = function() {
	this.basicVar = {	
		fillColor:"rgba(255,25,25,0.5)",
		borderColor:"rgba(255,255,255,0.8)",
		};
		
	this.textVar = {
		textColor:"rgb(255,255,255)",
		fontSize: "19",
		alignR: false,
		hoverFac:1.0001
		}

	this.circleVar = {
		fillColor:"rgba(255,25,25,0.5)",
		borderColor:"rgba(255,255,255,0.8)",
		hoverFac:4.0		
	}

	this.boxVar = {
		fillColor:"rgba(255,25,25,0.5)",
		borderColor:"rgba(255,255,255,0.8)",
	}

	this.nodeLineVar = {
		lineColor:"RGBA(200,200,200,0.7)",
		lineWidth:5
		}
		
	this.merge = function(obj1,obj2) {
		obj3 = {};
		for(var o1 in obj1) { obj3[o1] = obj1[o1]; }
		for(var o2 in obj2) { obj3[o2] = obj2[o2]; }
		return obj3
		}

	this.themeGet = function(name,addVars) {
		if(name == "box") {
			return this.merge(this.boxVar,addVars);
			}
		if(name == "circle") {
			return this.merge(this.circleVar,addVars);
			}
		if(name == "text") {
			return this.merge(this.textVar,addVars);
			}
		if(name == "nodeLine") {
			return this.merge(this.nodeLineVar,addVars);
			}
		
		
		}
}
