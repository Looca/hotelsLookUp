var tpApp = angular.module('hotelsApp', ['ui.bootstrap']);
// test
tpApp.controller('ListCtrl', ['$scope','$filter', 'HotelService', function($scope,$filter,HotelService) {
  var self = this,
      orderBy = $filter('orderBy');
      
  // Pagination config
  self.currentPage = 1;
  self.itemsPerPage = 20;
  self.maxSize = 10;

  HotelService.getHotels().then(function(response) {
    self.hotelsList = response.data.Establishments;
    self.totalItems = self.hotelsList.length;
  }).finally(function(){
    // Make hotels to apper in alphabetic order
    self.order('Name', false);    
  });

  // Order hotles in correct order
  self.order = function(predicate, reverse) {
    self.hotelsList = orderBy(self.hotelsList, predicate, reverse);
  };

}]);

// Get Hotels Data
tpApp.factory('HotelService', ['$http',
  function ($http) {
    var url = '/hotelsLookUp/hotels.json',
        hotelService = {};
    hotelService.getHotels = function () {
      return $http.get(url);
    };
    return hotelService;
  }
]);

//Filter needed for correct pagination
tpApp.filter('pages', function() {
  return function(input, currentPage, pageSize) {
    if (angular.isArray(input)) {
      var start = (currentPage-1)*pageSize;
      var end = currentPage*pageSize;
      return input.slice(start, end);
    }
  };
});