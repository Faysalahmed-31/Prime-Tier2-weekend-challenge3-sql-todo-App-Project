//console.log('JQ');

$( document ).ready(onReady)

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