FROM node:20

WORKDIR /frontend-app 

COPY . /frontend-app/

RUN npm install 

EXPOSE 3000

CMD [ "npm", "run", "dev" ]