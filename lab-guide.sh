#!/bin/bash

# Lab 1: File & Directory Navigation
# Tujuan: Master CLI navigation

echo "=== Lab 1: Navigation ==="
echo "1. Print current directory: pwd"
echo "2. List files: ls -la"
echo "3. Create directory: mkdir labdir"
echo "4. Navigate: cd labdir"
echo "5. Go back: cd .."
echo "6. Home directory: cd ~"

# Lab 2: File Operations
# Tujuan: Manipulate files

echo -e "\n=== Lab 2: File Operations ==="
echo "1. Create file: touch myfile.txt"
echo "2. Write content: echo 'Hello' > myfile.txt"
echo "3. View content: cat myfile.txt"
echo "4. Copy: cp myfile.txt myfile_copy.txt"
echo "5. Move: mv myfile_copy.txt newname.txt"
echo "6. Remove: rm newname.txt"

# Lab 3: User Management
# Tujuan: Manage users & groups

echo -e "\n=== Lab 3: User Management ==="
echo "1. Create user: sudo useradd testuser"
echo "2. Set password: sudo passwd testuser"
echo "3. Check current user: whoami"
echo "4. Switch user: su - testuser"
echo "5. List users: cat /etc/passwd"

# Lab 4: Permissions
# Tujuan: Understand chmod & chown

echo -e "\n=== Lab 4: Permissions ==="
echo "1. View permissions: ls -l file.txt"
echo "2. Change permissions: chmod 644 file.txt"
echo "3. Add execute: chmod +x script.sh"
echo "4. Change owner: sudo chown user:group file.txt"
echo "5. Recursive change: chmod -R 755 directory/"

# Lab 5: Package Management
# Tujuan: Install & manage packages

echo -e "\n=== Lab 5: Package Management ==="
echo "1. Update repo: sudo apt update"
echo "2. Install: sudo apt install curl"
echo "3. Search: apt search package"
echo "4. Remove: sudo apt remove curl"
echo "5. Cleanup: sudo apt autoremove"

# Lab 6: Process Management
# Tujuan: Monitor & control processes

echo -e "\n=== Lab 6: Process Management ==="
echo "1. List processes: ps aux"
echo "2. Monitor: top"
echo "3. Kill process: kill <PID>"
echo "4. Force kill: kill -9 <PID>"
echo "5. Background task: command &"

# Lab 7: Disk Management
# Tujuan: Check disk usage

echo -e "\n=== Lab 7: Disk Management ==="
echo "1. Disk usage: df -h"
echo "2. Directory size: du -sh /path"
echo "3. List devices: lsblk"
echo "4. Partition info: fdisk -l"

# Lab 8: Networking
# Tujuan: Basic networking

echo -e "\n=== Lab 8: Networking ==="
echo "1. IP address: ip addr"
echo "2. Check route: ip route show"
echo "3. Test connection: ping 8.8.8.8"
echo "4. DNS lookup: nslookup google.com"
echo "5. Listen ports: netstat -tuln"

# Lab 9: SSH
# Tujuan: Remote access

echo -e "\n=== Lab 9: SSH ==="
echo "1. Generate key: ssh-keygen -t rsa -b 4096"
echo "2. Copy key: ssh-copy-id user@host"
echo "3. Connect: ssh user@host"
echo "4. Custom port: ssh -p 2222 user@host"

# Lab 10: Systemd
# Tujuan: Service management

echo -e "\n=== Lab 10: Systemd ==="
echo "1. Status: systemctl status nginx"
echo "2. Start: sudo systemctl start nginx"
echo "3. Stop: sudo systemctl stop nginx"
echo "4. Restart: sudo systemctl restart nginx"
echo "5. Enable: sudo systemctl enable nginx"
echo "6. View logs: journalctl -u nginx -f"

# Lab 11: Scripting
# Tujuan: Basic bash scripting

echo -e "\n=== Lab 11: Scripting ==="
echo "1. Create script: nano backup.sh"
echo "2. Make executable: chmod +x backup.sh"
echo "3. Run script: ./backup.sh"
echo "4. Schedule cron: crontab -e"

# Lab 12: Monitoring
# Tujuan: Monitor system resources

echo -e "\n=== Lab 12: Monitoring ==="
echo "1. CPU/Memory: top"
echo "2. Better view: htop"
echo "3. Virtual memory: vmstat 1 5"
echo "4. System activity: sar -u 1 5"

# Lab 13: Backup
# Tujuan: Backup & restore

echo -e "\n=== Lab 13: Backup ==="
echo "1. Compress: tar -czf backup.tar.gz /source/"
echo "2. List archive: tar -tzf backup.tar.gz"
echo "3. Extract: tar -xzf backup.tar.gz -C /dest/"
echo "4. Rsync: rsync -av /source/ /backup/"

# Lab 14: Security
# Tujuan: Firewall & SSH hardening

echo -e "\n=== Lab 14: Security ==="
echo "1. Enable firewall: sudo ufw enable"
echo "2. Allow port: sudo ufw allow 22/tcp"
echo "3. Deny port: sudo ufw deny 80/tcp"
echo "4. Status: sudo ufw status"

# Lab 15: Advanced
# Tujuan: Real-world scenarios

echo -e "\n=== Lab 15: Advanced ==="
echo "1. Deploy web app"
echo "2. Setup SSL certificate"
echo "3. Configure load balancer"
echo "4. Setup monitoring (Prometheus/Grafana)"
echo "5. Disaster recovery drill"

echo -e "\n=== Lab Guide Complete ==="
