var loadingBar = 0;
function loadingProzess(addel,fac) {
	(addel)? loadingBar += fac: loadingBar -= fac;
}
function fullPath(listOfNames) {
	var nL = [];
	for(n in listOfNames) {
		nL.push('js/'+listOfNames[n]+'.js');
		}
	return nL;
	}
function powerOK() {
	DEBUG.shell("power OK start loading");
	start_loading();
	}

var DEBUG,CONFIG;
var checkPWG = ['debug_on','configObject'];
var basicJS = ['basicVars','canvasBasic','canvasFunction','bln_basic','bln_logic'];
var nextJS = ['jquery','jquery.mousewheel','jquery_ready','loadingSomeObj'];

LazyLoad.js(fullPath(checkPWG), function() {
		DEBUG = new debugObj(2);
		CONFIG = new conObj();
		powerOK();
		});

function start_loading() {
	LazyLoad.css(['css/solid_16col.css','css/create.css'], function() {
		DEBUG.shell("loading css .ready!");
		});
	
	LazyLoad.js(fullPath(basicJS), function() {
		DEBUG.shell("loading basic javascript ..... ready !");
		});
	
	LazyLoad.js(fullPath(nextJS), function() {
		DEBUG.shell("loading jquery javascript ..... ready !");
		});
}
