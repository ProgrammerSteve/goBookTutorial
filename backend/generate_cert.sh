#!/bin/bash

# Check if openssl is installed
if ! command -v openssl &> /dev/null
then
    echo "OpenSSL is not installed. Installing..."
    sudo apt update
    sudo apt install -y openssl
fi

# Define the filenames for the private key and certificate
KEY_FILE="key.pem"
CERT_FILE="cert.pem"

# Generate a 2048-bit RSA private key (no passphrase)
echo "Generating RSA private key..."
openssl genpkey -algorithm RSA -out "$KEY_FILE" -pkeyopt rsa_keygen_bits:2048
if [ $? -ne 0 ]; then
  echo "Error generating private key."
  exit 1
fi

# Generate a self-signed certificate using the private key
echo "Generating self-signed certificate..."
openssl req -new -x509 -key "$KEY_FILE" -out "$CERT_FILE" -days 365 -subj "/C=US/ST=State/L=City/O=My Organization/CN=localhost"
if [ $? -ne 0 ]; then
  echo "Error generating certificate."
  exit 1
fi

# Output the result
echo "Generated cert.pem and key.pem using OpenSSL."

# Optional: Combine the certificate and key into one file (for convenience in some cases)
cat "$CERT_FILE" "$KEY_FILE" > full_cert.pem
echo "Combined certificate and key in 'full_cert.pem'"

# Output instructions for using cert and key in Gin's HTTPS server
echo "To start your Gin web server with HTTPS, use the following command in your Go code:"
echo 'r.RunTLS(":9090", "cert.pem", "key.pem")'
