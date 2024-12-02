"use client";

import React, { useEffect } from "react";
import * as d3 from "d3";

const Graph = () => {
  // component mounts on page load
  useEffect(() => {
    plotGraph();
  }, []);

  // d3 algorithm to plot scatterplot graph when called through the effect hook
  const plotGraph = async () => {
    const url =
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

    interface dataInterface {
      Doping: string;
      Name: string;
      Nationality: string;
      Place: number;
      Seconds: number;
      Time: string;
      Url: string;
      Year: number;
    }

    // fetches and parses data from url
    const data: dataInterface[] = (await d3.json(url)) as dataInterface[];

    // console.log(
    //   data.map((d) => {
    //     return d.Doping;
    //   }),
    // );

    // init canvas properties
    const marginTop = 20;
    const marginRight = 40;
    const marginBottom = 80;
    const marginLeft = 40;

    const width = 1400 - marginLeft - marginRight;
    const height = 900 - marginTop - marginBottom;

    // create svg canvas
    const svg = d3
      .select("#visualization")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      // .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;")
      .style("opacity", 0);

    // svg animation
    svg.transition().duration(2000).style("opacity", 1);

    // title animation
    d3.select("#title")
      .transition()
      .duration(2000)
      .delay(1000)
      .style("opacity", 1);

    const parseTime = d3.timeParse("%M:%S");

    // parse time property from data pool from string to date
    const parsedData = data.map((d) => ({
      ...d,
      ParsedTime: parseTime(d.Time), // Convert Time to Date
    }));

    // min and max year from data pool
    const minYear = d3.min(data, (d) => d.Year) ?? 0;
    const maxYear = d3.max(data, (d) => d.Year) ?? 0;

    // defines x scale
    const x = d3
      .scaleLinear()
      .domain([minYear, maxYear])
      .range([0 + marginLeft, width - marginRight]);

    // min and max time from data pool
    const minTime = d3.min(parsedData, (d) => d.ParsedTime) ?? new Date();
    const maxTime = d3.max(parsedData, (d) => d.ParsedTime) ?? new Date();

    // defines y scale
    const y = d3
      .scaleTime()
      .domain([maxTime, minTime])
      .range([0 + marginTop, height - marginBottom]);

    // x axis
    const xAxis = svg
      .append("g")
      // .transition()
      // .duration(2000)
      .attr("transform", `translate(0,${height - marginBottom})`)
      .attr("id", "x-axis")
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 100)
          .tickFormat((d) => String(d)),
      )
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .transition()
          .delay(2000)
          .duration(1000)
          .attr("y2", -height)
          .attr("stroke-opacity", 0.1),
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", width - 4)
          .attr("y", -4)
          .transition()
          .duration(2000)
          .delay(3000)
          .attr("font-weight", "bold")
          .attr("text-anchor", "end")
          .attr("fill", "currentColor")
          .text("Year →"),
      )
      .style("opacity", 0);

    // x axis animation
    xAxis.transition().duration(2000).delay(3000).style("opacity", 1);

    // y axis
    const yAxis = svg
      .append("g")
      // .transition()
      // .duration(2000)
      // .delay(4000)
      .attr("transform", `translate(${marginLeft},0)`)
      .attr("id", "y-axis")
      .call(
        d3
          .axisLeft(y)
          .ticks(height / 40)
          .tickFormat((d) => d3.timeFormat("%M:%S")(d as Date)),
      )
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .transition()
          .delay(2000)
          .duration(2000)
          .attr("x2", width)
          .attr("stroke-opacity", 0.1),
      )
      .call((g) =>
        g
          .select(".tick:last-of-type text")
          .clone()
          .attr("x", 10)
          .attr("y", -height + 100)
          .transition()
          .duration(2000)
          .delay(6000)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text("↑ Minutes"),
      )
      .style("opacity", 0);

    // y axis animation
    yAxis.transition().duration(2000).delay(4000).style("opacity", 1);

    // tooltip
    const tooltip = d3
      .select("#visualization")
      .append("div")
      .attr("class", "tooltip tooltip-open")
      .style("opacity", 0);

    // dots
    const color = d3.scaleOrdinal(d3.schemePaired);

    svg
      .append("g")
      .attr("fill", "currentColor")
      .selectAll("circle")
      .data(parsedData)
      .join("circle")
      .attr("class", "dot")
      .attr("data-xvalue", (d) => d.Year)
      .attr("data-yvalue", (d) => String(d.ParsedTime))
      .attr("fill", (d) => color(String(d.Doping != "")))
      .attr("cx", (d) => x(d.Year))
      .attr("cy", (d) => y(d.ParsedTime ?? 0))
      .attr("r", 5)
      .on("mouseover", function (event, d) {
        tooltip
          .transition()
          .duration(500)
          .style("opacity", 1)
          .attr("data-year", d.Year)
          .attr(
            "data-tip",
            `${d.Name} : ${d.Nationality} Year: ${d.Year}, Time: ${d.ParsedTime}, ${d.Doping != "" && d.Doping}`,
          )
          .style("left", `${event.x}px`)
          .style("top", `${event.y}px`);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // legend
    const legendContainer = svg
      .append("g")
      .attr("id", "legend")
      .style("opacity", 0);

    // legend animation
    legendContainer.transition().duration(2000).delay(5000).style("opacity", 1);

    const legend = legendContainer
      .selectAll("#legend")
      .data(color.domain())
      .enter()
      .append("g")
      .attr("class", "legend-label")
      .attr("transform", (d, i) => {
        return `translate(0, ${height - i * 20 - 18} )`;
      });

    // colors
    legend
      .append("rect")
      .attr("x", width - 18)
      .attr("width", 12)
      .attr("height", 12)
      .style("fill", color);

    // label
    legend
      .append("text")
      .attr("fill", "currentColor")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("class", "text-sm")
      .style("text-anchor", "end")
      .text((d) => {
        if (d) {
          return "Riders with doping allegations";
        } else {
          return "No doping allegations";
        }
      });
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <div id="visualization">
          <h1
            id="title"
            className="m-3 text-center font-bold opacity-0 transition-all hover:animate-pulse"
          >
            Scatter Plot Graph Showing Doping in Professional Bicycle Racing
          </h1>
        </div>
      </div>
    </>
  );
};

export default Graph;
