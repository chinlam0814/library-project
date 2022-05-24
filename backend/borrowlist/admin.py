from django.contrib import admin
from .models import Borrow
# Register your models here.

@admin.register(Borrow)
class BorrowAdmin(admin.ModelAdmin):
	list_display = ('id','student', 'bookinfo', 'status', 'borrow_date', 'return_date', 'returned_date')
