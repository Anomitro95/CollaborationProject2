/**
 * BlogPostDetailController
 * #getblog/735
 */
app.controller('BlogPostDetailController', function($scope, $routeParams,
		$location, BlogService, $sce, $rootScope) {
	var id = $routeParams.id;
	//var id=735
	// select * from blogpost where id=735
	//Statement 1 - to set the value for $scope.blogPost=blogpost object
	BlogService.getBlog(id).then(function(response) {
		$scope.blogPost = response.data // select * from blogpost where id=?
		$scope.title = $sce.trustAsHtml($scope.blogPost.blogTitle)
		$scope.content = $sce.trustAsHtml($scope.blogPost.blogContent);// blogContent
																		// HTML
																		// tags
	}, function(response) {
		$rootScope.error = response.data;
		if (response.status == 401)
			$location.path('/login')
	})
  //ONCE THESE TWO SCOPE VARIABLES GETS	UPDATED, IT WILL NOTIFY THE VIEW BLOGPOSTDETAIL.HTML
	//TWO VARIABLES ARE $scope.blogPost and $scope.isLiked
	
	// select * from blogpostlikes where blopost_id=735 and user_email=loggedin email id
     //statement 2 - to set the value of $scope.isLiked=[true/false]
	BlogService.hasUserLikedPost(id).then(function(response) {
		if (response.data == '') {
			$scope.isLiked = false// glyphicon in black color
		} else {
			$scope.isLiked = true // glyphicon in blue color
		}
	}, function(response) {
		$rootScope.error = response.data;
		if (response.status == 401)
			$location.path('/login')
	})

	$scope.updateLikes=function(id){
		BlogService.updateLikes(id).then(
				function(response){
					$scope.blogPost=response.data//blogpost object with updated likes
					//update blogpost set likes=likes - 1 where id=? -> blogPostlikes != null, icon in blue color
					    //or
					//update blogpost set likes = likes + 1 where id=? -> blogPostlikes=null , glyphicon in black
					//if isLiked=false, -> isLiked=true
					//if isLiked=true,isLiked=false
					$scope.isLiked=!$scope.isLiked
				},
				function(response){
					$rootScope.error = response.data;
					if (response.status == 401)
						$location.path('/login')
				})
	}
	
	$scope.showRejectionTxt=function() {
		$scope.isRejected=true;
	}
	
	$scope.blogApproved=function(id)  { //insert into notification and update approval= true
		
		console.log("in blogApproved")
		BlogService.blogApproved(id).then(
			function(response){
				alert('Blog Approved');
				$location.path('/getblogs')
			}, function(response){
				$rootScope.error = response.data;
				if (response.status == 401)
					$location.path('/login')
			}
			)
		}
	
	$scope.blogRejected=function(id,rejectionReason)  { //delete from blogpost and insert into notification
		
		console.log("in BlogRejecetd")
		BlogService.blogRejected(id,rejectionReason).then(
			function(response){
				alert("Blog Disapproved")
				$location.path('/getblogs')
			}, function(response){
				$rootScope.error = response.data;
				if (response.status == 401)
					$location.path('/login')
			}
			)
		}
	
	$scope.addComment=function(commentTxt, blogPost) {
		
		blogComment={}
		blogComment.commentTxt=commentTxt
		blogComment.blogPost=blogPost;
		alert("in addComment")
		BlogService.addComment(blogComment).then(function(response){
			alert("in addComment Success")
			getAllBlogComments(id) //id is BlogPost id
		},function(response){
			$rootScope.error = response.data;
			if (response.status == 401)
				$location.path('/login')
		}
		)
	}
	
	//statement funciton : called(loaded) automatically when controller is instantiated with the respective view
	function getAllBlogComments(id){  //id is BlogPost id
		BlogService.getAllBlogComments(id).then(function(response){
			$scope.blogComments=response.data;
		},function(response){
			$rootScope.error = response.data;s
			if (response.status == 401)
				$location.path('/login')
			
		})
	}
	
	getAllBlogComments(id)
	
	
})