from django.contrib import admin
from .models import BookInfo, BookImage
# Register your models here.

@admin.register(BookInfo)
class AdminAdmin(admin.ModelAdmin):
	list_display = ('id','title', 'stock')

@admin.register(BookImage)
class AdminAdmin(admin.ModelAdmin):
	list_display = ('id','image')