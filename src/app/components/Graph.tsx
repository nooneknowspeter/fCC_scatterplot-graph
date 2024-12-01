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
    const marginTop = 40;
    const marginRight = 40;
    const marginBottom = 40;
    const marginLeft = 40;

    const width = 1400 - marginLeft - marginRight;
    const height = 900 - marginTop - marginBottom;

    // create svg canvas
    const svg = d3
      .select("#visualization")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

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
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
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
          .attr("y2", -height)
          .attr("stroke-opacity", 0.1),
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", width - 4)
          .attr("y", -4)
          .attr("font-weight", "bold")
          .attr("text-anchor", "end")
          .attr("fill", "currentColor")
          .text("Year →"),
      );

    // y axis
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
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
          .attr("x2", width)
          .attr("stroke-opacity", 0.1),
      )
      .call((g) =>
        g
          .select(".tick:last-of-type text")
          .clone()
          .attr("x", 10)
          .attr("y", -height + 70)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text("↑ Minutes"),
      );

    // dot
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg
      .append("g")
      // .attr("fill", "currentColor")
      .selectAll("circle")
      .data(parsedData)
      .join("circle")
      .attr("fill", (d) => color(String(d.Doping != "")))
      .attr("cx", (d) => x(d.Year))
      .attr("cy", (d) => y(d.ParsedTime ?? 0))
      .attr("r", 3);
  };

  return (
    <>
      <div
        className="flex h-screen flex-col items-center justify-center"
        data-theme="dark"
      >
        <div id="visualization">
          <h1 id="title" className="m-3 text-center font-bold">
            Scatter Plot Graph Showing Doping in Professional Bicycle Racing
          </h1>
        </div>
      </div>
    </>
  );
};

export default Graph;
