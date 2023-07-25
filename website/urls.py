from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.home, name="home"),
    path('input-admin/', views.adminInput, name="input-admin"),
    path('view-tables/', views.viewTables, name="view-tables"),
    
    path('login/', views.loginPage, name='login'),
    path('logout/', views.logoutPage, name='logout'),

    path('test/', views.test, name='test'),
]