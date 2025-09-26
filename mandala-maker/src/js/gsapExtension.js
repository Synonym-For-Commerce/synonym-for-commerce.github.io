import {gsap} from "gsap"
import * as svgGeneric from "./svgGeneric";

//centers an svg element
//doesnt seem to work in firefox
//uses bbox which requires the path
export function centerElement(elem) {
  //requires the element to exist within the dom so bBox is not 0,
  svgGeneric.addToDefs(elem);
  let bBox = elem.getBBox();
  gsap.set(elem, {
    x: `-=${bBox.width / 2 + bBox.x}px`,
    y: `-=${bBox.height / 2 + bBox.y}px`,
  });
}

//moves an element to a some point in an imaginary circle surrounding the element
export function moveToCircumferenceAtAngle(elem, angleRad, radius, scale) {
  gsap.set(elem, {
    transformOrigin: "center",
    x: `+=${radius * Math.sin(angleRad)}px`,
    y: `-=${radius * Math.cos(angleRad)}px`,
    rotation: `${angleRad}rad`,
    scale: scale,
  });
}
