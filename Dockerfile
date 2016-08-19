FROM node:6

EXPOSE 3000 3001 4200 80 8081

WORKDIR /home

COPY ./package.json /home/

RUN npm install

COPY  ./ /home

#CMD ping google.com
CMD npm run start
