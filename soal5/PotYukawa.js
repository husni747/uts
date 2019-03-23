//UTS Komgran, soal no 5
//simulasi potensial yukawa
//Husni Ihsudha/10215040

//devine global variable
var x1,x2, y1,y2;
var vx1,vx2, vy1,vy2;
var m1, d1, cL1, cF1;
var m2, d2, cL2, cF2;
var g, alp, r, teta;
var h1, ta1, ta2, btn1, btn2, btn3, btn4, div0, div1, div2, can;
var proc, Tproc;
var tbeg, tend, dt, t;
var Tdata, Ndata, idata;
var xmin, ymin, xmax, ymax;

main();

function main() {
	createElements();
	initParams();
}

function initParams(){
	
	t = tbeg;
	Ndata = Math.round(Tdata / dt);
	idata = Ndata;
	
	//set color
	cL1 = "#f00";
	cF1 = "#fcc";
	cL2 = "#00f";
	cF2 = "#ccf";
	
	// Set drawing area
	xmin = -0.2; // m
	ymin = -0.1; // m
	xmax = 0.2; // m
	ymax = 0.1; // m
	
}

function simulation(){
		
	//calculate r and angle);
	r=Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
	teta=Math.atan((y2-y1)/(x2-x1));
		
	if(idata == Ndata) {
		// Display results on textarea
		ta2.value += t.toFixed(3) + "\t" 
			+ x1.toFixed(3) + "\t" + y1.toFixed(3) + "\t"
			+ vx1.toFixed(3) + "\t" + vy1.toFixed(3) + "\t"
			+ x2.toFixed(3) + "\t" + y2.toFixed(3) + "\t"
			+ vx2.toFixed(3) + "\t" + vy2.toFixed(3) + "\n";
		ta2.scrollTop = ta2.scrollHeight;
		
		// Display mass position of canvas
		clearCanvas(can);
		drawMassOnCanvas(x1, y1, d1, cL1, cF1, can);
		drawMassOnCanvas(x2, y2, d2, cL2, cF2, can);
		
		idata = 0;
	}
		
	// Calculate force from Yukawa
	var F1 	= -g*g*Math.exp(-alp*m1*r)*(alp*m1*r+1)/Math.pow(r,2);
	var F2 	= -g*g*Math.exp(-alp*m2*r)*(alp*m2*r+1)/Math.pow(r,2);
	var F1x	= F1*Math.cos(teta);
	var F1y	= F1*Math.sin(teta);
	var F2x	= F2*Math.cos(teta);
	var F2y	= F2*Math.sin(teta);
	
	// Use Newton 2nd law of motion
	var ax1 = F1x / m1;
	var ay1 = F1y / m1;
	var ax2 = F2x / m2;
	var ay2 = F2y / m2;
		
	// Implement Euler method
	vx1 = vx1 + ax1*dt;
	x1 	= x1 + vx1*dt;
	vy1 = vy1 + ay1*dt;
	y1 	= y1 + vy1*dt;
	
	vx2 = vx2 + ax2*dt;
	x2 	= x2 + vx2*dt;
	vy2 = vy2 + ay2*dt;
	y2 	= y2 + vy2*dt;
	
	// Terminate simulation if condition meets		
	if(t >= tend) {
		clearInterval(proc);
		btn1.innerHTML = "Start";
		//btn1.disabled = true;
	} else {
		t +=dt;
		idata++;
	}
}

// Display mass position of canvas
function drawMassOnCanvas(x, y, R, cLine, cFill, can) {
	var cx = can.getContext("2d");
	
	// Get canvas coordinate
	var XMIN = 0;
	var YMIN = can.height;
	var XMAX = can.width;
	var YMAX = 0;
	
	// Draw mass
	var RR = tx(2*R) - tx(R);
	cx.beginPath();
	cx.strokeStyle = cLine;
	cx.lineWidth = 4;
	cx.arc(tx(x), ty(y), RR, 0, 2*Math.PI);
	cx.stroke();
	cx.fillStyle = cFill;
	cx.fill();
	
	// Transform x from real coordinate to canvas coordinate
	function tx(x) {
		var xx = (x - xmin) / (xmax - xmin) * (XMAX - XMIN) + XMIN;
		return xx;
	}
	
	// Transform y from real coordinate to canvas coordinate
	function ty(y) {
		var yy = (y - ymin) / (ymax - ymin) * (YMAX - YMIN) + YMIN;
		return yy;
	}
}

