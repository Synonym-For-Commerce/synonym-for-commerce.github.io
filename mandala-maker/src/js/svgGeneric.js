import React, { Component } from "react";
let ns = {
  svg: "http://www.w3.org/2000/svg",
  xlink: "http://www.w3.org/1999/xlink",
  html: "http://www.w3.org/1999/xhtml",
};

//create svg elements
export function createSvgElement(element, params) {
  let e = document.createElementNS(ns.svg, element);
  if (!params) return e;
  Object.entries(params).forEach((p) => {
    const [attribute, value] = p;
    e.setAttributeNS(null, attribute, value);
  });
  return e;
}

//shortcuts for common elements
export function defs(params) {
  return createSvgElement("defs", params);
}

export function group(params) {
  return createSvgElement("g", params);
}

export function path(params) {
  return createSvgElement("path", params);
}

export function use(params) {
  return createSvgElement("use", params);
}

export function rect(params) {
  return createSvgElement("rect", params);
}

export function circle(params) {
  return createSvgElement("circle", params);
}

//centers an element around point 0,0
//TODO: test this
export function centerElement(element) {
  let bBox = element.getBBox();
  element.style.transform = `translate(-${bBox.width / 2 + bBox.x}px, -${
    bBox.height / 2 + bBox.y
  }px)`;
}

//creates or uses existing defs to give element a coordiante system
//FIXME:this may need to change if multiple defs in different svgs with different viewports)
export function addToDefs(elem) {
  if (!document.getElementsByTagName("defs")[0]) {
    document.getElementsByTagName("svg")[0].appendChild(defs());
  }
  document.getElementsByTagName("defs")[0].appendChild(elem);
}
