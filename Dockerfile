FROM lambci/lambda:build-nodejs6.10

RUN cd /

COPY . .

#RUN npm init -f
RUN npm install

RUN npm install claudia -g --verbose
#RUN npm install natural --verbose

#RUN npm run c-update
#RUN npm run c-update

ENTRYPOINT npm run c-update

#ENTRYPOINT /bin/bash

