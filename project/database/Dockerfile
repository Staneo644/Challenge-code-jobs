FROM mongo:latest

RUN sed -i 's/127\.0\.0\.1/0.0.0.0/g' ./etc/mongod.conf.orig

EXPOSE 27017

CMD ["mongod", "--config", "./etc/mongod.conf.orig"]