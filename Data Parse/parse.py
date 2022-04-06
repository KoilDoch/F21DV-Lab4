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

# Input file location
input = './Data/movies.csv'
# Value to split by
value = 'years'
# Output location of the new files
output = './Data/'+value.capitalize()+'/'

# Keep a record of the field names in the original file
field_names = []
# Dictionary to hold all the movies by genre
columnDict = {}

"""
    Opens the input file
    Fills dictionary with genres and keys and a list of movies as value
    Outputs length of the input list, list of fields and the genres afterwards

    encoding on the input file taken as Latin1
"""
with open(input, mode='r', encoding="Latin1") as file:
    # create a csv dictionary reader object and keep track of line count
    csv_reader = csv.DictReader(file)
    line_count = 0

    # for each movie, put it into the correct key value pair in genre dictionary
    for row in csv_reader:
        # get the field names from the first row in the csv
        if line_count == 0:
            field_names = csv_reader.fieldnames
            line_count += 1

        current = row[value][row[value].find('/')+1:]
        # if the current movies genre doesnt exist in dictionary, add it
        if(current not in columnDict):
            columnDict[current] = [row]
        # add movie to appropriate area in the dictionary
        columnDict[current].append(row)
        line_count += 1

    # Output to terminal the results of parsing input file
    print(f'Processed {line_count} lines.')
    print(f'Field names are: {field_names}')
    print(f'Values gathered {columnDict.keys()}.')

"""
    Loops through the dictionary
    Creates csv files for each of the genres
    Adds movies to the newly created csv files based on genre
"""
for column in columnDict:
    print(f'Writing movies in genre: {column}')
    with open(output + column + '.csv', mode='w', encoding="Latin1") as file:
        writer = csv.DictWriter(file, fieldnames=field_names)
        # write the header into the new file
        writer.writeheader()
        # write all the movies in the genres value pair
        for row in columnDict[column]:
            writer.writerow(row)