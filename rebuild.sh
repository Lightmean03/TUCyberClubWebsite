#!/bin/bash
image_names=("tucyberclubwebsite-backend" "tucyberclubwebsite-my-app")

for image_name in "${image_names[@]}"; do
  container_ids=$(docker ps -a --filter "ancestor=$image_name" --format "{{.ID}}")

  if [ -z "$container_ids" ]; then
    echo "No containers found for image $image_name."
  else
    for container_id in $container_ids; do
      echo "Stopping and removing container from image $image_name with ID: $container_id"
      docker stop "$container_id"
      docker rm "$container_id"
    done
  fi
done
docker image prune

for image_name in "${image_names[@]}"; do
  image_ids=$(docker images --format "{{.ID}}" "$image_name")

  if [ -z "$image_ids" ]; then
    echo "No images found for $image_name."
  else
    for image_id in $image_ids; do
      echo "Removing image $image_name with ID: $image_id"
      docker rmi "$image_id"
    done
  fi
done
docker compose up -d
