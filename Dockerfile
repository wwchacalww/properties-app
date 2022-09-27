FROM node:16.17.0-slim

RUN mkdir -p /usr/share/man/man1 && \
    echo 'deb http://ftp.debian.org/debian stretch-backports main' | tee /etc/apt/sources.list.d/stretch-backports.list && \
    apt update -y && apt install -y \
    git \
    ca-certificates \
    default-jre \
    openjdk-11-jre \
    curl \
    wget \
    fonts-powerline \
    procps

USER node

WORKDIR /home/node/app

CMD [ "sh", "-c", "npm install && tail -f /dev/null" ]