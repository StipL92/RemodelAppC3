# Generated by Django 3.2.15 on 2022-09-27 02:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Proveedor',
            fields=[
                ('Id_Proveedor', models.AutoField(primary_key=True, serialize=False)),
                ('Proveedor', models.CharField(max_length=50)),
                ('Ciudad', models.CharField(max_length=50)),
                ('Direccion', models.CharField(max_length=50)),
                ('Telefono', models.CharField(max_length=50)),
                ('Whatsapp', models.CharField(max_length=50)),
                ('Correo', models.CharField(max_length=50)),
            ],
        ),
    ]