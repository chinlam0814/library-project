from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from .models import DataInfo
from user.models import Student, Admin
import json

# Create your views here.

def returnJson(data=None, pageCount=0, errorCode=0):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data, 'pageCount' : int(pageCount)})


def data_list(request):
	datas = DataInfo.objects.all()
	return returnJson([dict(data.body()) for data in datas])
