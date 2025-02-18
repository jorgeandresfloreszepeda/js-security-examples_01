#!/bin/bash
# Check if Apache is installed
if command -v httpd &> /dev/null; then
    echo "Apache is installed. Attempting to stop the server..."
    # Stop the Apache server
    sudo systemctl stop httpd
else
    echo "Apache is not installed."
fi
