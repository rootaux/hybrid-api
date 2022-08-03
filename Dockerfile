FROM node:17
WORKDIR /app
ARG DB_URL
ARG JWT_SECRET
ENV DB_URL=$DB_URL
ENV JWT_SECRET=$JWT_SECRET
COPY package.json ./
COPY index.js ./
COPY routes ./routes
COPY models ./models
RUN npm install 
EXPOSE 3000
CMD [ "node", "index.js" ]