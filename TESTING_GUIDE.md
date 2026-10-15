# Deployment Testing Guide
# Test di localhost sebelum production

## 1. SETUP TESTING ENVIRONMENT

```bash
cd /home/yuds/sysadmin-academy/backend

# Create virtual env
python3 -m venv venv
source venv/bin/activate

# Install deps + test tools
pip install -r requirements.txt
pip install pytest pytest-asyncio pytest-cov
```

## 2. RUN UNIT TESTS

```bash
# All tests
pytest tests/ -v

# With coverage
pytest tests/ --cov=app --cov-report=html

# Specific test file
pytest tests/test_api.py -v

# Specific test class
pytest tests/test_api.py::TestAuth -v

# Specific test
pytest tests/test_api.py::TestAuth::test_login -v
```

## 3. RUN INTEGRATION TESTS

```bash
pytest tests/test_integration.py -v

# Full journey test only
pytest tests/test_integration.py::TestFullUserJourney::test_complete_learning_flow -v
```

## 4. MANUAL TESTING LOCALHOST

```bash
# Terminal 1: Backend
cd backend
python main.py

# Terminal 2: Frontend
cd frontend
npm run dev

# Terminal 3: Lab machine
docker run -d -p 2222:22 sysadmin-academy-lab

# Terminal 4: Tests
cd backend
pytest tests/ -v
```

## 5. API TESTING WITH CURL

```bash
# Health check
curl http://localhost:8000/health

# Register user
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -d "username=test&password=pass123"

# Get courses
curl http://localhost:8000/api/v1/courses
```

## 6. WEBSOCKET TESTING (Terminal)

```bash
# Test WebSocket terminal
wscat -c ws://localhost:8000/api/v1/ws/terminal/1

# Send command
> ls
> pwd
```

## 7. PERFORMANCE TESTING

```bash
pip install locust

# Create locustfile.py dan run
locust -f locustfile.py -u 100 -r 10
```

## 8. TESTING CHECKLIST (LOCALHOST - 1 WEEK)

### Week 1 - Localhost Full Testing

**Day 1: Backend API**
- [ ] Health check
- [ ] User registration
- [ ] User login (JWT)
- [ ] Get courses
- [ ] Get modules
- [ ] Create progress
- [ ] Submit quiz (pass)
- [ ] Submit quiz (fail)

**Day 2: Frontend UI**
- [ ] Dashboard loads
- [ ] Course list displays
- [ ] Course detail loads
- [ ] Module navigation works
- [ ] Progress bar updates

**Day 3: Lab Terminal**
- [ ] SSH connection established
- [ ] Command execution
- [ ] Terminal input/output
- [ ] WebSocket connection
- [ ] Multiple sessions

**Day 4: Quiz System**
- [ ] Quiz questions display
- [ ] Options clickable
- [ ] Score calculation correct
- [ ] Passing score logic
- [ ] Progress update after quiz

**Day 5: Database**
- [ ] Data persistence
- [ ] Relationships work
- [ ] Cascading deletes
- [ ] No SQL errors
- [ ] Backup/restore works

**Day 6: Integration**
- [ ] Full user journey
- [ ] Sign up → login → course → quiz → certificate
- [ ] Multiple concurrent users
- [ ] Error handling
- [ ] Edge cases

**Day 7: Performance & Security**
- [ ] Load test (100 users)
- [ ] Memory usage stable
- [ ] No SQL injection
- [ ] JWT validation
- [ ] CORS working

## 9. LOCALHOST DEPLOYMENT

```bash
cd /home/yuds/sysadmin-academy

# Setup everything
chmod +x setup.sh
./setup.sh

# Or manual
docker-compose up -d

# Check status
docker-compose ps
docker-compose logs -f

# Access
http://localhost:5173     # Frontend
http://localhost:8000/docs  # API
ssh -p 2222 labuser@localhost  # Lab
```

## 10. SEEDS & FIXTURES

```bash
# Seed database
cd backend
python seed_db.py

# Check seeded data
python -c "from app.db.database import SessionLocal; db = SessionLocal(); courses = db.query(Course).all(); print(f'{len(courses)} courses seeded')"
```

## 11. MONITORING DURING TESTING

```bash
# CPU/Memory
docker stats

# Logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f lab

# Database size
ls -lh backend/app/sqlite.db
```

## 12. ISSUE TRACKING

Create `TESTING_ISSUES.md`:
- Date & time
- Issue description
- Reproduction steps
- Expected vs actual
- Error logs
- Fix applied

## After 1 Week Passing - Ready for Production

Once all tests pass for 1 week on localhost:
1. Setup PostgreSQL
2. Configure production env
3. Enable monitoring
4. Setup backups
5. Deploy to staging/production
