# Generated by Django 3.2 on 2021-04-16 13:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentications', '0002_auto_20210416_2029'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccounts',
            name='alamat',
            field=models.CharField(max_length=120, verbose_name='Alamat'),
        ),
        migrations.AlterField(
            model_name='useraccounts',
            name='email',
            field=models.EmailField(max_length=255, unique=True, verbose_name='Email'),
        ),
        migrations.AlterField(
            model_name='useraccounts',
            name='is_active',
            field=models.BooleanField(default=True, verbose_name='Is Activated'),
        ),
        migrations.AlterField(
            model_name='useraccounts',
            name='is_staff',
            field=models.BooleanField(default=False, verbose_name='Is Staff'),
        ),
        migrations.AlterField(
            model_name='useraccounts',
            name='is_superuser',
            field=models.BooleanField(default=False, verbose_name='Is Superuser'),
        ),
        migrations.AlterField(
            model_name='useraccounts',
            name='nama',
            field=models.CharField(max_length=120, verbose_name='Nama'),
        ),
        migrations.AlterField(
            model_name='useraccounts',
            name='nip_nrk',
            field=models.CharField(max_length=120, unique=True, verbose_name='NIP/NIK'),
        ),
        migrations.AlterField(
            model_name='useraccounts',
            name='telp',
            field=models.CharField(max_length=120, unique=True, verbose_name='No. Telp'),
        ),
    ]
