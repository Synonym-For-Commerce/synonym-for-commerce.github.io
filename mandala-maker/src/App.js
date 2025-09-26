import "./Css/App.css";
import "./Css/index.css";
import "./Css/mandalaPalette.css";
import "./Css/mandala.css";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import makeConcentricRings from "./js/mandala.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";

//contents of ring tabs
let ringArr = [
  {
    title: "0",
    cuts: 0,
    radius: null,
    scale: 1,
    offset: null,
    pathArr: [],
  },
  {
    title: "1",
    cuts: 0,
    radius: null,
    scale: 1,
    offset: null,
    pathArr: [],
  },
  {
    title: "2",
    cuts: 0,
    radius: null,
    scale: 1,
    offset: null,
    pathArr: [],
  },
  {
    title: "3",
    cuts: 0,
    radius: null,
    scale: 1,
    offset: null,
    pathArr: [],
  },
  {
    title: "4",
    cuts: 0,
    radius: null,
    scale: 1,
    offset: null,
    pathArr: [],
  },
  {
    title: "5",
    cuts: 0,
    radius: null,
    scale: 1,
    offset: null,
    pathArr: [],
  },
  {
    title: "6",
    cuts: 0,
    radius: null,
    scale: 1,
    offset: null,
    pathArr: [],
  },
];

//FIXME: mandala1 needs to exist for onclick to work so i just grabbed a random element, definatly change this to something more logical
let mandala1 = document.getElementsByTagName("body")[0];

//redeclared in useEffect for .HUD
let hideTL = gsap.timeline();
hideTL.to(".HUD", { duration: 0.3, opacity: 0 });
hideTL.reversed(true);

// toggle function
function hideHUD() {
  hideTL.reversed() ? hideTL.play() : hideTL.reverse();
}

