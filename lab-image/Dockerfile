FROM ubuntu:22.04

ARG LAB_USER=labuser
ARG LAB_PASSWORD

RUN apt-get update && apt-get install -y \
    openssh-server \
    sudo \
    curl \
    wget \
    git \
    vim \
    nano \
    net-tools \
    htop \
    systemctl \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir /run/sshd

RUN useradd -m -s /bin/bash ${LAB_USER} && \
    echo "${LAB_USER}:${LAB_PASSWORD}" | chpasswd && \
    usermod -aG sudo ${LAB_USER}

RUN echo "PermitRootLogin no" >> /etc/ssh/sshd_config && \
    echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config

EXPOSE 22

CMD ["/usr/sbin/sshd", "-D"]
