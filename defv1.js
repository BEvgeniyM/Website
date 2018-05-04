//defer 
var canvas = document.getElementById ("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var width=window.innerWidth, height =window.innerHeight;
var scaleX, scaleY, str ;
var myArray = new Array();
var heightPlas = 0 ;
var f = false;
var CoordX = 1;
var CoordY = 1;

function initial (path,num) {

    var SpLen = new Array(12);
    var image = new Image ();

    SpLen  [0] = 59.5;
    SpLen  [1] = 21.2;
    SpLen  [2] = 41.25;
    SpLen  [3] = 22.0;
    SpLen  [4] = 41.25;
    SpLen  [5] = 22.83;
    SpLen  [6] = 41.25;
    SpLen  [7] = 23.69;
    SpLen  [8] = 36.8;
    SpLen  [9] = 23.7;
    SpLen  [10] = 93.6;
    SpLen  [11] = 20.8;

    for(var i = 0; i <SpLen.length; i++) {
        if ( num == i) {
            CoordX = SpLen  [i];
            CoordY = SpLen  [i + 1];
	        i=12;
        }
    }

	image.onload = function() {

        scaleX =this.width/CoordX;
        scaleY =this.height/CoordY;

        canvas.width = this.width;
        canvas.height = this.height;

	    drawImage(image,heightPlas);

        if (myArray.length!=0 && num!=13) {
        drowDent (heightPlas);
         }

	}

	image.src=path;
	initial.img = image;

}

function drawImage(img,heightPlas =0 ) {
    scaleX =img.width/CoordX;
    scaleY =img.height/CoordY;
    console.log ("insite "+ scaleX);

    canvas.width = img.width;
    canvas.height = img.height+heightPlas;
    console.log ("canvas.width "+  canvas.width);

    width = img.width;
    height = img.height+heightPlas;

    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.stroke(); 
	

	
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0+heightPlas, canvas.width, img.height+heightPlas);

    }

function readFile(id = 'inputFile') {
       var selectedFile = document.getElementById(id).files[0];
       var reader = new FileReader();

       reader.onload = function (e) {
             var FileContent = e.target.result;
			 parseContent(FileContent);
             };

            reader.readAsText(selectedFile);

        };

function parseContent(content) {
	myArray = (content.replace(/\s{2,}/g, " ").split( /\s/g));
	drowDent  ();
};

function drowDent (heightPlas =0){
	for(var i = 0; i<myArray.length; i+=5) {
      circle ((myArray [i] * scaleX), (myArray [i+1] * scaleY+heightPlas) ,(myArray [i+2] * (scaleX)),(myArray [i+3] * (scaleY) ),0,(i/5+1),myArray [i+4]);
	}
}	

function circle (x,y,r,rr,fill_Y_N=0,i, Depth) {

   var rrr=rr/r;
    // Переносим СК в центр будущего эллипса
    ctx.save();
    ctx.translate(x, y);

    ctx.scale(1,rrr);
    ctx.beginPath();

	fillStyle = "rgba(226,233,255,0.5)";
    ctx.arc(x*0, y*0, r/2, 0, 2*Math.PI, false);
	ctx.strokeStyle = "rgba(226,233,255,1)";

	
    if (fill_Y_N == 1)    {
		ctx.setLineDash([25, 5]);
    };
	
	if (Depth >= 0.01 && Depth < 0.024)    {
		ctx.fillStyle = "rgba(226,233,255,0.5)";
        ctx.fill();
    };
	
	if (Depth >= 0.024   )    {        
		ctx.fillStyle = "rgba(226,33,255,0.1)";
        ctx.fill();
    };
	
	if (Depth >= 0.024 && f==true)    {
	    ctx.restore();
		ctx.save();
		ctx.translate(x, y);
	    ctx.scale(1,1);

		ctx.beginPath();
		ctx.arc(x*0, y*0, (Math.max(r,rr)/2+(1.5*Math.min(scaleX, scaleX))), 0, 2*Math.PI, false);
		ctx.fillStyle = "rgba(226,233,255,0.2)";
        ctx.fill();		
		
    };
	
	
    ctx.lineWidth = 5;    
    ctx.stroke();
	
	ctx.restore();
	ctx.stroke();
	ctx.scale(1,1);
	
	if ( i> 0  ) {
        ctx.fillStyle = "rgb(176, 202, 244)";
        ctx.strokeStyle = "rgb(176, 202, 244)";
        ctx.font = "italic 20pt Arial";
        ctx.fillText( ("#" + i), x, y);
    }
		
}

function reset () {
f = false;
 }

function repair () {
f = true;
drowDent ();

 }

function Convert() {
    // if (path.indexOf('data:image/') !== 0) {
    //     image.crossOrigin = 'Anonymous';
    // }
    console.log(initial.img);
    console.log(initial.data);
    //if (initial.img.indexOf('data:img/') !== 0) {
        initial.img.crossOrigin = 'Anonymous';
    //}
    canvas.crossOrigin = 'Anonymous';
  //По нажатию на кнопку получаем канвас
 //var canvas = document.getElementById('myCanvas');
  // И создаем из него картиику в base64
  var quality = 1; // качество от 0 до 1, заодно и сжать можно
  var myImage = {
    data: canvas.toDataURL('image/jpeg', quality),
    height: canvas.height,
    width: canvas.width
  };
  // теперь из картинки делаем PDF
  createPDF(myImage);
}

function createPDF(image) {
  let w = ConvertPxToMM(image.width);
  let h = ConvertPxToMM(image.height);
  var orientation = w > h ? 'l' : 'p';

  //Создаем документ PDF размером с нашу картинку
  var docPDF = new jsPDF(orientation, 'mm', [w, h]);
  //рисуем картинку на всю страницу
  docPDF.addImage(image.data, 'JPEG', 0, 0);

  //Сохраням полученный файл
  //Возможные значения : dataurl, datauristring, bloburl, blob, arraybuffer, ('save', filename)
  docPDF.output('save', 'BOEING REPAIR SKETCH for Spoiler.pdf');
}

function ConvertPxToMM(pixels) {
  return Math.floor(pixels * 0.264583);
}

