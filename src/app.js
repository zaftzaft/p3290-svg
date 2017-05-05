const elm = d3.select("#main");
const svg = elm.append("svg");

const height = elm.node().clientHeight - 10;
const width = elm.node().clientWidth;


const addRJ45 = (g, con) => {
  let p = (function(){
    let x = 0;
    let y = 0;
    return [
      [x, y],
      [x, y - 18],
      [x + 10, y - 18],
      [x + 10, y - 22],
      [x + 18, y - 22],
      [x + 18, y - 18],
      [x + 28, y - 18],
      [x + 28, y],
      [x, y],
      [x, y - 18]
    ].map(a => `${a[0]},${a[1]}`).join(" ");
  })();

  g
  .append("polyline")
  .attr("points", p)
  .attr("stroke", "#000")
  .attr("fill", "#111");

  if(!con) {

    g
    .append("rect")
    .attr("width", 5)
    .attr("height", 5)
    .attr("x", 1)
    .attr("y", -20)
    .attr("class", "rj45-green")
    .attr("fill", "#888")
    .attr("stroke", "#000");

    g
    .append("rect")
    .attr("width", 5)
    .attr("height", 5)
    .attr("x", 21)
    .attr("y", -20)
    .attr("class", "rj45-red")
    .attr("fill", "#888")
    .attr("stroke", "#000");

  }

}


svg
.attr("height", height)
.attr("width", width);




svg
.append("rect")
.attr("fill", "#444")
.attr("stroke", "none")
.attr("width", 1030)
.attr("height", 100);



svg
.append("g")
.attr("transform", "translate(51.5, 10)")
.append("rect")
.attr("fill", "none")
.attr("stroke", "#000")
.attr("width", 927)
.attr("height", 80);


[
  [75, 1],
  [275, 13],
  [495, 25],
  [695, 37]
].forEach(pos => {
  let left = pos[0];
  let offset = pos[1];

  // group
  let gw = 192;
  let gh = 54;

  let group = svg.append("g")
  .attr("transform", `translate(${left}, 23)`)

  group
  .append("rect")
  .attr("height", gh)
  .attr("width", gw)
  .attr("fill", "#f1f1f1");

  group.selectAll("g")
  .data([
    [28, 180],
    [0, 0],
    [60, 180],
    [32, 0],
    [92, 180],
    [64, 0],
    [124, 180],
    [96, 0],
    [156, 180],
    [128, 0],
    [188, 180],
    [160, 0]
  ])
  .enter()
  .append("g")
  .attr("transform",d => `translate(${d[0] + 2}, ${d[1] > 0 ? 32 : 22}) rotate(${d[1]})`)
  .each(function(p,i){
    let g = d3.select(this);
    g.attr("class", `ge-${offset + i}`);
    addRJ45(g);


  });
});



(function() {
  let group = svg.append("g")
  .attr("transform", `translate(900, 23)`)

  group
  .append("rect")
  .attr("height", 54)
  .attr("width", 32)
  .attr("fill", "#f1f1f1");

  group
  .append("g")
  .attr("transform",d => `translate(2, 22) rotate(0)`)
  .each(function(){
    addRJ45(d3.select(this));
  });

  group
  .append("g")
  .attr("transform",d => `translate(30, 32) rotate(180)`)
  .each(function(){
    addRJ45(d3.select(this));
  });
})();


(function() {
  let group = svg.append("g")
  .attr("transform", `translate(940, 23)`)

  group
  .append("rect")
  .attr("height", 54)
  .attr("width", 32)
  .attr("fill", "#f1f1f1");

  group
  .append("g")
  .attr("transform",d => `translate(2, 22) rotate(0)`)
  .each(function(){
    addRJ45(d3.select(this), true);
  });

  group
  .append("g")
  .attr("transform",d => `translate(30, 32) rotate(180)`)
  .each(function(){
    addRJ45(d3.select(this), true);
  });
})();
















let up = [1, 2, 5, 10, 14, 16, 19, 27, 32, 33, 41, 45,46,47];

(function f() {
  up.forEach(u => {
    d3.select(`.ge-${u}`).select(".rj45-green").attr("fill", "#2ecc71");
    d3.select(`.ge-${u}`).select(".rj45-red")
    .attr("fill", Math.random() <= 0.5 ? "#888" : "#e67e22")
  });

  setTimeout(f, 100)
})();
