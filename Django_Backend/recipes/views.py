from opensearchpy import OpenSearch
from django.http import JsonResponse
from django.views import View
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

client = OpenSearch(
    hosts=[{'host': 'localhost', 'port': 9200}],
    http_auth=('admin', 'Deepanshu27@123'), 
    use_ssl=False
)

class RecipeList(APIView):
    def get(self, request):
    
        page = int(request.GET.get('page', 1))  
        page_size = int(request.GET.get('size', 1000)) 

        start_index = (page - 1) * page_size

        response = client.search(
            index='recipes',
            body={
                "query": {
                    "match_all": {}  
                },
                "from": start_index,  
                "size": page_size     
            }
        )

        recipes = [hit['_source'] for hit in response['hits']['hits']]
        return JsonResponse(recipes, safe=False)

class RecipeFilter(APIView):
    def post(self, request):
        page = int(request.data.get('page', 1))  
        page_size = int(request.data.get('size', 10)) 

        start_index = (page - 1) * page_size

        query = {
            "bool": {
                "must": []
            }
        }

        keywords = request.data.get('keywords', []) 
        if keywords:
            
            for keyword in keywords:
                query["bool"]["must"].append({
                    "term": {
                        "keywords": keyword 
                    }
                })

        count_response = client.count(
            index='recipes',
            body={
                "query": query
            }
        )
        total_entries = count_response['count']

        response = client.search(
            index='recipes',
            body={
                "query": query,  
                "from": start_index,  
                "size": page_size     
            }
        )

        data = [hit['_source'] for hit in response['hits']['hits']]

        result = {
            "total": total_entries,
            "data": data
        }
        return Response(result, status=status.HTTP_200_OK)
    
class UniqueKeysList(View):
    def get(self, request):
        response = client.search(
            index='unique',
            body={
                "query": {
                    "match_all": {}  
                },
                "size": 1000
            }
        )
        unique_keys = [hit['_source'] for hit in response['hits']['hits']]
        return JsonResponse(unique_keys[0], safe=False)