//create Elements
function createElements(){
	//create text tittle
	h1=document.createElement("h1");
	h1.innerHTML="Yukawa potential simulation";
	
	//create textarea
	ta1=document.createElement("textarea");
	ta1.style.width = "600px";
	ta1.style.height = "100px";
	ta1.style.overflowY = "scroll";
	ta1.style.float = "left";
	
	ta2=document.createElement("textarea");
	ta2.style.width = "600px";
	ta2.style.height = "100px";
	ta2.style.overflowY = "scroll";
	ta2.style.float = "left";
	
	// Display header information
	ta2.value = "# t \tx1 \ty1 \tvx1 \tvy1 \tx2 \ty2 \tvx2 \tvy2 \n";
	
	//create start button
	btn1 = document.createElement("button");
	btn1.innerHTML = "Start";
	btn1.style.width= "48px";
	btn1.style.float = "left";
	btn1.addEventListener("click", btnClick);
	
	//create stop button
	btn2 = document.createElement("button");
	btn2.innerHTML = "clear";
	btn2.style.width= "48px";
	btn2.style.float = "left";
	btn2.addEventListener("click", btnClick);
	
	//create read button
	btn3 = document.createElement("button");
	btn3.innerHTML = "read";
	btn3.style.width= "48px";
	btn3.style.float = "left";
	btn3.addEventListener("click", btnClick);
	
	//create load button
	btn4 = document.createElement("button");
	btn4.innerHTML = "load";
	btn4.style.width= "48px";
	btn4.style.float = "left";
	btn4.addEventListener("click", btnClick);
	
	//create division
	div0 = document.createElement("div");
	div0.style.width="655px";
	div0.style.border="1px solid #aaa";
	
	div1 = document.createElement("div");
	div1.style.height = "210px";
	div1.style.width = "48px";
	div1.style.border = "1px solid #aaa";
	div1.style.float = "left";
	div1.style.background = "#eee";
	
	div2 = document.createElement("div");
	//div2.style.height = "300px";
	div2.style.width = "605px";
	div2.style.float = "left";
	
	//create canvas
	can = document.createElement("canvas");
	can.style.width = "650px";
	can.style.height = "500px";
	can.style.float = "left";
	can.style.border = "1px solid #ccc";
	
	//atur letak
	document.body.append(h1);
	document.body.append(div0);
	div0.append(div1);
		div1.append(btn4);
		div1.append(btn3);
		div1.append(btn1);
		div1.append(btn2);
	div0.append(div2);
		div2.append(ta1);
		div2.append(ta2);
	div0.append(can);
}

// Handle button click event
function btnClick() {
	// Get target and verbose to ta2
	var target = event.target;
	var cap = target.innerHTML;
	tout(ta2, cap + "\n");
	
	// Perform according to the clicked button
	if(cap == "load") {
		loadParameters(ta1);
		btn3.disabled = false;
		tout(ta1, "Parameters are loaded\n\n");
	} else if(cap == "clear") {
		clearCanvas();
		btn3.disabled = true;
		btn1.disabled = true;
		tout(ta2, "All are cleared except this element\n\n");
	} else if(cap == "read") {
		readParameters(ta1);
		initParams();
		clearCanvas();
		btn1.disabled = false;
		tout(ta2, "Parameters are read\n");
		tout(ta2, "Slightly random grains position "
			+ "are generated\n\n");
	} else if(cap == "Start") {
		target.innerHTML = "Stop";
		btn3.disabled = true;
		ta1.disabled = true;
		tout(ta2, "Simulation starts\n\n");
		proc = setInterval(simulation, Tproc);
	} else if(cap == "Stop") {
		target.innerHTML = "Start";
		btn3.disabled = false;
		ta1.disabled = false;
		tout(ta2, "Simulation stops\n\n");
		clearInterval(proc);
	} 
}

// Load parameters to textarea
function loadParameters() {
	var lines = "";
	lines += "# Parameters\n";
	lines += "x1 -0.01 \n";    
	lines += "x2 0.03 \n";     
	lines += "y1 0 \n";  
	lines += "y2 0.05 \n";   
	lines += "vx1 0 \n";      
	lines += "vy1 0 \n";      
	lines += "vx2 -1.1 \n";   
	lines += "vy2 0 \n";      
	lines += "g 1 \n";      
	lines += "alp 1 \n";    
	lines += "m1 100000 \n"; 
	lines += "m2 10 \n";     
	lines += "d1 0.001 \n";  
	lines += "d2 0.001 \n";  
	
	lines += "\n";
	lines += "# Simulation\n";
	lines += "dt 0.0001\n"; 
	lines += "TBEG 0\n";       
	lines += "TEND 1\n";      
	lines += "TDATA 0.001\n";  
	lines += "TPROC 1\n";     
		
	var ta = arguments[0];
	ta.value = lines;
	ta.scrollTop = ta.scrollHeight;
}

// Read parameters
function readParameters() {
	var lines = arguments[0].value;
	
	// Get parameters information
	g 	= getValue(lines, "g");
	alp = getValue(lines, "alp");
	m1 	= getValue(lines, "m1");
	m2 	= getValue(lines, "m2");
	x1 	= getValue(lines, "x1");
	x2 	= getValue(lines, "x2");
	y1 	= getValue(lines, "y1");
	y2 	= getValue(lines, "y2");
	vx1 = getValue(lines, "vx1");
	vx2 = getValue(lines, "vx2");
	vy1 = getValue(lines, "vy1");
	vy2 = getValue(lines, "vy2");
	d1 	= getValue(lines, "d1");
	d2 	= getValue(lines, "d2");


	// Get simulation information
	dt 		= getValue(lines, "dt");
	tbeg 	= getValue(lines, "TBEG");
	tend 	= getValue(lines, "TEND");
	Tdata 	= getValue(lines, "TDATA");
	Tproc 	= getValue(lines, "TPROC");

	
}

// Display text in an output textarea
function tout() {
	var taOut = arguments[0];
	var msg = arguments[1];
	taOut.value += msg;
	taOut.scrollTop = taOut.scrollHeight;
}

// Clear all
function clearAll() {
	ta1.value = "";
	ta2.value = "";
	clearCanvas();
}

function clearCanvas() {
	var cx = can.getContext("2d");
	cx.fillStyle = "#fff";
	cx.fillRect(0, 0, can.width, can.height);	
}

// Get value from a line inside parameter textarea
function getValue(lines, key) {
	var value = undefined;
	var line = lines.split("\n");
	var N = line.length;
	for(var i = 0; i < N; i++) {
		var col = line[i].split(" ");
		if(col[0] == key) {
			value = parseFloat(col[1]);
		}
	}
	return value;
}
