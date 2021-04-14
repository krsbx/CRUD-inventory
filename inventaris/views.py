from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def Home(request):
    return render(request, 'inventaris/home.html', { 'title': 'Home'})

def Login(request):
    return render(request, 'inventaris/login.html', { 'title': 'Login' })

def About(request):
    return render(request, 'inventaris/about.html', { 'title': 'About' })