FROM node:18-alpine

WORKDIR ${WORKDIR}
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
CMD [ "npm", "run", "start" ]
