from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.user_login),
    path('logout/', views.user_logout),

    path('admins/', views.admins_list),
    path('students/', views.students_list),

    path('admins/<int:pk>/', views.admin),
    path('students/<int:pk>/', views.student),

    path('students/create/', views.create_student),
    path('students/<int:pk>/delete/', views.delete_student),
    path('admins/create/', views.create_admin),
    path('admins/<int:pk>/delete/', views.delete_admin),

    path('students/<int:pk>/edit/', views.edit_student_info),
    path('admins/<int:pk>/edit/', views.edit_admin_info),
    path('students/<int:pk>/resetpassword/', views.student_reset_password),
    path('admins/<int:pk>/resetpassword/', views.admin_reset_password),
]