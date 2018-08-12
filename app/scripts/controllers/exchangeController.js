angular.module('CurrencyEx')
  .controller('ExchangeController',['$scope','$state','$interval','$timeout','$filter',
    function($scope,$state, $interval,$timeout,$filter){
        $scope.Data = [];
        $scope.currencyCodes = [['USD/JPY', 'AUD/JPY', 'EUR/CAD'], ['INR/CNY', 'CAD/CNY', 'INR/USD']];
        $scope.model = [];
        $scope.model.amount = 0;

        //Function generating random number between a specified minimum and maximum number range
        function randomIntegerFromInterval(minvalue, maxvalue) {
            return Math.random()*(maxvalue-minvalue+1) + minvalue;
        }

        //Function for random Bid price generation which will generate numbers between 1 to 5 to fulfill
        //the criteria of Bid price to be less than Ask price
        var randomNumberForBid = function(){
            $scope.bidNum = randomIntegerFromInterval(1,5);
            //Rounding decimal numbers to 4 decimal places
            $scope.randomBidNum = Math.round($scope.bidNum*10000)/10000;
            $scope.timer = $timeout(randomNumberForBid, 500);
        };

        //Function for random Ask price generation which will generate numbers between 9 to 15
        var randomNumberForAsk = function(){
            $scope.askNum = randomIntegerFromInterval(9,15);
            //Rounding decimal numbers to 4 decimal places
            $scope.randomAskNum = Math.round($scope.askNum*10000)/10000;
            $scope.timer = $timeout(randomNumberForAsk, 500);
        };
        randomNumberForBid();
        randomNumberForAsk();

        //Calling destroy event to stop the timer when user navigates to a different view/page
        $scope.$on('$destroy', function(){
            $timeout.cancel($scope.timer);
        });

        //Function for generating current date and time and displaying it together in a proper format
        var dateTime = function(){
            var currentDate = new Date();
            $scope.datetime = currentDate.getDate() + "/"
                + (currentDate.getMonth()+1)  + "/"
                + currentDate.getFullYear() + " @ "
                + currentDate.getHours() + ":"
                + currentDate.getMinutes() + ":"
                + currentDate.getSeconds();
            return $scope.datetime;
        };

        //Bid Function for button click
        $scope.bid = function(cur,price){
            if($scope.model.amount === 0 || $scope.model.amount < 0){
                $scope.show = true;
            }
            else {
                //Object to push in the Data array for transaction history view
                var data = {
                    order: 'Buy',
                    currency: cur,
                    amount: $scope.model.amount,
                    price: price,
                    date_time: dateTime()
                };
                $scope.show = false;
                $scope.Data.push(data);
            }
        };

        //Ask Function for button click
        $scope.ask = function(cur,price){
            if($scope.model.amount === 0 || $scope.model.amount < 0){
                $scope.show = true;
            }
            else {
                //Object to push in the Data array for transaction history view
                var data = {
                    order: 'Sell',
                    currency: cur,
                    amount: $scope.model.amount,
                    price: price,
                    date_time: dateTime()
                };
                $scope.show = false;
                $scope.Data.push(data);
            }
        };

        //Function for setting the background color of the rows according to the order value. This will be used in ng-style attribute of the UI
        $scope.setBkColor = function(i){
            if(i === 'Buy'){
                return {'background-color': 'lightblue','opacity': 0.6};
            }
            if(i === 'Sell'){
                return {'background-color': 'cornflowerblue','opacity': 0.6};
            }
        }


    }]);
