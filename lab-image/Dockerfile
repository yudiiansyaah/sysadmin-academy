FROM ubuntu:22.04

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

RUN useradd -m -s /bin/bash labuser && \
    echo "labuser:labuser123" | chpasswd && \
    usermod -aG sudo labuser

RUN echo "PermitRootLogin no" >> /etc/ssh/sshd_config && \
    echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config

EXPOSE 22

CMD ["/usr/sbin/sshd", "-D"]
