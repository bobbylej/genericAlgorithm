DashboardModule.controller( 'CoursesController', ['$scope', '$http', '$filter', 'toastr', function( $scope, $http, $filter ) {

  var allCourses = [];

  $( '.sidebar .menu a' ).removeClass( 'active' );
  $( '.sidebar .menu .courses-link' ).addClass( 'active' );
  $( '.topbar .menu a' ).removeClass( 'active' );
  $( '.topbar .menu .courses-link' ).addClass( 'active' );

  $scope.currentPage = 1;
  //fillPagination( $scope.currentPage );
  filterCourses( [] );

  $scope.filter = function( course ) {
    console.log( course );
    var filters = [];
    for( var key in course ) {
      if( course[ key ] ) {
        filters.push( {
          key: key,
          value: course[ key ]
        } );
      }
    }
    filterCourses( filters );
  }

  $scope.changePage = function( page, course ) {
    console.log( page, course );
    $scope.currentPage = page;
    $scope.filter( course );
  }

  $scope.preview = function( course ) {
    $scope.preview.course = course;
    $( '.preview-course' ).slideDown();
  }


  function filterCourses( filters ) {
    filterReq = '?strona=' + $scope.currentPage;
    filters.forEach( function( filter ) {
      filterReq += '&' + filter.key + '=' + filter.value;
    } );
    $http.get("/courses" + filterReq )
    .success( function( response ) {
      //allCourses = response;
      //$scope.courses = getCourses( 1 );
      $scope.courses = response;
      console.log( 'Courses to show', $scope.courses );
    });
  }

} ] );
