FROM ubuntu:20.04

RUN wget http://download.gna.org/wkhtmltopdf/0.12/0.12.4/wkhtmltox-0.12.4_linux-generic-amd64.tar.xz \
    && tar -xvf wkhtmltox-0.12.4_linux-generic-amd64.tar.xz \
    && cp wkhtmltox/bin/wkhtmltopdf /usr/bin/ \
    && source ~/.profile \
    && apt update \
    && apt upgrade \
    && apt install nodejs \
    && apt install npm

WORKDIR /usr/src/app_jet

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5001
CMD ["node", "index.js"]
