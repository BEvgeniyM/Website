//defer
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
var width=window.innerWidth, height =window.innerHeight;

//var path = "0.png";
//var backgroundP = LoadImage (path);

var scaleX, scaleY, str ;
var myArray = new Array();
var DataStr = new Array(100);
var heightPlas = 0 ;
var f = false;
//a = document.getElementsByTagName('html');
//a[0].style.transform = "scale(0.7)";



function initial (path,num) {

    var image = new Image ();

    image.onload = function() {
        console.log("Height: " + this.height);
        console.log("Height: " + this.width);
        image.height =this.height;
        image.width =this.width;
    }
    image.src=path;

    var SpLen = new Array(12);

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
            //alert (CoordX);
            i=12;
        }
    }

    scaleX =image.width/CoordX;
    //alert (scaleX);
    //alert (backgroundP.width);
    scaleY =image.height/CoordY;
    //alert (scaleY);

    drawImage(image,heightPlas);

    if (myArray.length!=0) {
        drowDent (heightPlas);
    }

    //textInput ();
}


function drawImage(img,heightPlas =0 ) {
    scaleX =img.width/CoordX;
    scaleY =img.height/CoordY;

    // alert ("  drawImage  img-" + img.width);
    canvas.width = img.width;
    canvas.height = img.height+heightPlas;
    //alert ("drawImage canvas  = "+img.width);
    width = img.width;
    height = img.height+heightPlas;
    canvas.width = img.width*0.9663;
    canvas.height = img.height*0.9663;

    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.rect(0,0,canvas.width,canvas.height);
    //ctx.strokeStyle="red";
    ctx.stroke();



    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0+heightPlas, canvas.width, img.height+heightPlas);
    //alert (canvas.height);
    //circle (0,0,50,1);
    //circle (canvas.width,0,50,1);


}


function readFile(id = 'inputFile') {
    var selectedFile = document.getElementById(id).files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var FileContent = e.target.result;
        parseContent(FileContent);
    };

    reader.readAsText(selectedFile);
    //textqq =reader.readAsText(selectedFile);
};

function parseContent(content) {
    var reg = /\d/g;
    //alert(content);
    str =content;
    //textqq = String(content);
    //textqq = JSON.stringify(content);
    textqq = JSON.stringify(content) +"END";

    //alert(textqq );

    //https://javascript.ru/forum/css-html/60617-chtenie-fajjla-na-storone-klienta-2.html

    myArray = (str.replace(/\s{2,}/g, " ").split( /\s/g));
    //alert (myArray.length);
    //alert (myArray);
    //document.write(str);
    drowDent  ();

};

function drowDent (heightPlas =0){

    for(var i = 0; i<myArray.length; i+=5) {

        circle ((myArray [i] * scaleX), (myArray [i+1] * scaleY+heightPlas) ,(myArray [i+2] * (scaleX)),(myArray [i+3] * (scaleY) ),0,(i/5+1),myArray [i+4]);

        //if (i>0){
        //  alert ("i=" + i);
        //alert (myArray [i]);
        //alert (myArray [i+1]);
        //alert (myArray [i+2]);
        //alert (myArray [i+3]);
        //}

    }
}


function circle (x,y,r,rr,fill_Y_N=0,i, Depth) {
    //alert ( x + "  " + y + "  " + r + " rr " + rr + " Depth " + Depth );
    var rrr=rr/r;
    // Переносим СК в центр будущего эллипса
    ctx.save();
    ctx.translate(x, y);
    //alert ("r" + r + "   " + rr);
    ctx.scale(1,rrr);
    ctx.beginPath();
    //alert (rr);
    //ctx.scale(r,(r*rr/rr));
    fillStyle = "rgba(226,233,255,0.5)";
    ctx.arc(x*0, y*0, r/2, 0, 2*Math.PI, false);
    ctx.strokeStyle = "rgba(226,233,255,1)";


    if (fill_Y_N == 1)    {
        //ctx.fillStyle = 'red';
        ctx.setLineDash([25, 5]);
        //ctx.fill();
    };

    if (Depth >= 0.01 && Depth < 0.024)    {
        //fillStyle = 'red';
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
        //fillStyle = 'red';.
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







function textInput () {
    circle (canvas.width/2+600,canvas.height-85,20,fill_Y_N=0,0, 1);
    circle (canvas.width/2+600,canvas.height-25,20,fill_Y_N=0,0, 0);

    ctx.fillStyle = "rgba(226,233,255,0.2)"; //"#00F";
    ctx.strokeStyle = "rgba(226,233,255,0.5)";
    ctx.font = 0.5* Math.min(scaleX, scaleX)+"pt Arial";
    //ctx.fillText( "BOEING REPAIR SKETCH", 100, 50);
    //ctx.fillText( "BOTTOM VIEW",  canvas.width/2-200, canvas.height-85);
    //ctx.fillText( "LH SHOWN, RH OPPOSITE",  canvas.width/2-320, canvas.height-30);
    //ctx.fillText( "Dent is deeper than 0.01 inch",  canvas.width/2+650, canvas.height-70);
    //ctx.fillText( "Dent is less than 0.01 inch",  canvas.width/2+650, canvas.height-10);

}

function Convert() {
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

//image - должен иметь свойста height,width и data - хранит картинку в base64
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

