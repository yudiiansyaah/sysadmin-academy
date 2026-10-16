"""
Locust performance testing script
"""
from locust import HttpUser, task, between
import random


class SysadminAcademyUser(HttpUser):
    wait_time = between(1, 3)
    
    @task(3)
    def get_courses(self):
        self.client.get("/api/v1/courses")
    
    @task(2)
    def get_course_detail(self):
        course_id = random.randint(1, 20)
        self.client.get(f"/api/v1/courses/{course_id}")
    
    @task(1)
    def get_quizzes(self):
        course_id = random.randint(1, 20)
        self.client.get(f"/api/v1/courses/{course_id}/quizzes")
    
    @task(2)
    def health_check(self):
        self.client.get("/health")
    
    def on_start(self):
        # Login on start
        self.client.post("/api/v1/auth/login", 
            data={"username": "student1", "password": "student123"})


# Run with: locust -f locustfile.py -u 100 -r 10 --run-time 1h
