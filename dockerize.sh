#!/bin/bash

MODULE="bus-createfromurl"

if [ -f ./claudia.json ]; then
   echo 'Updating docker container.'
else
   echo 'Creating docker container.'
   npm run c-create
fi

## remove the image (can be removed to lighten load)
#docker rmi "lamb/$MODULE" -f
## remove the container
docker rm $MODULE -f

## build the image and name it
docker build . -t "lamb/$MODULE"
## docker build . -t "lamb/bus.createfromurl"

## run the image 
docker run -it \
    -v ~/.aws:/root/.aws \
    --name $MODULE "lamb/$MODULE"
## docker run -dit --name bus.createfromurl "lamb/bus.createfromurl"
## docker attach bus.createfromurl

#echo "[default] \nAWS_ACCESS_KEY_ID=$AWS_ACCESS_KEYID \nAWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY" > 

docker start $MODULE

#chmod 644 ~/.aws/*

#docker cp ~/.aws/credentials bus-fake:~/.aws/credentials
#docker cp bus-fake:/var/task/node_modules/ ./node_modules/
#cp -rf ./node_modules/node_modules/* ./node_modules/
#rm -R ./node_modules/node_modules
#npm run build


