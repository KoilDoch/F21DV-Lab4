/**
    Author: Kyle Dick
    HWU ID: H00301592
    Email: kd41@hw.ac.uk
*/

export function BarChart() {
    let obj = {}
    
    // dimensions and margins of the graph
    let margin = {top: 20, right: 30, bottom: 30, left: 40};
    let width = 800 - margin.left - margin.right;
    let height = 200 - margin.top - margin.bottom;
    let data = [
        {
            key: 'val1',
            value: [
                {source: 's1',
                 value: 100},
                 {source: 's2',
                 value: 50},
                 {source: 's3',
                 value: 25}
            ]
        },
        {
            key: 'val2',
            value: [
                {source: 's1',
                 value: 121},
                 {source: 's2',
                 value: 60.5},
                 {source: 's3',
                 value: 30.25}
            ]
        },
        {
            key: 'val3',
            value: [
                {source: 's1',
                 value: 25},
                 {source: 's2',
                 value: 12.5},
                 {source: 's3',
                 value: 6.25}
            ]
        },
        {
            key: 'val4',
            value: [
                {source: 's1',
                 value: 70},
                 {source: 's2',
                 value: 35},
                 {source: 's3',
                 value: 17.5}
            ]
        },
        {
            key: 'val5',
            value: [
                {source: 's1',
                 value: 150},
                 {source: 's2',
                 value: 75},
                 {source: 's3',
                 value: 37.5}
            ]
        }
    ];

    let data1 = [
        {
            key: 'val1',
            value: [
                {source: 's1',
                 value: 50},
                 {source: 's2',
                 value: 25},
                 {source: 's3',
                 value: 10},
                 {source: 's4',
                 value: 129.5}
            ]
        },
        {
            key: 'val2',
            value: [
                {source: 's1',
                 value: 25},
                 {source: 's2',
                 value: 69.5},
                 {source: 's3',
                 value: 58.25},
                 {source: 's4',
                 value: 110.5}
            ]
        },
        {
            key: 'val3',
            value: [
                {source: 's1',
                 value: 53},
                 {source: 's2',
                 value: 62.5},
                 {source: 's3',
                 value: 12.25},
                 {source: 's4',
                 value: 91.5}
            ]
        },
        {
            key: 'val4',
            value: [
                {source: 's1',
                 value: 43},
                 {source: 's2',
                 value: 15},
                 {source: 's3',
                 value: 62.5},
                 {source: 's4',
                 value: 10.5}
            ]
        },
        {
            key: 'val5',
            value: [
                {source: 's1',
                 value: 13},
                 {source: 's2',
                 value: 16},
                 {source: 's3',
                 value: 15.5},
                 {source: 's4',
                 value: 29.51}
            ]
        },
        {
            key: 'val6',
            value: [
                {source: 's1',
                 value: 16},
                 {source: 's2',
                 value: 23.5},
                 {source: 's3',
                 value: 89.25},
                 {source: 's4',
                 value: 19.25}
            ]
        }
    ];

    let svg, xScale, xAxis, yScale, yAxis, xSubScale, color;
    let keys, values, sources, yExtent;

    obj.ChangeData = () => {
        data = data1;
        obj.SetData();
        obj.DrawChart();
    }

    obj.SetData = () => {
        keys = data.map(d => d.key);
        values = data.map(d => d.value);
        sources = values[0].map(d => d.source);
        yExtent = d3.extent(values.map(d => d.map(d => d.value)).flat());
        obj.CreateScales();
    }

    obj.CreateBarChart = (input) => {
        obj.CreateSvg();
        obj.SetData();
        obj.DrawChart();
    }

    obj.CreateSvg = () => {
        // appending svg
        // later the svg will already be made
        svg = d3.select('#display')
        .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
        .append('g')
            .attr('tranform',
                'translate(' + margin.left + ',' + margin.top + ")");

        // draw axes
        // x axis
        // draw
        xAxis = svg.append('g')
        .attr('transform', 'translate(0,' + height + ")");
            
        // draw
        yAxis = svg.append('g')
        .attr('transform', 'translate('+ margin.left + ',0)');
    }

    obj.CreateScales = () => {
        // X Axis scale
        xScale = d3.scaleBand()
        .range([margin.left, width]);
    
        // Y axis scale
        yScale = d3.scaleLinear()
            .range([height, 0]);

        xSubScale = d3.scaleBand();

        color = d3.scaleOrdinal()
        .range(["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"]);
    }
        
    obj.DrawChart = () => {
        xScale.domain(keys);
        color.domain(sources);
        xSubScale.range([0, xScale.bandwidth()]).domain(sources)
        yScale.domain([0, yExtent[1]])
        xAxis.transition().duration(1000).call(d3.axisBottom(xScale));
        yAxis.transition().duration(1000).call(d3.axisLeft(yScale));
        

        let groups = svg.selectAll('.SubGroup')
            .data(data)
            .join(
                // new data
                enter => {
                    console.log('Entering!')
                    enter.append('g')
                    .attr('class', 'SubGroup')
                    .attr('transform', d => { return 'translate(' + xScale(d.key) + ",0)"})
                        .selectAll('rect')
                        .data(d => {
                            return d.value;
                        })
                        .enter().append('rect')
                            .on('mouseover', DisplayValue)
                            .on('mouseout', HideValue)
                            .attr('x', (d) => {
                                return xSubScale(d.source)})
                            .attr('y', yScale(0))
                            .attr('width', xSubScale.bandwidth())
                            .style('fill', (d) => {
                                return color(d.source);
                            })
                            .transition()
                            .duration(1000)
                            .attr('y', (d) => {return yScale(d.value)})
                            .attr('height', d => {
                                return height - yScale(d.value)});
                    
                },
                // change to existing data
                update => {
                    console.log('Updating!')
                    update
                        .attr('transform', d => { return 'translate(' + xScale(d.key) + ",0)"})
                        .selectAll('rect')
                            .data(d => {
                                console.log(d);
                                return d.value;
                            })
                            .join(
                                enter => {
                                    enter.append('rect')
                                    .on('mouseover', DisplayValue)
                                    .on('mouseout', HideValue)
                                    .attr('x', (d) => {
                                        return xSubScale(d.source)})
                                    .attr('y', yScale(0))
                                    .attr('width', xSubScale.bandwidth())
                                    .style('fill', 'blue')
                                    .transition()
                                    .duration(1000)
                                    .attr('y', (d) => {return yScale(d.value)})
                                    .attr('height', d => {
                                        return height - yScale(d.value)});
                                },
                                update => {
                                    update.transition()
                                    .duration(1000)
                                    .attr('x', (d) => {
                                        console.log(d);
                                        return xSubScale(d.source);
                                    })
                                    .attr('width', xSubScale.bandwidth())
                                    .attr('y', (d) => {
                                        console.log(d);
                                        return yScale(+d.value)})
                                    .attr('height', d => {
                                        return height - yScale(+d.value)});
                                },
                                exit => {
                                    exit.transition()
                                        .duration(1000)
                                        .style("opacity",0)
                                        .remove();
                                }
                            )
                            
                },
                // remove data
                exit => {
                    console.log('Exiting!')
                    exit.transition()
                    .duration(1000)
                    .style("opacity",0)
                    .remove();
                }
            )
        }

    /**
     * Hover function for the bars, displays a value when hovered
     * @param d - the mouse event
     * @param i - data associated 
     */
     let DisplayValue = (d,i) => {
        console.log(i);
        //display the value
        svg.append("text") 
            .attr('class', 'val')  
            .attr('x', function() { 
                return xScale(i.source);
            }) 
            .attr('y', function() { 
                return yScale(i.value) - 5;
            }) 
            .text( function(d) { return +i.value; } )
            .style('fill', 'red'); // Value of the text 
    }

    /**
     * Hover function for the bars, removes a displayed value
     */
    let HideValue = () => {
        d3.selectAll(".val").remove();
    }

    return obj;
}