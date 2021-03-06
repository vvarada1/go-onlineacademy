'use strict';

angular.module('myAdminApp').controller('MainCtrl', function ($scope, mstAuth, $location, mstIdentity, $ocLazyLoad, $timeout, $rootScope, $state, adminServices, $http) {
    $scope.studentProfile;
    $scope.loading = true;
    var studentinfo = {};

    if (!$rootScope.authenticated) {
        $rootScope.identity = mstIdentity;
    }

    $scope.signout = function () {
        mstAuth.logoutUser().then(function () {
            window.location.href = "/site/login";
        })
    }

    $scope.$on('$viewContentLoaded', function (event) {
        $timeout(function () {
            $ocLazyLoad.load(['vendor/iCheck/icheck.min.js', 'scripts/common/custom.js']);
        }, 0);
    });

    $scope.getDashoard = function () {
        adminServices.getUsersListTotal()
                .then(function (response) {
                    $scope.totalUserCount = response.data[0];
                    $scope.loading = false;
                }, function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });
    };

    $scope.getStudentInfo = function () {
        adminServices.getStudentInfo()
                .then(function (response) {
                    $rootScope.identity.currentUser.studentinfo = response.data[0];
                    $scope.studentProfile = response.data[0];
                    $scope.studentProfile.user_id = $rootScope.identity.currentUser.user_id;

                }, function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });
    };

    $scope.updateStudentRecord = function () {
        return $http.post('/api/editProfile', {profile: $scope.studentProfile})
                .then(function (response) {
                    $scope.successMsg = true;
                    $scope.status = "Your profile has been updated!";
                    return "data saved "
                },
                        function (httpError) {
                            throw httpError.status + " : " + httpError.data;
                        });
    }

    $scope.getMentorSession = function () {
        return $http.get('/api/getmentorsession', {user_id: $rootScope.identity.currentUser.user_id})
                .then(function (response) {
                    $scope.sessionlistmentor = response.data;
                }, function (error) {
                    $scope.status = 'Unable to load session data : ' + error.message;
                });
    }

    $scope.getTopMentors = function () {
        $scope.loadingMentorsList = $scope.loading = true;
        adminServices.getTopMentors()
                .then(function (response) {
                    $scope.topMentorsList = response.data;
                    $scope.loadingMentorsList = $scope.loading = false;
                }, function (error) {
                    $scope.status = 'Unable to load session data : ' + error.message;
                });
    }

    $scope.getLatestStudents = function () {
        $scope.loadingStudentList = $scope.loading = true;
        adminServices.getLatestStudents()
                .then(function (response) {
                    $scope.latestStudentsList = response.data;
                    $scope.loadingStudentList = $scope.loading = false;
                }, function (error) {
                    $scope.status = 'Unable to load session data : ' + error.message;
                });
    }

    $scope.markSessionCompleted = function ($sessionID) {
        if (confirm("Do you really want to mark that session completed?")) {
            return $http.post('/api/marksessioncompleted', {sessionID: $sessionID})
                    .then(function (response) {
                        $scope.markedSession = true;
                        $scope.sessionName = response.data[0].session;
                        $("#session" + $sessionID).fadeOut();
                    }, function (error) {
                        $scope.status = 'Unable to mark session completed : ' + error.message;
                    });
        }
    }

    if ($rootScope.identity.currentUser.role_id == 3) {
        $scope.getStudentInfo();
    }

    $scope.getDashoard();

});
