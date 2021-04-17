from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import PegawaiSerializer, BarangSerializer, PeminjamanSerializer, DetailSerializer, GedungSerializer, RuangSerializer
from .models import Pegawai, TabelPeminjaman, TabelBarang, TabelGedung, TabelRuang, PeminjamanDetail

# Create your views here.
class PegawaiView(generics.CreateAPIView):
    queryset = Pegawai.objects.all()
    serializer_class = PegawaiSerializer

class PeminjamanView(generics.CreateAPIView):
    queryset = TabelPeminjaman.objects.all()
    serializer_class = PeminjamanSerializer

class BarangView(generics.CreateAPIView):
    queryset = TabelBarang.objects.all()
    serializer_class = BarangSerializer

class GedungView(generics.CreateAPIView):
    queryset = TabelGedung.objects.all()
    serializer_class = GedungSerializer

class RuangView(generics.CreateAPIView):
    queryset = TabelRuang.objects.all()
    serializer_class = RuangSerializer

class DetailView(generics.CreateAPIView):
    queryset = PeminjamanDetail.objects.all()
    serializer_class = DetailSerializer