FROM lambci/lambda:build-nodejs6.10

RUN cd /

COPY . .

RUN npm install

RUN npm install claudia -g --verbose

ENTRYPOINT npm run c-update

