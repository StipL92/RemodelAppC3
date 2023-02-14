from django.db import models


class Proveedor(models.Model):
    Id_Proveedor = models.AutoField(primary_key=True)
    Proveedor = models.CharField(max_length=50)
    Ciudad = models.CharField(max_length=50)
    Direccion = models.CharField(max_length=50)
    Telefono = models.CharField(max_length=50)
    Whatsapp = models.CharField(max_length=50)
    Correo = models.CharField(max_length=50)
    
    def __str__(self):
        txt = "{0} {1} ({2})"
        return txt.format(self.Id_Proveedor,self.Proveedor,self.Ciudad)

# Create your models here.
