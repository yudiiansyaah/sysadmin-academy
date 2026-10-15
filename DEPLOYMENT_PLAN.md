# Deployment Plan - Sysadmin Academy

## Phase 1: Localhost Testing (Week 1)

### Environment Setup
```bash
cd /home/yuds/sysadmin-academy
docker-compose up -d
```

### Services Running
- Backend: http://localhost:8000
- Frontend: http://localhost:5173
- Lab: ssh -p 2222 labuser@localhost
- API Docs: http://localhost:8000/docs

### Testing Checklist
- [ ] Health check passes
- [ ] User registration/login works
- [ ] Course listing displays
- [ ] Quiz submission works
- [ ] Terminal connection active
- [ ] Database seeding successful
- [ ] All API endpoints respond
- [ ] Frontend loads without errors
- [ ] 100 concurrent users stable
- [ ] No memory leaks

### Daily Tests
```bash
# Day 1-7
cd backend
pytest tests/ -v --cov=app
pytest tests/test_integration.py -v
locust -f locustfile.py -u 50 -r 5 -t 30m
```

### Issues Tracking
Document all bugs/issues in `TESTING_ISSUES.md`
Fix and retest each day

---

## Phase 2: Staging Environment (Week 2)

### Setup PostgreSQL
```bash
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=sysadmin_academy \
  -p 5432:5432 \
  postgres:15
```

### Setup Redis
```bash
docker run -d \
  --name redis \
  -p 6379:6379 \
  redis:7
```

### Update .env
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sysadmin_academy
REDIS_URL=redis://localhost:6379
DEBUG=False
SECRET_KEY=<generate-random-32-chars>
```

### Deploy Backend
```bash
cd backend
pip install -r requirements.txt
python seed_db.py
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Deploy Frontend
```bash
cd frontend
npm install
npm run build
npm run preview
```

### Staging Tests
- [ ] PostgreSQL connection stable
- [ ] Redis caching works
- [ ] All tests pass
- [ ] Load test 200 users
- [ ] SSL certificate setup
- [ ] Email notifications work

---

## Phase 3: Production

### Pre-Production Checklist
- [ ] Database backups automated
- [ ] SSL/TLS enabled
- [ ] Monitoring setup (Prometheus/Grafana)
- [ ] Logging centralized (ELK Stack)
- [ ] Reverse proxy (Nginx)
- [ ] CI/CD pipeline configured
- [ ] Disaster recovery plan
- [ ] Security audit completed

### Production Deployment
```bash
# Use cloud provider (AWS/GCP/Digital Ocean/Linode)
# Or self-hosted with systemd

# Docker containers in Kubernetes
kubectl apply -f k8s/
```

### Monitoring
- [ ] Uptime monitoring
- [ ] Performance metrics
- [ ] Error tracking (Sentry)
- [ ] User analytics
- [ ] Database performance

### Post-Deployment
- [ ] Smoke tests pass
- [ ] All features working
- [ ] Performance acceptable
- [ ] Logs clean
- [ ] Backups confirmed

---

## Rollback Plan

If critical issue found:
```bash
# Rollback to previous version
git revert <commit-hash>
docker-compose pull
docker-compose up -d
```

---

## Timeline

- Week 1: Localhost testing (current)
- Week 2: Staging environment
- Week 3: Production deployment
- Week 4+: Monitoring & optimization

---

## Contact
Report issues to: development@sysadmin-academy.local
