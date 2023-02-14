import json
from django.http import JsonResponse
from django.views import View
from .models import *
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

class ProveedorView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    #Para enviar al cliente
    def get(self,request,id=0):
        if (id>0):
            proveedors = list(Proveedor.objects.filter(Id_Proveedor=id).values())
            if( len(proveedors) > 0 ):
                proveedor=proveedors[0]
                datos = {'message':"Success",'proveedors':proveedor}
            else:
                datos = {'message':"Proveedor not found..."}    
        else:
            proveedors = list(Proveedor.objects.values())
            if len(proveedors)>0:
                datos = {'message':"Success",'proveedors':proveedors}
            else:
                datos = {'message':"Proveedors not found..."}
        
        response = JsonResponse(datos)
               
        response["Access-Control-Allow-Origin"] = "*"
        
        return response
    
    # Para recibir datos desde el cliente y crear un nuevo registro
    def post(self,request):
        #print(request.body)
        jd = json.loads(request.body)

        Proveedor.objects.create(

            Proveedor   = jd[0]['Proveedor'],
            Ciudad      = jd[0]['Ciudad'],
            Direccion   = jd[0]['Direccion'],
            Telefono    = jd[0]['Telefono'],
            Whatsapp    = jd[0]['Whatsapp'],
            Correo      = jd[0]['Correo']
        )
        
        datos = {'message':"Success"}
        
        response = JsonResponse(datos)
               
        response["Access-Control-Allow-Origin"] = "*"
        
        return response
    
    # Para recibir datos desde el cliente y actualizar un registro    
    def put(self,request, id):
        
        jd = json.loads(request.body)
        proveedors = list(Proveedor.objects.filter(Id_Proveedor=id).values())
        
        if( len(proveedors) > 0 ):
                    
            proveedor = Proveedor.objects.get(Id_Proveedor=id)
            
            proveedor.Proveedor   = jd[0]['Proveedor']
            proveedor.Ciudad      = jd[0]['Ciudad']
            proveedor.Direccion   = jd[0]['Direccion']
            proveedor.Telefono    = jd[0]['Telefono']
            proveedor.Whatsapp    = jd[0]['Whatsapp']
            proveedor.Correo      = jd[0]['Correo']

            proveedor.save()

            datos = {'message':"Success"}
            
        else:
            datos = {'message':"Proveedor not found..."} 
        
        response = JsonResponse(datos)
               
        response["Access-Control-Allow-Origin"] = "*"
        
        return response
    
    # Para recibir una orden desde el cliente y eliminar 
    def delete(self,request, id):
        proveedors = list(Proveedor.objects.filter(Id_Proveedor=id).values())
        if( len(proveedors) > 0 ):
            Proveedor.objects.filter(Id_Proveedor=id).delete()
            datos = {'message':"Success"}
        else:
            datos = {'message':"Proveedor not found..."}

        response = JsonResponse(datos)
               
        response["Access-Control-Allow-Origin"] = "*"
        
        return response
            

