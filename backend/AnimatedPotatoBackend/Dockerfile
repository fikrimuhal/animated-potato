#FROM java:8
#COPY ./bogazici-*-SNAPSHOT /app
#WORKDIR /app
#EXPOSE 2552
#EXPOSE 2553
#EXPOSE 8080
#EXPOSE 9000
#CMD ["./bin/bogazici"]

FROM fikrimuhal/scala

WORKDIR /tmp

EXPOSE 2552 9000

COPY . /tmp

COPY ./target/universal/bogazici.zip /tmp/target/universal/bogazici.zip

#RUN sbt dist

RUN unzip /tmp/target/universal/bogazici.zip -d /root/

WORKDIR /root

COPY ./libsigar-amd64-linux.so /root/

CMD ./bogazici/bin/bogazici -Dhttp.port=10000   -Djava.library.path=/root/   -Dconfig.resource=docker.conf
