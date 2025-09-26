let outerMandalaPetal = makeConcentricRings(
  [[omegaDot], ["circle"], [omegaDot], ["circle"]],
  [
    { cuts: 21, radius: 1200 },
    { radius: 900 },
    { cuts: 14, radius: 600, scale: 0.7 },
    { radius: 300 },
  ],
  { id: "outerMandelaPetal" }
);

// svgContainer.appendChild(outerMandalaPetal);
// gsap.set(outerMandalaPetal, { x: 7000 });

let mandala = makeConcentricRings(
  [
    [outerMandalaPetal],
    [petalDiamond],
    [petalHeart],
    [omegaDot],
    [rice],
    ["circle"],
    [omegaDot],
  ],
  [
    { radius: 2100, cuts: 6, scale: 0.7, ringOffset: 0 },
    { radius: 2400, cuts: 6, ringOffset: 30 },
    { radius: 1400, cuts: 6 },
    { radius: 1100, cuts: 6, scale: 1.5 },
    { radius: 900, cuts: 30 },
    { radius: 750 },
    { radius: 500, cuts: 8 },
  ],
  { id: "mandala" }
);
svgContainer.appendChild(mandala);
mandala.onclick = () => {
  gsap.to(".ring:nth-child(even)", {
    duration: 15,
    transformOrigin: "center",
    ease: "none",
    rotation: 360,
    repeat: -1,
  });
  gsap.to(".ring:nth-child(odd)", {
    duration: 15,
    transformOrigin: "center",
    ease: "none",
    rotation: -360,
    repeat: -1,
  });
};
