FROM nginxinc/nginx-unprivileged:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=101:0 index.html styles.css script.js /usr/share/nginx/html/
EXPOSE 8080
