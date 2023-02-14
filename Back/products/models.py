from django.db import models
from dashboard.models import Proveedor

class Categoria(models.Model):
    Id_Categoria= models.AutoField(primary_key=True)
    Categoria = models.CharField(max_length= 50)
    
    def __str__(self):
        txt = "{0} ({1})"
        return txt.format(self.Id_Categoria,self.Categoria)

class Producto_Ingresado(models.Model):
    Id_ProductoIngresado = models.AutoField(primary_key=True)
    Producto = models.CharField(max_length=50, null = True)
    Id_Categoria = models.ForeignKey(Categoria, null=False, default = 1, blank=False, on_delete=models.CASCADE)
    Id_Proveedor = models.ForeignKey(Proveedor, null=False, blank=False, on_delete=models.CASCADE)
    Valor = models.DecimalField(max_digits=8, decimal_places=0, default=0.0)
    Color = models.CharField(max_length=50)
    Tipo_Material = models.CharField(max_length=50)
    Fecha_Ingreso = models.DateTimeField(auto_now_add=True)
    URL = models.URLField(max_length = 200)
    
    def __str__(self):
        txt = "{0} {1}"
        return txt.format(self.Id_ProductoIngresado,self.Producto)
# Create your models here.
