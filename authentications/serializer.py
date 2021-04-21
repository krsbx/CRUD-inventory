from django.contrib import auth
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from .models import UserAccounts
from rest_framework_simplejwt.tokens import RefreshToken

#Sertializer modules
#   Used for creating API view

#Each class represent API View
#   Foreach serializer store each model/table
#   Foreach serializer store all required fields for the corresponding API View
#       Each fields contains the all the fields inside the corresponding models

class RegisterSerializer(serializers.ModelSerializer):
    password  = serializers.CharField(max_length=32, min_length=8, write_only=True, label="Passwords")
    
    class Meta:
        model = UserAccounts
        fields = ['nip_nrk', 'email', 'password' , 'nama_pegawai', 'alamat', 'telp']

    def validate(self, attrs):
        nip_nrk = attrs.get('nip_nrk', '')

        if not nip_nrk.isalnum():
            raise serializers.ValidationError('nip/nrk have to be alpha numeric')
        
        return attrs

    def create(self, validated_data):
        return UserAccounts.objects.create_user(**validated_data)

class LoginSerializer(serializers.ModelSerializer):
    nip_nrk = serializers.CharField(max_length=120, write_only=True, label="NIP/NIK")
    password  = serializers.CharField(max_length=32, min_length=8, write_only=True, label="Passwords")
    tokens = serializers.CharField(max_length=64, min_length=6, read_only=True)
    access_token = serializers.CharField(max_length=64, min_length=6, read_only=True)
    refresh = serializers.CharField(max_length=64, min_length=6, read_only=True)

    class Meta:
        model = UserAccounts
        fields = ['nip_nrk', 'password', 'tokens', 'access_token', 'refresh']

    def validate(self, attrs):
        nip_nrk = attrs.get('nip_nrk', '')
        password = attrs.get('password', '')

        user = auth.authenticate(nip_nrk=nip_nrk, password=password)

        if not user:
            raise AuthenticationFailed('User not founds!')
        
        refresh = RefreshToken.for_user(user)

        return {
            'access_token': str(refresh.access_token),
            'refresh': str(refresh),
        }