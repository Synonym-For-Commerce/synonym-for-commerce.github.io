const accordions = [
  CSSRulePlugin.getRule(".accordion:before"),
  CSSRulePlugin.getRule(".accordion:after"),
];
// defaul duration for changes
let dur = 1.2;
const buttonBorderDefault = "3px, solid black";
const opacityDefault = 0.5
const VIDEO_PLAYER = document.querySelector("#video-player");

//FIXME:should be in lib
getCssVar = function (value) {
  return window.getComputedStyle(document.body).getPropertyValue(value);
};

const categoryArr = [
  {
    name: "svg-showcase",
    bgColor: "#000000",
    borderFill: "#ffffff",
    stroke: "#626868",
    strokeOpacity: 0.5,
    strokeWidth: "2%",
    strokeDasharray: "none",
    borders: true,
    backgroundSvg: "#polkaDotsRect",
    buttonFill: getCssVar("--white"),
    buttonOpacity: 0.5,
    buttonTextColor: getCssVar("--charcoal"),
    accordionContentColor: getCssVar("--trans-white"),
    accordionTextColor: getCssVar("--black"),
    bannerTextColor: "white",
    videoPlayer: "hidden",
    iframe: "visible",
  },
  {
    name: "raster-animations",
    bgColor: getCssVar("--red"),
    borderFill: getCssVar("--yellow"),
    stroke: getCssVar("--blue"),
    strokeOpacity: 0.5,
    strokeWidth: "5%",
    strokeDasharray: "none",
    borders: false,
    backgroundSvg: "#noBackgroundSvg",
    buttonFill: getCssVar("--blue"),
    buttonOpacity: 1,
    buttonTextColor: getCssVar("--black"),
    accordionContentColor: getCssVar("--white-trans"),
    accordionTextColor: getCssVar("--black"),
    bannerTextColor: getCssVar("--red"),
    videoPlayer: "visible",
    iframe: "hidden",
  },
  {
    name: "qa",
    bgColor: "black",
    borderFill: "url(#patternPlaid)",
    stroke: "black",
    strokeOpacity: 1,
    strokeWidth: "0.5%",
    strokeDasharray: "none",
    borders: false,
    backgroundSvg: "#plaidRect",
    buttonFill: getCssVar("--purple"),
    buttonOpacity: 1,
    buttonTextColor: getCssVar("--black"),
    accordionContentColor: getCssVar("--black"),
    accordionTextColor: getCssVar("--white"),
    bannerTextColor: getCssVar("--green-light"),
    videoPlayer: "hidden",
    iframe: "hidden",
  },
  {
    name: "godot",
    bgColor: "black",
    borderFill: "white",
    stroke: getCssVar("--red"),
    strokeOpacity: 1,
    strokeWidth: "2%",
    strokeDasharray: "3%",
    borders: false,
    backgroundSvg: "#minBlackRedTrees",
    buttonFill: getCssVar("--black"),
    buttonOpacity: opacityDefault,
    buttonTextColor: getCssVar("--red"),
    accordionContentColor: getCssVar("--white-trans-70"),
    accordionTextColor: getCssVar("--black"),
    bannerTextColor: "black",
    videoPlayer: "hidden",
    iframe: "hidden",
  }
];

changeCategory = function (c) {

  VIDEO_PLAYER.pause()
  document.querySelector("#video-player-source").removeAttribute("src");
  VIDEO_PLAYER.load();
  // TODO: replace a bunch of the object info with a switch statement (iframe visability and such can just be toggled based on c.name rather than each object storing the state)
  let tl = gsap.timeline();
  tl.to(".backgroundSvg", { duration: dur / 2, opacity: 0 });
  tl.to(c.backgroundSvg, { duration: dur / 2, opacity: 1 });
  gsap.to("body", {
    duration: dur,
    backgroundColor: c.bgColor,
  });
  gsap.to("#border", {
    duration: dur,
    fill: c.borderFill,
    stroke: c.stroke,
    strokeOpacity: c.strokeOpacity,
    strokeWidth: c.strokeWidth,
    strokeDasharray: c.strokeDasharray,
  });
  gsap.to("#SLoopBroad", {
    duration: dur,
    stroke: c.stroke,
    strokeOpacity: c.strokeOpacity,
    strokeWidth: c.strokeWidth * 1.2,
  });
  gsap.to("#SLoopNarrow", {
    duration: dur,
    stroke: c.borderFill,
    strokeOpacity: c.strokeOpacity,
    strokeWidth: c.strokeWidth,
  });
  gsap.to("#SLoopDots", {
    duration: dur,
    stroke: c.stroke,
    strokeOpacity: c.strokeOpacity,
    strokeWidth: c.strokeWidth,
  });


  gsap.to(".ui-accordion-header", {
    duration: dur,
    backgroundColor: c.buttonFill,
    color: c.buttonTextColor,
    opacity: c.buttonOpacity,
  });
  gsap.to(".ui-accordion-content", {
    backgroundColor: c.accordionContentColor,
    color: c.accordionTextColor,
  });
  gsap.to("a", { color: c.accordionTextColor });
  gsap.to(accordions, {
    duration: dur,
    cssRule: { opacity: c.borders ? 1 : 0 },
  });
  gsap.to(".sfc-banner text", { duration: dur, fill: c.bannerTextColor });
  gsap.set("#video-player", { visibility: c.videoPlayer });
  gsap.set("#iframe-showcase", { visibility: c.iframe });
};

$(".accordionButton").click((e) => {
  let category = categoryArr.find((c) => c.name == e.target.id);
  changeCategory(category);
});

$(".accordionButton").on("mouseenter", () => {
  gsap.set("#turbulence", { attr: { seed: gsap.utils.random(0, 500, 1) } });
  gsap.to("#dispMap", { attr: { scale: gsap.utils.random(20, 500, 1) } });
});

$(".accordionButton").on("mouseleave", () => {
  gsap.to("#dispMap", { attr: { scale: 1 } });
});

$(".iframe").on("click", (event) => {
  document.querySelector("#iframe-showcase").setAttribute("src", event.target.dataset.url)
})

$(".video-tooltip").on("click", (event) => {
  document.querySelector("#video-player-source").setAttribute("src", event.target.dataset.url)
  let loop = event.target.dataset.loop === "true";
  VIDEO_PLAYER.muted = loop;
  VIDEO_PLAYER.loop = loop;
  VIDEO_PLAYER.load()
})

//TODO: This si never called, becasue its broken and performaNCE INtensive, add to index.htmls body <body onload="bannerShapes()"> in order to fire and add curtains div to end of page
bannerShapes = function () {
  gsap.to("#curtains", { duration: dur, opacity: 0, visibility: "hidden" });
  changeCategory(categoryArr[0]);

  const isChrome =
    navigator.userAgent.includes("Chrome") &&
    !navigator.userAgent.includes("Edge") &&
    !navigator.userAgent.includes("OPR"); // exclude Opera/Edge

  if (isChrome) {
    // apply filter to all SVGs directly under <body>
    document.querySelectorAll("body > svg").forEach(svg => {
      svg.style.filter = "url(#filterShapes)";
    });

    gsap.to("#filterShapesDisplacementMap", {
      duration: dur,
      attr: { scale: 0 },
    });
  }

};
