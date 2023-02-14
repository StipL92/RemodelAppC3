import json
from django.http import JsonResponse
from django.views import View
from .models import *
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

class ProductView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    #Para enviar al cliente
    def get(self,request,id=0):
        if (id>0):
            products = list(Producto_Ingresado.objects.filter(Id_ProductoIngresado=id).values())
            if( len(products) > 0 ):
                product=products[0]
                datos = {'message':"Success",'products':product}
            else:
                datos = {'message':"Product not found..."}    
        else:
            products = list(Producto_Ingresado.objects.values())
            if len(products)>0:
                datos = {'message':"Success",'products':products}
            else:
                datos = {'message':"Products not found..."}
        
        response = JsonResponse(datos)
               
        response["Access-Control-Allow-Origin"] = "*"
        
        return response
    
    # Para recibir datos desde el cliente y crear un nuevo registro
    def post(self,request):
        #print(request.body)
        jd = json.loads(request.body)

        Producto_Ingresado.objects.create(
            Producto        = jd[0]['Producto'],
            Id_Categoria_id = jd[0]['Id_Categoria_id'],
            Id_Proveedor_id = jd[0]['Id_Proveedor_id'],
            Valor           = jd[0]['Valor'],
            Color           = jd[0]['Color'],
            Tipo_Material   = jd[0]['Tipo_Material'],
            URL             = jd[0]['URL']
        )
        
        datos = {'message':"Success"}
        
        response = JsonResponse(datos)
               
        response["Access-Control-Allow-Origin"] = "*"
        
        return response
    
    # Para recibir datos desde el cliente y actualizar un registro    
    def put(self,request, id):
        
        jd = json.loads(request.body)
        products = list(Producto_Ingresado.objects.filter(Id_ProductoIngresado=id).values())
        
        if( len(products) > 0 ):
                    
            product = Producto_Ingresado.objects.get(Id_ProductoIngresado=id)
            
            product.Producto        = jd[0]['Producto']
            product.Id_Categoria_id = jd[0]['Id_Categoria_id']
            product.Id_Proveedor_id = jd[0]['Id_Proveedor_id']
            product.Valor           = jd[0]['Valor']
            product.Color           = jd[0]['Color']
            product.Tipo_Material   = jd[0]['Tipo_Material']

            product.save()

            datos = {'message':"Success"}
            
        else:
            datos = {'message':"Product not found..."} 
        
        response = JsonResponse(datos)
               
        response["Access-Control-Allow-Origin"] = "*"
        
        return response
    
    # Para recibir una orden desde el cliente y eliminar 
    def delete(self,request, id):
        products = list(Producto_Ingresado.objects.filter(Id_ProductoIngresado=id).values())
        if( len(products) > 0 ):
            Producto_Ingresado.objects.filter(Id_ProductoIngresado=id).delete()
            datos = {'message':"Success"}
        else:
            datos = {'message':"Product not found..."}

        response = JsonResponse(datos)
               
        response["Access-Control-Allow-Origin"] = "*"
        
        return response
            

