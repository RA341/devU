#!/bin/bash

# setup a devU install using the prebuilt images
# also sets up the required tango config

owner="$1"
branch="$2"

if [ -z "$owner" ] || [ -z "$branch" ]; then
  echo "Usage: $0 <owner> <branch>"
  echo "Example: $0 makeopensource develop"
  exit 1
fi

repo="devU"

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
read -rp "Enter the frontend URL (e.g., https://devu.app): " client_url
read -rp "Enter the API URL (e.g., https://api.devu.app): " api_url

# Use sed to replace the placeholder URLs in the docker-compose file
sed -i "s|CLIENT_URL: https://client.devu.app|CLIENT_URL: $client_url|g" "$compose_local_filename"
sed -i "s|API_URL=https://devu.app|API_URL=$api_url|g" "$compose_local_filename"

echo "Updated Docker Compose file with:"
echo "Client URL: $client_url"
echo "API URL: $api_url"

# Start the containers
echo "Starting containers..."
docker compose up -d

exit 0