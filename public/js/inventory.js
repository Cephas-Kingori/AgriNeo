$(document).ready(function(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          // User is signed in.
          console.log("we are in");
          const mkoolima_user = firebase.auth().currentUser;
          if(mkoolima_user.emailVerified == false){

            var parent_banner = document.getElementById("outer_banner");
            var verify_banner = document.createElement('div');
            verify_banner.classList.add("alert");
            verify_banner.classList.add("alert-danger");
            verify_banner.classList.add("alert-dismissible");
            verify_banner.classList.add("fade");
            verify_banner.classList.add("show");

            verify_banner.setAttribute("role", "alert");
            verify_banner.setAttribute("id", "verify_banner");

            var banner_inner_html = `<strong>
            <p><h4><i class="fas fa-exclamation-triangle"></i>Verify your email before acessing the inventory!</h4></p></strong> 
            <hr>
            This message will disappear automatically after 5 minutes. <br>
            <hr> 
            Please check your email inbox for the verification link which was sent and click it and then refresh this page. <strong>Permission to store your inventory will be denied!
            </strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" style="outline: none;">
              <span aria-hidden="false">&times;</span>
            </button>`;
            verify_banner.innerHTML = banner_inner_html;
            parent_banner.appendChild(verify_banner);


            setTimeout(function(){        
              $("#verify_banner").fadeOut(300000, 'linear');
            }, 100); 
          }else{
            //force refresh on the user token if a  user verifies their email
            firebase.auth().currentUser.getIdToken(true);

            //get the the updated details
            firebase.auth().currentUser.reload();

          }

          const uid = mkoolima_user.uid;
                   
          ///////////////////////////////////////////////////////////////////////////////////
          getData(uid);  
          getEmployee(uid);
          getTasks(uid);
          ///////////////////////////////////////////////////////////////////////////////
      } else {
          console.log("Not logged in");
          window.location.replace("login.html");
      }
      });
      $('#employee_form').validate({
        debug: false,
        rules: {
          fname: {
            required: true,
            maxlength: 32,
          },
          lname:{
            required: true,
            maxlength: 32,
          },
          role: {
            required: true,
            maxlength: 32,
          },
          salary: {
            required: true,
            number: true,
            min: 0,
          },
          tax_pin:{
            required: true,
            maxlength: 20,  
          }
        },
        messages: {
          salary:{
              min: "Invalid salary amount",
          }
        },
      });
      $('#equipment_form').validate({
        debug: false,
        rules: {
          equipment: {
            required: true,
            
          },
          quantity: {
            required: true,
            number: true,
            min: 1,
          },
          description:{
            required: true,
            maxlength: 256,  
          }
        },
        messages: {
          description: {
            maxlength: "Too long",
          },
          quantity:{
              min: "Invalid quantity of equipment",
          }
        },
      });
      $('#add_task_form').validate({
        debug: false,
        rules: {
          taskname: {
            required: true, 
          },
        },
      });
  });


  function getUser(){

    //force refresh on the user token if a  user verifies their email
    firebase.auth().currentUser.getIdToken(true);
    //get the the updated details
    firebase.auth().currentUser.reload();
  
    const current_user = firebase.auth().currentUser;
    var uid = current_user.uid;
    return uid;     
  }

  function getData(){
    var uid = getUser();
    /* GET EQUIPMENT DATA */
    var keys = 0;
    var tbodyRef = document.getElementById('eq_table').getElementsByTagName('tbody')[0];
    tbodyRef.replaceChildren();
    firebase.database().ref('equipment').child(uid).child('/').once('value', function(snapshot){
      snapshot.forEach(function(childSnap){
        var childKey = childSnap.key;
        var childdat = childSnap.val();
    
        var row = tbodyRef.insertRow(keys);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        cell1.innerHTML = "<div class='font-weight-bold'>"+childdat['eq_name']+"</div>";
        cell2.innerHTML = childdat['eq_num'];
        cell3.innerHTML = "<div class='font-weight-medium'>"+childdat['eq_desc']+"</div>";
        cell4.innerHTML = `<div><button class="btn btn-sm btn-danger" value="${childKey}" onclick="delete_equipment_record(this.value);">Delete</button></div>`
        keys = keys +1;

      });

    });
  }

  function getTasks() {
        var uid = getUser();
          /*GET TASKS DATA */
          var keys = 0;
          var todolist = document.getElementById('todolist');
          todolist.replaceChildren();

          firebase.database().ref("todo").child(uid).child('/').once('value', function(snapshot){
            snapshot.forEach(function(childSnap){
              var childKey = childSnap.key;
        
              var childdat = childSnap.val();    
      
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
              inp.setAttribute('id', childKey);
              inp.setAttribute('onclick', `update_task("${childKey}");`);
              sp.appendChild(document.createTextNode(childdat['task_name']));
              i.setAttribute('class', 'fas fa-1x fa-times');
              
              i.setAttribute('onclick', `delete_task("${childKey}");`);
              div.appendChild(inp);
      
              div.appendChild(sp);
              li.appendChild(div);
              li.appendChild(i);
              todolist.appendChild(li);
      
              keys = keys +1;
      
            });
      
          });

  }

  function getEmployee(){
    var uid = getUser();
    /*GET EMPLOYEE DATA */
    var keys = 0;
    var tbodyRef = document.getElementById('employee').getElementsByTagName('tbody')[0];
    tbodyRef.replaceChildren();
    firebase.database().ref("employee").child(uid).child('/').once('value', function(snapshot){
      snapshot.forEach(function(childSnap){
        var childKey = childSnap.key;
        var childdat = childSnap.val();

        var row = tbodyRef.insertRow(keys);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        cell1.innerHTML = "<div class='font-weight-bold'>"+childdat['first_name']+"</div>";
        cell2.innerHTML = "<div class='font-weight-bold'>"+childdat['last_name']+"</div>";
        cell3.innerHTML = "<div class='font-weight-medium'>"+childdat['role']+"</div>";
        cell4.innerHTML = "<div class='font-weight-bold'>"+childdat['tax_pin']+"</div>";
        cell5.innerHTML = "<div class='font-weight-medium'>"+childdat['salary']+"</div>";
        cell6.innerHTML = `<div><button class="btn btn-sm btn-danger" value="${childKey}" onclick="delete_employee_record(this.value);">Delete</button></div>`;

        keys = keys +1;

      });

    });
  }

