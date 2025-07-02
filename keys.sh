#!/bin/bash

# SSH Key Download and Install Script
# Downloads SSH public key from https://srajasimman.dev/key
# and adds it to ~/.ssh/authorized_keys if not already present

set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Configuration
KEY_URL="https://github.com/srajasimman.keys"
SSH_DIR="$HOME/.ssh"
AUTHORIZED_KEYS="$SSH_DIR/authorized_keys"
TEMP_KEY_FILE=$(mktemp)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to cleanup temporary files
cleanup() {
    rm -f "$TEMP_KEY_FILE"
}
trap cleanup EXIT

# Create .ssh directory if it doesn't exist
if [ ! -d "$SSH_DIR" ]; then
    print_status "$YELLOW" "Creating ~/.ssh directory..."
    mkdir -p "$SSH_DIR"
    chmod 700 "$SSH_DIR"
fi

# Download the public key
print_status "$YELLOW" "Downloading SSH public key from $KEY_URL..."
if ! curl -fsSL "$KEY_URL" -o "$TEMP_KEY_FILE"; then
    print_status "$RED" "Error: Failed to download SSH key from $KEY_URL"
    exit 1
fi

# Validate the downloaded key
if [ ! -s "$TEMP_KEY_FILE" ]; then
    print_status "$RED" "Error: Downloaded key file is empty"
    exit 1
fi

# Check if the file contains any SSH key patterns
if ! grep -qE "(ssh-rsa|ssh-dss|ssh-ed25519|ecdsa-sha2-)" "$TEMP_KEY_FILE"; then
    print_status "$RED" "Error: Downloaded content doesn't contain any SSH public key patterns"
    exit 1
fi

# Create authorized_keys file if it doesn't exist
if [ ! -f "$AUTHORIZED_KEYS" ]; then
    print_status "$YELLOW" "Creating ~/.ssh/authorized_keys file..."
    touch "$AUTHORIZED_KEYS"
    chmod 600 "$AUTHORIZED_KEYS"
fi

# Initialize counters
TOTAL_KEYS=0
EXISTING_KEYS=0
ADDED_KEYS=0
INVALID_KEYS=0

print_status "$YELLOW" "Processing SSH keys from downloaded file..."

# Process the downloaded file line by line
while IFS= read -r line || [ -n "$line" ]; do
    # Trim whitespace
    line=$(echo "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
    
    # Skip empty lines and comments
    if [ -z "$line" ] || echo "$line" | grep -q "^#"; then
        continue
    fi
    
    # Validate SSH key format
    if ! echo "$line" | grep -qE "^(ssh-rsa|ssh-dss|ssh-ed25519|ecdsa-sha2-)"; then
        print_status "$RED" "Warning: Skipping invalid key format: ${line:0:50}..."
        INVALID_KEYS=$((INVALID_KEYS + 1))
        continue
    fi
    
    TOTAL_KEYS=$((TOTAL_KEYS + 1))
    
    # Check if this specific key already exists in authorized_keys
    if grep -qF "$line" "$AUTHORIZED_KEYS" 2>/dev/null; then
        print_status "$YELLOW" "Key already exists ($(echo "$line" | awk '{print $3}' | head -c 20)...)"
        EXISTING_KEYS=$((EXISTING_KEYS + 1))
    else
        # Add the key to authorized_keys
        echo "$line" >> "$AUTHORIZED_KEYS"
        print_status "$GREEN" "Added new key ($(echo "$line" | awk '{print $3}' | head -c 20)...)"
        ADDED_KEYS=$((ADDED_KEYS + 1))
    fi
    
done < "$TEMP_KEY_FILE"

# Ensure proper permissions
chmod 600 "$AUTHORIZED_KEYS"

# Display summary
echo
print_status "$GREEN" "=== Summary ==="
print_status "$GREEN" "Total valid keys found: $TOTAL_KEYS"
print_status "$GREEN" "Keys already present: $EXISTING_KEYS"
print_status "$GREEN" "New keys added: $ADDED_KEYS"
if [ $INVALID_KEYS -gt 0 ]; then
    print_status "$YELLOW" "Invalid keys skipped: $INVALID_KEYS"
fi

if [ $ADDED_KEYS -gt 0 ]; then
    print_status "$GREEN" "Successfully updated ~/.ssh/authorized_keys"
elif [ $TOTAL_KEYS -gt 0 ]; then
    print_status "$GREEN" "All keys were already present in ~/.ssh/authorized_keys"
else
    print_status "$RED" "No valid SSH keys found in downloaded file"
    exit 1
fi
