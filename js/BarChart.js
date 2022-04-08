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
    let data = {};
    let dataSorted = {};
    //let data;
    /**
     * Data format:
     * Data = [
     *    {
     *      Key: NAME_OF_CATEGORY,
     *      value: {
     *          source: FIRST_SOURCE_NAME
     *          value: NUMERICAL_VALUE
     *      }
     *    },
     *    {
     *      ...
     *    }
     * ]
     */

    
    //TEST DATA
    // let data = [
    //     {'col1' : 'v1',
    //      'col2' : 100
    //     },
    //     {'col1' : 'v1',
    //      'col2' : 100
    //     },
    //     {'col1' : 'v1',
    //      'col2' : 100
    //     },
    //     {'col1' : 'v1',
    //      'col2' : 100
    //     },
    //     {'col1' : 'v1',
    //      'col2' : 100
    //     },
    // ] 
    // let data1 = [
    //     {'val1' : 25},
    //     {'val2' : 30},
    //     {'val3' : 6},
    //     {'val4' : 17},
    //     {'val5' : 37},
    // ]
    // let data2 = [
    //     {'val1' : 50},
    //     {'val2' : 60},
    //     {'val3' : 12},
    //     {'val4' : 35},
    //     {'val5' : 75},
    // ]

    // let groups = {
    //     'source 1' : data,
    //     'source 2' : data1,
    //     'source 3' : data2
    // };
    //let data = {
    //     'val1' : [
    //             {source: 's1',
    //              value: 100},
    //              {source: 's2',
    //              value: 50},
    //              {source: 's3',
    //              value: 25}
    //     ],
    //     'val2' : [
    //             {source: 's1',
    //              value: 121},
    //              {source: 's2',
    //              value: 60.5},
    //              {source: 's3',
    //              value: 30.25}
    //     ],
    //     'val3' : [
    //             {source: 's1',
    //              value: 25},
    //              {source: 's2',
    //              value: 12.5},
    //              {source: 's3',
    //              value: 6.25}
    //     ],
    //     'val4' : [
    //             {source: 's1',
    //              value: 70},
    //              {source: 's2',
    //              value: 35},
    //              {source: 's3',
    //              value: 17.5}
    //     ],
    //     'val5' : [
    //             {source: 's1',
    //              value: 150},
    //              {source: 's2',
    //              value: 75},
    //              {source: 's3',
    //              value: 37.5}
    //     ]
    // };

    // let data1 = {
    //     'val1' : [
    //         {source: 's1',
    //         value: 50},
    //         {source: 's2',
    //         value: 25},
    //         {source: 's3',
    //         value: 10},
    //         {source: 's4',
    //         value: 129.5}
    //     ],
    //     'val2' : [
    //         {source: 's1',
    //         value: 25},
    //         {source: 's2',
    //         value: 69.5},
    //         {source: 's3',
    //         value: 58.25},
    //         {source: 's4',
    //         value: 110.5}
    //     ],
    //     'val3' : [
    //         {source: 's1',
    //         value: 53},
    //         {source: 's2',
    //         value: 62.5},
    //         {source: 's3',
    //         value: 12.25},
    //         {source: 's4',
    //         value: 91.5}
    //     ],
    //     'val4' : [
    //         {source: 's1',
    //         value: 43},
    //         {source: 's2',
    //         value: 15},
    //         {source: 's3',
    //         value: 62.5},
    //         {source: 's4',
    //         value: 10.5}
    //     ],
    //     'val5' : [
    //         {source: 's1',
    //         value: 13},
    //         {source: 's2',
    //         value: 16},
    //         {source: 's3',
    //         value: 15.5},
    //         {source: 's4',
    //         value: 29.51}
    //     ],
    //     'val6' : [
    //         {source: 's1',
    //         value: 16},
    //         {source: 's2',
    //         value: 23.5},
    //         {source: 's3',
    //         value: 89.25},
    //         {source: 's4',
    //         value: 19.25}
    //     ]
    // };

    let svg, xScale, xAxis, yScale, yAxis, xSubScale, color;
    let keys, values, sources, yExtent;

    obj.AddDataSource = async (input, source) => {
        return new Promise((res) => {
            data[source] = []

            d3.csv(input, (d) => {
                data[source].push(d);
            }).then(() => { 
                console.log('Data Recieved!');
                console.log(
                        d3.group(
                            data[source],
                            d => d.listed_in
                        )
                    );
                
                // obj.FilterData(sourceName);
                // obj.CreateChart();
                res(data);
            })
        })
    }

    // initialises variables for creating the chart
    obj.CreateBarChart = () => {
        

        obj.CreateSvg();        // creating display
        obj.DrawChart();
    }

    obj.SortData = (id, sortFunc) => {
        // console.log('sorting');
        // console.log(data[id]);
        // dataSorted[id] = d3.group(data[id], d => {
        //     console.log(d['type']);
        // });
        // console.log(dataSorted);
    }

    obj.SetData = (input, source) => {
        

        data = newData;
        keys = Object.keys(groups);
        values = Object.values(groups).flat();
        console.log(values.map(d => d[value]));
        yExtent = d3.extent(values.map(d => Object.values(d)));
        obj.CreateScales();
    }

    obj.ChangeData = () => {
        data = data1;
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
        .range([margin.left, width])
        .padding(0.1);
    
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
            .data(Object.entries(data))
            .join(
                // new data
                enter => {
                    console.log('Entering!');
                    enter.append('g')
                    .attr('class', 'SubGroup')
                    .attr('transform', d => { return 'translate(' + xScale(d[0]) + ",0)"})
                        .selectAll('rect')
                        .data(d => {
                            return d[1];
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
                        .attr('transform', d => { return 'translate(' + xScale(d[0]) + ",0)"})
                        .selectAll('rect')
                            .data(d => {
                                return d[1];
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
                                    .style('fill', (d) => {
                                        return color(d.source);
                                    })
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
                                        return xSubScale(d.source);
                                    })
                                    .attr('width', xSubScale.bandwidth())
                                    .attr('y', (d) => {
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