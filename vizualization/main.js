let image_url = {
    'full': 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Take_it_easy_Tiles.svg',
    '512px': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Take_it_easy_Tiles.svg/512px-Take_it_easy_Tiles.svg.png',
    '386px': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Take_it_easy_Tiles.svg/386px-Take_it_easy_Tiles.svg.png',
};

let size = {
    'full': ['202px', '176px'],
    '512px': ['146px', '127px'],
    '386px': ['108px', '95px'],
};

let bias = {
    'full': ['5px', '5px'],
    '512px': ['3px', '3px'],
    '386px': ['2px', '2px'],
};

let sprite_pos = {
    'full': {
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
    },
    '512px': {
        '1,3,2': [-4, -10],
        '1,3,6': [-4, -161],
        '1,3,7': [-4, -312],
        '1,4,2': [-4, -463],
        '1,4,6': [-4, -614],
        '1,4,7': [-4, -765],
        '1,8,2': [-4, -916],
        '1,8,6': [-4, -1068],
        '1,8,7': [-4, -1219],

        '5,3,2': [-183, -10],
        '5,3,6': [-183, -161],
        '5,3,7': [-183, -312],
        '5,4,2': [-183, -463],
        '5,4,6': [-183, -614],
        '5,4,7': [-183, -765],
        '5,8,2': [-183, -916],
        '5,8,6': [-183, -1068],
        '5,8,7': [-183, -1219],

        '9,3,2': [-362, -10],
        '9,3,6': [-362, -161],
        '9,3,7': [-362, -312],
        '9,4,2': [-362, -463],
        '9,4,6': [-362, -614],
        '9,4,7': [-362, -765],
        '9,8,2': [-362, -916],
        '9,8,6': [-362, -1068],
        '9,8,7': [-362, -1219],
    },
    '386px': {
        '1,3,2': [-4, -8],
        '1,3,6': [-4, -122],
        '1,3,7': [-4, -236],
        '1,4,2': [-4, -349],
        '1,4,6': [-4, -463],
        '1,4,7': [-4, -577],
        '1,8,2': [-4, -691],
        '1,8,6': [-4, -805],
        '1,8,7': [-4, -919],

        '5,3,2': [-138, -8],
        '5,3,6': [-138, -122],
        '5,3,7': [-138, -236],
        '5,4,2': [-138, -349],
        '5,4,6': [-138, -463],
        '5,4,7': [-138, -577],
        '5,8,2': [-138, -691],
        '5,8,6': [-138, -805],
        '5,8,7': [-138, -919],

        '9,3,2': [-274, -8],
        '9,3,6': [-274, -122],
        '9,3,7': [-274, -236],
        '9,4,2': [-274, -349],
        '9,4,6': [-274, -463],
        '9,4,7': [-274, -577],
        '9,8,2': [-274, -691],
        '9,8,6': [-274, -805],
        '9,8,7': [-274, -919],
    },
};


let draw_solution = function() {
    let solutions = JSON.parse(localStorage.getItem('solutions'));
    let index = Number($('#n_sol').val());
    if(index >= 0 && index < solutions.length) {
        let board_size = $('#board-size').val();
        let img_url = image_url[board_size];
        document.documentElement.style.setProperty('--width', size[board_size][0]);
        document.documentElement.style.setProperty('--height', size[board_size][1]);
        document.documentElement.style.setProperty('--bias-x', bias[board_size][0]);
        document.documentElement.style.setProperty('--bias-y', bias[board_size][1]);
        solutions[index].forEach(function (val, index, arr) {
            let pos = sprite_pos[board_size][val.join(',')].map((val, index, arr) => `${val}px`).join(' ');
            $('#site' + index).css('background', `url("${img_url}") ` + pos);
        });
        let score = solutions[index].map(function (val, index, arr) {
            return val.reduce((x, y) => x+y, 0);
        }).reduce((x, y) => x+y, 0);
        $('#score').text(`${score}`);
    }
};

$('#board-size').on('change', function () {
    draw_solution();
});

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
