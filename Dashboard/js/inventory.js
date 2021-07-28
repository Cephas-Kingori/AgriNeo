const firebaseConfig = {
  apiKey: "AIzaSyAycvCsKb5nFuuatKIpXbi2Vk3DklS93-0",
  authDomain: "mkoolima-782e6.firebaseapp.com",
  databaseURL: "https://mkoolima-782e6-default-rtdb.firebaseio.com",
  projectId: "mkoolima-782e6",
  storageBucket: "mkoolima-782e6.appspot.com",
  messagingSenderId: "1028380163016",
  appId: "1:1028380163016:web:06b7f2e1acc2e8fd165efd",
  measurementId: "G-6KT3WN11FC"
};
firebase.initializeApp(firebaseConfig);

function getData(){
  var tbodyRef = document.getElementById('eq_table').getElementsByTagName('tbody')[0];
  console.log(tbodyRef);
  firebase.database().ref("Equipment").child('/').once('value', function(snapshot){
    snapshot.forEach(function(childSnap){
      var childKey = childSnap.key;
      var childdat = childSnap.val();
      console.log(childdat['eq_name']);

      var row = tbodyRef.insertRow(keys);

      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);

      cell1.innerHTML = "<div class='font-weight-bold'>"+childdat['eq_name']+"</div>";
      cell2.innerHTML = childdat['eq_num'];
      cell3.innerHTML = "<div class='font-weight-medium'>"+childdat['eq_desc']+"</div>";
      keys = keys +1;

    });

  });

}
getData();

function getTasks() {
  // Get Todo list task_status
  var todolist = document.getElementById('todolist');


  firebase.database().ref("Todo").child('/').once('value', function(snapshot){
    snapshot.forEach(function(childSnap){
      var childKey = childSnap.key;
      var childdat = childSnap.val();
      // var stat = childdat['eq_name']);


      var li = document.createElement("li");
      var div = document.createElement("div");
      var lbl = document.createElement("label");
      var inp = document.createElement("input");
      var i = document.createElement("i");
      var sp = document.createElement("span");

      if ((childdat['task_status'].localeCompare("done"))==0) {
        li.setAttribute('class','completed');
      }

      div.setAttribute('class','form-check form-check-flat form-check-label');
      inp.setAttribute('class','checkbox');
      inp.setAttribute('type','checkbox');
      sp.appendChild(document.createTextNode(childdat['task_name']));
      i.setAttribute('class','remove ti-close');
      div.appendChild(inp);

      div.appendChild(sp);
      li.appendChild(div);
      li.appendChild(i);
      todolist.appendChild(li);

      keys = keys +1;

    });

  });
}

getTasks();





function writeData() {
  var d = new Date();
  var n = d.getTime();
  firebase.database().ref("Equipment").child(n).set({
    eq_name:document.getElementById('equipment').value,
    eq_num:document.getElementById('number').value,
    eq_desc:document.getElementById('desc').value
  });

}

function addTask() {
  var d = new Date();
  var n = d.getTime();

  firebase.database().ref("Todo").child(n).set({
    task_name:document.getElementById('taskname').value,
    task_status:"todo",

  });
}



var keys = 0;
