FROM fikrimuhal/scala

WORKDIR /tmp

EXPOSE 2552 9000

COPY . /tmp

COPY ./target/universal/backend.zip /tmp/target/universal/backend.zip

#RUN sbt dist

RUN unzip /tmp/target/universal/backend.zip -d /root/

WORKDIR /root

CMD ./backend/bin/backend -Dhttp.port=9000   -Djava.library.path=/root/   -Dconfig.resource=docker.conf