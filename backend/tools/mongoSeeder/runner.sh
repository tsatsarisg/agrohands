echo "🚀 Running MongoDB seed script inside backend container..."

# Find the running backend container
CONTAINER_ID=$(docker ps --filter "name=agro_backend" --format "{{.ID}}")

if [ -z "$CONTAINER_ID" ]; then
  echo "❌ No running container found for 'agro_backend'. Start it first!"
  exit 1
fi

# Execute the script inside the container
docker exec -it $CONTAINER_ID node tools/mongoSeeder/mongo-seeder.js 

echo "✅ Seeding complete!"
