gsap.registerPlugin(MotionPathPlugin);

const w = window.innerWidth;
const h = window.innerHeight;

// resetSvgVeiwBox();
// window.addEventListener("resize", resetSvgVeiwBox);

// function resetSvgVeiwBox(){
//     $('#roads').removeAttr('viewBox');
//     document.getElementById("roads").setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
//     console.log(window.innerWidth);
// }

//pallet
var black = "#000";
var white = "#fff";
var grey3 = "#333";
var grey6 = "#666";
var grey9 = "#999";
var greyC = "#CCC";
var greenDark = "#63A46C";
var green = "#63D471";
var blueDark = "#440381";
var blueLight = "#51E5FF";
var blueLightShade = "#41D5EF";
var blueLightGlare = "#61F5FF";
var pink = "#EC368D";
var pinkShade = "#DC267D";
var peach = "#FE938C"
var peachShade = "#EE837C";
var purpleLight = "#EC9DED";
var yellow = "#E2DE84";
var yellowLight = "#DAFF7D";
var yellowLightShade = "#CAEF6D";
var whiteBlue = "#D3FAD6";
var redOrange = "#E4572E";
var brown = "#330F0A";
var brownShade = "#230000";
var brownGlare = "#431F1A";
var greyDark = "#473144";

gsap.to(".flowers", 0, {opacity: "100%"});

//initizlize start button
gsap.to(".menu", 1, {opacity: "100%", delay: 5})

//initialize bleedingHearts
gsap.to("#bleed1, #bleed2, #bleed3", 0, { scale: 0 });
gsap.to(bleed3, 0, { x: "-13%", y: "26%", rotate: -20 });

//intialize flower positions
var loadFlowers = new gsap.timeline();
loadFlowers.from("#aster, #lily, #weirdOrchid, #falseRue1, #falseRue2, #falseRue3", { duration: 4, y: "random(-500, -1500)", ease: "bounce", stagger: { from: "random", amount: 0.5 } });
loadFlowers.from("#orchid, #pansy, #trillium, #geranium, #ghostFlower, #loosestrife, #edelweiss", { duration: 5, y: 1000, ease: "bounce", stagger: { from: "random", amount: 0.3, } }, "-=3");
loadFlowers.from("#daisy", 1, { scale: 0 });
loadFlowers.play();

//fix how dots are generated
// var dotsNo = 1000;

// for (x = 0; x < dotsNo; x++) {
// document.getElementById("dotBox").innerHTML += "<div class='dot'></div>";
// }

// //moves circles along road 1
// var roadRunner1 = new gsap.timeline({paused: true});
// roadRunner1.to('.dot', 60, { motionPath: "#road1Inner", repeat: -1, stagger: {amount: 240}});

// var roadRunner2 = new gsap.timeline({paused: true});
// roadRunner2.to('.dot', 30, { motionPath: "#road2Inner", repeat: -1, stagger: {amount: 240}});

// var roadRunner3 = new gsap.timeline({paused: true});
// roadRunner3.to('.dot', 60, { motionPath: "#road3Inner", repeat: -1, stagger: {amount: 240}});

// var roadRunner4 = new gsap.timeline({paused: true});
// roadRunner4.to('.dot', 30, { motionPath: "#road4Inner", repeat: -1, stagger: {amount: 240}});

// function pauseRoads(){
//     roadRunner1.pause();
//     roadRunner2.pause();
//     roadRunner3.pause();
//     roadRunner4.pause();
// }

// $("#pansy").click(function(){
//     pauseRoads();
//     roadRunner1.play();
// });

// $("#geranium").click(function(){
//     pauseRoads();
//     roadRunner2.play();
// });

// $("#orchid").click(function(){
//     pauseRoads();
//     roadRunner3.play();
// });

// $("#weirdOrchid").click(function(){
//     pauseRoads();
//     roadRunner4.play();
// })

//end of commented dot code

