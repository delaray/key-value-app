# Backend image & container names
BACKEND_IMAGE_NAME="key-value-backend"
BACKEND_CONTAINER_NAME="backend"

MONGODB_HOST="mongo"

# Database
source .env.db

# Connnectivity
source .env.network
LOCALHOST_PORT=3000
CONTAINER_PORT=3000
MONGODB_HOST=MONGODB

# STORAGE
source .env.volume
VOLUME_CONTAINER_PATH="/data/db"

if [ "$(docker ps -q -f name=$BACKEND_CONTAINER_NAME)" ]; then
    echo "Container $BACKEND_CONTAINER_NAME already exists"
    echo "Please use the command: docker stop $BACKEND_CONTAINER_NAME"
    echo "in order to stop and remove the container."
    exit 1
fi


docker run --rm -d --name $BACKEND_CONTAINER_NAME \
       -e KEY_VALUE_DB=$KEY_VALUE_DB \
       -e KEY_VALUE_USER=$KEY_VALUE_USER \
       -e KEY_VALUE_PASSWORD=$KEY_VALUE_PASSWORD \
       -e MONGODB_HOST=$MONGODB_HOST \
       -e PORT=$CONTAINER_PORT \
       -p $LOCALHOST_PORT:$CONTAINER_PORT \
       -v ./backend/src:/app/src \
       --network $NETWORK_NAME \
       $BACKEND_IMAGE_NAME
