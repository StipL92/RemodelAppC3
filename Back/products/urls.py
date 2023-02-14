from django.urls import path

from .views import ProductView

urlpatterns = [
    path('',ProductView.as_view(),name='products_list'),
    path('<int:id>',ProductView.as_view(),name='products_process'),
]