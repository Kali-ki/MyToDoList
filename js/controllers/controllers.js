var routeAppController = angular.module('routeAppController', [])

routeAppController.controller('taskListController', ['$scope',
  function($scope){

    decoupDate = function(date){
      return date.split('-');
    }

    decoupHour = function(hour){
      return date.split(':');
    }

    findMin = function(tab){
      var min = 0;
      var res = 0;
      if(tab.length > 0){
        var y = (decoupDate(tab[min].date))[0];
        var m = (decoupDate(tab[min].date))[1];
        var j = (decoupDate(tab[min].date))[2];
        var h = (decoupDate(tab[min].heure))[0];
        var mi = (decoupDate(tab[min].heure))[1];
        for(let i = 1 ; i < tab.length ; i++){
          y2 = (decoupDate(tab[i].date))[0];
          m2 = (decoupDate(tab[i].date))[1];
          j2 = (decoupDate(tab[i].date))[2];
          h2 = (decoupDate(tab[i].heure))[0];
          mi2 = (decoupDate(tab[i].heure))[1];
          if(y < y2){
            res = -1;
          }else if(y > y2){
            res = 1;
          }else{
            if(m < m2){
              res = -1;
            }else if(m > m2){
              res = 1;
            }else{
              if(j < j2){
                res = -1;
              }else if(j > j2){
                res = 1;
              }else{
                if(h < h2){
                  res = -1;
                }else if(h > h2){
                  res = 1;
                }else{
                  if(mi < mi2){
                    res = -1;
                  }else if(mi > mi2){
                    res = 1;
                  }else{
                    res = 0;
                  }
                }
              }
            }
          }
          if(res == 1){
            min = i;
            y = (decoupDate(tab[min].date))[0];
            m = (decoupDate(tab[min].date))[1];
            j = (decoupDate(tab[min].date))[2];
            h = (decoupDate(tab[min].heure))[0];
            mi = (decoupDate(tab[min].heure))[1];
          }
        }
      }
      return min;
    }

    sort = function(){
      if(localStorage.getItem('tasks') != null){
        var tasks = JSON.parse(localStorage.getItem('tasks'));
        for(let i = 0 ; i < tasks.length ; i++){
          min = findMin(tasks.slice(i));
          var save = tasks[i];
          tasks[i] = tasks[min+i];
          tasks[min+i] = save;
        }
        $scope.tasks = tasks;
      }
    }

    sort2 = function(tab){
      if(tab != null){
        var tasks = tab;
        for(let i = 0 ; i < tasks.length ; i++){
          min = findMin(tasks.slice(i));
          var save = tasks[i];
          tasks[i] = tasks[min+i];
          tasks[min+i] = save;
        }
        $scope.tasks = tasks;
      }
    }

    search_in_tab = function(word){
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      var res = [];
      for(let i = 0 ; i < tasks.length ; i++){
        var word2 = tasks[i].tag;
        if(word2 !== undefined){
          if(word2.indexOf(word) != -1)
            res.push(tasks[i]);
        }
      }
      return res;
    }

    search_by_id = function(id){
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      res = -1;
      for(let i = 0 ; i < tasks.length ; i++){
        if(tasks[i].id == id){
          res = i;
        }
      }
      return res;
    }

    sort();

    $scope.search = function(){
      var recherche = $scope.search_input;
      tab = search_in_tab(recherche);
      sort2(tab);
      $scope.tasks = tab;
    }

    $scope.getIndex = function(index){
      localStorage.setItem("id", index.id);
    }

    $scope.supp = function(index){
      index = search_by_id(index.id);
      tab = JSON.parse(localStorage.getItem('tasks'));
      tab.splice(index,1);
      localStorage.setItem('tasks',JSON.stringify(tab));
      $scope.tasks = JSON.parse(localStorage.getItem('tasks'));
      sort();
    }

  }
]);

routeAppController.controller('addTaskController', ['$scope',
  function($scope){

    var dateControl = document.querySelector('input[type="date"]');
    var hourControl = document.querySelector('input[type="time"]');

    $scope.add = function(){
      if(localStorage.getItem('id_max') == null)
        localStorage.setItem('id_max',0);
      var id = parseInt(localStorage.getItem('id_max')) + 1;
      localStorage.setItem('id_max', id);

      var titre = $scope.titre;
      var tag = $scope.tag;
      var date = dateControl.value;
      var hour = hourControl.value;
      var des = $scope.description;
      var task = {titre:titre, tag:tag, date:date, heure:hour, des:des, id:id};

      if(localStorage.getItem('tasks') == null)
        localStorage.setItem('tasks', JSON.stringify([]));

      tab = JSON.parse(localStorage.getItem('tasks'));
      tab.push(task);
      localStorage.setItem('tasks',JSON.stringify(tab));
    };

  }
]);

routeAppController.controller('seeTaskController', ['$scope',
  function($scope){

    linkify = function(text) {
      var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      return text.replace(urlRegex, function(url) {
          return '<a href="' + url + '">' + url + '</a>';
      });
    }

    var index = localStorage.getItem('id');
    index = search_by_id(index);
    tab = JSON.parse(localStorage.getItem('tasks'));
    $scope.task = tab[index];
    task = tab[index];
    if(task.des !== undefined)
      $scope.my_html = linkify(task.des);
  }
]);

routeAppController.controller('editTaskController', ['$scope',
  function($scope){
    var index = localStorage.getItem('id');
    index = search_by_id(index);
    tab = JSON.parse(localStorage.getItem('tasks'));
    task = tab[index];

    var dateControl = document.querySelector('input[type="date"]');
    var hourControl = document.querySelector('input[type="time"]');

    $scope.titre = task.titre;
    $scope.tag = task.tag;
    dateControl.value = task.date;
    hourControl.value = task.heure;
    id = task.id

    $scope.description = task.des;

    $scope.valideChange = function(){
      var index = localStorage.getItem('currentIndex');

      var titre = $scope.titre;
      var tag = $scope.tag;
      var date = dateControl.value;
      var hour = hourControl.value;
      var des = $scope.description;
      var task = {titre:titre, tag:tag, date:date, heure:hour, des:des, id:id};

      tab = JSON.parse(localStorage.getItem('tasks'));
      tab.splice(index,1);
      tab.push(task);

      localStorage.setItem('tasks',JSON.stringify(tab));
      $scope.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  }
]);
