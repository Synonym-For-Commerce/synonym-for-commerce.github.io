// just store some code i might need again

var ctx = canvas.getContext("2d");

var curve1Coordinates = [{x: .2, y: -.1},{x: .4, y: .05},{x: .35, y: .35},{x: .52, y: .3},{x: .45, y: .85},{x: .68, y: 1},{x: .65, y: 1.2}];
var curve2Coordinates = [{x: .45, y: -.1},{x: .45, y: .15},{x: .25, y: .25},{x: .25, y: .75},{x: .45, y: .85},{x: .6, y: .6},{x: .65, y: 1},{x: .9, y: .8},{x: .88, y: 1.2}];
var curve3Coordinates = [{x: .15, y: 1.2},{x: .16, y: 1},{x: .33, y: .9},{x: .43, y: .45},{x: .6, y: .38},{x: .7, y: .65},{x: .5, y: .9},{x: .5, y: 1.3},{x: .9, y: 1.3},{x: .8, y: .5},{x: 1.1, y: .66}];
var curve4Coordinates = [{x: .7, y: -.1},{x: .9, y: .15},{x: .7, y: .4},{x: .75, y: .8},{x: .95, y: .8},{x: 1, y: .4},{x: 1.1, y: .5}];

//this draws paths from arrays
// Homan
// 14 AUG 2011
// drawCurves
// https://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas
function drawCurves(coord){
    ctx.beginPath();
    //starting coordinates
    ctx.moveTo(w*coord[0].x, h*coord[0].y);

    for (i = 1; i < coord.length - 2; i++) {
        var xc = (w*coord[i].x + w*coord[i + 1].x) / 2;
        var yc = (h*coord[i].y + h*coord[i + 1].y) / 2;
        ctx.quadraticCurveTo(w*coord[i].x, h*coord[i].y, xc, yc);
    }
    // ending coordinates
    ctx.quadraticCurveTo(w*coord[i].x, h*coord[i].y, w*coord[i + 1].x, h*coord[i + 1].y);

    ctx.lineWidth = w*.04;
    ctx.strokeStyle = greyC;
    ctx.stroke();

    ctx.lineWidth = w*.02;
    ctx.strokeStyle = white;
    ctx.stroke();
    pathTest = ctx.closePath();
}

//draws dots in order to visually aid curve desgin
//not used in final production
function drawPoints(coord){
    for(i=0; i < coord.length; i++){
    ctx.beginPath();
    ctx.arc(w*coord[i].x, h*coord[i].y, 10, 0, 2 * Math.PI);
    ctx.stroke();
    }
}




//returns lateral distance between flamingone and element
//negative if element is on left
function getLateralDist(element) {
  var fPos = flamingone.getBoundingClientRect();
  var ePos = element.getBoundingClientRect();
  return ((ePos.left + ePos.right) / 2) - ((fPos.left + fPos.right) / 2);
}

//returns distance between bottom of element and bottom of flamingone
//negative if element is above
function getBottomDist(element) {
  var fPos = flamingone.getBoundingClientRect();
  var ePos = element.getBoundingClientRect();
  return ePos.bottom - fPos.bottom;
}

//calculates number of walking ticks between when given lateral and vertical distance in pixels
function travelTime(xDist, yDist) {
  var dist = Math.hypot(xDist, yDist);
  var winSize = flaminggoneMap.getBoundingClientRect();
  return (dist / (winSize.right - winSize.left)) * mapTicks;
}

//calculates number of walking ticks between flamingoneBoundRect and w% h% coords
function travelTime(fPos, eX, eY){
var canvasPos = flaminggoneMap.getBoundingClientRect();
var canvasWidth = canvasPos.right - canvasPos.left
var hDist = (canvasWidth * eX) - ((fPos.left + fPos.right)/2);
var vDist = ((canvasPos.bottom - canvasPos.top) * eY) - fPos.bottom;
return (Math.hypot(hDist, vDist) / canvasWidth) * mapTicks;


const w = window.innerWidth;
const h = window.innerHeight;

// resetSvgVeiwBox();
// window.addEventListener("resize", resetSvgVeiwBox);

// function resetSvgVeiwBox(){
//     $('#roads').removeAttr('viewBox');
//     document.getElementById("roads").setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
//     console.log(window.innerWidth);
// }
}









    var skyBot = "/assets/firstMap/skyGreyBot.png";
    var skyMid = "/assets/firstMap/skyGreyMid.png";
    var skyTop = "/assets/firstMap/skyGreyTop.png";

    //find a better way to make gradients and patterns
    var pallet = getComputedStyle(document.body);

    //gradDirt
    var gradString = "<linearGradient id='gradDirt' x1='0%' y1='100%' x2='100%' y2='0%'>" +
        `<stop offset='0%' style='stop-color:${pallet.getPropertyValue('--browndark')}; stop-opacity:1' />` +
        `<stop offset='100%' style='stop-color:${pallet.getPropertyValue('--brownglare')}; stop-opacity:1' />` +
        "</linearGradient>";

    //gradPines  
    gradString += "<radialGradient id='gradPines' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'>" +
        `<stop offset='0%' style='stop-color: ${pallet.getPropertyValue('--greenshade')}; stop-opacity:1' />` +
        `<stop offset='100%' style='stop-color: ${pallet.getPropertyValue('--greenglare')}; stop-opacity:1' />` +
        "</radialGradient>";

    //gradTrunk
    gradString += "<radialGradient id='gradTrunk' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'>" +
        `<stop offset='0%' style='stop-color: ${pallet.getPropertyValue('--brownlightshade')}; stop-opacity:1' />` +
        `<stop offset='100%' style='stop-color: ${pallet.getPropertyValue('--brownlightglare')}; stop-opacity:1' />` +
        "</radialGradient>";

    //patSkyBot
    gradString += "<pattern id='patSkyBot' x='0' y='0' width='1024' height='768'" +
        "patternUnits='userSpaceOnUse' >" +
        `<image xlink:href=${skyBot} x='0' y='0' width='1024' height='768'/>` +
        "</pattern>";

    //patSkyMid
    gradString += "<pattern id='patSkyMid' x='0' y='0' width='1024' height='768'" +
        "patternUnits='userSpaceOnUse' >" +
        `<image xlink:href=${skyMid} x='0' y='0' width='1024' height='768'/>` +
        "</pattern>";

    //patSkyTop
    gradString += "<pattern id='patSkyTop' x='0' y='0' width='1024' height='768'" +
        "patternUnits='userSpaceOnUse' >" +
        `<image xlink:href=${skyTop} x='0' y='0' width='1024' height='768'/>` +
        "</pattern>";

    $("#mapDefs").html(gradString);

    //fill with gradients
    $("#dirt").attr("fill", "url(#gradDirt)");
    $("#trunk").attr("fill", "url(#gradTrunk)");
    $(".treePines").attr("fill", "url(#gradPines)");

    //fill with patterns
    $(".skyBot").attr("fill", "url(#patSkyBot)");
    $(".skyMid").attr("fill", "url(#patSkyMid)");
    $(".skyTop").attr("fill", "url(#patSkyTop)");

    $("#trunk").attr("filter", "url(#dropshadow)");