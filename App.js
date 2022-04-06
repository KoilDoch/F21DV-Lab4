/**
    Author: Kyle Dick
    HWU ID: H00301592
    Email: kd41@hw.ac.uk
*/

import {BarChart} from './js/BarChart.js';
import {DataMap} from './js/DataMap.js';

document.getElementById("sort").addEventListener("click", sort);

function sort() {
    chart.ChangeData();
}

//let DataByGenre = DataMap();
//DataByGenre.data = DataByGenre.SetData('./Data/movies.csv', d3.select("#display"), (d) => d.genre);
let chart = BarChart()
chart.CreateBarChart();