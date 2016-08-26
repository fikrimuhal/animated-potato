
FROM java:7

# set-up h2
RUN curl http://www.h2database.com/h2-2016-01-21.zip -o h2.zip; unzip h2.zip -d /opt/; rm h2.zip; mkdir -p /opt/h2-data

RUN apt-get update; apt-get install -y supervisor; apt-get clean

ADD h2-server.sh /opt/h2/bin/
ADD supervisor.conf /etc/supervisor/conf.d/h2.conf

EXPOSE 1521 81

CMD ["/usr/bin/supervisord", "-n"]