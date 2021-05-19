from django.contrib import auth
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from .models import UserAccounts
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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

class LoginSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access_token'] = str(refresh.access_token)

        data['nip_nrk'] = self.user.nip_nrk
        data['is_staff'] = self.user.is_staff

        return data
