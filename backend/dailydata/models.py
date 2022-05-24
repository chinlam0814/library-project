from django.db import models
from django.core.validators import MinLengthValidator

# Create your models here.

class DataInfo(models.Model):
    date = models.DateField(null=False)
    title = models.CharField(null = False, max_length = 100)
    return_dailynum = models.IntegerField(null=False)
    borrow_dailynum = models.IntegerField(null=False)
    refund_amount = models.IntegerField(null=False)

    def __str__(self):
        return self.title

    def body(self):
        return{
            'id' : self.id,
            'date' : self.date,
            'title' : self.title,
            'return_dailynum' : self.return_dailynum,
            'borrow_dailynum' : self.borrow_dailynum,
            'refund_amount' : self.refund_amount,
        }

    class Meta:
        verbose_name = "DailyData"