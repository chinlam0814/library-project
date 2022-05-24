from django.db import models
from user.models import Student
from bookinfo.models import BookInfo, BookImage
import datetime

# Create your models here.

class Borrow(models.Model):
    BORROWED = '已借书'
    RETURNED = '已还书'
    OVERDUE = '已逾期'
    PAID_OVERDUE = '逾期已付款'

    STATUS = [
        (BORROWED, '已借书'),
        (RETURNED, '已还书'),
        (OVERDUE, '已逾期'),
        (PAID_OVERDUE, '逾期已付款'),
    ]


    bookinfo = models.ForeignKey(BookInfo, on_delete=models.CASCADE, null = True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null = True)
    status = models.CharField(max_length=100, choices = STATUS, default = BORROWED)
    borrow_date = models.DateTimeField(default = datetime.datetime.now(), null = False)
    return_date = models.DateTimeField(default = datetime.datetime.now() + datetime.timedelta(days = 90))
    returned_date = models.DateTimeField(null = True, blank = True)

    def __str__(self):
        return self.student.username + self.bookinfo.title + self.status

    def body(self):
        return{
            'id': self.id,
            'bookinfo': self.bookinfo.body(),
            'student': self.student.body(),
            'status': self.status,
            'borrow_date': self.borrow_date,
            'return_date': self.return_date,
            'returned_date': self.returned_date,
        }