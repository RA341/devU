#!/bin/bash

# setup a devU install using the prebuilt images
# also sets up the required tango config

owner="${1:-makeopensource}"  # Default to makeopensource if not provided
branch="${2:-develop}"       # Default to develop if not provided
repo="devU"

echo "Using owner: $owner, branch: $branch, repo: $repo"

compose_file_path="example-docker-compose.yml"
compose_local_filename="docker-compose.yml"
raw_url="https://raw.githubusercontent.com/$owner/$repo/$branch/$compose_file_path"

echo "Downloading $compose_file_path from $owner/$repo (branch: $branch) to $compose_local_filename"

if curl -sSL "$raw_url" -o "$compose_local_filename"; then
  echo "Download successful!"
else
  echo "Download failed. Check the repository, branch, and file path."
  exit 1
fi

# Prompt for URLs
read -p "Enter the frontend URL (e.g., https://devu.app): " client_url

read -p "Enter the API URL (e.g., https://api.devu.app): " api_url

# Prompt for port configuration with defaults from the compose file
read -p "Enter the port to expose the API (default: 3001): " api_port
api_port=${api_port:-3001}

read -p "Enter the port to expose the client (default: 9000): " client_port
client_port=${client_port:-9000}

# Prompt for watchtower configuration
read -p "Enable watchtower auto-update service? (y/N): " use_watchtower
use_watchtower=${use_watchtower:-"n"}  # Default to "n" if empty
use_watchtower=${use_watchtower,,}     # Convert to lowercase

if [[ "$use_watchtower" == "y" || "$use_watchtower" == "yes" ]]; then
  # Ask for check interval (in seconds)
  read -rp "Enter watchtower check interval in seconds (default: 900): " watchtower_interval
  watchtower_interval=${watchtower_interval:-900}

  # Update the watchtower check interval
  sed -i "s|WATCHTOWER_POLL_INTERVAL=900|WATCHTOWER_POLL_INTERVAL=$watchtower_interval|g" "$compose_local_filename"

  echo "Watchtower enabled with check interval: $watchtower_interval seconds"
else
  # Comment out the watchtower service in the docker-compose file
  sed -i '/watchtower:/,/restart: unless-stopped/s/^/# /' "$compose_local_filename"
  echo "Watchtower service disabled"
fi

# Use sed to replace the placeholder URLs in the docker-compose file
sed -i "s|CLIENT_URL: https://client.devu.app|CLIENT_URL: $client_url|g" "$compose_local_filename"
sed -i "s|API_URL: https://devu.app|API_URL: $api_url|g" "$compose_local_filename"

# Update the port mappings
sed -i "s|      - '3001:3001'|      - '$api_port:3001'|g" "$compose_local_filename"
sed -i "s|      - '9000:80'|      - '$client_port:80'|g" "$compose_local_filename"

echo "Updated Docker Compose file with:"
echo "Client URL: $client_url"
echo "API URL: $api_url"
echo "API Port: $api_port"
echo "Client Port: $client_port"

# Start the containers
echo "Starting containers..."
docker compose up -d

exit 0