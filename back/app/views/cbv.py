from datetime import date

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from app.filters import ProductFilter
from rest_framework.permissions import IsAuthenticated

from app.models import Product, Comment
from app.serializers import ProductSerializer, CommentSerializer, UserSerializer


class ProductsListApiView(APIView):
	def get(self, request):
		products = Product.objects.all()
		serializer = ProductSerializer(products, many = True)
		filter_backends = (DjangoFilterBackend,)
		filter_class = ProductFilter
		return Response(serializer.data)

	def post(self, request):
		serializer = ProductSerializer(data = request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status = status.HTTP_201_CREATED)
		return Response({"error": serializer.errors}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)



class ProductDetailApiView(APIView):
	def get_object(self, id):
		try:
			return Product.objects.get(id = id)
		except Product.DoesNotExist as e:
			return Response({'error': str(e)})

	def get(self, request, product_id):
		product = self.get_object(product_id)
		serializer = ProductSerializer(product)
		return Response(serializer.data)

	def patch(self, request, product_id):
		product = self.get_object(product_id)
		if product.is_added == False:
			product.is_added = True
		else:
			product.is_added = False
		serializer = ProductSerializer(instance = product, data = request.data, partial=True)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response({'error': serializer.errors})
		permission_classes = (IsAuthenticated,)

	def delete(self, request, product_id):
		products = self.get_object(product_id)
		products.delete()
		return Response({'deleted': True})

class CommentsListApiView(APIView):
	def get(self, request):
		comments = Comment.objects.all()
		serializer = CommentSerializer(comments, many = True)
		return Response(serializer.data)

	def post(self, request):
		serializer = CommentSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response({'error': serializer.errors},
						status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		permission_classes = (IsAuthenticated,)

class CommentDetailApiView(APIView):
	def get_object(self, id):
		try:
			return Comment.objects.get(id = id)
		except Comment.DoesNotExist as e:
			return Response({'error': str(e)})

	def get(self, request, comment_id):
		comment = self.get_object(comment_id)
		serializer = CommentSerializer(comment)
		return Response(serializer.data)

	def put(self, request, comment_id):
		comment = self.get_object(comment_id)
		serializer = CommentSerializer(instance = comment, data = request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response({'error': serializer.errors})
		permission_classes = (IsAuthenticated,)

	def delete(self, request, comment_id):
		comments = self.get_object(comment_id)
		comments.delete()
		return Response({"deleted": True})
		permission_classes = (IsAuthenticated,)


class UserListApiView(APIView):

	def get(self, request):
		users = User.objects.all()
		serializer = UserSerializer(users, many = True)
		return Response(serializer.data)

	def post(self, request):
		serializer = UserSerializer(data = request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status = status.HTTP_201_CREATED)
		return Response({"error": serializer.errors}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserDetailApiView(APIView):
	def get_object(self, id):
		try:
			return User.objects.get(id = id)
		except User.DoesNotExist as e:
			return Response({'error': str(e)})

	def put(self, request, user_id):
		user = self.get_object(user_id)
		serializer = UserSerializer(instance = user, data = request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response({"error": serializer.errors})

	def delete(self, request, user_id):
		user = self.get_object(user_id)
		user.delete()
		return Response({"deleted": True})

