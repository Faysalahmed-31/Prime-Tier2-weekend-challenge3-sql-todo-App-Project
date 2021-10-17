//console.log('JQ');

$( document ).ready(onReady)
$(document).on('click', '.completeBtn', completeTask);

function onReady() {
    console.log('ready!');
    getTasks();
    $('#submitBtn').on('click', postTasks);
}


function postTasks() {
    let tasksObject = {
        task: $('#taskInput').val(),
    }
    $.ajax({
        method: 'POST',
        url: '/list',
        data: tasksObject
    }).then( function (response) {
        $('#taskInput').val(''),
        $('#taskInput').focus();
        getTasks();
    });
}


function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/list'
    }).then(function (response) {
        console.log("get response", response);

        //empty list
        $('#displayList').empty();
        // append data to the DOM
        for (let i = 0; i < response.length; i++) {
            $('#displayList').append(`
                <li>${response[i].task}
                    <button class="completeBtn" data-id="${response[i].id}">Complete</button>
                    <button class="deleteBtn" data-id="${response[i].id}">Delete</button>
                </li>
            `);
        }
    });
}

function completeTask() {
    let id = $(this).data('id')/*get the id of the row*/
    console.log('id of clicked is: ', id);
    
    $.ajax({
      method: 'PUT',
      url: `/list/${id}`
    }).then((res) => {
      console.log('Succesfully updated the tasks.', res);
              
        $(this).parent().css('color','greenyellow');
    //  setTimeout(function(){           
       // $(this).css('color','greenyellow');
       // }, 1200);
        let that = this;
        
        $(that).parent().css('text-decoration','line-through');


    }).catch((error) => {
      console.log('/PUT request failed: ', error);
      alert('Check console for error. PUT request failed.')
    });
}