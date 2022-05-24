from django.contrib import admin
from .models import DataInfo
# Register your models here.

@admin.register(DataInfo)
class DataInfoAdmin(admin.ModelAdmin):
	list_display = ('id','title', 'date', 'borrow_dailynum', 'return_dailynum', 'refund_amount')