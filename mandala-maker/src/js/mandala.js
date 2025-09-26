// import React, { Component } from "react";
import gsap from "gsap";
import * as svgGeneric from "./svgGeneric";
const pi = Math.PI;
let defaultRadius = 10;

// class mandala extends Component {
//this file is dependent on GSAP core library and my svgGeneric library
//the purpose of this file is to facilitate the creation of mandala type patterns from svg paths,
//TODO: flatten the paths on each ring so there isnt one on top of the others.. but i dont wanna even think about the frigggin math involved in that nonsense, also involves switching betweeen <use> and <path>, not ideal
//centering doesnt work in other browsers do a stupid fucking platform bullshit goddamit test thing
//theres like, zero, exception handling in this bitch. passing anything other than the expected arrays or params into any of the functions will cause it to crap its pants

//creates a circle from an array of svg paths, returns <g class="ring">
export function makeRing(pathArr, params) {
  const ring =
    params && params["ringClass"]
      ? svgGeneric.group({ class: params.ringClass + " ring" })
      : svgGeneric.group({ class: "ring" });
  const len = pathArr.length;
  if (len < 1) {
    //FIXME: should probably have default value for undefined radius
    return ring.appendChild(
      svgGeneric.circle({ r: params && params["radius"] ? params.radius : defaultRadius, class: "mandalaCircle" })
    );
  }
  let avgWidth = 0;
  let avgHeight = 0;
  let pathDataArr = [];
  pathArr.forEach((e) => {
    //TODO: exception handeling for non svgelement input
    let bBox = e.getBBox();
    //any elements passed in that are not in dom will be added to defs, as will any elements in the dom that have height == 0 and width == 0
    if (!bBox.width && !bBox.height) {
      svgGeneric.addToDefs(e);
      bBox = e.getBBox();
    }
    avgWidth += bBox.width;
    avgHeight += bBox.height;
    pathDataArr.push([e.getAttribute("id"), e.getAttribute("class")]);
  });
  avgWidth /= len;
  avgHeight /= len;
  let radius = params && params["radius"] ? params.radius : avgHeight;
  let circumference = radius * 2 * pi;
  let cuts =
    !params || !params["cuts"] || params.cuts < 1
      ? Math.floor(circumference / avgWidth / len)
      : params.cuts;
  let totalCuts = cuts * len;

  for (let i = 1; i <= totalCuts; i++) {
    let pathData = pathDataArr[i % len];
    let partialPath = svgGeneric.use({
      href: `#${pathData[0]}`,
      class: pathData[1],
    });

    //center
    gsapCenterElement(partialPath);
    //move to circumference
    var angleRad = (2 * pi * i) / totalCuts;
    let scale = params && params["scale"] ? params.scale : 1;
    gsapMoveToCircumferenceAtAngle(partialPath, angleRad, radius, scale);
    ring.appendChild(partialPath);
  }
  if (params && params["offset"])
    gsap.set(ring, {
      transformOrigin: "center",
      rotation: params.offset,
    });
  return ring;
}

//centers an svg element
//doesnt seem to work in firefox
//uses bbox which requires the path
function gsapCenterElement(elem) {
  //requires the element to exist within the dom so bBox is not 0,
  svgGeneric.addToDefs(elem);
  let bBox = elem.getBBox();
  gsap.set(elem, {
    x: `-=${bBox.width / 2 + bBox.x}px`,
    y: `-=${bBox.height / 2 + bBox.y}px`,
  });
}

//moves an element to a some point in an imaginary circle surrounding the element
function gsapMoveToCircumferenceAtAngle(elem, angleRad, radius, scale) {
  gsap.set(elem, {
    transformOrigin: "center",
    x: `+=${radius * Math.sin(angleRad)}px`,
    y: `-=${radius * Math.cos(angleRad)}px`,
    rotation: `${angleRad}rad`,
    scale: scale,
  });
}
//creates a series of rings using makeRing function
//first param is an arra of arrays the inner arrays are to be comprised of svg paths
//second param is an array or parameters relating to each ring; radius, cuts, ringClass
//third param is params relating to the overall system of concentric rings; concentricSystem
export default function makeConcentricRings(pathArrArr, paramArr, params) {
  let concentricSystem =
    params && params["concentricSystem"]
      ? params.concentricSystem
      : svgGeneric.group({ id: params.id });
  pathArrArr.forEach((elemArr, index) => {
    let ring = makeRing(elemArr, paramArr[index % paramArr.length]);
    concentricSystem.appendChild(ring);
  });
  return concentricSystem;
}
