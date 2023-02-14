from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import *
import json

class UserView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self,request):
        
        jd = json.loads(request.body)

        # Attempt to sign user in
        username = jd[0]["username"]
        password = jd[0]["password"]
        
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            datos = {'message':"Success"}
            
        else:
            datos = {'message':"Usuario o contraseña no validos..."}
        
        response = JsonResponse(datos)           
        response["Access-Control-Allow-Origin"] = "*"    
        return response

    def delete(self,request):
        
        logout(request)
        
        datos = {'message':"Success"}
        response = JsonResponse(datos)          
        response["Access-Control-Allow-Origin"] = "*"   
         
        return response