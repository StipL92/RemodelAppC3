<h1 align="center">RemodelApp</h1>

<h3 align="left">Pagina web que recopila los aspectos mas importantes a la hora de remodelar una casa o apartamento en obra gris</h3>

En la carpeta Back esta la API que se corre con el archivo:

<h3 align="left"> Back/manage.py </h3>

Archivo principal para correr el servidor de Django. En una consola de Windows (cmd) correr el siguiente comando:

```bash
python manage.py runserver
```

En la carpeta Front, se encuentran las plantillas que consumen la API

## Carpeta general - Back/RemodelApp

Contiene las urls principales y las configuraciones generales

## Carpeta App - Back/users

Contiene las funciones correspondientes al inicio y cierre de sesion

## Carpeta App - Back/products

Contiene las funciones que controlan los datos y la visualizacion de los productos

## Carpeta App - Back/dashboard

Contiene las funciones que controlan el panel de administrador para crear, agregar, editar y eliminar proovedores, productos y categorias

## *Requerimientos de Python3*

* os
* django-cors-headers