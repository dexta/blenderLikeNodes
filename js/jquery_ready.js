$(document).ready(function() {
	var xy = $("#canvas")[0].leftTopScreen();
	offsetX = xy[0];
	offsetY = xy[1];
	
	$("#canvas").mousedown(function(e) {
		mouseD = 1;
		mouseBN = e.which;
		mouseMX = 0;					mouseMY = 0;
		$("#debug4").html("MouseBN: "+mouseBN+" Tick: "+tick);
		});
	$("#canvas").mouseup(function(e) {
		mouseD = 0;
		mouseBN = 0;
		mouseButtonUp();
		});
	$("#canvas").mousemove(function(e){
			mouseX = e.pageX-offsetX;
			mouseY = e.pageY-offsetY;
		if(mouseOldX != mouseX || mouseOldY != mouseY) {
			mouseMX += (mouseOldX - mouseX);	mouseMY += (mouseOldY - mouseY);
			mouseOldX = mouseX;
			mouseOldY = mouseY;
			}
	//		$("#debug5").html("x "+mouseX+" y "+mouseY+" ox "+mouseOldX+" oy "+mouseOldY+" mx "+mouseMX+" my "+mouseMY);
		});
	$("#canvas").bind('mousewheel',function(event, delta) {
    	console.log(delta);
    	var nZF = (delta<0)? ((delta*-1)*.1)*-1: delta*.1;
    	zFac += nZF;
    	change_ZoomFactor(zFac);
    	reDraw();
		});
	
	
	StartX();
});
