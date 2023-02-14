from django.urls import path

from .views import ProveedorView

urlpatterns = [
    path('',ProveedorView.as_view(),name='proveedors_list'),
    path('<int:id>',ProveedorView.as_view(),name='proveedors_process'),
]