//click spins
$("#aster").click(function () {
    gsap.to("#asterCorolla", 5, { rotation: "360", transformOrigin: "center", ease: Linear.easeNone, repeat: -1 });
})
$("#lily").click(function () {
    gsap.to("#lilyCorolla", 5, { rotation: "360", transformOrigin: "center", ease: Linear.easeNone, repeat: -1 });
})
$("#falseRueAll").click(function () {
    gsap.to("#falseRue1", 5, { rotation: "360", transformOrigin: "center", ease: Linear.easeNone, repeat: -1 });
    gsap.to("#falseRue2", 5, { rotation: "-360", transformOrigin: "center", ease: Linear.easeNone, repeat: -1 });
    gsap.to("#falseRue3", 5, { rotation: "360", transformOrigin: "center", ease: Linear.easeNone, repeat: -1 });
})//end of click spins

//spawn bleeding hearts by clicking diasy
$("#daisy").click(function () {
    gsap.to("#bleed1, #bleed2, #bleed3", 2, { scale: "random(.5, 3)", stagger: 0.3 });
})

//mouseover color change
$(aster).mouseover(function () {
    $("#asterPetals").attr("fill", purpleLight);
    $("#asterDiskOuter").attr("fill", yellowLightShade);
    $("#asterDiskInner").attr("fill", yellowLight);
    $("#asterCorolla").attr("fill", greenDark);
});
$(bleed1).mouseover(function () {
    $("#bleedPetal1").attr("fill", pink);
});
$(bleed2).mouseover(function () {
    $("#bleedPetal2").attr("fill", pink);
});
$(bleed3).mouseover(function () {
    $("#bleedPetal3").attr("fill", pink);
});
$(daisy).mouseover(function () {
    $("#daisyPetals").attr("fill", yellowLight);
    $("#daisyStamenOuter").attr("fill", brownShade);
    $("#daisyStamenMiddle").attr("fill", brown);
    $("#daisyStamenInner").attr("fill", brownGlare);
});
$(edelweiss).mouseover(function () {
    $("#edelweissPetals").attr("fill", whiteBlue);
    $("#edelweissAnthers").attr("fill", yellowLight);
});
$(falseRueAll).mouseover(function () {
    $("#falseRue1").attr("fill", green);
    $("#falseRue2").attr("fill", blueLight);
    $("#falseRue3").attr("fill", pink);
});
$(geranium).mouseover(function () {
    $("#geraniumPetals").attr("fill", redOrange);
    $("#geraniumStamen").attr("fill", brown);
});
$(ghostFlower).mouseover(function () {
    $("#ghostFlowerPetals").attr("fill", greenDark);
    $("#ghostFlowerCorolla").attr("fill", purpleLight);
});
$(lily).mouseover(function () {
    $("#lilyFilament").attr("fill", green);
    $("#lilyPistil").attr("fill", brown);
    $("#lilyAnthers").attr("fill", yellowLight);
})
$(loosestrife).mouseover(function () {
    $("#loosestrifePetals").attr("fill", peach);
    $("#loosestrifeCorolla").attr("fill", greenDark);
});
$(orchid).mouseover(function () {
    $("#orchidPetals").attr("fill", blueLightShade);
    $("#orchidPetalTop").attr("fill", blueLight);
    $("#orchidPetalBottom").attr("fill", blueLightGlare);
});
$(pansy).mouseover(function () {
    $("#pansyPetals").attr("fill", peach);
    $("#pansyPetalTop").attr("fill", peachShade);
    $("#pansyPetalMark").attr("fill", greyDark);
});
$(trillium).mouseover(function () {
    $("#trilliumStamenInner").attr("fill", yellowLight);
    $("#trilliumStamenInner").attr("fill", yellowLight);
    $("#trilliumCorolla").attr("fill", greenDark);
})
$(weirdOrchid).mouseover(function () {
    $("#weirdOrchidPetals").attr("fill", blueDark);
    $("#weirdOrchidStamen").attr("fill", yellowLight);
    $("#weirdOrchidPistil").attr("fill", purpleLight);
    $("#weirdOrchidCorolla").attr("fill", greenDark);
});//end of color mouseover's