#This file is extract only those JSON line which contains TICKETID info and save it in output_file_path
file_path = "/Path/to/file/ticketsinfo.txt"
output_file_path = "/Path/to/file/tickets_id_json.txt"

try:
    with open(file_path, "r") as file:
        with open(output_file_path, "w") as output_file:
            for line in file:
                if "TICKETID" in line:
                    output_file.write(line)

    print("Filtered data has been written to '{}'.".format(output_file_path))

except FileNotFoundError:
    print("File '{}' not found.".format(file_path))