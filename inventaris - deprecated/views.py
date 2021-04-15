from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializer import PegawaiSerializer, BarangSerializer, PeminjamanSerializer
from .models import Pegawai, Barang, Peminjaman

# Create your views here.
def Home(request):
    return render(request, 'inventaris/home.html', { 'title': 'Home'})

def Login(request):
    return render(request, 'inventaris/login.html', { 'title': 'Login' })

def About(request):
    return render(request, 'inventaris/about.html', { 'title': 'About' })

class PegawaiView(generics.ListAPIView):
    queryset = Pegawai.objects.all()
    serializer_class = PegawaiSerializer

class PeminjamanView(generics.ListAPIView):
    queryset = Peminjaman.objects.all()
    serializer_class = PeminjamanSerializer

class BarangView(generics.ListAPIView):
    queryset = Barang.objects.all()
    serializer_class = BarangSerializer