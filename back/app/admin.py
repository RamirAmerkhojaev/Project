from django.contrib import admin
from app.models import Product, ProductManager, Category, User, Comment
# Register your models here.


admin.site.register(Product)
admin.site.register(Category)
admin.site.register(User)
admin.site.register(Comment)