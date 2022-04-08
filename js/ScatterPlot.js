
export function ScatterPlot() {
    let obj = {}
    
    // dimensions and margins of the graph
    let margin = {top: 30, right: 30, bottom: 30, left: 30};
    let width = 800 - margin.left - margin.right;
    let height = 400 - margin.top - margin.bottom;
    let data = [];
    let svg, xScale, yScale, colors, toolTip;

    obj.SetDisplay = () => {
        svg = d3.select('#display')
        .append('svg')  
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
        .append('g')
            .attr('transform',
                'translate(' + margin.left + ',' + margin.top + ")");

        toolTip = d3.select('#display')
            .append('div')
                .style('opacity', 0)
                .attr('class', 'tooltip')
                .attr('background-color', 'white')
                .attr('border', 'solid')
                .attr('border-width', '2px')
                .attr('border-radius', '5px')
                .style('padding', '5px');
    }

    obj.SetData = () => {
        d3.csv('./Data/movies.csv', d => {
            data.push({
                title: d.name,
                budget: +d.budget,
                score: +d.score,
                genre: d.genre
            })
        }).then(() => {
            obj.SetScales();
            obj.update();
        })
    }

    obj.SetScales = () => {
        let xExtent = d3.extent(data.map(d => d.budget));
        let yExtent = d3.extent(data.map(d => d.score));
        let genres = new Set(data.map(d => d.genre));
        console.log(genres);
        
        // scale for budget on x axis
        xScale = d3.scaleLinear()   
            .domain([0, xExtent[1]])
            .range([0, width]);
        svg.append('g')
            .attr('transform', 
                'translate(0,' + height + ')')
            .transition()
            .duration(1000)
            .call(d3.axisBottom(xScale));
        
        // scale for score on y axis
        yScale = d3.scaleLinear()
            .domain([0, 10])
            .range([height, 0]);
        svg.append('g')
            .transition()
            .duration(1000)
            .call(d3.axisLeft(yScale));

        colors = d3.scaleOrdinal()
            .domain(genres)
            .range(['#000000','#FFFF00','#800080','#FFA500','#87CEFA','#FF0000',
                '#008000','#FF00FF', '#0000CD', '#FFC0CB',' #EE82EE','#98FB98',
                '#2F4F4F', '#808080', '#FFA07A', '#8B4513', '#6A5ACD', '#F5DEB3',
                '#00FF00', '#00FFFF'
            ]);
    }

    obj.update = () => {
        console.log(data);
        svg.append('g')
            .selectAll('dot')
            .data(data)
            .join(
                enter => {
                    enter.append('circle')
                        .on('mouseover', DisplayValue)
                        .on('mousemove', mouseMove)
                        .attr('cx', d => xScale(d.budget))
                        .attr('cy', d => yScale(d.score))
                        .attr('r', 1)
                        .style('fill', d => colors(d.genre));
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
        toolTip.style('opacity', 1);
    }

    let mouseMove = (d,i) => {
        toolTip.html(`Title: [${i.title}] \n 
        Score: [${i.score}] \n
        Budget: [${i.budget}]`);
    }

    /**
     * Hover function for the bars, removes a displayed value
     */
    let HideValue = () => {
    }

    return obj;
}