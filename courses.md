# Modul 1: Dasar-Dasar Linux

## Pengenalan Linux

Linux adalah sistem operasi open-source yang powerful dan scalable. Sysadmin Linux mengelola server, keamanan, performance, dan automation.

### Topik:
1. Sejarah dan keluarga Linux
2. Distro populer (Ubuntu, CentOS, Debian)
3. Struktur file system
4. Permission dan ownership

---

## Modul 2: Command Line Interface (CLI) Basics

Master terminal adalah kunci menjadi sysadmin handal.

### Perintah Dasar:
- `pwd` - Print working directory
- `ls` - List files
- `cd` - Change directory
- `mkdir` - Make directory
- `touch` - Create file
- `cat` - Display file content
- `cp` - Copy files
- `mv` - Move/rename files
- `rm` - Remove files
- `grep` - Search text

### Shortcuts:
- `Ctrl+A` - Go to start of line
- `Ctrl+E` - Go to end of line
- `Ctrl+R` - Search history
- `Tab` - Auto-complete

---

## Modul 3: User & Group Management

### User Management:
```bash
useradd username
passwd username
userdel username
```

### Group Management:
```bash
groupadd groupname
usermod -aG groupname username
```

### Permissions:
- `r` (read) = 4
- `w` (write) = 2
- `x` (execute) = 1

`chmod 755 file` = rwxr-xr-x

---

## Modul 4: File System & Storage

### Disk Management:
```bash
df -h          # Disk usage
du -sh /path   # Directory size
fdisk -l       # List disk partitions
lsblk          # Block devices
```

### Mount:
```bash
mount /dev/sda1 /mnt/point
umount /mnt/point
```

---

## Modul 5: Package Management

### APT (Ubuntu/Debian):
```bash
apt update
apt install package
apt remove package
apt autoremove
```

### YUM (CentOS/RHEL):
```bash
yum update
yum install package
yum remove package
```

---

## Modul 6: Process Management

### Commands:
```bash
ps aux              # List processes
top                 # Real-time processes
kill <PID>         # Terminate process
nice -n 10 command # Run with priority
```

---

## Modul 7: Networking

### Network Info:
```bash
ip addr            # IP addresses
ip route show      # Routing table
netstat -tuln     # Listen ports
ss -tuln          # Socket statistics
ping <host>       # Test connectivity
nslookup <domain> # DNS lookup
```

### Network Config:
```bash
/etc/netplan/     # Netplan config (Ubuntu 18+)
/etc/network/     # Network interfaces (older)
```

---

## Modul 8: SSH & Remote Access

### SSH Connection:
```bash
ssh user@host
ssh -p 2222 user@host
ssh -i /path/to/key user@host
```

### SSH Keys:
```bash
ssh-keygen -t rsa -b 4096
ssh-copy-id user@host
```

---

## Modul 9: Service & Systemd

### Systemd Commands:
```bash
systemctl status service
systemctl start service
systemctl stop service
systemctl restart service
systemctl enable service
systemctl disable service
```

### View Logs:
```bash
journalctl -u service
journalctl -f               # Follow logs
```

---

## Modul 10: System Monitoring

### Monitor CPU & Memory:
```bash
top
htop
vmstat
```

### Check Disk:
```bash
iostat
dstat
```

### Network Monitoring:
```bash
iftop
nethogs
```

---

## Modul 11: Backup & Recovery

### Backup Commands:
```bash
tar -czf backup.tar.gz /source/
rsync -av /source/ /backup/
```

### Restore:
```bash
tar -xzf backup.tar.gz -C /destination/
```

---

## Modul 12: Security Hardening

### Firewall:
```bash
ufw enable
ufw allow 22/tcp
ufw deny 80/tcp
ufw status
```

### SSH Hardening:
- Disable root login: `PermitRootLogin no`
- Change port: `Port 2222`
- Use key-based auth: `PasswordAuthentication no`

### Update Security:
```bash
apt update && apt upgrade
apt install unattended-upgrades
```

---

## Modul 13: Scripting & Automation

### Bash Scripts:
```bash
#!/bin/bash
echo "Hello World"
```

### Cron Jobs:
```bash
crontab -e
0 2 * * * /path/to/backup.sh   # Daily at 2 AM
*/5 * * * * /path/to/check.sh  # Every 5 minutes
```

---

## Modul 14: Web Server Management

### Apache:
```bash
systemctl start apache2
systemctl enable apache2
a2enmod ssl
a2ensite site.conf
```

### Nginx:
```bash
systemctl start nginx
systemctl enable nginx
nginx -t
systemctl reload nginx
```

---

## Modul 15: Database Administration

### MySQL/MariaDB:
```bash
mysql -u root -p
SHOW DATABASES;
CREATE DATABASE mydb;
```

### PostgreSQL:
```bash
psql -U postgres
\l                          # List databases
CREATE DATABASE mydb;
```

---

## Modul 16: Container & Docker

### Docker Commands:
```bash
docker ps
docker images
docker run -d --name container image
docker exec -it container bash
docker logs container
```

### Docker Compose:
```bash
docker-compose up -d
docker-compose ps
docker-compose logs
```

---

## Modul 17: Log Management

### Log Files:
- `/var/log/syslog` - System log
- `/var/log/auth.log` - Authentication
- `/var/log/apache2/` - Web server

### Log Rotation:
```bash
/etc/logrotate.d/
logrotate /etc/logrotate.conf
```

---

## Modul 18: Troubleshooting

### Check System Health:
```bash
dmesg          # Kernel messages
journalctl -p 3 -x   # Errors with context
```

### Network Issues:
```bash
traceroute host
mtr host
nmap host
```

### Performance:
```bash
sar -u 1 10    # CPU usage
sar -r 1 10    # Memory
```

---

## Modul 19: High Availability & Load Balancing

### Load Balancer:
- HAProxy
- Nginx (reverse proxy)
- Cloud load balancers

### Clustering:
- Pacemaker + Corosync
- Keepalived

---

## Modul 20: Production Environment

### Best Practices:
1. Always backup sebelum changes
2. Test di staging terlebih dahulu
3. Monitor everything
4. Document semua perubahan
5. Use version control (Git)
6. Implement automation
7. Regular security updates
