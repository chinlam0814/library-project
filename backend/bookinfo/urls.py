from django.urls import path
from . import views

urlpatterns = [
    path('', views.book_list),
    path('<int:pk>/', views.book),
    
    path('search/title/', views.search_book_by_name),
    path('search/author/', views.search_book_by_author),
    path('create/', views.create_book),
    path('<int:pk>/edit/', views.edit_book),
    path('<int:pk>/images/create/', views.create_book_image),
    path('<int:pk>/images/edit/', views.edit_book_image),

    path('<int:pk>/delete/', views.delete_book),

    path('<int:pk>/images/', views.book_image),
    path('<int:pk>/images/<int:pk_image>/', views.book_image),
]