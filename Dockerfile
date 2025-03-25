FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Configuration pour exposer l'application sur le port 50000
ENV VITE_PORT=50000
ENV HOST=0.0.0.0

EXPOSE 50000

# Commande pour démarrer l'application
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "50000"]
