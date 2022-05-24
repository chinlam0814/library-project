from urllib.parse import urlparse
from django.urls import path
from . import views

urlpatterns = [
    path('', views.all_borrow_list),
    path('create/', views.create_borrow),
    path('student/<int:studentId>/', views.student_borrow_list),
    path('student/<int:studentId>/borrowed/', views.student_borrow_status_list),
    path('<int:borrowId>/borrow_status/edit/', views.edit_borrow_status),
    path('<int:borrowId>/paid_status/edit/', views.edit_paid_status),
]
