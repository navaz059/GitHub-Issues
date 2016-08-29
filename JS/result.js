angular.module('myApp', [])
.controller('myCtrl',['$scope','$http',function($scope,$http){
	$scope.link = "Paste a Link !!";
	$scope.owner = "";
	$scope.repo = "";
	$scope.result = [];
	$scope.total = 0;
	$scope.first = 0;
	$scope.second = 0;
	$scope.third = 0;
	var flag = 1;
	$scope.submit = function() {
	    
	    var arr = [];
	    
	    if ($scope.link) {
	          var temp_link = $scope.link.toString();          
	          arr = temp_link.split('/');
	          $scope.owner = arr[3];
	    	  $scope.repo = arr[4]; 
	    }
	    
	    if( $scope.owner && $scope.repo ){
		        var test_link = "https://api.github.com/repos/"
		        test_link = test_link.concat($scope.owner+"/"+$scope.repo);
	    }else{
	    		alert("Enter Valid URl");
	    }

	   	gettotalData(test_link);
	   	var newLink = test_link.concat("/issues?state=open&sort=created&per_page=100");
	   	//Get total issues more than 7 days
		getSevenDays(newLink);
		//get total issues more than 24hrs
	   	get24Data(newLink);
	};

	//Get repos/<Owner-Name>/<Repo-Name>
	function gettotalData(url){
		$http.get(url)
		.then(function(response){
			$scope.total = response.data.open_issues_count;
	});
	}

	//Get repos/<Owner-Name>/<Repo-Name>//issues?state=open&sort=created&per_page=100/since = 7hrs
	function getSevenDays(url){
		//curent date - 7hrs and convert it back to same format
		var currentDate = new Date();
	    currentDate.setDate(currentDate.getDate()-7);
//		alert(currentDate);
		var n = currentDate.toISOString();
		url = url.concat("&since="+n+"");
		$http.get(url)
		.then(function(response){
			$scope.second = response.data.length;
			$scope.third = $scope.total - $scope.second;
	});
	}
	//Get repos/<Owner-Name>/<Repo-Name>//issues?state=open&sort=created&per_page=100/since = 24hrs
	function get24Data(url){
		var currentDate = new Date();
	    currentDate.setHours(currentDate.getHours()-24);
//		alert(currentDate);
		var n = currentDate.toISOString();
		url = url.concat("&since="+n+"");
		$http.get(url)
		.then(function(response){
			$scope.first = response.data.length;
			
	});
	}
}]);
