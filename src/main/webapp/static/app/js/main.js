var app = angular.module("wafepa",['ngRoute']);

app.controller("MyCtrl", function ($scope){
	
});

app.config(["$routeProvider", function($routeProvider){
	
	$routeProvider.when('/', {
		templateUrl : '/static/app/html/partial/home.html'})
		
		.when('/activities/page/:page', {
			templateUrl : '/static/app/html/partial/activities.html'})
//			
//		.when('/activities/prepedit/page/:page',{ ///activities/edit/:id
//			templateUrl : '/static/app/html/partial/prepedit-activity.html'})
			
		.when('/activities/edit/:id',{ ///activities/edit/:id
			templateUrl : '/static/app/html/partial/edit-activity.html'})
			
		.when('/activities/add',{
			templateUrl : '/static/app/html/partial/add-activity.html'})
			
//		.when('/activities/delete',{
//			templateUrl : '/static/app/html/partial/delete-activity.html'})
		
		
		
		.otherwise({ redirectTo: '/'});
	
}]);

//////////////////////////    A C T I V I T I E S /////////////////////////////////////////////
app.controller("activitiesController", function($scope, $http, $location, $routeParams){
	
	$scope.url_base = "/api/activities"; // kreiram url da nebi morao stalno da ga pisem
	$scope.activities = null; // kreiram akrivnost u koju cu da smestim ono sto cu da kupim iz baze
	$scope.text = "";
	console.log($routeParams.page);
	
	$scope.page = Number($routeParams.page);
	$scope.num_pages = 0;
	
	$scope.searchActivity = {}; // referenca na prazan objekat
	$scope.searchActivity.name = ""; // kreiramo polje u objektu gore da bismo inicijalizovali
	
	$scope.search_url = '/activities/page/';
	
	$scope.back = function(){
		$scope.page = $scope.page - 1;
		$location.path($scope.search_url + $scope.page);
	};
	
	$scope.forward = function(){
		$scope.page = $scope.page + 1;
		$location.path($scope.search_url + $scope.page);
	};
	
	$scope.firstPage = function(){
		$location.path($scope.search_url + '0');
	};
	
	$scope.lastPage = function(){
		$scope.page = $scope.num_pages - 1;
		$location.path($scope.search_url + $scope.page);
	};
	
	
	var getActivities = function(){
		$http.get($scope.url_base, { params: {'page': $scope.page}}).then (
//		$http({method: 'GET', url: '/api/activities'}).then (
			function successCallBack(data, status, statusText){
				$scope.activities = data.data; // pokupimo podatke koje smo dobili od backenda resta
				console.log($scope.activities);
				$scope.text = statusText;
				console.log($scope.text);
				console.log(data.headers("pages"));
				$scope.num_pages = data.headers("pages");
			}, function errorCallback(data, status) {
				console.log($scope.activities);
			}	
		)
		
	};
	
	getActivities();
	
	$scope.findActivity = function (){
		
		$http.get($scope.url_base, {params: {'name':$scope.searchActivity.name}})
		.then( function succecc (data, status){
			$scope.activities = data.data;
			console.log(status);
			$scope.num_pages = data.headers("pages");
		}, function error(data,status){
			console.log(status);
		})
	};
	
	$scope.proceedToEditA = function(id){   // posto je na stranici activities, tu stranu kontrolise activitiesController
										   // zato ovde ide edit, pa ga bacamo na proceed to edit
		$location.path("/activities/edit/" + id);
	}
	$scope.addActivity = function(){
		$location.path("/activities/add");
	}
	
	
	
	$scope.deleteActivity = function(id, $location, $routeParams){  //imamo izmeni na stranici /activities, tu je activitiesController koji to kontrolise
													  // zato imamo u njemu definisano brisanje
		$http.delete($scope.url_base + "/" + id)
		.then(
				
				function successCallBack(data){
					alert("Uspesno je izbrisan objekat: " + data.data.name);
					getActivities(); // pozovi mi funckiju za dobavljanje svih aktivnosti
//					ovde ne idemo sa $location.path("/activities");
				}, function errorCallback(data, status) {
					$scope.text = status;
					console.log($scope.text);
				}
			  )
	};
	
});

//app.controller("prepEditActivity", function($scope, $http, $routeParams, $location){
//	
//	$scope.url_base = "/api/activities"; // kreiram url da nebi morao stalno da ga pisem
//	$scope.activities = null; // kreiram akrivnost u koju cu da smestim ono sto cu da kupim iz baze
//	$scope.text = "";
//	console.log($routeParams.page);
//	
//	$scope.page = Number($routeParams.page);
//	$scope.num_pages = 0;
//	
//	$scope.search_url = '/activities/page/';
//	
//	$scope.back = function(){
//		$scope.page = $scope.page - 1;
//		$location.path($scope.search_url + $scope.page);
//	};
//	
//	$scope.forward = function(){
//		$scope.page = $scope.page + 1;
//		$location.path($scope.search_url + $scope.page);
//	};
//	
//	$scope.firstPage = function(){
//		$location.path($scope.search_url + '0');
//	};
//	
//	$scope.lastPage = function(){
//		$scope.page = $scope.num_pages - 1;
//		$location.path($scope.search_url + $scope.page);
//	};
//	
////	var getActivities = function(){
////		$http.get($scope.url_base).then (
////
////			function successCallBack(data, status){
////				$scope.activities = data.data; // pokupimo podatke koje smo dobili od backenda resta
////				console.log($scope.activities);
////			}, 
////			function errorCallBack (data, status){
////				alert("Error ocured");
////				console.log(data);
////			}
//	
//	var getActivities = function(){
//		$http.get($scope.url_base, { params: {'page': $scope.page}}).then (
////		$http({method: 'GET', url: '/api/activities'}).then (
//			function successCallBack(data, status, statusText){
//				$scope.activities = data.data; // pokupimo podatke koje smo dobili od backenda resta
//				console.log($scope.activities);
//				$scope.text = statusText;
//				console.log($scope.text);
//				
//				$scope.num_pages = data.headers("pages");
//				console.log(data.headers("pages"));
//			}, function errorCallback(data, status) {
//				console.log($scope.activities);
//			}	
//		);
//		
//	}
//	
//	getActivities();
//	
//	$scope.proceedToEditA = function(id){   // posto je na stranici activities, tu stranu kontrolise activitiesController
//		   // zato ovde ide edit, pa ga bacamo na proceed to edit
//        $location.path("/activities/edit/" + id);
//}
//	
//});

