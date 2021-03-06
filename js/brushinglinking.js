// Set margins and dimensions 
const margin = { top: 50, right: 50, bottom: 50, left: 200 };
const width = 900; //- margin.left - margin.right;
const height = 650; //- margin.top - margin.bottom;

// Append svg object to the body of the page to house Scatterplot1
const svg1 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]); 

// Initialize brush for Scatterplot1
let brush1; 
let myCircles1; 

// append svg object
const svg2 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]);

// Initialize brush for Scatterplot2
let brush2;
let myCircles2;

// append svg object
const svg3 = d3
    .select("#vis-holder")
    .append("svg")
    .attr("width", width - margin.left - margin.right )
    .attr("height", height - margin.top - margin.bottom )
    .attr("viewBox", [0,0, width,height])
// Initialize bars
let myBar;

// Define color scale
const color = d3.scaleOrdinal()
                .domain(["setosa", "versicolor", "virginica"])
                .range(["#FF7F50", "#21908dff", "#fde725ff"]);

// Plotting 
d3.csv("data/iris.csv").then((data) => {
  
  // We will need scales for all of the following charts to be global
  let x1, y1, x2, y2, x3, y3;  

  // We will need keys to be global
  let xKey1, yKey1, xKey2, yKey2, xKey3, yKey3;

  // Scatterplot1
  {
    xKey1 = "Sepal_Length";
    yKey1 = "Petal_Length";

    // Find max x
    let maxX1 = d3.max(data, (d) => { return d[xKey1]; });

    // Create X scale
    x1 = d3.scaleLinear()
                .domain([0,maxX1])
                .range([margin.left, width-margin.right]); 
    
    // Add x axis 
    svg1.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x1))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right)
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey1)
      );

    // Find max y 
    let maxY1 = d3.max(data, (d) => { return d[yKey1]; });

    // Create Y scale
    y1 = d3.scaleLinear()
                .domain([0, maxY1])
                .range([height - margin.bottom, margin.top]); 

    // Add y axis 
    svg1.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(y1)) 
        .attr("font-size", '20px') 
        .call((g) => g.append("text")
                      .attr("x", 0)
                      .attr("y", margin.top)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(yKey1)
      );

    // Add points
    myCircles1 = svg1.selectAll("circle")
                            .data(data)
                            .enter()
                              .append("circle")
                              .attr("id", (d) => d.id)
                              .attr("cx", (d) => x1(d[xKey1]))
                              .attr("cy", (d) => y1(d[yKey1]))
                              .attr("r", 8)
                              .style("fill", (d) => color(d.Species))
                              .style("opacity", 0.5);

    // define brush
    brush1 = d3.brush().extent([[0,0], [width, height]])
  
    // add brush1
    svg1.call(brush1.on("start", clear).on("brush", updateChart1))
  }

  {
    // Scatterplot2 code here (Petal Width vs. Sepal Width)
    
    // set the x and y keys
    xKey2 = "Sepal_Width";
    yKey2 = "Petal_Width";

    // find max X
    let maxX2 = d3.max(data, (d) => { return d[xKey2]; });

    // create X scale
    x2 = d3.scaleLinear()
                  .domain([0, maxX2])
                  .range([margin.left, width - margin.right]);

    // Add X axis
    svg2.append("g")
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x2))
          .attr("font-size", '20px')
          .call((g) => g.append('text')
                          .attr("x", width - margin.right)
                          .attr("y", margin.bottom - 4)
                          .attr("fill", "black")
                          .attr("text-anchor", "end")
                          .text(xKey2)
          );

    // find max Y
    let maxY2 = d3.max(data, (d) => { return d[yKey2]; });

    // create Y scale
    y2 = d3.scaleLinear()
                  .domain([0, maxY2])
                  .range([height - margin.bottom, margin.top]); 

    // Add Y axis
    svg2.append("g")
          .attr("transform", `translate(${margin.left}, 0)`) 
          .call(d3.axisLeft(y2)) 
          .attr("font-size", '20px') 
          .call((g) => g.append("text")
                        .attr("x", 0)
                        .attr("y", margin.top)
                        .attr("fill", "black")
                        .attr("text-anchor", "end")
                        .text(yKey2)
        );

    // add points
    myCircles2 = svg2.selectAll("circle")
                              .data(data)
                              .enter()
                                 .append("circle")
                                 .attr("id", (d) => d.id)
                                 .attr("cx", (d) => x2(d[xKey2]))
                                 .attr("cy", (d) => y2(d[yKey2]))
                                 .attr("r", 8)
                                 .style("fill", (d) => color(d.Species))
                                 .style("opacity", 0.5);
                      
    brush2 = d3.brush().extent([[0,0], [width, height]])

    svg2.call(brush2.on("start", clear).on("brush", updateChart2));
  }

  {
    // Bar chart code here

    // Hardcoded barchart data
    const data1 = [ 
      {Species: 'setosa', Score: 50},
      {Species: 'versicolor', Score: 50},
      {Species: 'virginica', Score: 50}
    ];

    xKey3 = "Species";
    yKey3 = "Score";


    // Find max y value to plot  
    let maxY1 = d3.max(data1, function(d) { return d[yKey3]; });

    // Create y scale   
    y3 = d3.scaleLinear()
                .domain([0,maxY1])
                .range([height-margin.bottom,margin.top]); 

    // Create x scale
    x3 = d3.scaleBand()
                .domain(d3.range(data1.length))
                .range([margin.left, width - margin.right])
                .padding(0.1); 

    // Add y axis to webpage 
    svg3.append("g")
      .attr("transform", `translate(${margin.left}, 0)`) 
      .call(d3.axisLeft(y3)) 
      .attr("font-size", '20px')
      .call((g) => g.append("text")
                    .attr("x", 0)
                    .attr("y", margin.top)
                    .attr("fill", "black")
                    .attr("text-anchor", "end")
                    .text(yKey3)
        ); 

    // Add x axis to webpage  
    svg3.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`) 
      .call(d3.axisBottom(x3) 
              .tickFormat(i => data1[i].Species))  
      .attr("font-size", '20px')
      .call((g) => g.append("text")
                    .attr("x", width - margin.right)
                    .attr("y", margin.bottom -4)
                    .attr("fill", "black")
                    .attr("text-anchor", "end")
                    .text(xKey3)
        );
       

    // Add bars to the webpage, bind events needed for tooltips 
   myBar = svg3.selectAll("rect")
                                  .data(data1) 
                                  .enter()  
                                  .append("rect") 
                                    .attr("class", "bar") 
                                    .attr("x", (d,i) => x3(i)) 
                                    .attr("y", (d) => y3(d.Score)) 
                                    .attr("height", (d) => (height - margin.bottom) - y3(d.Score)) 
                                    .attr("width", x3.bandwidth())
                                    .style("fill", (d) => color(d[xKey3]))
                                    .style("opacity", 0.5);
  }


  
  // Brushing Code---------------------------------------------------------------------------------------------
    
  // Call to removes existing brushes 
  function clear() {
      svg1.call(brush1.move, null);
      
      //TODO: add code to clear existing brush from svg2
      svg2.call(brush2.move, null)
  }

  // Call when Scatterplot1 is brushed 
  function updateChart1(brushEvent) {
      
      //TODO: Find coordinates of brushed region 
      let coordinates = d3.brushSelection(this);
  
      //TODO: Give bold outline to all points within the brush region in Scatterplot1
      myCircles1.classed("brushed", function(d) {
        return isBrushed(coordinates, x1(d[xKey1]), y1(d[yKey1]))
      })
      //TODO: Give bold outline to all points in Scatterplot2 corresponding to points within the brush region in Scatterplot1
      myCircles2.classed("brushed", function(d){
        return isBrushed(coordinates, x1(d[xKey1]), y1(d[yKey1]))
      })
  }

  // Call when Scatterplot2 is brushed 
  function updateChart2(brushEvent) {
    
    // coordinates of region
    let coordinates = d3.brushSelection(this);
    let selectedSpecies = new Set();
    // bold outline
    myCircles2.classed("brushed", function(d){
      isSelected = isBrushed(coordinates, x2(d[xKey2]), y2(d[yKey2]));
      if (isSelected) {
        selectedSpecies.add(d[xKey3])
      }
      return isSelected
    })
    // bold outline
    myCircles1.classed("brushed", function(d) {
      return isBrushed(coordinates, x2(d[xKey2]), y2(d[yKey2]));
    })
    // bold outline
    myBar.classed("brushed", function(d){
      return selectedSpecies.has(d[xKey3]);
    })
  }

    // Finds dots within the brushed region
    function isBrushed(brush_coords, cx, cy) {
      if (brush_coords === null) return;

      var x0 = brush_coords[0][0],
        x1 = brush_coords[1][0],
        y0 = brush_coords[0][1],
        y1 = brush_coords[1][1];
      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1; // This return TRUE or FALSE depending on if the points is in the selected area
    }

});