function App() {
  //default path vars
  let svgContainer = useRef(null);
  let mandalaStage = useRef(null);
  let defs = useRef(null);

  let omegaDot = useRef(null);
  let rice = useRef(null);
  let petalDaisy = useRef(null);
  let petalDiamond = useRef(null);
  let petalHeart = useRef(null);
  let outerMandalaPetal = null;
  let stadiums = useRef(null);
  let egg = useRef(null);
  let palm = useRef(null);

  let radiusMultiplyer = 100;

  //this shoudl probably be a state or something
  let currentRing = 0;

  //svgElement and their associated information, populates path list
  //FIXME: this list is re declared later on and its identical
  let listItems = [
    { path: omegaDot, title: "Omega Dot" },
    { path: rice, title: "Rice" },
    { path: petalDaisy, title: "Daisy Petal" },
    { path: petalHeart, title: "Heart Petal" },
    { path: petalDiamond, title: "Diamond Petal" },
    { path: outerMandalaPetal, title: "Gear Petal" },
    { path: egg, title: "Egg" },
    { path: palm, title: "Palm" },
    { path: stadiums, title: "Stadiums" },
  ];

  //all of this is ugly mix of dom manipulation, get rid of it
  function addPathButton(e) {
    let listItem = listItems.find((c) => c.title === e.target.innerHTML);
    try {
      ringArr[currentRing].pathArr.push(listItem.path);
      document
        .getElementById(`tablePathArrCell${currentRing}`)
        .append(listItem.title + " ");
      updateMandala();
    } catch {
      console.log("zoot skipped a grove agian");
    }
  }

  function clearPathArr(e) {
    try {
      let ringNumberToClear = e.target.innerHTML;
      ringArr[ringNumberToClear].pathArr = [];
      document.getElementById(
        `tablePathArrCell${ringNumberToClear}`
      ).innerHTML = "";
      updateMandala();
    } catch {
      console.log("failed to remove paths");
    }
  }

  // TODO: the following 4 functions are really similar, dry it up
  function updateCuts(e, value) {
    ringArr[currentRing].cuts = value;
    updateMandala();
  }
  function updateRadius(e, value) {
    ringArr[currentRing].radius = value * radiusMultiplyer;
    updateMandala();
  }
  function updateScale(e, value) {
    ringArr[currentRing].scale = value;
    updateMandala();
  }
  function updateOffset(e, value) {
    ringArr[currentRing].offset = value;
    updateMandala();
  }

  function updateMandala() {
    //TODO: either change the way the makeConcentricRings function takes params or change the ringArr to correspond to the exisiting function params
    let revArr = ringArr.slice().reverse();
    let mandalaPaths = [];
    revArr.forEach((r, index) => {
      mandalaPaths[index] = r.pathArr;
    });
    try {
      mandala1 = makeConcentricRings(mandalaPaths, revArr, {
        id: "mandala1",
      });
    } catch {
      console.log("updateMandala failed");
    }
    while (mandalaStage.firstChild) {
      mandalaStage.removeChild(mandalaStage.firstChild);
    }
    mandalaStage.appendChild(mandala1);
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    currentRing = value;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  //style stuff
  const tabStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      position: "fixed",
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  }));
  const tabClasses = tabStyles();
  const listStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const listClasses = listStyles();

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //create default mandala
  useEffect(() => {
    outerMandalaPetal = makeConcentricRings(
      [[omegaDot], [], [omegaDot], []],
      [
        { cuts: 21, radius: 1200 },
        { radius: 900 },
        { cuts: 14, radius: 600, scale: 0.7 },
        { radius: 300 },
      ],
      { id: "outerMandelaPetal" }
    );

    // this list is redeclared now that the paths arent null
    listItems = [
      { path: omegaDot, title: "Omega Dot" },
      { path: rice, title: "Rice" },
      { path: petalDaisy, title: "Daisy Petal" },
      { path: petalHeart, title: "Heart Petal" },
      { path: petalDiamond, title: "Diamond Petal" },
      { path: outerMandalaPetal, title: "Gear Petal" },
      { path: egg, title: "Egg" },
      { path: palm, title: "Palm" },
      { path: stadiums, title: "Stadiums" },
    ];
    let tl = gsap.timeline({ paused: true });
    tl.to(
      ".ring:nth-child(even)",
      {
        duration: 15,
        transformOrigin: "center",
        ease: "none",
        rotation: 360,
        repeat: -1,
      },
      "ringSpin"
    );
    tl.to(
      ".ring:nth-child(odd)",
      {
        duration: 15,
        transformOrigin: "center",
        ease: "none",
        rotation: -360,
        repeat: -1,
      },
      "ringSpin"
    );

    mandala1.onclick = () => {
      tl.paused(!tl.paused());
    };

    hideTL = gsap.timeline();
    hideTL.to(".HUD", { duration: 0.3, opacity: 0 });
    hideTL.set(".HUD", { visibility: "hidden" });
    hideTL.reversed(true);
  });

  return (
    <div className="App">
      <header className="App-header"></header>
      <div id="canvas">
        <svg
          id="svgContainer"
          ref={(el) => {
            svgContainer = el;
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-15360, -8640, 30720, 17280"
        >
          <defs
            ref={(el) => {
              defs = el;
            }}
          >
            <path
              id="omegaDot"
              className="omegaDot primary"
              ref={(el) => {
                omegaDot = el;
              }}
              fill="none"
              stroke="black"
              strokeWidth="1"
              d="M 181.33,43.33
                            C 155.76,43.33 131.00,47.66 131.00,47.66
                            94.30,55.61 62.78,75.93 43.87,109.00
                            34.22,125.88 28.03,146.49 28.00,166.00
                            27.91,221.89 61.98,267.48 115.00,285.00
                            122.83,287.59 48.65,284.05 15.50,299.50
                            1.24,306.15 12.19,341.15 17.00,341.00
                            26.53,340.70 107.35,311.89 180.01,313.11
                            252.67,314.33 333.47,340.70 343.00,341.00
                            347.81,341.15 358.76,306.15 344.50,299.50
                            311.35,284.05 237.17,287.59 245.00,285.00
                            298.02,267.48 332.09,221.89 332.00,166.00
                            331.97,146.49 325.78,125.88 316.13,109.00
                            297.22,75.93 265.70,55.61 229.00,47.66
                            229.00,47.66 204.66,43.33 181.33,43.33 Z"
            />
            <path
              id="rice"
              className="rice primary"
              ref={(el) => {
                rice = el;
              }}
              fill="none"
              stroke="black"
              strokeWidth="1"
              d="M 160.00,46.47
                                C 172.36,44.77 180.66,51.37 187.57,61.00
                                    198.15,75.72 203.78,93.60 208.13,111.00
                                    212.70,129.28 215.63,148.21 217.00,167.00
                                    217.00,167.00 217.00,175.00 217.00,175.00
                                    217.00,175.00 218.00,187.00 218.00,187.00
                                    218.06,227.02 216.45,255.85 206.37,295.00
                                    202.73,309.16 196.10,326.13 187.57,338.00
                                    182.79,344.66 176.36,350.94 168.00,352.53
                                    156.75,354.68 147.49,347.57 141.16,339.00
                                    129.63,323.40 124.01,304.56 119.37,286.00
                                    114.23,265.43 112.35,245.03 110.91,224.00
                                    110.91,224.00 110.00,212.00 110.00,212.00
                                    109.94,172.16 111.50,144.00 121.37,105.00
                                    126.34,85.38 138.23,51.79 160.00,46.47 Z"
            />
            <path
              id="petalDaisy"
              className="petalDaisy primary"
              ref={(el) => {
                petalDaisy = el;
              }}
              fill="none"
              stroke="black"
              stroke-width="1"
              d="M 1993.75,3350.00
              C 1982.90,2818.11 2106.50,2134.87 2196.88,2131.25
                2290.06,2127.52 2427.66,2797.98 2412.50,3340.62
                2402.24,3707.85 2275.07,4016.23 2196.88,4018.75
                2115.19,4021.39 2001.66,3737.66 1993.75,3350.00 Z
                M 2196.88,2331.25 V3500"
            />
            <g
              id="petalHeart"
              className="petalHeart"
              ref={(el) => {
                petalHeart = el;
              }}
              className="petal"
            >
              <path
                id="petalHeartMain"
                className="petalHeartMain primary"
                fill="none"
                stroke="black"
                strokeWidth="1"
                d="M 184.13,-249.18
                            C 164.72,-249.18 144.61,-256.86 144.61,-256.86
                                144.61,-256.86 -218.69,-712.46 -572.56,-374.89
                                -926.42,-37.32 -548.96,415.92 -408.60,452.51
                                -268.23,489.10 78.56,358.08 78.56,358.08
                                78.56,358.08 133.49,317.36 187.67,317.36
                                234.38,317.36 281.44,358.08 281.44,358.08
                                281.44,358.08 628.23,489.10 768.60,452.51
                                908.96,415.92 1286.42,-37.32 932.56,-374.89
                                578.69,-712.46 215.39,-256.86 215.39,-256.86
                                215.39,-256.86 199.67,-249.18 184.13,-249.18 Z"
              />
              <path
                id="petalHeartInner"
                className="petalHeartInner inner"
                fill="none"
                stroke="black"
                strokeWidth="1"
                d="M 180.00,285.33
                            C 166.44,285.33 154.00,292.00 154.00,292.00
                            154.00,292.00 -349.00,438.00 -422.00,402.00
                            -495.00,366.00 -842.00,-92.00 -450.00,-384.00
                            -760.00,-68.00 -411.00,323.00 -390.00,342.00
                            -376.47,354.24 -348.98,379.39 -322.00,386.00
                            -307.11,389.65 -283.69,380.42 -283.33,377.33
                            -274.72,302.81 -344.00,-48.00 -344.00,-48.00
                            -344.00,-48.00 -326.43,9.04 -306.00,119.33
                            -289.01,211.02 -269.24,358.21 -263.33,368.00
                            -253.79,383.80 -232.37,374.11 -222.00,373.00
                            -211.37,371.86 -182.96,372.35 -178.67,356.00
                            -171.37,328.21 -195.01,227.33 -206.00,132.00
                            -216.41,41.71 -214.00,-44.00 -214.00,-44.00
                            -214.00,-44.00 -200.01,225.14 -166.00,336.00
                            -154.30,374.14 -67.36,346.05 -62.00,330.00
                            -47.10,285.36 -69.19,189.67 -80.00,109.00
                            -89.89,35.16 -88.00,-26.00 -88.00,-26.00
                            -88.00,-26.00 -67.63,238.08 -29.00,321.00
                            -19.91,340.51 77.09,317.39 82.00,289.33
                            88.30,253.35 76.77,175.63 66.67,124.67
                            50.56,43.42 30.00,-8.67 30.00,-8.67
                            30.00,-8.67 49.33,38.00 66.67,102.67
                            84.00,167.33 84.25,270.46 94.67,290.00
                            104.18,307.85 157.03,280.52 163.33,266.00
                            177.77,232.76 177.87,174.84 177.33,119.33
                            176.65,48.09 180.67,-17.33 180.67,-17.33
                            180.67,-17.33 183.92,48.10 182.67,118.00
                            181.65,174.52 173.93,233.40 188.67,267.33
                            194.97,281.85 256.82,307.85 266.33,290.00
                            276.75,270.46 277.00,167.33 294.33,102.67
                            311.67,38.00 331.00,-8.67 331.00,-8.67
                            331.00,-8.67 310.44,43.42 294.33,124.67
                            284.23,175.63 272.70,253.35 279.00,289.33
                            283.91,317.39 380.91,340.51 390.00,321.00
                            428.63,238.08 449.00,-26.00 449.00,-26.00
                            449.00,-26.00 450.89,35.16 441.00,109.00
                            430.19,189.67 408.10,285.36 423.00,330.00
                            428.36,346.05 515.30,374.14 527.00,336.00
                            561.01,225.14 575.00,-44.00 575.00,-44.00
                            575.00,-44.00 577.41,41.71 567.00,132.00
                            556.01,227.33 532.37,328.21 539.67,356.00
                            543.96,372.35 572.37,371.86 583.00,373.00
                            593.37,374.11 614.79,383.80 624.33,368.00
                            630.24,358.21 650.01,211.02 667.00,119.33
                            687.43,9.04 705.00,-48.00 705.00,-48.00
                            705.00,-48.00 635.72,302.81 644.33,377.33
                            644.69,380.42 668.11,389.65 683.00,386.00
                            709.98,379.39 737.47,354.24 751.00,342.00
                            772.00,323.00 1121.00,-68.00 811.00,-384.00
                            1203.00,-92.00 856.00,366.00 783.00,402.00
                            710.00,438.00 207.00,292.00 207.00,292.00
                            207.00,292.00 192.92,285.33 180.00,285.33 Z"
              />
            </g>
            <g
              id="petalDiamond"
              ref={(el) => {
                petalDiamond = el;
              }}
              className="petalDiamond petal"
            >
              <path
                id="petalDiamondMain"
                className="petalDiamondmain primary"
                d="M 185.00,429.00
                            C 139.38,429.00 92.00,453.00 92.00,453.00
                                92.00,453.00 -124.11,174.51 -118.00,-195.00
                                -116.87,-263.54 -24.55,-365.09 29.00,-495.00
                                89.95,-642.85 113.00,-816.00 113.00,-816.00
                                113.00,-816.00 152.02,-969.00 188.00,-969.00
                                218.57,-969.00 247.00,-816.00 247.00,-816.00
                                247.00,-816.00 270.05,-642.85 331.00,-495.00
                                384.55,-365.09 476.87,-263.54 478.00,-195.00
                                484.11,174.51 268.00,453.00 268.00,453.00
                                268.00,453.00 227.25,429.00 185.00,429.00 Z"
              />
              <path
                id="petalDiamondInner"
                className="petalDiamondInner inner"
                fill="none"
                stroke="black"
                strokeWidth="1"
                d="M 170.00,390.00
                            C 164.67,369.33 158.00,-201.00 158.00,-201.00
                            158.00,-201.00 47.67,-243.89 50.00,-342.00
                            51.46,-403.74 103.32,-411.16 128.00,-477.00
                            161.42,-566.17 170.00,-706.03 170.00,-705.00
                            170.00,-702.00 182.00,-832.00 182.00,-832.00
                            182.00,-832.00 190.00,-705.00 190.00,-708.00
                            190.00,-709.03 198.58,-569.17 232.00,-480.00
                            256.68,-414.16 308.54,-406.74 310.00,-345.00
                            312.33,-246.89 202.00,-204.00 202.00,-204.00
                            202.00,-204.00 190.00,378.33 190.00,387.00
                            190.00,395.67 175.33,410.67 170.00,390.00 Z"
              />
              <path
                id="petalDiamondDots"
                className="petalDiamondDots dots"
                fill="none"
                stroke="black"
                strokeWidth="1"
                d="M 173.00,-1661.78
                            C 173.00,-1661.78 182.00,-1661.78 182.00,-1661.78
                            188.34,-1661.92 194.03,-1660.74 200.00,-1658.66
                            239.49,-1644.87 249.62,-1596.06 223.54,-1565.01
                            218.80,-1559.38 210.76,-1553.83 204.00,-1550.87
                            195.71,-1547.25 188.00,-1545.90 179.00,-1546.00
                            128.23,-1546.58 104.90,-1609.20 139.17,-1644.91
                            148.28,-1654.40 160.24,-1659.47 173.00,-1661.78 Z
                            M 171.00,-1502.79
                            C 171.00,-1502.79 183.00,-1502.79 183.00,-1502.79
                            194.22,-1502.98 207.83,-1499.99 218.00,-1495.22
                            231.44,-1488.92 242.02,-1481.61 251.54,-1470.00
                            278.78,-1436.77 278.78,-1387.23 251.54,-1354.00
                            242.37,-1342.82 232.81,-1336.05 220.00,-1329.76
                            206.10,-1322.92 192.32,-1320.82 177.00,-1321.00
                            164.88,-1321.15 150.78,-1325.36 140.00,-1330.75
                            97.77,-1351.87 78.74,-1402.27 96.45,-1446.00
                            110.04,-1479.56 136.26,-1496.89 171.00,-1502.79 Z
                            M 169.00,-1275.79
                            C 169.00,-1275.79 183.00,-1275.79 183.00,-1275.79
                            196.47,-1275.98 211.52,-1272.59 224.00,-1267.60
                            236.90,-1262.44 250.02,-1254.72 260.00,-1244.99
                            275.17,-1230.19 285.68,-1215.31 292.26,-1195.00
                            310.22,-1139.55 285.50,-1078.52 233.00,-1052.27
                            214.27,-1042.90 195.74,-1039.76 175.00,-1040.00
                            164.06,-1040.13 148.18,-1043.57 138.00,-1047.60
                            125.82,-1052.42 114.01,-1058.73 104.00,-1067.30
                            62.55,-1102.77 50.55,-1159.68 73.31,-1209.00
                            86.49,-1237.56 113.16,-1260.59 143.00,-1270.26
                            152.36,-1273.29 159.45,-1274.19 169.00,-1275.79 Z"
              />
            </g>
            <path
              id="petalGear"
              className="petalGear primary"
              fill="none"
              stroke="black"
              strokeWidth="1"
              d="M -564.42,49.44
                            C -578.27,24.97 -590.37,-0.85 -600.39,-28.11
                            -613.62,-64.10 -759.00,183.00 -840.00,-63.00
                            -921.00,-309.00 -633.79,-202.57 -633.00,-234.00
                            -631.72,-285.24 -624.49,-332.81 -612.33,-376.96
                            -600.97,-418.18 -855.00,-372.00 -750.00,-594.00
                            -645.00,-816.00 -532.13,-539.23 -513.00,-564.00
                            -486.31,-598.56 -457.71,-637.16 -425.29,-665.58
                            -396.59,-690.74 -366.09,-713.60 -334.58,-734.37
                            -318.65,-744.86 -558.00,-816.00 -372.00,-921.00
                            -186.00,-1026.00 -235.62,-792.06 -210.18,-804.24
                            -174.84,-821.16 -139.50,-835.94 -105.14,-848.82
                            -81.11,-857.83 -49.67,-871.77 -20.17,-884.03
                            1.96,-893.23 -210.00,-999.00 -9.00,-1059.00
                            192.00,-1119.00 85.21,-917.90 104.54,-921.57
                            176.17,-935.16 276.83,-935.16 348.46,-921.57
                            367.79,-917.90 261.00,-1119.00 462.00,-1059.00
                            663.00,-999.00 451.04,-893.23 473.17,-884.03
                            502.67,-871.77 534.11,-857.83 558.14,-848.82
                            592.50,-835.94 627.84,-821.16 663.18,-804.24
                            688.62,-792.06 639.00,-1026.00 825.00,-921.00
                            1011.00,-816.00 771.65,-744.86 787.58,-734.37
                            819.09,-713.60 849.59,-690.74 878.29,-665.58
                            910.71,-637.16 939.31,-598.56 966.00,-564.00
                            985.13,-539.23 1098.00,-816.00 1203.00,-594.00
                            1308.00,-372.00 1053.97,-418.18 1065.33,-376.96
                            1077.49,-332.81 1084.72,-285.24 1086.00,-234.00
                            1086.79,-202.57 1374.00,-309.00 1293.00,-63.00
                            1212.00,183.00 1066.62,-64.10 1053.39,-28.11
                            1043.37,-0.85 1031.27,24.97 1017.42,49.44
                            818.22,401.10 316.00,464.00 216.00,466.00
                            116.00,468.00 -365.22,401.10 -564.42,49.44 Z"
            />
            <g
              id="palm"
              className="palm"
              ref={(el) => {
                palm = el;
              }}
            >
              <path
                id="leafPalm"
                className="leafPalm primary thick"
                fill="none"
                stroke="black"
                stroke-width="1"
                d="M 3228.12,1562.50
           C 3240.62,2365.62 2181.25,2368.75 2181.25,2368.75
             2181.25,2368.75 1125.00,2306.25 1137.50,1543.75
             1150.00,781.25 2140.62,834.38 2187.50,262.50
             2203.12,828.12 3215.62,759.38 3228.12,1562.50 Z"
              />
              <path
                id="leafPalmInner"
                className="leafPalmInner inner"
                fill="none"
                stroke="black"
                stroke-width="1"
                d="M 2200.00,646.88
           C 2208.53,646.88 2218.75,650.00 2218.75,650.00
             2303.12,643.75 2240.62,1618.75 2356.25,1696.88
             2390.16,1719.79 2439.60,1520.96 2487.50,1459.38
             2602.92,1310.97 2729.75,1180.45 2756.25,1231.25
             2775.81,1268.75 2649.26,1362.34 2556.25,1493.75
             2470.99,1614.21 2418.22,1772.25 2440.62,1825.00
             2468.15,1889.81 2639.06,1760.57 2775.00,1687.50
             2885.72,1627.98 2968.75,1618.89 2968.75,1675.00
             2968.75,1709.55 2870.09,1723.70 2787.50,1768.75
             2571.32,1886.66 2409.38,2034.38 2221.88,2043.75
             2221.88,2043.75 2178.12,2043.75 2178.12,2043.75
             1990.62,2034.38 1828.68,1886.66 1612.50,1768.75
             1529.91,1723.70 1431.25,1709.55 1431.25,1675.00
             1431.25,1618.89 1514.28,1627.98 1625.00,1687.50
             1760.94,1760.57 1931.85,1889.81 1959.38,1825.00
             1981.78,1772.25 1929.01,1614.21 1843.75,1493.75
             1750.74,1362.34 1624.19,1268.75 1643.75,1231.25
             1670.25,1180.45 1797.08,1310.97 1912.50,1459.38
             1960.40,1520.96 2009.84,1719.79 2043.75,1696.88
             2159.38,1618.75 2096.88,643.75 2181.25,650.00
             2181.25,650.00 2189.91,646.88 2200.00,646.88 Z"
              />
            </g>
            <g
              id="egg"
              className="egg"
              ref={(el) => {
                egg = el;
              }}
            >
              <path
                id="eggOuter"
                className="eggOuter primary thick"
                fill="none"
                stroke="black"
                stroke-width="1"
                d="M 1184.38,2868.75
           C 1137.50,4381.25 3459.38,4487.50 3221.88,2793.75
             2984.38,1100.00 1231.25,1356.25 1184.38,2868.75 Z"
              />
              <path
                id="eggMiddle"
                className="eggMiddle secondary"
                fill="none"
                stroke="black"
                stroke-width="1"
                d="M 1312.50,2846.88
           C 1246.88,4162.50 3215.62,4162.50 3081.25,2800.00
             2946.88,1437.50 1378.12,1531.25 1312.50,2846.88 Z"
              />
              <path
                id="eggInner"
                className="eggInner primary"
                fill="none"
                stroke="black"
                stroke-width="1"
                d="M 1431.25,2834.38
           C 1409.38,4018.75 2993.75,3812.50 2956.25,2787.50
             2918.75,1762.50 1453.12,1650.00 1431.25,2834.38 Z"
              />
            </g>
            <g
              id="stadiums"
              className="stadiums"
              ref={(el) => {
                stadiums = el;
              }}
            >
              <path
                class="stadiumsOuter primary thick"
                stroke-width="8"
                stroke="black"
                fill="lightblue"
                d="m-250, -1100 a250,250 0 1 1 500,0 c400,0 600,50 600,1100 c 0,1050 -200,1100 -600,1100a250,250 0 0 1 -500, 0c -400,0 -600,-50 -600,-1100 c 0,-1050 200,-1100 600,-1100"
              />
              <path
                class="stadium secondary"
                stroke-width="1"
                stroke="black"
                fill="grey"
                d="m-650,-600 a150,150, 0 1,1 300,0 v1200 a150,150, 0 0 1 -300,0z"
              />
              <path
                class="stadium secondary"
                stroke-width="1"
                stroke="black"
                fill="grey"
                d="m350,-600 a150,150, 0 1,1 300,0 v1200 a150,150, 0 0 1 -300,0z"
              />
              <path
                class="stadium secondary"
                stroke-width="1"
                stroke="black"
                fill="grey"
                d="m100,-750 a150,150, 0 1,1 300,0 v1500 a150,150, 0 0 1 -300,0z"
              />
              <path
                class="stadium secondary"
                stroke-width="1"
                stroke="black"
                fill="grey"
                d="m-400,-750 a150,150, 0 1,1 300,0 v1500 a150,150, 0 0 1 -300,0z"
              />
              <path
                class="stadium secondary"
                stroke-width="1"
                stroke="black"
                fill="grey"
                d="m-150,-900 a150,150, 0 1,1 300,0 v1800 a150,150, 0 0 1 -300,0z"
              />
            </g>
          </defs>
          <g
            id="mandalaStage"
            ref={(el) => {
              mandalaStage = el;
            }}
            className="stage"
          ></g>
        </svg>
      </div>
      <div className="HUD fixed">
        {/* FIXME: this parent div only exists becasue you didnt want to alter the child divs existing class variable  */}
        <div id="pathManipulationMenu" className={tabClasses.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Ring Tabs"
            className={tabClasses.tabs}
          >
            {ringArr.map((ring, index) => (
              <Tab value={index} label={ring.title} {...a11yProps(index)} />
            ))}
          </Tabs>
          {ringArr.map((ring, index) => (
            <TabPanel value={value} index={index} className="tabPanel">
              <label id="discrete-slider-cuts">Cuts</label>
              <Slider
                className="sliderCuts"
                onChange={updateCuts}
                defaultValue={0}
                // getAriaValueText="create function to get aria text"
                aria-labelledby="discrete-slider-cuts"
                valueLabelDisplay="auto"
                min={0}
                max={100}
              />
              <label id="discrete-slider-radius">Radius</label>
              <Slider
                className="sliderRadius"
                onChange={updateRadius}
                defaultValue={10}
                // getAriaValueText="create function to get aria text"
                aria-labelledby="discrete-slider-radius"
                valueLabelDisplay="auto"
                min={1}
                max={100}
              />
              <label id="discrete-slider-scale">Scale</label>
              <Slider
                className="sliderScale"
                onChange={updateScale}
                defaultValue={1}
                // getAriaValueText="create function to get aria text"
                aria-labelledby="discrete-slider-scale"
                valueLabelDisplay="auto"
                step={0.1}
                marks
                min={0.1}
                max={2}
              />
              <label id="discrete-slider-offset">Offset</label>
              <Slider
                onChange={updateOffset}
                className="sliderOffset"
                defaultValue={0}
                // getAriaValueText="create function to get aria text"
                aria-labelledby="discrete-slider-offset"
                valueLabelDisplay="auto"
                steps={1}
                marks
                min={-180}
                max={180}
              />
            </TabPanel>
          ))}
        </div>
        {/* end of path sliders */}
      </div>
      <div id="pathGallery" className="HUD fixed">
        <List
          component="nav"
          aria-label="main mailbox folders"
          className={listClasses.root}
        >
          {listItems.map((item) => (
            <ListItem button className="pathListItem" onClick={addPathButton}>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </div>
      <div id="mandalaTable" className="HUD fixed">
        <TableContainer component={Paper} id="square">
          <Table className="table" aria-label="mandala table">
            <TableHead>
              <TableRow>
                <TableCell>Clear Ring</TableCell>
                <TableCell>Paths</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ringArr.map((ring) => (
                <TableRow key={ring.title}>
                  <TableCell component="th" scope="row">
                    <Button onClick={clearPathArr}>{ring.title}</Button>
                  </TableCell>
                  <TableCell id={`tablePathArrCell${ring.title}`}></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Button id="buttonHideHUD" className="fixed" onClick={hideHUD}>
        Hide Menus
      </Button>
    </div>
  );
}

export default App;
