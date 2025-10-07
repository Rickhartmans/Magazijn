Local Docker setup (quick)

This will run MySQL and PHP/Apache locally so you can test the backend without the remote host.

Requirements:
- Docker and Docker Compose installed

Commands:

# Start containers
docker compose up -d

# Wait a few seconds for MySQL to initialize, then import schema (if you have one)
# Example: mysql -h 127.0.0.1 -P 3306 -u appuser -papppass vista_magazijn < path/to/schema.sql

# Open the web app at http://localhost:8080/

# Stop containers
docker compose down

Notes:
- The PHP container mounts the current folder into /var/www/html.
- Environment variables for the PHP container are set in docker-compose.yml. Adjust as needed.
- After bringing up the containers, create a user in the database or run your existing DB migration.
