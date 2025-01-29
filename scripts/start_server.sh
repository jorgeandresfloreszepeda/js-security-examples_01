#!/bin/bash
# Start the Apache server
sudo systemctl start httpd
# Ensure Apache is enabled on boot
sudo systemctl enable httpd