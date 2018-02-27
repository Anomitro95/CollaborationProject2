/**
 * BlogService
 */
app.factory('BlogService',function($http){
	var blogService={}
	var BASE_URL = "http://localhost:8080/project2_middleware"
	blogService.addBlog=function(blog){
		return $http.post(BASE_URL + "/addblogpost",blog)
	}
	
	blogService.getBlogsWaitingForApproval=function(){
		return $http.get(BASE_URL + "/getblogs/"+false)  
	}
	
	blogService.getApprovedBlogs=function(){
		return $http.get(BASE_URL + "/getblogs/"+true) 
	}
	blogService.getBlog=function(id){
		return $http.get(BASE_URL + "/getblog/"+id) 
	}
	blogService.hasUserLikedPost=function(id){
	    return $http.get(BASE_URL + "/haspostliked/"+id);//response.data -> BlogPostLikes [1 / null]
	}
	//when glyphicon-thumps-up is clicked
	blogService.updateLikes=function(id){
	    return $http.put(BASE_URL + "/updatelikes/"+id);//response.data -> BlogPost object with updated likes
	    // http://localhost:8080/co..../updatelikes/735
	}
	blogService.blogApproved=function(id)
	{
		return $http.put(BASE_URL + "/blogapproved/"+id)
	}
	blogService.blogRejected=function(id,rejectionReason)
	{
		return $http.put(BASE_URL + "/blogrejected/"+id+"/"+rejectionReason);
	}
	blogService.addComment=function(blogComment) {
		return $http.post(BASE_URL + "/addblogcomment/",blogComment) 
	}
	blogService.getAllBlogComments=function(id){
	return $http.get(BASE_URL + "/getblogcomments/"+id)
	}
	return blogService;
})
