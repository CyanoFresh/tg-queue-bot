Telegram Queue Bot
====

Telegram bot for creating queue in group chat.

By Alex Solomaha ([@CyanoFresh](https://t.me/cyanofresh))

Feel free to contribute :)


## Features

- [x] Sign Up for chat group
- [x] Randomized Queue
- [x] Persistence - save and load queues from database
- [x] Authentication for `/done` commands
- [x] Telegram WebHooks - CPU and network optimization
- [x] User status in queue - done or undone
- [x] Use Telegram's inline buttons for navigation
- [ ] Use `telegraf/micro` for lambda-like services

## Installation

1. Clone repo
2. Configure environmental variables:
    * For development: `cp .env.example .env`
    * For production: see `.env.example` for available parameters
3. For development: `npm start`

### Nginx and Webhooks

1. Configure environmental variables for webhooks: domain and port
2. Configure domain in nginx
3. Obtain a certificate from Let's Encrypt
4. Configure nginx for the bot. 

Example config:

```conf
server {
   if ($host = tg.solomaha.com) {
       return 301 https://$host$request_uri;
   } # managed by Certbot

   listen 80;
   server_name tg.solomaha.com;
   
   return 404; # managed by Certbot
}

server {
   server_name tg.solomaha.com;
   listen 443 ssl; # managed by Certbot

   location / {
       proxy_pass http://127.0.0.1:4000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_cache_bypass $http_upgrade;
   }

   ssl_certificate /etc/letsencrypt/live/tg.solomaha.com/fullchain.pem; # managed by Certbot
   ssl_certificate_key /etc/letsencrypt/live/tg.solomaha.com/privkey.pem; # managed by Certbot
   include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
   ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
```
