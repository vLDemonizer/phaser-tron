FROM ubuntu:16.04

RUN apt-get update --fix-missing && \
    apt-get install -y \
        git \
        curl \
        python-pip \
        python-psycopg2 \
        supervisor \
        vim

WORKDIR /root/tron_backend/

RUN service supervisor stop

ADD /docker/app/supervisor.conf /etc/supervisor/conf.d/tron.conf

ADD ./requirements.txt /root/requirements.txt

RUN pip install -r /root/requirements.txt

ADD /docker/app/start.sh /root/start.sh

RUN chmod 700 /root/start.sh

EXPOSE 80

CMD ['/root/start.sh']

