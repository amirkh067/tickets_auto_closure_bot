# this code extracts only ticketsid and tickets status from the whole json payload and save the output to output_file_path
import json

# Specify the file paths
input_file_path = '/Path/to/file/ticketsinfo1.txt'
output_file_path = '/Path/to/file/tickets_output.txt'

try:
    with open(input_file_path, 'r') as input_file, open(output_file_path, 'w') as output_file:
        # Process each line separately
        for line in input_file:
            # Remove any additional content or formatting
            json_data = line.strip()

            # Parse the JSON data
            parsed_data = json.loads(json_data)

            # Check if the line contains the required information
            if 'QueryMXINCIFACEResponse' in parsed_data:
                ticket_info = parsed_data['QueryMXINCIFACEResponse']['MXINCIFACESet'][0]['INCIDENT']
                ticket_status = str(ticket_info[0]['STATUS'])
                ticket_id = str(ticket_info[0]['TICKETID'])

                # Write the ticket status and ID to the output file
                #output_file.write("Ticket Status: {}, Ticket ID: {}\n".format(ticket_status, ticket_id))
                output_file.write("Ticket Status: {}, Ticket ID: {}\n".format(ticket_status, ticket_id))


except IOError:
    print("File '{}' not found.".format(input_file_path))
except ValueError:
    print("Invalid JSON data in the file.")
except KeyError:
    print("Invalid JSON structure. Check if the required fields are present.")

print("Ticket information has been written to '{}'.".format(output_file_path))
