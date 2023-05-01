FROM rabbitmq:3.11-management
RUN apt-get update && apt-get install -y curl
EXPOSE 5672 15672