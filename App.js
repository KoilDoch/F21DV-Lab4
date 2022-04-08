/**
    Author: Kyle Dick
    HWU ID: H00301592
    Email: kd41@hw.ac.uk
*/

import {BarChart} from './js/BarChart.js';
import {DataMap} from './js/DataMap.js';
import {ScatterPlot} from './js/ScatterPlot.js';

let data = {
    'Amazon Prime': {
        dataset: './Data/amazon_prime_titles.csv',
        source: 'https://www.kaggle.com/shivamb/amazon-prime-movies-and-tv-shows'
    },
    'Disney Plus': {
        dataset: './Data/disney_plus_titles.csv',
        source: 'https://www.kaggle.com/datasets/shivamb/disney-movies-and-tv-shows'
    },
    'Hulu': {
        dataset: './Data/hulu_titles.csv',
        source: 'https://www.kaggle.com/shivamb/hulu-movies-and-tv-shows'
    },
    'Netflix': {
        dataset: './Data/netflix_titles.csv',
        source: 'https://www.kaggle.com/shivamb/netflix-shows'
    }
};

let imdb = {
    dataset: './Data/movies.csv',
    source: 'https://www.kaggle.com/datasets/danielgrijalvas/movies'
}

document.getElementById("budgetRating").addEventListener("click", budgetRatingRedirect);
function budgetRatingRedirect() {
    window.location.href = 'budgetRating.html';

    let scatter = ScatterPlot();
    scatter.SetDisplay();
    scatter.SetData();
}

document.getElementById("Genres").addEventListener("click", genreRedirect);
function genreRedirect() {
    window.location.href = 'genres.html';
}

// let DataByGenre = DataMap();
// DataByGenre.data = DataByGenre.SetData('Imdb', data['Imdb'].dataset, (d) => d.genre);
// DataByGenre.data = DataByGenre.SetData('Amazon Prime', data['Amazon Prime'].dataset, (d) => d.genre);
// DataByGenre.data = DataByGenre.SetData('Imdb', data['Imdb'].dataset, (d) => d.genre);
// DataByGenre.data = DataByGenre.SetData('Imdb', data['Imdb'].dataset, (d) => d.genre);
// let chart = BarChart();
// await chart.AddDataSource(data['Imdb'].dataset, 'Imdb');
// chart.SortData('Imdb', d=>d.genre);

// for(const source in data) {
//     await chart.AddDataSource(data[source].dataset, source);
//     chart.SortData(source, d=>d.listed_in);
// }