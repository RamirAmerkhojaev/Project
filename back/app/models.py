from django.db import models

# Create your models here.
#from app.filters import ProductManager


class Category(models.Model):
	name = models.CharField(max_length = 200)
	link = models.TextField()

	def __str__(self):
		return '{}: {}'.format(self.id, self.name)

class ProductManager(models.Manager):

	def smaller_than(self, price):
		return self.filter(price__lt = price)

	def greater_than(self, price):
		return self.filter(price__gt = price)

class Product(models.Model):
	name = models.CharField(max_length = 200)
	price = models.FloatField()
	link = models.TextField()
	description = models.TextField()
	is_added = models.BooleanField(default=False)
	category = models.ForeignKey(Category, on_delete = models.CASCADE)

	objects = ProductManager()

	def __str__(self):
		return '{}: {}'.format(self.id, self.name)

class Comment(models.Model):
	comment = models.CharField(max_length= 500)
	product = models.ForeignKey(Product, on_delete = models.CASCADE)

	def __str__(self):
		return '{}: {}'.format(self.id, self.comment)

class User(models.Model):
	username = models.CharField(max_length = 200)
	email = models.CharField(max_length = 200)
	password = models.CharField(max_length = 200)

	def __str__(self):
		return '{}: {}'.format(self.id, self.username, self.email)

