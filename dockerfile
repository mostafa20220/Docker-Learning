FROM node as base
WORKDIR /app
COPY package.json .
COPY dist ./src
EXPOSE 3000

# RUN apt update && apt install -y vim curl bat


FROM base as development
RUN npm install
CMD ["npm", "run", "docker-dev"]

FROM base as production
RUN npm install --only=production
CMD ["npm", "run", "docker-prod"]
