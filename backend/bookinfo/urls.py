from django.urls import path
from . import views

urlpatterns = [
    path('', views.book_list),
    path('<int:pk>/', views.book),
    
    path('search/', views.search_book_by_name),
    path('create/', views.create_book),
    path('<int:pk>/images/create/', views.create_book_image),

    path('<int:pk>/delete/', views.delete_book),

    path('<int:pk>/images/first/', views.first_book_image),
    path('<int:pk>/images/<int:pk_image>/', views.book_image),
]