FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/jdm
RUN mkdir -p /usr/src/jdm/src
RUN mkdir -p /usr/src/jdm/dist
RUN mkdir -p /usr/src/jdm/public
WORKDIR /usr/src/jdm

# Install Typescript
RUN npm install -g tsc
RUN npm install -g concurrently
RUN npm install typescript -g

# COPY PROJECT SETTINGS
ADD webpack.config.js /usr/src/jdm
ADD webpack.prod.js /usr/src/jdm
ADD package.json /usr/src/jdm
ADD tsconfig.json /usr/src/jdm
ADD tslint.json /usr/src/jdm
ADD src /usr/src/jdm/src

# FINALLY INSTALL PROYECT DEPS
RUN npm install
