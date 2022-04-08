"""
    Author: Kyle Dick
    HWU ID: H00301592
    Email: kd41@hw.ac.uk

    The purpose of this program is to split a large file (movies.csv)
    into a group of smaller csv files with each file containing entries with a specific column value
    (grouped by genre value)

    Example:
    moves.csv:
    {name: movie1, genre: action, ...},
    {name: movie2, genre: action, ...},
    {name: movie3, genre: horror, ...},
    {name: movie4, genre: comedy, ...}

    would become

    action.csv
    {name: movie1, genre: action, ...}
    {name: movie2, genre: action, ...}

    horror.csv
    {name: movie3, genre: horror, ...}

    comedy.csv
    {name: movie4, genre: comedy, ...}
"""

import csv
from turtle import title

# Input file location
input = ['./Data/amazon_prime_titles.csv', 
    './Data/disney_plus_titles.csv',
    './Data/hulu_titles.csv',
    './Data/netflix_titles.csv']
output = './Data/Imdb-'

# Keep a record of the field names in the original file
titles = []

"""
    Opens the input file
    Fills dictionary with genres and keys and a list of movies as value
    Outputs length of the input list, list of fields and the genres afterwards

    encoding on the input file taken as Latin1
"""
"""
for sources in input: 
    with open(sources, mode='r', encoding="Latin1") as file:
        # create a csv dictionary reader object and keep track of line count
        csv_reader = csv.DictReader(file)
        line_count = 0

        # for each movie, put it into the correct key value pair in genre dictionary
        for row in csv_reader:
            # get the field names from the first row in the csv
            if line_count == 0:
                field_names = csv_reader.fieldnames
                line_count += 1

            if row['title'] not in titles :
                titles.append(row['title'])
            
            line_count += 1

        # Output to terminal the results of parsing input file
        print(f'Processed {line_count} lines.')
        print(f'Field names are: {field_names}')
        print(f'Values gathered {titles}.')
print('TITLES SCRAPED FROM STREAMING')

with open('./Data/Imdb/Imdb_Titles.tsv', mode='r', encoding="UTF-8") as file:
    tsv_reader = csv.reader(file, delimiter="\t")
    line_count = 0

    for row in tsv_reader:
        if line_count == 0:
            line_count += 1

        if row[2] in titles:
            if(line_count < 13000):
                title_ids1.append(row[0])
            if(line_count < 13000):
                title_ids2.append(row[0])
            if(line_count < 13000):
                title_ids3.append(row[0])
        line_count += 1

    print(f'Values gathered {title_ids1}.')
    print(f'Values gathered {title_ids2}.')
    print(f'Values gathered {title_ids3}.')
    print(f'Processed {line_count} lines.')
"""

import imdb
ia = imdb.Cinemagoer()
print(ia.get_movie('Jaws'))