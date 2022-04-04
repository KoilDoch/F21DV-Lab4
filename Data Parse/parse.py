import csv
input = './Data/movies.csv'
output = 'test.csv'

lines = []

with open(input, mode='r', encoding="Latin1") as file:
    csv_reader = csv.reader(file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            print(f'Column names are {", ".join(row)}')
            line_count += 1
        print(f'\t {row[0]} is in the genre {row[2]}')
        line_count += 1
    print(f'Processed {line_count} lines.')