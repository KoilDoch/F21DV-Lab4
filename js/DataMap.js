/**
    Author: Kyle Dick
    HWU ID: H00301592
    Email: kd41@hw.ac.uk
    Last Edit: 21/03/2022
*/

import { BarChart } from "./BarChart.js";

/**
 * This function creates an object which manages the data used for the charts.
 * It takes the raw data from a URL and creates an object from it, giving only relevant data to the charts.
 * 
 * SetData(dataURL, out)
 *      Takes the data from a url and puts it into a 'raw' list.
 *      @param {the dataset to be used} dataURL
 *      @param {the area to display the chart} out
 *      Afterwords calls functions to set up components based on this data
 *      
 * SetCategories()
 *      returns the properties of the objects in the list
 *      Afterwards calls FilterData(x , y) on the location and first category
 *
 * Creates a chart from the dataset
 *      @param {Where to display the chart} out 
 *   
 * FilterData(x , y)
 *      x and y represent the respective categories for each axis
 *      This function filters according to them and creates a new dictionary
 *          key: x value
 *          value: y value
 * 
 * GetCategories()
 *      Getter function for categories variable
 * 
 * GetDataMap()
 *      Getter function for dataMap variable
 * 
 * @returns Datamap object
 */
export function DataMap() {
    let obj = {};           // used to return a usable object
    let dataRaw = {};       // the unfiltered data
    let categories = [];    // the list of possible categories to filter by
    let dataMap = {};       // the filtered data into key value pairs
    let dataSorted = [];    // the data grouped (if needed)
    let chart, x, y;
    
    /**
     *  SetData(dataURL)
     *      Takes the data from a url and puts it into a 'raw' list.
     *      Afterwords calls functions to set up components based on this data
     */
    obj.SetData = async (sourceName, dataURL, sortFunction) => {
            //return new Promise((res) => {
                console.log('Getting Data...');
                dataRaw[sourceName] = {
                    rows: []
                }
                // get the data from url and push it into the raw array
                d3.csv(dataURL, (d) => {
                    dataRaw[sourceName].rows.push(d)
                }).then(() => { 
                    console.log(dataRaw);

                    // group the data by genre
                    dataSorted = d3.group(dataRaw[sourceName].rows, sortFunction);
    
                    console.log('Data Recieved!');
                    console.log(dataSorted);

                    obj.FilterData(sourceName);
                    obj.CreateChart();
                    //res(dataSorted);
                })
           // })
    }

    /**
    * FilterData(x , y)
    *      x and y represent the respective categories for each axis
    *      This function filters according to them and creates a new dictionary
    *          key: x value
    *          value: y value
    */
     obj.FilterData = (sourceName) => {
        console.log('Filtering Data...');

        for(const [genre,movies] of dataSorted) {
            let sum = 0;

            movies.forEach(
                d => {
                    sum += +d['score']
                    sum = parseFloat(sum.toFixed(2));
                }
            );

            let average = sum / movies.length;
            average = parseFloat(average.toFixed(2));

            dataMap[genre] = [
                    {
                        source: sourceName,
                        value: average
                    }
                ]
        }
        console.log(`Data Filtered: x[${x}] y[${y}]`);
        console.log(dataMap);
    }

        

    obj.SortData = () => {
        dataMap.sort((a,b) => {
            return b.value - a.value;
        });

        chart.DrawChart();
    }

    /**
     * SetCategories()
     *      returns the properties of the objects in the list
     *      Afterwards calls FilterData(x , y) on the location and first category
     */
    obj.SetCategories = () => {
        console.log('Setting Categories...');

        // get list of categories for this dataset
        for(let cat in dataRaw[0]) {
            categories.push(cat);
        }

        x = categories[0]
        // set the current y to the first category
        y = categories[5];

        console.log('Categories Set!');
        console.log(categories);

        // filter by location, using the first category
        obj.FilterData('name', categories[5]);
    }

    /**
     * Creates a drop down select menu from which the user can change the data shown within this current dataset.
     * Utilises the dataMap function FilterData(x,y) to reflect this change in the data
     */
     obj.CreateYDropDown = () => {
        console.log('Creating Dropdown...');

        // geta reference to the header element
        let header = d3.select('#header');

        // add a select element to the header element
        let dropdown = header.append('select')
                        .attr('id', 'dropDown')
                        .on('change', SetY);

        // add options to the drop down using the categories
        dropdown.selectAll('option')
            .data(categories)
            .enter()
            .append("option")
                .attr('value', d => {return d})
                .text(d => {return d});

        // add a title to the chart
        header.append('div')
                        .attr('class', 'title')
                        .text('Showing ' + x + " against " + y);

        console.log('Dropdown created!');
    }

    function SetY() {
        // on a change of selection, change data to reflect
        console.log('Changing Currently Shown Data...')

        // get data from the node value
        let y = d3.select("#dropDown").node().value;
        console.log(`Changing to ${y}`);

        // change the title of the chart
        d3.select('.title')
            .text('Showing ' + x + " against " + y);

        // filter the data then update the chart
        obj.FilterData(x, y);

        // update the chart
        chart.Update(dataMap);
    }

    /**
     * Creates a chart from the dataset
     * @param {Where to display the chart} out 
     */
     obj.CreateChart = (out) => {
        // create a new chart
        chart = BarChart();
        chart.CreateBarChart(dataMap);
    }

    /**
     * GetCategories()
     *      Getter function for categories variable
     */
    obj.GetCategories = () => {
        return categories;
    }

    /**
    * GetDataMap()
    *      Getter function for dataMap variable
    */
    obj.GetDataMap = () => {
        return dataMap;
    }

    return obj;
}