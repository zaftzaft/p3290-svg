class P3290 {

  constructor() {
    this.height = 100;
    this.width = this.height * 10.3; // 1U 10.3:1
  }


  appendTo(svg) {
    this.$g = d3.select(svg).append("g");

    this.$board = this.$g.append("rect");
    this.$frame = this.$g.append("g");
    this.$ports = this.$g.append("g");

  }


  render() {
    this.$board
      .attr("fill", "#444")
      .attr("stroke", "none")
      .attr("width", this.width)
      .attr("height", this.height);

    const frameWidth = this.width * 0.9;
    const frameHeight = this.height * 0.8;
    this.$frame
      .attr("transform", `translate(${(this.width - frameWidth) / 2}, ${(this.height - frameHeight) / 2})`)
      .append("rect")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("width", frameWidth)
      .attr("height", frameHeight);

    const rj45h = this.height * 0.22;
    const rj45w = this.height * 0.28;

    this.$ports.selectAll("*").remove();
    this.addPorts();
    this.addEth();
    this.addConsole();

  }


  attachRJ45(g, isCon) {
    let h = this.height;
    let p = (function(){
      let x = 0;
      let y = 0;
      return [
        [x, y],
        [x, y - (h * 0.18)],
        [x + (h * 0.10), y - (h * 0.18)],
        [x + (h * 0.10), y - (h * 0.22)],
        [x + (h * 0.18), y - (h * 0.22)],
        [x + (h * 0.18), y - (h * 0.18)],
        [x + (h * 0.28), y - (h * 0.18)],
        [x + (h * 0.28), y],
        [x, y],
        [x, y - (h * 0.18)]
      ].map(a => `${a[0]},${a[1]}`).join(" ");
    })();

    g
    .append("polyline")
    .attr("points", p)
    .attr("stroke", "#000")
    .attr("fill", "#111");

    if(!isCon) {
      g
      .append("rect")
      .attr("width", h * 0.05)
      .attr("height", h * 0.05)
      .attr("x", h * 0.01)
      .attr("y", -(h * 0.20))
      .attr("class", "rj45-red")
      .attr("fill", "#888")
      .attr("stroke", "#000");

      g
      .append("rect")
      .attr("width", h * 0.05)
      .attr("height", h * 0.05)
      .attr("x", h * 0.21)
      .attr("y", -(h * 0.20))
      .attr("class", "rj45-green")
      .attr("fill", "#888")
      .attr("stroke", "#000");
    }

  }


  addPorts() {
    const that = this;
    let h = this.height;
    [
      [h * 0.75, 1],
      [h * 2.75, 13],
      [h * 4.95, 25],
      [h * 6.95, 37]
    ].forEach(pos => {
      let left = pos[0];
      let offset = pos[1];

      // group
      let gw = h * 1.92;
      let gh = h * 0.54;

      let group = this.$ports.append("g")
      .attr("transform", `translate(${left}, ${h * 0.23})`)

      group
      .append("rect")
      .attr("height", gh)
      .attr("width", gw)
      .attr("fill", "#f1f1f1");

      group.selectAll("g")
      .data([
        [h * 0.28, 180],
        [h * 0.0, 0],
        [h * 0.60, 180],
        [h * 0.32, 0],
        [h * 0.92, 180],
        [h * 0.64, 0],
        [h * 1.24, 180],
        [h * 0.96, 0],
        [h * 1.56, 180],
        [h * 1.28, 0],
        [h * 1.88, 180],
        [h * 1.60, 0]
      ])
      .enter()
      .append("g")
      .attr("transform",d => `translate(${d[0] + (h * 0.02)}, ${d[1] > 0 ? h * 0.32 : h * 0.22}) rotate(${d[1]})`)
      .each(function(p,i){
        let g = d3.select(this);
        g.attr("class", `ge-${offset + i}`);
        that.attachRJ45(g);
        //addRJ45(g);
      });
    });


  }


  addEth() {
    const that = this;
    const h = this.height;

    let group = this.$ports.append("g")
    .attr("transform", `translate(${h * 9.00}, ${h * 0.23})`);

    group
    .append("rect")
    .attr("height", h * 0.54)
    .attr("width", h * 0.32)
    .attr("fill", "#f1f1f1");

    group
    .append("g")
    .attr("transform",d => `translate(${h * 0.02}, ${h * 0.22}) rotate(0)`)
    .each(function(){
      that.attachRJ45(d3.select(this));
    });

    group
    .append("g")
    .attr("transform",d => `translate(${h * 0.30}, ${h * 0.32}) rotate(180)`)
    .each(function(){
      that.attachRJ45(d3.select(this));
    });

  }


  addConsole() {
    const that = this;
    const h = this.height;

    let group = this.$ports.append("g")
    .attr("transform", `translate(${h * 9.40}, ${h * 0.23})`);

    group
    .append("rect")
    .attr("height", h * 0.54)
    .attr("width", h * 0.32)
    .attr("fill", "#f1f1f1");

    group
    .append("g")
    .attr("transform",d => `translate(${h * 0.02}, ${h * 0.22}) rotate(0)`)
    .each(function(){
      that.attachRJ45(d3.select(this), true);
    });

    group
    .append("g")
    .attr("transform",d => `translate(${h * 0.30}, ${h * 0.32}) rotate(180)`)
    .each(function(){
      that.attachRJ45(d3.select(this), true);
    });

  }

}


//module.exports = P3290;
