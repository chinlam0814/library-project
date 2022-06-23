from django.contrib import admin
from .models import Admin, Student
# Register your models here.

@admin.register(Admin)
class AdminAdmin(admin.ModelAdmin):
	list_display = ('id', 'username', 'name')

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
	list_display = ('id', 'username', 'name')