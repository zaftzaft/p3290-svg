const elm = d3.select("#main");
const svg = elm.append("svg");

const height = elm.node().clientHeight - 10;
const width = elm.node().clientWidth;

svg
.attr("height", height)
.attr("width", width);


let p3290 = new P3290;
p3290.appendTo("svg");
p3290.render();
p3290.$g.attr("transform", `translate(50, 100)`)




// LED
let up = [1, 2, 5, 10, 14, 16, 19, 27, 32, 33, 41, 45,46,47];

(function f() {
  up.forEach(u => {
    let ge = d3.select(`.ge-${u}`);
    ge.select(".rj45-green").attr("fill", Math.random() <= 0.5 ? "#888" : "#2ecc71");
    ge.select(".rj45-red").attr("fill", "#e67e22")
  });

  setTimeout(f, 100)
})();
