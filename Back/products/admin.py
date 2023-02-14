from django.contrib import admin

from .models import Categoria
from .models import Producto_Ingresado


admin.site.register(Categoria)
admin.site.register(Producto_Ingresado)

# Register your models here.