document.getElementById("equipment_form").addEventListener('submit', function(e) {
    e.preventDefault();
    //if the form is valid
    $("#equipment_form").submit(function () {
        if ($(this).valid()) {
            //prevent double submissions
        if($(this).data === "sumitted"){
            e.preventDefault();
        }else{
            $(this).data = "submitted";
        }
        const form = document.getElementById('equipment_form'); 
        var equipment = document.getElementById('equipment').value;
        var quantity = document.getElementById('quantity').value;
        var description = document.getElementById('description').value;
        var uid = getUser();
        form.reset();
        firebase.database().ref("equipment").child(uid).push({
            eq_name: equipment,
            eq_num: quantity,
            eq_desc: description
        }).then(function(response){
            form.reset();
            swal({
              title: "Equipment Saved!",
              text: "View details in the table below",
              icon: "success",
            });
            getData();

          }).catch((error)=> {
            swal({
                title: "Error",
                text: error.message,
                icon: "error",
            })
          })
        }
    });
});

document.getElementById("employee_form").addEventListener('submit', function(e) {
    e.preventDefault();
    //if the form is valid
    $("#employee_form").submit(function () {
        if ($(this).valid()) { 
                     //prevent double submissions
        if($(this).data === "sumitted"){
            e.preventDefault();
        }else{
            $(this).data = "submitted";
        }
        const form = document.getElementById('employee_form'); 
        var fname = document.getElementById('fname').value;
        var lname = document.getElementById('lname').value;
        var role = document.getElementById('role').value;
        var tax_pin = document.getElementById('tax_pin').value;
        var salary = document.getElementById('salary').value;
        var uid = getUser();
        form.reset();
        firebase.database().ref("employee").child(uid).push({
            first_name: fname,
            last_name: lname,
            role: role,
            salary: salary,
            tax_pin: tax_pin,
        }).then(function(response){
            swal({
              title: "Employee Details Saved!",
              text: "View details in the table below",
              icon: "success",
            });
            getEmployee();

          }).catch((error)=> {
            swal({
                title: "Error",
                text: error.message,
                icon: "error",
            })
          })
        }
    });
});

document.getElementById("add_task_form").addEventListener('submit', function(e) {
    e.preventDefault();
    //if the form is valid
    $("#add_task_form").submit(function () {
        if ($(this).valid()) {
            //prevent double submissions
        if($(this).data === "sumitted"){
            e.preventDefault();
        }else{
            $(this).data = "submitted";
        }
        const form = document.getElementById('add_task_form'); 
        var task_name = document.getElementById('taskname').value;
  
        var uid = getUser();
        form.reset();
        firebase.database().ref("todo").child(uid).push({
            task_name: task_name,
            task_status:"todo"
        }).then(function(response){
            form.reset();
            swal({
              title: "Task Added",
              text: "completed",
              icon: "success",
            });
            getTasks();

          }).catch((error)=> {
            swal({
                title: "Error",
                text: error.message,
                icon: "error",
            })
          })
        }
    });
});

function delete_equipment_record(record_id){
    var uid = getUser();
    firebase.database().ref("equipment").child(uid).child(record_id).remove()
    .then(function(response){
        swal({
            title: "Record Deletion",
            text: "Status: completed",
            icon: "success",
        });
        getData();
    })
    .catch((error)=> {
        swal({
            title: "Error",
            text: error.message,
            icon: "error",
        })
      });
}

function delete_employee_record(record_id){
    var uid = getUser();
    firebase.database().ref("employee").child(uid).child(record_id).remove()
    .then(function(response){
        swal({
            title: "Record Deletion",
            text: "Status: completed",
            icon: "success",
        });
        getEmployee();
    })
    .catch((error)=> {
        swal({
            title: "Error",
            text: error.message,
            icon: "error",
        })
      });
}

function delete_task(record_id){
    var uid = getUser();

    firebase.database().ref("todo").child(uid).child(record_id).remove()
    .then(function(response){
        swal({
            title: "Task Deletion",
            text: "Status: completed",
            icon: "success",
        });
        getTasks();
    })
    .catch((error)=> {
        swal({
            title: "Error",
            text: error.message,
            icon: "error",
        })
      });
}

function update_task(record_id){
    var uid = getUser();

    var current_checkbox = document.getElementById(record_id);
    var grand_father = current_checkbox.parentElement.parentElement;

    var grand_father_class = grand_father.className;
    var updated_status;

    if(grand_father_class == "completed"){
        updated_status = "todo";
    }else{
        updated_status = "done";
    }

    firebase.database().ref("todo").child(uid).child(record_id).update({
        task_status: updated_status
    })
    .then(function(response){
        swal({
            title: "Task Updated",
            text: "Status: Successfully completed",
            icon: "success",
        });
        getTasks();
    })
    .catch((error)=> {
        swal({
            title: "Error",
            text: error.message,
            icon: "error",
        })
      });
}