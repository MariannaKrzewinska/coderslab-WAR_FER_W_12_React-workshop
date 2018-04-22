import React, { Component } from 'react';
import * as d3 from 'd3';

export class SimpleDots extends Component {
  componentDidMount() {
    var svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");

    var randomX = d3.randomNormal(width / 2, 80),
      randomY = d3.randomNormal(height / 2, 80),
      data = d3.range(2000).map(() => [randomX(), randomY()]);

    var g = svg.append("g");

    var circle = g.selectAll("circle")
      .data(data)
      .enter().append("circle")
        .attr("r", 2.5)
        .attr("transform", (d) => "translate(" + d + ")");

    svg.append("rect")
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .attr("width", width)
      .attr("height", height)
      .call(d3.zoom()
        .scaleExtent([1, 8])
        .on("zoom", () => g.attr("transform", d3.event.transform)));

  }

  render() {
    return <svg with="960" height="500"></svg>;
  }
}
