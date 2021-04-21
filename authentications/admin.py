from django.contrib import admin
from .models import UserAccounts

#Register foreach models to admin page
#   List Display contains all the required fields in models/tables

class userAdmin(admin.ModelAdmin):
    list_display = ('nip_nrk', 'email', 'password', 'nama_pegawai', 'alamat', 'telp', 'is_active', 'is_staff', 'is_superuser')

#Register all the models admin to admin page
#   This block of codes used for registering the all class created above
#   This block of codes registering all class above with the same model type

admin.site.register(UserAccounts, userAdmin)