app.controller("editActivityCtrl", function($scope, $http, $routeParams, $location){
	
	$scope.base_url ="/api/activities";
	$scope.activity = null; // inicijalizacija objekta pa mozemo da radimo sa njima
	$scope.nactivity = null;
	
	console.log($routeParams);
	
	var getActivity = function(){
		$http.get($scope.base_url + "/" + $routeParams.id ).  // sa rute kupim parametre
		then(function successCallBack(data, status){
			$scope.activity = data.data;
			console.log(data.data);
		},
		function errorCallBack (data,status){
			alert("Doslo je do greske");
			console.log(data);
		}
		);
		
	};// posto smo definisali funckiju sada cemo i da je pozovemo
	getActivity();
	
	
	//posto je ovo kontroler koji vrsi editovanje logicno je da ovde definisemo i funkciju za editovanje	

	$scope.edit = function(){  // nasa funckija edit sa edit-activity view-a
//		alert("Editovanje");
		$http.put($scope.base_url + "/" + $scope.activity.id, $scope.activity) 
		// prvi parametar je nasa putanja, drugi parametar je objekat koji predstavlja izmenjen resurs (moze i json objekat)
		.then(function successCallBack(data, status){
			alert("Uspesno izmenjeni podaci");
			$location.path("/activities/page/0");
		}, function errorCallBack (data, status){
			alert("Doslo je do greske prilikom promene");
			console.log(status);
		});
	};
	
});

app.controller("addActivityCtrl", function($scope, $http, $location){
	
	$scope.base_url = "/api/activities";
	//$scope.activity = null; // kreiram prazan objekat koji ce prihvatiti novi koji zelimo da snimimo
	$scope.activity = {};
	$scope.activity.name ="";
	
	
	
	$scope.add = function (){
		$http.post($scope.base_url, $scope.activity).then(
				function success (data,status){
					alert("Uspesno dodavanje aktivnosti!");
					console.log(data.data);
					$location.path("/activities/page/0");
				},function errorCallback(data, status) {
					alert ("Došlo je do greške!");
					console.log(status);
				}
		)};
	
});

//app.controller("deleteController", function($scope, $http, $routeParams, $location){
//	$scope.url_base = "/api/activities"; 
//	$scope.activities = null;
//	
//	$scope.text = "";
//	console.log($routeParams.page);
//	
//	$scope.page = Number($routeParams.page);
//	$scope.num_pages = 0;
//	
//		
//	$scope.back = function(){
//		$scope.page = $scope.page - 1;
//		$location.path($scope.search_url + $scope.page);
//	};
//	
//	$scope.forward = function(){
//		$scope.page = $scope.page + 1;
//		$location.path($scope.search_url + $scope.page);
//	};
//	
//	$scope.firstPage = function(){
//		$location.path($scope.search_url + '0');
//	};
//	
//	$scope.lastPage = function(){
//		$scope.page = $scope.num_pages - 1;
//		$location.path($scope.search_url + $scope.page);
//	};
//	
////	var getActivities = function(){
////		$http.get($scope.url_base).then (
////
////			function successCallBack(data, status){
////				$scope.activities = data.data; // pokupimo podatke koje smo dobili od backenda resta
////				console.log($scope.activities);
////			}, 
////			function errorCallBack (data, status){
////				alert("Error ocured");
////				console.log(data);
////			}
//	
//	var getActivities = function(){
//		$http.get($scope.url_base, { params: {'page': $scope.page}}).then (
////		$http({method: 'GET', url: '/api/activities'}).then (
//			function successCallBack(data, status, statusText){
//				$scope.activities = data.data; // pokupimo podatke koje smo dobili od backenda resta
//				console.log($scope.activities);
//				$scope.text = statusText;
//				console.log($scope.text);
//				console.log(data.headers("pages"));
//				$scope.num_pages = data.headers("pages");
//			}, function errorCallback(data, status) {
//				console.log($scope.activities);
//			}	
//		);
//		
//	}
//	
//	getActivities();
//	
//	$scope.deleteActivity = function(id, $location, $routeParams){  //imamo izmeni na stranici /activities, tu je activitiesController koji to kontrolise
//					  // zato imamo u njemu definisano brisanje
//			$http.delete($scope.url_base + "/" + id)
//			.then(
//			
//					function successCallBack(data){
//						alert("Uspesno je izbrisan objekat: " + data.data.name);
//						getActivities(); // pozovi mi funckiju za dobavljanje svih aktivnosti
//						//ovde ne idemo sa $location.path("/activities");
//					}, function errorCallback(data, status) {
//						$scope.text = status;
//						console.log($scope.text);
//					}
//			)
//		};
	
//});

