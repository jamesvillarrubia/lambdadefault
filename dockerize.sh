#!/bin/bash

MODULE="werk-mailer"

if [ -f ./claudia.json ]; then
   echo 'Updating docker container.'
else
   echo 'Creating docker container.'
   npm run c-create
fi

## remove the image (can be removed to lighten load)
# docker rmi "lamb/$MODULE" -f

## remove the container
docker rm $MODULE -f

## build the image and name it
docker build . -t "lamb/$MODULE"

## run the image 
docker run -it \
    -v ~/.aws:/root/.aws \
    --name $MODULE "lamb/$MODULE"

docker start $MODULE

docker attach $MODULE


