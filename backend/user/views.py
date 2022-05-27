from django.shortcuts import render
from django.contrib.auth import login, logout, authenticate
from django.contrib import auth
from rest_framework import viewsets
from django.contrib.auth.decorators import login_required
from .serializers import AdminSerializer, StudentSerializer
from .models import Admin, Student, User
from django.http import JsonResponse
import json

# Create your views here.
def returnJson(data=None, errorCode=0, cookies=''):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data, 'cookies': cookies})

# get all admin
def admins_list(request):
	if request.method == 'GET':
		admins = Admin.objects.all()
		return returnJson([dict(admin.body()) for admin in admins])

# get all student
def students_list(request):
	if request.method == 'GET':
		students = Student.objects.all()
		return returnJson([dict(student.body()) for student in students])

# get specific admin
def admin(request, pk):
	try:
		admin = Admin.objects.get(id=pk)
	except Admin.DoesNotExist:
		return returnJson([], 404)
	return returnJson([dict(admin.body())])

# get specific student
def student(request, pk):
	try:
		student = Student.objects.get(id=pk)
	except Student.DoesNotExist:
		return returnJson([], 404)
	return returnJson([dict(student.body())])

# login account
def user_login(request):
	data = json.loads(request.body)

	username = data["username"]
	password = data["password"]
	user = authenticate(request, username=username, password=password)

	if user is not None:
		login(request, user)
		try:
			student = Student.objects.get(username = username)
			return returnJson([dict(student.body())], 0, {'user': 'Student', 'user_id': student.id, 'student_idnumber': student.number, 'username' : username, 'borrow_num': student.borrow_num})
		except Student.DoesNotExist:
			try : 
				admin = Admin.objects.get(username = username)
				return returnJson([dict(admin.body())], 0, {'user': 'Admin', 'user_id': admin.id, 'admin_idnumber': admin.number, 'username' : username})
			except Admin.DoesNotExist:
				logout(request)
				return returnJson([],404)
	else:
		return returnJson([], 404, {'username': username, 'password': password})

# logout account
def user_logout(request):
	if request.user.is_authenticated:
		logout(request)
		return returnJson([])
	else:
		return returnJson([],403)

# create a student account
def create_student(request):
	if request.method == 'POST':
		data = json.loads(request.body)

		try:
			user = User.objects.get(username=data["username"])
		except User.DoesNotExist:
			student = Student.objects.create()
			student.username = data["username"]
			student.set_password(data["password"])
			student.number = data["number"]
			student.borrow_num = "0"

			student.save()
			return returnJson([dict(student.body())])

		return returnJson([],400)

def delete_student(request, pk):
	if request.method == 'DELETE':
		try:
			student = Student.objects.get(id = pk)
			student.delete()

			students = Student.objects.all()
			return returnJson([dict(student.body()) for student in students])

		except Student.DoesNotExist:
			return returnJson([], 400)

def delete_admin(request, pk):
	if request.method == 'DELETE':
		try:
			if(request.user.id == pk):
				return returnJson([], 403)
			
			admin = Admin.objects.get(id = pk)
			admin.delete()

			admins = Admin.objects.all()
			return returnJson([dict(admin.body()) for admin in admins])

		except Admin.DoesNotExist:
			return returnJson([], 400)

def create_admin(request):
	if request.method == 'POST':
		data = json.loads(request.body)

		try:
			user = User.objects.get(username=data["username"])
		except User.DoesNotExist:
			admin = Admin.objects.create()
			admin.username = data["username"]
			admin.set_password(data["password"])
			admin.number = data["number"]

			admin.save()
			return returnJson([dict(admin.body())])

		return returnJson([],400)

def edit_student_info(request, pk):
	try:
		student = Student.objects.get(id = pk)
	except Student.DoesNotExist:
		return returnJson([], 0, 0, 404)

	if request.method == 'POST':
		data = json.loads(request.body)
		
		student.number = data["number"]
		student.username = data["username"]

		student.save()

		return returnJson([dict(student.body())])

def edit_admin_info(request, pk):
	try:
		admin = Admin.objects.get(id = pk)
	except Admin.DoesNotExist:
		return returnJson([], 0, 0, 404)

	if request.method == 'POST':
		data = json.loads(request.body)
		
		admin.number = data["number"]
		admin.username = data["username"]

		admin.save()

		return returnJson([dict(admin.body())])

@login_required
def admin_reset_password(request, pk):
	try:
		admin = Admin.objects.get(id=pk)
	except Admin.DoesNotExist:
		return returnJson([], 404)

	if request.method == 'PUT':
		if request.user.id != admin.id:
			return returnJson([], 403)

		data = json.loads(request.body)

		admin.set_password(data["password"])
		admin.save()

		return returnJson([dict(admin.body())])

@login_required
def student_reset_password(request, pk):
	try:
		student = Student.objects.get(id=pk)
	except Student.DoesNotExist:
		return returnJson([], 404)

	if request.method == 'PUT':
		if request.user.id != student.id:
			return returnJson([], 403)

		data = json.loads(request.body)

		student.set_password(data["password"])
		student.save()
		
		return returnJson([dict(student.body())])

def admin_forget_password(request):
	data = json.loads(request.body)
	
	try:
		admin = Admin.objects.get(number=data["number"])
	except Admin.DoesNotExist:
		return returnJson([], 404)

	admin.set_password(data["password"])
	admin.save()
		
	return returnJson([dict(admin.body())])

def student_forget_password(request):
	data = json.loads(request.body)
	
	try:
		student = Student.objects.get(number=data["number"])
	except Student.DoesNotExist:
		return returnJson([], 404)

	student.set_password(data["password"])
	student.save()
		
	return returnJson([dict(student.body())])