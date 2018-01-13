let image_url = 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Take_it_easy_Tiles.svg';

let sprite_pos = {
    '1,3,2': [-6, -14],
    '1,3,6': [-6, -223],
    '1,3,7': [-6, -432],
    '1,4,2': [-6, -642],
    '1,4,6': [-6, -851],
    '1,4,7': [-6, -1060],
    '1,8,2': [-6, -1269],
    '1,8,6': [-6, -1478],
    '1,8,7': [-6, -1688],

    '5,3,2': [-252, -14],
    '5,3,6': [-252, -223],
    '5,3,7': [-252, -432],
    '5,4,2': [-252, -642],
    '5,4,6': [-252, -851],
    '5,4,7': [-252, -1060],
    '5,8,2': [-252, -1269],
    '5,8,6': [-252, -1478],
    '5,8,7': [-252, -1688],

    '9,3,2': [-500, -14],
    '9,3,6': [-500, -223],
    '9,3,7': [-500, -432],
    '9,4,2': [-500, -642],
    '9,4,6': [-500, -851],
    '9,4,7': [-500, -1060],
    '9,8,2': [-500, -1269],
    '9,8,6': [-500, -1478],
    '9,8,7': [-500, -1688],
};

let draw_solution = function() {
    let solutions = JSON.parse(localStorage.getItem('solutions'));
    let index = Number($('#n_sol').val());
    if(index >= 0 && index < solutions.length) {
        solutions[index].forEach(function (val, index, arr) {
            let pos = sprite_pos[val.join(',')].map((val, index, arr) => `${val}px`).join(' ');
            $('#site' + index).css('background', `url("${image_url}") ` + pos);
        });
    }
};

$('#prev').on('click', function () {
    let jq_n_sol = $('#n_sol');
    let current_index = Number(jq_n_sol.val());
    if(current_index > 0) {
        jq_n_sol.val(current_index - 1);
        draw_solution();
    }
});

$('#next').on('click', function () {
    let jq_n_sol = $('#n_sol');
    let jq_n_max = $('#n_max');
    let current_index = Number(jq_n_sol.val());
    let max_index = Number(jq_n_max.text().slice(1, jq_n_max.text().length-1)) - 1;
    if(current_index < max_index) {
        jq_n_sol.val(current_index + 1);
        draw_solution();
    }
});

$('#n_sol').on('input', function () {
    draw_solution();
});

$('body').keypress(function (event) {
    switch(event.originalEvent.keyCode) {
        case 37: $('#prev').click(); break;
        case 39: $('#next').click(); break;
    }
});

$('#file').on('change', function (event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    $(reader).on('load', function (e) {
        let solutions = JSON.parse(e.target.result);
        $('#n_max').text(`(${solutions.length})`);
        $('#n_sol').val('0');
        localStorage.setItem('solutions', JSON.stringify(solutions));
        draw_solution();
    });
    reader.readAsText(file);
});
