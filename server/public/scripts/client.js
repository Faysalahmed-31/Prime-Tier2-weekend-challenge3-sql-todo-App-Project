console.log('JQ');

$(document).ready(onReady);


function onReady() {
    console.log('ready!');
    
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