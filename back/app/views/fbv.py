from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated

from app.models import Category, Product, Comment
from app.serializers import CategorySerializer, ProductSerializer, CommentSerializer, RegisterUserSerializer


@api_view(['GET', 'POST'])
def category_list(request):	
	if request.method == 'GET':
		categories = Category.objects.all()
		serializer = CategorySerializer(categories, many = True)
		return Response(serializer.data)

	elif request.method == 'POST':
		serializer = CategorySerializer(data = request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status = status.HTTP_201_CREATED)
		return Response({'error': serializer.errors}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET', 'POST'])
def products_by_category(request, category_id):
	try:
		category = Category.objects.get(id = category_id)
		serializer = CategorySerializer(category, many = True)
	except Category.DoesNotExist as e:
		return Response({'error': str(e)})

	if request.method == 'GET':
		products = category.product_set.all()
		serializer = ProductSerializer(products, many = True)
		return Response(serializer.data)

@api_view(['GET', 'POST'])
def comments_by_product(request, product_id, category_id):
	try:
		categories = Category.objects.get(id = category_id)
		try:
			products = Product.objects.get(id=product_id)
			serializer = ProductSerializer(products, many=True)
		except Category.DoesNotExist as e:
			return Response("error", str(e))
	except Product.DoesNotExist as e:
		return Response("error:", str(e))

	if request.method == 'GET':
		comments = products.comment_set.all()
		serializer = CommentSerializer(comments, many = True)
		return Response(serializer.data)


@api_view(['POST'])
def create_user(request):
    serialized = RegisterUserSerializer(data=request.data)
    if serialized.is_valid():
        serialized.save()
        return Response(serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)


