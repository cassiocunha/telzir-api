FROM mongo

COPY mongo-init.js /docker-entrypoint-initdb.d
RUN chmod 777 /docker-entrypoint-initdb.d/mongo-init.js