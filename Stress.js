var type = "";
var L = "";
var support = "";
var load = "";
var I = 0;
var E = 0;
var Ybar = 0;
var Q = 0;
var c = 0;
var t = 0;
var d = 0;
var f = 0;
var f1 = 0;
var f2 = 0;
var d1 = 0;
var d2 = 0;
var distances = new Array()
var forces = new Array ()
var am = 0;
var V = 0;
var M = 0;
var Vloc = 0;
var Mloc = 0;
var shear = 0;
var normal = 0;
var Lsupport = 0;
var Rsupport = 0;
var resultant = 0;
var resultantloc = 0;
var maxDef = 0;
var thisLocation = 0;
var dir = "down"
var ibeam = function () {
	document.getElementById("Ibeam").style.border="5px solid black";
	document.getElementById("Rectangular").style.border="none";
	document.getElementById("Circular").style.border="none";
	type = "ibeam";
}
var rectangular = function () {
	document.getElementById("Rectangular").style.border="5px solid black";
	document.getElementById("Ibeam").style.border="none";
	document.getElementById("Circular").style.border="none";
	type = "rectangular";
}
var circular = function () {
	document.getElementById("Circular").style.border="5px solid black";
	document.getElementById("Rectangular").style.border="none";
	document.getElementById("Ibeam").style.border="none";
	type = "circular";
}
var dim = function () {
	if (type === "ibeam") {
		document.getElementById("First").innerHTML="Enter the width of the Flange (m)"
		document.getElementById("FirstInput").type="text"
		document.getElementById("Second").innerHTML="Enter the height of the Flange (m)"
		document.getElementById("SecondInput").type="text"
		document.getElementById("Third").innerHTML="Enter the width of the Web (m)"
		document.getElementById("ThirdInput").type="text"
		document.getElementById("Fourth").innerHTML="Enter the height of the Web (m)"
		document.getElementById("FourthInput").type="text"
		document.getElementById("type").style.display="none"
		document.getElementById("specs").style.display="block"
	} else if (type === "rectangular") {
		document.getElementById("First").innerHTML="Enter the width of the Rectangular Beam (m)"
		document.getElementById("FirstInput").type="text"
		document.getElementById("Second").innerHTML="Enter the height of the Rectangular Beam (m)"
		document.getElementById("SecondInput").type="text"
		document.getElementById("type").style.display="none"
		document.getElementById("specs").style.display="block"
	} else if (type === "circular") {
		document.getElementById("First").innerHTML="Enter the Outer Diameter of the Circular Beam (m)"
		document.getElementById("FirstInput").type="text"
		document.getElementById("Second").innerHTML="Enter the Inner Diameter of the Circular Beam (m) (If the beam isn't hallow enter 0) "
		document.getElementById("SecondInput").type="text"
		document.getElementById("type").style.display="none"
		document.getElementById("specs").style.display="block"
	} else {
		document.getElementById("First").innerHTML="You havent selected one of the Cross Sections! Please select one and hit Submit."
	}
}
var specs = function () {
	var aa = document.getElementById("FirstInput").value;
	var bb = document.getElementById("SecondInput").value;
	var cc = document.getElementById("ThirdInput").value;
	var dd = document.getElementById("FourthInput").value;
	if (type === "ibeam") {
		if (aa === "" || bb === "" || cc === "" || dd === "") {
			document.getElementById("Error").innerHTML="You haven't filled in all the dimensions! Please fill in all the dimensions and hit Submit."
		} else {
			document.getElementById("Error").innerHTML=""
			var fw = Number(aa);
			var fh = Number(bb);
			var ww = Number(cc);
			var wh = Number(dd);
			if (fw !== fw || fh !== fh || ww !== ww || wh !== wh) {
				document.getElementById("Error").innerHTML="You didnt fill in numbers!. Please fill in all the dimensions with numbers and hit Submit.";
			} else {
				document.getElementById("Error").innerHTML=""
				I = (((ww*(Math.pow(wh,3)))/12) + 2*((fw*(Math.pow(fh,3))/12)+ (fw*fh)*(wh/2+fh/2)*(wh/2+fh/2)));
				Ybar = ((ww*(wh/2)*(wh/4))+(fw*fh*(wh/2+fh/2)))/(ww*(wh/2)+fw*fh);
				Q = ((fw*fh+(wh/2)*ww)*Ybar);
				c = fh*1 + (wh/2);
				t = ww;
				nextstep();
			}
		}
	} else if (type === "rectangular") {
		if (aa === "" || bb === "" ) {
			document.getElementById("Error").innerHTML="You haven't filled in all the dimensions! Please fill in all the dimensions and hit Submit."			
		} else {
			var h = Number(bb);
			var w = Number(aa);
			if (h !== h || w !== w) {
				document.getElementById("Error").innerHTML="You didn't fill in numbers!. Please fill in all the dimensions with numbers and hit Submit.";
			} else {
				document.getElementById("Error").innerHTML=""			
				I = ((w*(Math.pow(h,3)))/12);
				Q = ((h/2)*(h/4)*w);
				c = h/2;
				t = w;
				nextstep();
			}
		}
	} else {
		if (aa === "" || bb === "") {
			document.getElementById("Error").innerHTML="You haven't filled in all the dimensions! Please fill in all the dimensions and hit Submit."					
		} else {
			var doo = Number(aa);
			var di = Number(bb);
			if (doo !== doo || di !== di) {
				document.getElementById("Error").innerHTML="You didnt fill in numbers!. Please fill in all the dimensions with numbers and hit Submit.";				
			} else if (di > doo) {
				document.getElementById("Error").innerHTML="The inner diameter is larger than the outer diameter! Please ensure the out diameter is larger and hit Sumbit again.";								
			} else {
				document.getElementById("Error").innerHTML=""			
				var ro = doo/2;
				var ri = di/2;
				I = (((Math.PI)*(Math.pow(ro,4)))/4) - (((Math.PI)*(Math.pow(ri,4)))/4);
				Q = ((Math.pow(ro,3)) - (Math.pow(ri,3)))*(2/3);
				c = ro;
				t = doo-di;
				nextstep();
			}
		}
	}
}
var nextstep = function() {
	document.getElementById("specs").style.display="none";
	document.getElementById("supptitle").innerHTML="How is the beam supported?"	;				
	document.getElementById('Cantalever').src="http://1.bp.blogspot.com/-PjBY1RpRcmU/Vn0xayFLhVI/AAAAAAAADqg/qlG9bZX3Ib4/s1600/cantilever%2Bbeam.png";
	document.getElementById("Cantalever").style.display="block";	
	document.getElementById('Simple').src="http://4.bp.blogspot.com/-QbnmUbCFk4Q/Vn0xcWooBqI/AAAAAAAADq0/43UFIxxCYyc/s1600/simply%2Bsupported%2Bbeam.png";	
	document.getElementById("Simple").style.display="block";		
	document.getElementById('CantaleverLabel').innerHTML="Cantilever";
	document.getElementById('SimpleLabel').innerHTML="Simply Supported";
	document.getElementById('Length').innerHTML="Enter the Length of the beam (m)";
	document.getElementById("LengthValue").type="text";
	document.getElementById('MofE').innerHTML="Enter the Modulus of Elasticity of the material (GPa)";
	document.getElementById("EValue").type="text";
	document.getElementById("supp").style.display="block";
}
var cantalever = function () {
	document.getElementById("Cantalever").style.border="5px solid black";
	document.getElementById("Simple").style.border="none";
	support = "Cantelever";
}
var simple = function () {
	document.getElementById("Simple").style.border="5px solid black";
	document.getElementById("Cantalever").style.border="none";
	support = "SimplySupported";
}
var supp = function () {
	var ee = document.getElementById("LengthValue").value;
	var ef = document.getElementById("EValue").value;
	if (support === "" || ee === "" || ef === "") {
		document.getElementById("Error2").innerHTML="You haven't filled in all the prompts! Please do so and hit submit again!";
	} else {
		L = Number(ee);
		E = Number(ef);
		if (L !== L) {
			document.getElementById("Error2").innerHTML="The length is not a number!. Please input a number and hit Submit.";
		} else if (E!== E) {
			document.getElementById("Error2").innerHTML="The Modulus of Elasticity is not a number!. Please input a number and hit Submit.";
		} else {
			document.getElementById("Error2").innerHTML="";
			document.getElementById("supp").style.display="none";
			loadingconditions();
		}
	}
}
var loadingconditions = function () {
	document.getElementById('loadtitle').innerHTML="Select the beams loading condition";
	document.getElementById('SinglePL').src="http://www.forestryforum.com/members/donp/pointload.jpg";
	document.getElementById('SinglePL').style.display="block";		
	document.getElementById('DoublePL').src="http://www.forestryforum.com/members/donp/2pt.jpg";
	document.getElementById('DoublePL').style.display="block";		
	document.getElementById('MultiplePL').src="http://www.forestryforum.com/members/donp/simuni.jpg";
	document.getElementById('MultiplePL').style.display="block";		
	document.getElementById('SinglePLLabel').innerHTML="Single Point Load";
	document.getElementById('DoublePLLabel').innerHTML="Double Point Load";
	document.getElementById('MultiplePLLabel').innerHTML="Multiple Point Loads";
	document.getElementById('DiscUDL').src="http://book.transtutors.com/cmsimg/20497_uniformly%20distributed%20load.jpg";
	document.getElementById('DiscUDL').style.display="block";		
	document.getElementById('ContUDL').src="https://upload.wikimedia.org/wikipedia/commons/7/75/Beam_cont_Solid_Mechanics.png";
	document.getElementById('ContUDL').style.display="block";		
	document.getElementById('AppMo').src="http://civilengineer.webinfolist.com/str/def8.gif";
	document.getElementById("AppMo").style.display="block";		
	document.getElementById('DiscUDLLabel').innerHTML="Discrete UDL";
	document.getElementById('ContUDLLabel').innerHTML="Countinuous UDL";
	document.getElementById('AppMoLabel').innerHTML="Applied Moment";
	document.getElementById("loadingcon").style.display="block";
}
var singlePL = function () {
	document.getElementById("SinglePL").style.border="5px solid black";
	document.getElementById("DoublePL").style.border="none";
	document.getElementById("MultiplePL").style.border="none";
	document.getElementById("DiscUDL").style.border="none";
	document.getElementById("ContUDL").style.border="none";
	document.getElementById("AppMo").style.border="none";
	load = "point load";
}
var doublePL = function () {
	document.getElementById("DoublePL").style.border="5px solid black";
	document.getElementById("SinglePL").style.border="none";
	document.getElementById("MultiplePL").style.border="none";
	document.getElementById("DiscUDL").style.border="none";
	document.getElementById("ContUDL").style.border="none";
	document.getElementById("AppMo").style.border="none";
	load = "2 point loads";
}
var multiplePL = function () {
	document.getElementById("MultiplePL").style.border="5px solid black";
	document.getElementById("DoublePL").style.border="none";
	document.getElementById("SinglePL").style.border="none";
	document.getElementById("DiscUDL").style.border="none";
	document.getElementById("ContUDL").style.border="none";
	document.getElementById("AppMo").style.border="none";
	load = "multiple point loads";
}
var discUDL = function () {
	document.getElementById("DiscUDL").style.border="5px solid black";
	document.getElementById("DoublePL").style.border="none";
	document.getElementById("MultiplePL").style.border="none";
	document.getElementById("SinglePL").style.border="none";
	document.getElementById("ContUDL").style.border="none";
	document.getElementById("AppMo").style.border="none";
	load = "discrete UDL";
}
var contUDL = function () {
	document.getElementById("ContUDL").style.border="5px solid black";
	document.getElementById("DoublePL").style.border="none";
	document.getElementById("MultiplePL").style.border="none";
	document.getElementById("DiscUDL").style.border="none";
	document.getElementById("SinglePL").style.border="none";
	document.getElementById("AppMo").style.border="none";
	load = "countinuous UDL";
}
var appMo = function () {
	document.getElementById("AppMo").style.border="5px solid black";
	document.getElementById("DoublePL").style.border="none";
	document.getElementById("MultiplePL").style.border="none";
	document.getElementById("DiscUDL").style.border="none";
	document.getElementById("ContUDL").style.border="none";
	document.getElementById("SinglePL").style.border="none";
	load = "applied moment";
}
var loadingconsub = function () {
	if (load === "") {
		document.getElementById("Error3").innerHTML="You havent selected the loading condition! Please do so and hit submit again!";
	} else {
		document.getElementById("Error3").innerHTML="";
		document.getElementById("supp").style.display="none";
		parameters();
	}
}
var parameters = function () {
	document.getElementById("loadingcon").style.display="none";
	if (load === "point load") {
		document.getElementById("Fifth").innerHTML="Enter the value of the point load (N).";
		document.getElementById("FifthInput").type="text";
		document.getElementById("Sixth").innerHTML="Enter the distance of the point load from the left side of the beam (m)."
		document.getElementById("SixthInput").type="text";
		document.getElementById("final").style.display="block";
	} else if (load === "2 point loads") {
		document.getElementById("Fifth").innerHTML="Enter the value of the point load closest to the left (N).";
		document.getElementById("FifthInput").type="text";
		document.getElementById("Sixth").innerHTML="Enter the distance from the left of the beam of the closest point load to the left (m)";
		document.getElementById("SixthInput").type="text";
		document.getElementById("Seventh").innerHTML="Enter the value of the other point load (N).";
		document.getElementById("SeventhInput").type="text";
		document.getElementById("Eight").innerHTML="Enter the distance from the left of the beam of the other point load (m).";
		document.getElementById("EightInput").type="text";
		document.getElementById("final").style.display="block";		
	} else if (load === "multiple point loads") {
		document.getElementById("Fifth").innerHTML="Enter the values of all the point loads from left to right seperated by a comma (N).";
		document.getElementById("FifthInput").type="text";
		document.getElementById("Sixth").innerHTML="Enter the distances of the point loads from left to right seperated by a comma (m).";
		document.getElementById("SixthInput").type="text";
		document.getElementById("final").style.display="block";		
	} else if (load === "discrete UDL") {
		document.getElementById("Fifth").innerHTML="Enter the value of the Uniformly Distributed Load (N/m).";
		document.getElementById("FifthInput").type="text";
		document.getElementById("Sixth").innerHTML="Enter the distance from the left of the beam that the Uniformly Distributed Load begins (m)";
		document.getElementById("SixthInput").type="text";
		document.getElementById("Seventh").innerHTML="Enter the distance from the left of the beam that the Uniformly Distributed Load ends (m).";
		document.getElementById("SeventhInput").type="text";
		document.getElementById("final").style.display="block";			
	} else if (load === "countinuous UDL") {
		document.getElementById("Fifth").innerHTML="Enter the values of the Uniformly Distributed Load (N/m).";
		document.getElementById("FifthInput").type="text";
		document.getElementById("final").style.display="block";				
	} else {
		document.getElementById("Fifth").innerHTML="Enter the values of the applied moment (positive for counterclockwise, negative for clockwise (N*m).";
		document.getElementById("FifthInput").type="text";
		document.getElementById("Sixth").innerHTML="Enter the distance of the applied moment from the left of the beam (m).";
		document.getElementById("SixthInput").type="text";
		document.getElementById("final").style.display="block";			
	}
}
var ErrorCheck = function () {
	var ff = document.getElementById("FifthInput").value;
	var gg = document.getElementById("SixthInput").value;
	var hh = document.getElementById("SeventhInput").value;
	var ii = document.getElementById("EightInput").value;
	if (load === "point load") {
		if (ff === "" || gg === "") {
			document.getElementById("BigError").innerHTML="You didn't enter all the parameters! Please do so and hit Calculate again.";
		} else {
			f = Number(ff);
			d = Number(gg);
			if (f !== f || d !== d) {
				document.getElementById("BigError").innerHTML="You didn't enter numbers! Please do so and hit calculate again.";
			} else {
				PL();
			}
		}
	} else if (load === "2 point loads") {
		if (ff === "" || gg === "" || hh === "" || ii === "") {
			document.getElementById("BigError").innerHTML="You didn't enter all the parameters! Please do so and hit Calculate again.";			
		} else {
			f1 = Number(ff);
			d1 = Number(gg);
			f2 = Number(hh);
			d2 = Number(ii);
			if (f1 !== f1 || d1 !== d1 || f2 !== f2 || d2 !== d2) {
				document.getElementById("BigError").innerHTML="You didn't enter numbers! Please do so and hit calculate again.";				
			} else {
				TPL();
			}
		}
	} else if (load === "multiple point loads") {
		if (ff === "" || gg === "") {
			document.getElementById("BigError").innerHTML="You didn't enter all the parameters! Please do so and hit Calculate again.";						
		} else {
			distances = gg.split(",");
			for (var a=0; a<distances.length; a++ ) {
				distances[a] = parseInt(distances[a], 10);
			}
			forces = ff.split(",");
			for (var a=0; a<forces.length; a++ ) {
				forces[a] = parseInt(forces[a], 10);
			}
			if (length.distances !== length.forces) {
				document.getElementById("BigError").innerHTML="The number of forces and distances entered are not equal! Please do so and hit Calculate again.";				
			} else {
				MPL();
			}
		}
	} else if (load === "discrete UDL") {
		if (ff === "" || gg === "" || hh === ""){
			document.getElementById("BigError").innerHTML="You didn't enter all the parameters! Please do so and hit Calculate again.";									
		} else {
			f = Number(ff);
			d1 = Number(gg);
			d2 = Number(hh);
			if (f !== f || d1 !== d1 || d2 !== d2) {
				document.getElementById("BigError").innerHTML="You didn't enter numbers! Please do so and hit calculate again.";								
			} else {
				DUDL();
			}
		}
	} else if (load === "countinuous UDL") {
		if (ff === "") {
			document.getElementById("BigError").innerHTML="You didn't enter all the parameters! Please do so and hit Calculate again.";												
		} else {
			f = Number(ff);
			if (f !== f) {
				document.getElementById("BigError").innerHTML="You didn't enter a number for the force! Please do so and hit calculate again.";												
			} else {
				CUDL();
			}
		}
	} else {
		if (ff === "" || gg === "") {
			document.getElementById("BigError").innerHTML="You didn't enter all the parameters! Please do so and hit Calculate again.";															
		} else {
			am = Number(ff);
			d = Number(gg)
			if (am !== am || d !== d) {
				document.getElementById("BigError").innerHTML="You didn't enter numbers! Please do so and hit calculate again.";								
			} else {
				APM();
			}
		}
	}
}
var PL = function () {
	if (support === "Cantelever") {
		V = f;
		Vloc = 0;
		M = f*d;
		Mloc = 0;
		maxDef = (-f*d*d/2)*(L-d/3);
		thisLocation = L;
	} else {
		Rsupport = ((f*d)/L);
		Lsupport = f*1 - Rsupport*1;
		var points = [Math.abs(Lsupport), Math.abs(Rsupport)];
		points.sort(function(a, b){return b-a});
		V = points[0];
		if (V === Rsupport || V === Rsupport*-(1)) {
			Vloc = L;
		} else {
			Vloc = 0;
		}
		M = Math.abs(Lsupport*d);
		Mloc = d;
		var deflections =  [];
		for (var i = L/1000; i < L ; i+=(L/1000)) {
			if (i < d) {
				deflections.push((f*i*i*i/6)*(1-d/L) + i*(f*d*d/2 - f*d*L/3 - f*d*d*d/(6*L)));
    			} else {
    				deflections.push((-f*d*i*i*i/(6*L)) + (f*d*i*i)/2 - (f*d*i/3)*(L + (d*d)/(2*L)) + f*d*d*d/6);
    			} 
		}
		var absDeflections = [];
		for (var j = 0; j < 999; j++) {
			absDeflections.push(Math.abs(deflections[j]));
		}
		absDeflections.sort(function(a, b){return b-a});
		maxDef = absDeflections[0];
		thisLocation = 0;
		var counter3 = 0;
		while(thisLocation === 0) {
			if (maxDef === deflections[counter3] || maxDef === -1*deflections[counter3]) {
  				thisLocation = (1+counter3)*(L/1000);
    				maxDef = deflections[counter3];
  			} else {
	  			counter3++;
  			}
		}
	}
	summary()
}
var TPL = function () {
	resultant = f1*1 + f2*1;
	resultantloc = ((f1*d1 + f2*d2)/(resultant));
	if (support === "Cantelever") {
		V = f1*1 + f2*1;
		Vloc = 0;
		M = (f1*d1) + (f2*d2);
		Mloc = 0;
		thisLocation = L;
		maxDef = ((-d1*d1/2)*(f1+f2)*(L-d1/3) - d1*f2*(d2-d1)*(L-d/2) - f2/2*(d2-d1)*(d2-d1)*(L-d1-d2/3));
	} else {
		Rsupport = ((f1*d1) + (f2*d2))/L; 
		Lsupport = (f1*1 + f2*1 - Rsupport*1);   
		var poi1v = Math.abs(Lsupport);  
		var poi2v = Math.abs(Lsupport*1 - f1*1);   
		var poi3v = Math.abs(Lsupport*1 - f1*1 - f2*1);  
		var points = [poi1v, poi2v, poi3v];
		points.sort(function(a, b){return b-a});
		V = points[0]; 
		if (V === poi1v) {
			Vloc = 0;
		} else if (V === poi2v) {
			Vloc = d1;
		} else {
			Vloc = d2;
		}
		var poi1m = Lsupport*d1;  
		var b = poi1m*1 - (Lsupport*1 - f1*1)*d1;
		var poi2m = Math.abs((Lsupport*1 - f1*1)*d2 + b*1);
		poi1m = Math.abs(poi1m);
		if (poi1m >= poi2m) {
			M = poi1m;
			Mloc = d1;
		} else {
			M = poi2m;
			Mloc = d2;
		} 
		var deflections =  [];
		for (var i = L/1000; i < L ; i+=(L/1000)) {
			if (i < d1) {
				deflections.push((f1*i*i*i/6)*(1-d1/L) + i*(f1*d1*d1/2 - f1*d1*L/3 - f1*d1*d1*d1/(6*L)));
   			 } else {
				deflections.push((-f1*d1*i*i*i/(6*L)) + (f1*d1*i*i)/2 - (f1*d1*i/3)*(L + (d1*d1)/(2*L)) + f1*d1*d1*d1/6);
    			} 
		}
		var ind = -1;
		for (var x = L/1000; x < L; x+=(L/1000)) {
			ind = ind + 1;
			if (x < d2) {
				deflections[ind] = deflections[ind] + (f2*x*x*x/6)*(1-d2/L) + x*(f2*d2*d2/2 - f2*d2*L/3 - f2*d2*d2*d2/(6*L));
			} else {
				deflections[ind] = deflections[ind] + ((-f2*d2*x*x*x/(6*L)) + (f2*d2*x*x)/2 - (f2*d2*x/3)*(L + (d2*d2)/(2*L)) + f2*d2*d2*d2/6);
			}
		}
		var absDeflections = [];
		for (var j = 0; j < 999; j++) {
			absDeflections.push(Math.abs(deflections[j]));
		}
		absDeflections.sort(function(a, b){return b-a});
		maxDef = absDeflections[0];
		thisLocation = 0;
		var counter3 = 0;
		while(thisLocation === 0) {
			if (maxDef === deflections[counter3] || maxDef === -1*deflections[counter3]) {
  				thisLocation = (1+counter3)*(L/1000);
    				maxDef = deflections[counter3];
  			} else {
	  			counter3++;
  			}
		}
	}
	summary();
}
var MPL = function () {
	var totalforce = 0;
	var totalmoment = 0;
	for (var i=0; i<forces.length; i++) {
		totalforce+=forces[i]*1;
		totalmoment+=(forces[i]*distances[i])
	}
	resultant = totalforce;
	resultantloc = totalmoment/totalforce;
	if (support === "Cantelever") { 
		V = totalforce;
		Vloc = 0;
		M = totalmoment;
		Mloc = 0;
		for (var t=0; t < forces.length; t++) {
			maxDef = maxDef + (-forces[t]*distances[t]*distances[t]/2)*(L-distances[t]/3);
		}
		thisLocation = L;
	} else {
		Rsupport = totalmoment/L;
		Lsupport = totalforce*1 - Rsupport*1;
		var shears = [Lsupport];
		for (var i=0; i<forces.length; i++) {
			shears.push(shears[i]*1 - forces[i]*1);
		} 
		var shears1 = [];
		for (var j=0; j<shears.length; j++) {
			shears1.push(Math.abs(shears[j]));
		}
		shears1.sort(function(a, b){return b-a});
		V = shears1[0];
		var counter = 0;
		var found = false;
		while (found === false) {
			if (V === shears[counter] || (-1)*V === shears[counter]) {
				found = true
			}
			counter++;
		}
		if (counter === 0) {
			Vloc = 0;
		} else if (counter > distances.length - 1) {
			Vloc = L;
		} else {
			Vloc = distances[counter*1 - 1];
		}
		var moments = [Lsupport*distances[0]];
		for (var i=0; i<(forces.length*1 - 1); i++) {
			var b = moments[i]*1 - shears[i+1]*distances[i];
			moments.push(shears[i+1]*distances[i+1] + b*1);
		} 
		var moments1 = [];
		for (var i=0; i<moments.length; i++) {
			moments1[i] = Math.abs(moments[i]);
		}
		moments1.sort(function(a, b){return b-a});
		M = moments1[0];
		var counter2 = 0;
		var found2 = false;
		while (found2 === false) {
			if (M === moments[counter2] || (-1)*M === moments[counter2]) {
				found2 = true;
			}
			counter2++;
		}
		if (counter2 === 0) {
			Mloc = 0;
		} else {
			Mloc = distances[counter2*1 - 1];
		}
		var f1 = forces[0];
		var d1 = distances[0];
		var deflections = [];
		var spot = 0;
		for (var i = L/1000; i < L ; i+=(L/1000)) {
			if (i < d1) {
				deflections.push((f1*i*i*i/6)*(1-d1/L) + i*(f1*d1*d1/2 - f1*d1*L/3 - f1*d1*d1*d1/(6*L)));
			} else {
				deflections.push((-f1*d1*i*i*i/(6*L)) + (f1*d1*i*i)/2 - (f1*d1*i/3)*(L + (d1*d1)/(2*L)) + f1*d1*d1*d1/6);
			} 
		}
		for (var t=1; t < forces.length; t++) {
			spot = 0;
			for (var x = L/1000; x < L ; x+=(L/1000)) {
				if (x < distances[t]) {
					deflections[spot] = deflections[spot] + ((forces[t]*x*x*x/6)*(1-distances[t]/L) + x*(forces[t]*distances[t]*distances[t]/2 - forces[t]*distances[t]*L/3 - forces[t]*distances[t]*distances[t]*distances[t]/(6*L)))
				} else {
					deflections[spot] = deflections[spot] + ((-forces[t]*distances[t]*x*x*x/(6*L)) + (forces[t]*distances[t]*x*x)/2 - (forces[t]*distances[t]*x/3)*(L + (distances[t]*distances[t])/(2*L)) + forces[t]*distances[t]*distances[t]*distances[t]/6)
				}
				spot++;
			}
		}
		var absDeflections = [];
		for (var j = 0; j < 999; j++) {
			absDeflections.push(Math.abs(deflections[j]));
		}
		absDeflections.sort(function(a, b){return b-a});
		maxDef = absDeflections[0];
		thisLocation = 0;
		var counter3 = 0;
		while(thisLocation === 0) {
			if (maxDef === deflections[counter3] || maxDef === -1*deflections[counter3]) {
				thisLocation = (1+counter3)*(L/1000);
				maxDef = deflections[counter3];
			} else {
				counter3++;
			}
		}
	}
	summary();
}
var DUDL = function () {
	var net = (d2*1 - d1*1)*f;
	var xbar = (d2*1 + d1*1)/2;
	resultant = net;
	resultantloc = xbar;
	if (support === "Cantelever") {
		V = net;
		Vloc = 0;
		M = net*xbar;
		Mloc = 0;
	} else {
		Rsupport = (net*xbar)/L;
		Lsupport = net*1 - Rsupport*1;
		if (Math.abs(Rsupport) >= Math.abs(Lsupport)) {
			V = Math.abs(Rsupport);
			Vloc = L;
		} else {
			V = Math.abs(Lsupport);
			Vloc = 0;
		}
		var poi1m = Lsupport*d1;
		var b = Lsupport*1 + f*d1;
		var xnode = b/f;
		var c = poi1m*1 + (f/2)*(d1*d1) - b*d1;
		var poi2m = (-1)*(f/2)*(xnode*xnode) + b*xnode + c*1;
		var poi3m = (-1)*(f/2)*(d2*d2) + b*d2 + c*1;
		var points = [Math.abs(poi1m), Math.abs(poi2m), Math.abs(poi3m)];
		points.sort(function(a, b){return b-a});
		M = points[0];
		if (M === Math.abs(poi1m)) {
			Mloc = d1;
		} else if (M === Math.abs(poi2m)) {
			Mloc = xnode;
		} else {
			Mloc = d2;
		}
	}
	summary();
}
var CUDL = function () {
	resultant = f*L;
	resultantloc = L/2;
	if (support === "Cantelever") {
		V = f*L;
		Vloc = 0;
		M = V*(L/2);
		Mloc = 0;
	} else {
		V = (f*L)/2;
		Lsupport = V;
		Rsupport = V;
		Vloc = 0;
		M = (f*(L*L))/8;
		Mloc = L/2;
	}
	summary();
}
var APM = function () {
	if (support === "Cantelever") {
		V = 0;
		Vloc = 0;
		M = am;
		Mloc = 0;
	} else {
		V = Math.abs(am/L);
		if (am > 0) {
			Lsupport = V;
			Rsupport = -1*V;
		} else {
			Lsupport = -1*V
			Rsupport = V;
		}
		Vloc = 0;
		var poi1m = Math.abs(V*d);
		var poi2m = Math.abs(V*(L*1 - d*1));
		if (poi1m >= poi2m) {
			M = poi1m;
		} else {
			M = poi2m;
		}
		Mloc = d;
	} 
	summary();
}
var summary = function () {
	document.getElementById("final").style.display="none";
	V = Math.abs(V);
	M = Math.abs(M);
	shear = ((V*Q)/(I*t));
	normal = ((M*c)/(I));
	maxDef = maxDef/(E*I);
	var ddef = Math.abs(maxDef);
	if (shear < 1000) {
		document.getElementById("ShearAns").innerHTML="The maximum Shear Stress is " + shear + "Pa.";									
	} else if (shear < 1000000) {
		shear = shear/1000;
		document.getElementById("ShearAns").innerHTML="The maximum Shear Stress is " + shear + "KPa.";											
	} else {
		shear = shear/1000000;
		document.getElementById("ShearAns").innerHTML="The maximum Shear Stress is " + shear + "MPa.";											
	}
	if (normal < 1000) {
		document.getElementById("BendingAns").innerHTML="The maximum Bending Stress is " + normal + "Pa.";									
	} else if (normal < 1000000) {
		normal = normal/1000
		document.getElementById("BendingAns").innerHTML="The maximum Bending Stress is " + normal + "KPa.";											
	} else {
		normal = normal/1000000
		document.getElementById("BendingAns").innerHTML="The maximum Bending Stress is " + normal + "MPa.";											
	}
	if (ddef < 0.00000001) {
		document.getElementById("MaxDef").innerHTML= "There is no deflection at any point in the beam.";
	} else if (maxDef < 0 && ddef < 1 ) {
		ddef = ddef*1000;
		document.getElementById("MaxDef").innerHTML= "The maximum Deflection is " + ddef + "mm Downwards."
	} else if (maxDef < 0 && ddef > 1) {
			document.getElementById("MaxDef").innerHTML= "The maximum Deflection is " + ddef + "m Downwards."
	} else if (maxDef > 0 && ddef < 1) {
			document.getElementById("MaxDef").innerHTML= "The maximum Deflection is " + ddef + "mm Upwards."
	} else {
			document.getElementById("MaxDef").innerHTML= "The maximum Deflection is " + ddef + "m Upwards."
	}
	document.getElementById("extra").style.display="block";			
}
var Details = function () {
	document.getElementById("extra").style.display="none";
	document.getElementById("Vforce").innerHTML="The maximum Shear Force is " + V + "N.";											
	document.getElementById("Vlocation").innerHTML="The thisLocation of the maximum Shear force is " + Vloc + "m (from the left end of the beam).";											
	document.getElementById("Mmoment").innerHTML="The maximum Bending Moment is " + M + "Nm.";											
	document.getElementById("Mlocation").innerHTML="The thisLocation of the maximum Bending Moment is " + Mloc + "m (from the left end of the beam).";
	document.getElementById("defloc").innerHTML="The thisLocation of the maximum Deflection is " + thisLocation + "m (from the left end of the beam).";
	var order = "3";
	document.getElementById("Qvalue").innerHTML="The maximum First Moment of Area (Q) is " + Q + "m" + order.sup() + ".";
	var order2 = "4";
	document.getElementById("MomentofInertia").innerHTML="The Moment of Inertia is " + I + "m" + order2.sup() + ".";											
	document.getElementById("Thickness").innerHTML="The Beams Thickness at maximum Shear Stress is " + t + "m.";											
	document.getElementById("PerpandicularDistance").innerHTML="The Maximum Perpendicular Distance (c) is " + c + "m.";											
	document.getElementById("Clarification").innerHTML="(The thisLocation of the maximum Shear Force and Bending Moment represent just one thisLocation where the Shear Force and Bending Moment are at a maximum.)";	
	if (support === "SimplySupported") {
		if (Lsupport < 0) {
			document.getElementById("LeftSupp").innerHTML="The Left Support exerts a " + Lsupport + "N force downwards."											
		} else {
			document.getElementById("LeftSupp").innerHTML="The Left Support exerts a " + Lsupport + "N force upwards."											
		}
		if (Rsupport < 0) {
			document.getElementById("RightSupp").innerHTML="The Right Support exerts a " + Rsupport + "N force downwards."											
		} else {
			document.getElementById("RightSupp").innerHTML="The Right Support exerts a " + Rsupport + "N force upwards."											
		}	
	}
	if (load === "discrete UDL" || load === "countinuous UDL" || load === "2 point loads" || load === "multiple point loads") {
		document.getElementById("Resultant").innerHTML="The load exerts a resultant force of " + resultant + "N at " + resultantloc + "m (from the left end of the beam)."
	}
}
