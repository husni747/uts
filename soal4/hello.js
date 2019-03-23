//Program "hello.js"
//UTS Komputasi Granular, soal no. 4
//Husni Ihsudha, 10215040

// main function
main();

// membuat main function
function main() {
	
	//element main function
	createTextArea();			
	WriteText();
}

// membuat TextArea
function createTextArea() {
	
	// Membuat TextArea
	var arg = document.createElement("textarea");
	arg.id = arguments[0];
	arg.style.width = "400px";
	arg.style.height = "100px";
	
	// Mengatur letak TextArea
	document.body.append(arg);
}

// Membuat Text
function WriteText(){
	var text = document.getElementById(arguments[0]);
	text.value = "Hello, Husni Ihsudha yang ber-NIM 10215040!";
	text.style.fontSize = "15px";
}
