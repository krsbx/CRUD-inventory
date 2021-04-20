from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('about/', index),
    path('login/', index),
    path('logout/', index),
    path('register/', index),
]
