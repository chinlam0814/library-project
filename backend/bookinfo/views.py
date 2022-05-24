from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from .models import BookInfo, BookImage
from user.models import Student, Admin
import json

# Create your views here.

def returnJson(data=None, pageCount=0, errorCode=0):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data, 'pageCount' : int(pageCount)})


def book_list(request):
	books = BookInfo.objects.all()
	return returnJson([dict(book.body()) for book in books])

def book_image(request, pk, pk_image):
	try:
		image = BookImage.objects.get(id=pk_image)
	except BookImage.DoesNotExist:
		return returnJson([],0, 404)

	return returnJson([dict(image.body())])

def book(request, pk):
	try:
		book = BookInfo.objects.get(id=pk)
	except BookInfo.DoesNotExist:
		return returnJson([],0, 404)

	return returnJson([dict(book.body())])

def first_book_image(request, pk):
	try:
		book = BookInfo.objects.get(id = pk)
	except BookInfo.DoesNotExist:
		return returnJson([],0, 404)

	image = BookImage.objects.filter(book=book).first()
	if image is None :
		return returnJson()

	return returnJson([dict(image.body())])

def search_book_by_name(request):
	data = json.loads(request.body)
	#books = BookInfo.objects.filter(title_contains = data["searchword"])
	books += BookInfo.objects.filter(title__contains = data["searchword"])
	books = set([book.id for book in books])
	results = BookInfo.objects.filter(id__in=books)
	return returnJson([dict(book.body()) for book in results])
	#return returnJson([dict(book.body()) for book in books])


@login_required
def create_book(request):
	if request.method == 'POST':
		data = json.loads(request.body)

		#print(data)
		try:
			books = BookInfo.objects.get(title=data["title"])
		except BookInfo.DoesNotExist:
			book = BookInfo.objects.create()

			book.title = data["title"]
			book.author = data["author"]
			book.isbn = data["isbn"]
			book.publisher = data["publisher"]
			book.pubdate = data["pubdate"]
			book.type = data["type"]
			book.synopsis = data["synopsis"]
			book.stock = data["stock"]

			book.save()
		
			return returnJson([dict(book.body())])

		return returnJson([],400)

@login_required
def create_book_image(request, pk):
	try:
		admin = Admin.objects.get(id=request.user.id)
	except Admin.DoesNotExist:
		return returnJson([],0,403)

	try:
		book = BookInfo.objects.get(id = pk)
	except BookInfo.DoesNotExist:
		return returnJson([],0, 404)

	image = BookImage.objects.create(book=book,image=request.FILES.get("images"))

	return returnJson([dict(image.body())])

@login_required
def delete_book(request, pk):
	book = BookInfo.objects.get(id=pk)

	if request.method == 'DELETE':
		book.delete()
		books=BookInfo.objects.all()
		return returnJson([dict(book.body()) for book in books])


		
		