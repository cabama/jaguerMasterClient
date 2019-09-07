FROM node:latest
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# INSTALL CHROME DEV
RUN  apt-get update \
  # See https://crbug.com/795759
  && apt-get install -yq libgconf-2-4 \
  # Install latest chrome dev package, which installs the necessary libs to
  # make the bundled version of Chromium that Puppeteer installs work.
  && apt-get install -y wget --no-install-recommends \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-unstable --no-install-recommends \
  && rm -rf /var/lib/apt/lists/* \
  && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
  && chmod +x /usr/sbin/wait-for-it.sh


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
