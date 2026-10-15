import json
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db.database import Base
from app.models.models import Course, Module, User
from app.core.config import settings
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Create DB
engine = create_engine(settings.DATABASE_URL)
Base.metadata.create_all(bind=engine)
SessionLocal = sessionmaker(bind=engine)
db = SessionLocal()

# Clear existing data
db.query(Module).delete()
db.query(Course).delete()
db.query(User).delete()
db.commit()

# Courses data
courses_data = [
    {
        "title": "Pengenalan Linux",
        "description": "Dasar-dasar Linux, sejarah, dan distro populer",
        "level": "beginner",
        "order": 1,
        "modules": [
            {"title": "Sejarah Linux", "content": "Linux adalah sistem operasi open-source yang powerful. Dikembangkan oleh Linus Torvalds pada 1991.", "order": 1},
            {"title": "Distro Populer", "content": "Ubuntu, CentOS, Debian adalah distro paling populer.", "order": 2},
            {"title": "Struktur File System", "content": "/ = root, /home = user files, /etc = config, /var = logs", "order": 3},
        ]
    },
    {
        "title": "CLI Basics",
        "description": "Master terminal CLI untuk sysadmin produktif",
        "level": "beginner",
        "order": 2,
        "modules": [
            {"title": "Command Dasar", "content": "pwd, ls, cd, mkdir, touch, cat, cp, mv, rm", "order": 1},
            {"title": "File Navigation", "content": "Navigasi file system menggunakan command line", "order": 2},
            {"title": "Text Editing", "content": "nano, vi/vim editor untuk edit file", "order": 3},
        ]
    },
    {
        "title": "User & Group Management",
        "description": "Manage users, groups, dan permissions",
        "level": "beginner",
        "order": 3,
        "modules": [
            {"title": "User Management", "content": "useradd, passwd, userdel commands", "order": 1},
            {"title": "Group Management", "content": "groupadd, usermod untuk manage groups", "order": 2},
            {"title": "Permissions", "content": "chmod, chown untuk set permissions", "order": 3},
        ]
    },
    {
        "title": "File System & Storage",
        "description": "Manage disk, partitions, dan mount points",
        "level": "intermediate",
        "order": 4,
        "modules": [
            {"title": "Disk Management", "content": "df, du, fdisk, lsblk commands", "order": 1},
            {"title": "Partitioning", "content": "Membuat dan manage partisi disk", "order": 2},
            {"title": "Mount Points", "content": "mount, umount untuk manage mount points", "order": 3},
        ]
    },
    {
        "title": "Package Management",
        "description": "Install dan manage packages APT/YUM",
        "level": "beginner",
        "order": 5,
        "modules": [
            {"title": "APT Basics", "content": "apt update, apt install, apt remove", "order": 1},
            {"title": "YUM Basics", "content": "yum install, yum remove, yum update", "order": 2},
            {"title": "Dependency Management", "content": "Resolve dependencies otomatis", "order": 3},
        ]
    },
    {
        "title": "Process Management",
        "description": "Monitor dan control system processes",
        "level": "intermediate",
        "order": 6,
        "modules": [
            {"title": "Process Listing", "content": "ps, ps aux, top untuk list processes", "order": 1},
            {"title": "Process Control", "content": "kill, killall, nice untuk control", "order": 2},
            {"title": "Background Tasks", "content": "fg, bg, jobs untuk manage background tasks", "order": 3},
        ]
    },
    {
        "title": "Networking Basics",
        "description": "Network configuration dan troubleshooting",
        "level": "intermediate",
        "order": 7,
        "modules": [
            {"title": "IP Configuration", "content": "ip addr, ip route, ifconfig commands", "order": 1},
            {"title": "DNS & Resolution", "content": "nslookup, dig, /etc/resolv.conf", "order": 2},
            {"title": "Network Testing", "content": "ping, traceroute, netstat commands", "order": 3},
        ]
    },
    {
        "title": "SSH & Remote Access",
        "description": "Secure shell setup dan key-based authentication",
        "level": "intermediate",
        "order": 8,
        "modules": [
            {"title": "SSH Basics", "content": "ssh command, port configuration", "order": 1},
            {"title": "SSH Keys", "content": "ssh-keygen, ssh-copy-id, key management", "order": 2},
            {"title": "SSH Config", "content": "~/.ssh/config untuk manage connections", "order": 3},
        ]
    },
    {
        "title": "Systemd & Services",
        "description": "Manage services dengan systemd",
        "level": "intermediate",
        "order": 9,
        "modules": [
            {"title": "Systemd Basics", "content": "systemctl start, stop, restart, enable", "order": 1},
            {"title": "Service Management", "content": "Create custom systemd services", "order": 2},
            {"title": "Logs & Journaling", "content": "journalctl untuk view service logs", "order": 3},
        ]
    },
    {
        "title": "System Monitoring",
        "description": "Monitor CPU, memory, disk, dan network",
        "level": "intermediate",
        "order": 10,
        "modules": [
            {"title": "CPU & Memory", "content": "top, htop, vmstat monitoring tools", "order": 1},
            {"title": "Disk I/O", "content": "iostat, dstat untuk disk monitoring", "order": 2},
            {"title": "Network Monitoring", "content": "iftop, nethogs untuk network monitoring", "order": 3},
        ]
    },
    {
        "title": "Backup & Recovery",
        "description": "Backup strategies dan disaster recovery",
        "level": "advanced",
        "order": 11,
        "modules": [
            {"title": "Tar Archiving", "content": "tar, gzip, bzip2 untuk compress files", "order": 1},
            {"title": "Rsync Backup", "content": "rsync untuk efficient backup", "order": 2},
            {"title": "Recovery Procedures", "content": "Restore dari backup dengan aman", "order": 3},
        ]
    },
    {
        "title": "Security Hardening",
        "description": "Secure server against common attacks",
        "level": "advanced",
        "order": 12,
        "modules": [
            {"title": "Firewall Setup", "content": "ufw, iptables untuk firewall management", "order": 1},
            {"title": "SSH Hardening", "content": "Disable root, key-only auth, port change", "order": 2},
            {"title": "Fail2ban & IDS", "content": "Setup intrusion detection", "order": 3},
        ]
    },
    {
        "title": "Shell Scripting",
        "description": "Bash scripting dan automation",
        "level": "advanced",
        "order": 13,
        "modules": [
            {"title": "Bash Basics", "content": "Variables, loops, conditionals", "order": 1},
            {"title": "Functions & Libraries", "content": "Write reusable functions", "order": 2},
            {"title": "Error Handling", "content": "Proper error handling in scripts", "order": 3},
        ]
    },
    {
        "title": "Cron & Scheduling",
        "description": "Schedule tasks dengan cron",
        "level": "advanced",
        "order": 14,
        "modules": [
            {"title": "Cron Basics", "content": "crontab syntax dan timing", "order": 1},
            {"title": "Scheduling Tasks", "content": "Schedule backup, cleanup jobs", "order": 2},
            {"title": "Log Rotation", "content": "logrotate untuk manage logs", "order": 3},
        ]
    },
    {
        "title": "Web Server Management",
        "description": "Apache dan Nginx setup & configuration",
        "level": "advanced",
        "order": 15,
        "modules": [
            {"title": "Apache2 Setup", "content": "Install, enable modules, vhosts", "order": 1},
            {"title": "Nginx Setup", "content": "Nginx config, reverse proxy, SSL", "order": 2},
            {"title": "SSL Certificates", "content": "Let's Encrypt, self-signed certs", "order": 3},
        ]
    },
    {
        "title": "Database Administration",
        "description": "MySQL/PostgreSQL setup dan maintenance",
        "level": "advanced",
        "order": 16,
        "modules": [
            {"title": "MySQL Basics", "content": "Installation, user management, backups", "order": 1},
            {"title": "PostgreSQL", "content": "PostgreSQL setup dan administration", "order": 2},
            {"title": "Database Replication", "content": "Master-slave replication setup", "order": 3},
        ]
    },
    {
        "title": "Container & Docker",
        "description": "Docker containers untuk deployment",
        "level": "advanced",
        "order": 17,
        "modules": [
            {"title": "Docker Basics", "content": "Images, containers, running services", "order": 1},
            {"title": "Docker Compose", "content": "Multi-container orchestration", "order": 2},
            {"title": "Container Networking", "content": "Network configuration untuk containers", "order": 3},
        ]
    },
    {
        "title": "Log Management",
        "description": "Centralized logging dan log analysis",
        "level": "advanced",
        "order": 18,
        "modules": [
            {"title": "System Logs", "content": "syslog, rsyslog, journal", "order": 1},
            {"title": "Log Rotation", "content": "logrotate configuration", "order": 2},
            {"title": "ELK Stack", "content": "Elasticsearch, Logstash, Kibana", "order": 3},
        ]
    },
    {
        "title": "Troubleshooting",
        "description": "Debug system issues dan performance problems",
        "level": "advanced",
        "order": 19,
        "modules": [
            {"title": "System Diagnostics", "content": "dmesg, journalctl, strace", "order": 1},
            {"title": "Performance Debugging", "content": "Identify bottlenecks dan slow processes", "order": 2},
            {"title": "Network Issues", "content": "Troubleshoot connectivity problems", "order": 3},
        ]
    },
    {
        "title": "Production Environment",
        "description": "Real-world sysadmin practices dan best practices",
        "level": "advanced",
        "order": 20,
        "modules": [
            {"title": "High Availability", "content": "Load balancing, failover, clustering", "order": 1},
            {"title": "Monitoring & Alerting", "content": "Prometheus, Grafana setup", "order": 2},
            {"title": "Disaster Recovery", "content": "DR planning dan testing", "order": 3},
        ]
    },
]

# Seed courses & modules
for course_data in courses_data:
    course = Course(
        title=course_data["title"],
        description=course_data["description"],
        level=course_data["level"],
        order=course_data["order"]
    )
    db.add(course)
    db.flush()
    
    for module_data in course_data["modules"]:
        module = Module(
            course_id=course.id,
            title=module_data["title"],
            content=module_data["content"],
            order=module_data["order"]
        )
        db.add(module)
    db.commit()

# Seed demo users
demo_users = [
    {"username": "admin", "email": "admin@sysadmin-academy.local", "password": "admin123"},
    {"username": "student1", "email": "student1@sysadmin-academy.local", "password": "student123"},
    {"username": "student2", "email": "student2@sysadmin-academy.local", "password": "student123"},
]

for user_data in demo_users:
    user = User(
        username=user_data["username"],
        email=user_data["email"],
        hashed_password=pwd_context.hash(user_data["password"]),
        is_active=True
    )
    db.add(user)

db.commit()
db.close()

print("✅ Database seeded successfully!")
print(f"   - {len(courses_data)} courses")
print(f"   - {len(demo_users)} users")
print(f"   - 60 modules")
