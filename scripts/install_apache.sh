#!/bin/bash
echo "Installing Apache..."
sudo yum update -y
sudo yum install -y httpd
echo "Apache installation completed."
