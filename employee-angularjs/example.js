angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

angular.module('ui.bootstrap.demo').controller('PaginationDemoCtrl', function ($scope, $log, $http) {
  
  $scope.currentPage = 1;
  var itemsPerPage = 10;
  $scope.dobError = false;

  // $scope.pageChanged = function() {
  //   $log.log('Page changed to: ' + $scope.currentPage);

  // };

  //$scope.maxSize = 5;
  // $scope.bigTotalItems = 175;
  // $scope.bigCurrentPage = 1;

  var getAllURL = "http://localhost:3000/employee/all";
  var getSearchURL = "http://localhost:3000/employee/search";

  $scope.pageChanged = function () {
    var begin = (($scope.currentPage - 1) * itemsPerPage),
    end = begin + itemsPerPage;

    $http.get(getAllURL)
    .then(function(response) {
        console.log(response.data);
        $scope.actualList = response.data;
        $scope.totalItems = $scope.actualList.length;
        $scope.employeeList = $scope.actualList.slice(begin, end);
    });
    
  };
  $scope.pageChanged();


  $scope.submitForm = function(){
    console.log("submitForm");


    if($scope.formName && $scope.dob && $scope.salary && $scope.skills){
      $http({
        method: 'POST',
        url: 'http://localhost:3000/employee/add',
        data: {name : $scope.formName, dob : $scope.dob, salary : $scope.salary, skills : $scope.skills},
        headers: {'Content-Type': 'application/json'}
      })
      .then(function(response){
        alert("added successfully!");
        $scope.pageChanged();
      });
    }else{
      alert("Please complete the form before submitting!");
    }

    if($scope.dob == undefined || $scope.dob == ''){
      $scope.dobError = true;
    }else{
      $scope.dobError = false;
    }
  };

  $scope.deleteEmp = function(Id){
    $http({
      method: 'POST',
      url: 'http://localhost:3000/employee/delete',
      data: {empId : Id},
      headers: {'Content-Type': 'application/json'}
    })
    .then(function(response){
      alert("deleted successfully!");
      $scope.pageChanged();
    });
  };

  $scope.searchList = function(){
    $http.get(getSearchURL + "?key=" + $scope.searchStr)
    .then(function(response) {
        console.log(response.data);
        $scope.employeeList = response.data;
        $scope.totalItems = $scope.employeeList.length;
        //$scope.employeeList = $scope.actualList.slice(begin, end);
    });
  };

});