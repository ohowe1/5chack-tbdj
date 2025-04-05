FROM node:22-bullseye

# install the linux version of all dependencies
RUN apt update && apt install -y git

RUN corepack enable

WORKDIR /srv
WORKDIR /srv/5chack-tbdj