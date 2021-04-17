from django.contrib import auth
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from .models import UserAccounts

class RegisterSerializer(serializers.ModelSerializer):
    password  = serializers.CharField(max_length=16, min_length=8, write_only=True, label="Passwords")
    
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
    password  = serializers.CharField(max_length=16, min_length=8, write_only=True, label="Passwords")
    nama_pegawai = serializers.CharField(max_length=120, read_only=True)
    tokens = serializers.CharField(max_length=64, min_length=6, read_only=True)

    class Meta:
        model = UserAccounts
        fields = ['nip_nrk', 'password', 'nama_pegawai', 'tokens']

    def validate(self, attrs):
        nip_nrk = attrs.get('nip_nrk', '')
        password = attrs.get('password', '')

        user = auth.authenticate(nip_nrk=nip_nrk, password=password)

        if not user:
            raise AuthenticationFailed('User not founds!')

        return {
            'nip_nrk': user.nip_nrk,
            'nama': user.nama_pegawai,
            'tokens': user.tokens
        }