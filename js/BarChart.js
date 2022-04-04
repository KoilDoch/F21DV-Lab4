/**
    Author: Kyle Dick
    HWU ID: H00301592
    Email: kd41@hw.ac.uk
*/

export function BarChart() {
    let obj = {}
    
    // dimensions and margins of the graph
    let margin = {top: 10, right: 30, bottom: 30, left: 40};
    let width = 460 - margin.left - margin.right;
    let height = 400 - margin.top - margin.bottom;
        
    // appending svg
    // later the svg will already be made
    let svg = d3.select('#display')
        .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
        .append('g')
            .attr('tranform',
                'translate(' + margin.left + ',' + margin.top + ")");

    // data
    d3.csv('./Data/movies.csv', data => {
            console.log(data);
            console.log("hello");

            // X Axis
            // scale
            let x = d3.scaleLinear()
            .domain([0,1000])
            .range([0,width]);
            // draw
            svg.append('g')
                .attr('transform', 'translate(0,' + height + ")")
                .call(d3.axisBottom(x));

            // parameters for histogram
            let histogram = d3.histogram()
                .value(d => {return d.score})
                .domain(x.domain())
                .thresholds(x.ticks(70));

            // apply function to get bins
            let bins = histogram(data);

            // Y axis
            // scale
            let y = d3.scaleLinear()
                .range([height, 0])
                .domain([0, d3.max(bins, d => {return d.length})]);
            // draw
            svg.append('g')
                .call(d3.axisLeft(y));

            // draw the bars
            svg.selectAll('rect')
                .data(bins)
                .enter()
                .append('rect')
                    .attr('x', 1)
                    .attr('transform', d => {return 'translate(' + x(d.x0) + ','
                            + y(d.length) + ")";})
                    .attr('width', d => {return x(d.x1) - x(d.x0) - 1;})
                    .attr('height', d => {return height - y(d.length)})
                    .style('fill', '#69b3a2');
    });



    return obj;
}