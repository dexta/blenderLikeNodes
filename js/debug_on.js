debugObj = function(level) {
	this.showLevel = level;
	this.shellMSG = [];
	this.objStore = {};
	
	this.toggleEdit = function(what) {
		$("."+what+"Edit").toggleClass("editOff editOn");
		}
	
	this.shell = function(msg) {
		if(level == 0) return;
		if(level >= 2) this.shellMSG.push(msg);
		if(level >= 6) console.log(msg);
		}
	this.objSt = function(obj) {
		this.objStore = obj;
		}
}
