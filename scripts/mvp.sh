#!/bin/bash

# Assuming the ndJSON content is stored in a file named 'data.ndjson'
# If the content is not already in a file, first put it into one, e.g., by pasting it into 'data.ndjson'

# Check if the user provided a URL argument
if [ $# -ne 1 ]; then
    echo "Usage: $0 <file_url>"
    exit 1
fi

# Loop through each line in the ndjson file
while IFS= read -r line; do
    echo "$line"
    # Use jq to parse the 'path' and 'url' fields from the current line
    path=$(echo "$line" | jq -r '.path')
    url=$(echo "$line" | jq -r '.url')

    # Print the path and url
    echo "Path: $path"
    echo "URL: $url"
    echo "-----"

    # Create the directory (or directories) if they do not exist
    mkdir -p "$(dirname "$path")"

    # Download the data to the requested path
    curl $url -o $path
done < "$1"
