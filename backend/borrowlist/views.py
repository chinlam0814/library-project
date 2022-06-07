from django.shortcuts import render
from bookinfo.models import BookInfo
from .models import Borrow
from user.models import Student
from django.http import JsonResponse
from django.db.models import Q
import json
from datetime import datetime, timedelta
from django.utils import timezone

# Create your views here.
def returnJson(data=None, pageCount=0, orderCount=0, errorCode=0):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data, 'pageCount': int(pageCount), 'orderCount': int(orderCount)})

def all_borrow_list(request):
    lists = Borrow.objects.all()
    return returnJson([dict(list.body()) for list in lists])

def student_borrow_list(request, studentId):
	try:
		student = Student.objects.get(id=studentId)
	except Student.DoesNotExist:
		return returnJson([],0,0,404)

	lists = Borrow.objects.filter(student = student).order_by('-id')
	return returnJson([dict(list.body()) for list in lists])

def student_borrow_list_by_search(request, number):
	try:
		student = Student.objects.get(number=number)
	except Student.DoesNotExist:
		return returnJson([],0,0,404)

	lists = Borrow.objects.filter(student = student).order_by('-id')
	return returnJson([dict(list.body()) for list in lists])

def student_latest_borrow_list(request, studentId):
	start_date = datetime.now()
	end_date = datetime.now() + timedelta(days = 10)

	try:
		student = Student.objects.get(id=studentId)
	except Student.DoesNotExist:
		return returnJson([],0,0,404)

	lists = Borrow.objects.filter(student = student).filter(Q(return_date__range = (start_date, end_date)) | Q(return_date__lt = start_date)).filter(status = '已借书')
	return returnJson([dict(list.body()) for list in lists])

def student_borrow_status_list(request, studentId):
	try:
		student = Student.objects.get(id=studentId)
	except Student.DoesNotExist:
		return returnJson([],0,0,404)

	lists = Borrow.objects.filter(student = student).filter(status = '已借书')
	
	return returnJson([dict(list.body()) for list in lists])

def student_overdue_status_list(request, studentId):
	try:
		student = Student.objects.get(id=studentId)
	except Student.DoesNotExist:
		return returnJson([],0,0,404)

	lists = Borrow.objects.filter(student = student).filter(status = '已逾期')
	
	return returnJson([dict(list.body()) for list in lists])

def student_late_status_list(request, studentId):
	start_date = datetime.now()

	try:
		student = Student.objects.get(id=studentId)
	except Student.DoesNotExist:
		return returnJson([],0,0,404)

	lists = Borrow.objects.filter(student = student).filter(return_date__lt = start_date).filter(status = '已借书')
	
	return returnJson([dict(list.body()) for list in lists])

def create_borrow(request):
	try:
		student = Student.objects.get(id = request.user.id)
	except Student.DoesNotExist:
		return returnJson([], 0, 0, 403)

	data = json.loads(request.body)

	try:
		book = BookInfo.objects.get(id = data["bookId"])
	except BookInfo.DoesNotExist:
		return returnJson([], 0, 0, 400)

	book.stock -= 1
	borrow = Borrow.objects.create()
	borrow.student = student
	borrow.bookinfo = book
	borrow.status = '已借书'
	borrow.borrow_date = datetime.now()
	#borrow.return_date = datetime.now() + timedelta(days = 90)
	book.save()
	borrow.save()

	return returnJson([dict(borrow.body())])

def edit_borrow_status(request, borrowId):
	try:
		borrow = Borrow.objects.get(id = borrowId)
	except Borrow.DoesNotExist:
		return returnJson([], 0, 0, 404)

	data = json.loads(request.body)

	try:
		book = BookInfo.objects.get(id = data["bookId"])
	except BookInfo.DoesNotExist:
		return returnJson([], 0, 0, 400)

	if request.method == 'PUT':
		book.stock += 1
		borrow.status = data["status"]
		borrow.returned_date = datetime.now()

		book.save()
		borrow.save()

		return returnJson([dict(borrow.body())])

def edit_paid_status(request, borrowId):
	try:
		borrow = Borrow.objects.get(id = borrowId)
	except Borrow.DoesNotExist:
		return returnJson([], 0, 0, 404)

	if request.method == 'PUT':
		data = json.loads(request.body)
		
		borrow.status = data["status"]

		borrow.save()

		return returnJson([dict(borrow.body())])

