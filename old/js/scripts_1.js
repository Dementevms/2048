/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var size = 4;
var board = [];
var score = 0;
var active = false;
var direction = 'left';
//console.log(width);

init();

//console.log('=====================');
//var rotate1 = rotate(board);
//
//console.log(rotate1);
//
//console.log('=====================');
//var rotate2 = rotate(rotate1);
//
//console.log(rotate2);


function init(){
    createBoard();
    createCell();
    setPosition();
    

//    for (let i = 0; i < 2; i++) {
//        create();
//    }
//    position();
//    console.log(board);
        
}

function createBoard(){
    let number = 0;
    for(let i = 0; i < size; i++){
        let r = [];
        for(let j = 0; j < size; j++){
            let cell = {};
            number++;
            cell.number = number;
            cell.value = 0;
            r.push(cell);
        }
        board.push(r);
    }
}

function createCell(){
    let number = getNumber();
    let cell = getCell();
    if(cell){
        cell.value = number;
        let html = document.createElement('div');
        html.setAttribute('class', 'cell n' + cell.number);
        html.setAttribute('data-color', cell.value);
        html.innerHTML = number;
        document.getElementById('board').appendChild(html);
    } else {
        createCell();
    }
}

function getNumber(){
    let r = random(0,100);
    if (r > 90) {
        return 4;
    }
    return 2;
}

function getCell(){
    let i = random(0,(size-1));
    let j = random(0,(size-1));
    let cell = board[i][j];
    if(cell.value === 0){
        return cell;
    } else {
        getCell();
    }
}

function setPosition(){
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            let cell = board[i][j];

            if(cell.value > 0){

                let html = document.querySelector('.n' + cell.number);
                let t = i*25;
                let l = j*25;
                html.style.top = t + '%';
                html.style.left = l + '%';
                setTimeout(function(){
                    html.innerHTML = cell.value;
                    html.setAttribute('data-color', cell.value);
                },100);
            } else {
                let html = document.querySelector('.n' + cell.number);
                if(html){
                    
                    switch(direction){
                        case 'up':
                            html.style.top = '-25%';
                            break;
                        case 'right':
                            html.style.right = '-25%';
                            break;
                        case 'down':
                            html.style.bottom = '-25%';
                            break;
                        case 'left':
                            html.style.left = '-25%';
                            break;
                    }
                    
                    
                    html.style.zIndex = -1;
                    setTimeout(function(){
                        html.remove();
                    },100);
                }
            }
            
        }
    }
}

function update(){
    setPosition();
    setTimeout(function(){
        createCell();
        setPosition();
        active = false;
        document.getElementById('score-value').innerHTML = score;
        gameover();
    },300);
    
    
}

function gameover(){
    let result = true;
    for(let i = 0; i < size; i++){
        for (let j = 0; j < size; j++) {
            if(board[i][j].value === 0){
                result = false;
            }
            if(j < size - 1){
                if (board[i][j].value === board[i][j + 1].value) {
                    result = false;
                }
                if (board[j][i].value === board[j + 1][i].value) {
                    result = false;
                }
            }
        }
    }
    
    if(result === true){
        console.log('GameOver');
        active = true;
    }
}


//function getClearCells(){
//    let cells = [];
//    for(let i = 0; i < size; i++){
//        for(let j = 0; j < size; j++){
//            let cell = board[i][j];
//            if(cell.value === 0){
//                cells.push(cell);
//            }
//        }
//    }
//    return cells;
//}


//function createCell(n){
//    
//    
//    
//    let cell = document.createElement('div');
//    cell.setAttribute('class','cell');
//    cell.innerHTML = n;
//    let b = document.getElementById('board');
//    b.appendChild(cell);
//}

//function create(){
//    let n = getNumber();
//    let cells = [];
//    for(let i = 0; i < board.length; i++){
//        let ar = board[i];
//        for(let j = 0; j < ar.length; j++){
//            if(ar[j] === 0){
////                cell = {};
////                cell.i = i;
////                cell.j = j;
//                cells.push([i,j]);
//            }
//        }
//    }
//    let l = cells.length-1;
//    let r = random(0, l);
//    let c = cells[r];
//    board[c[0]][c[1]] = n;
//    
//    let cl = 'cell i'+ c[0] + 'j' + c[1];
//    let cell = document.createElement('div');
//    cell.setAttribute('class',cl);
//    cell.innerHTML = n;
//    let b = document.getElementById('board');
//    b.appendChild(cell);
//}
//
//function position(){
//    for(let i = 0; i < board.length; i++){
//        for(let j = 0; j < board.length; j++){
//            let s = '.i'+ i + 'j' + j;
//            let cell = document.querySelector(s);
//            if(cell){
//                console.log(cell);
//                let t = i*25;
//                let l = j*25;
//                cell.style.top = t + '%';
//                cell.style.left = l + '%';
//            }
//        }
//    }
//}

var cursor = {};

document.onmousedown = function(e){
    cursor.x = e.pageX;
    cursor.y = e.pageY;
};

document.onmouseup = function(e){
    let dx = e.pageX - cursor.x;
    let dy = e.pageY - cursor.y;
    let mdx = Math.abs(dx);
    let mdy = Math.abs(dy);
    if(mdx > 50 || mdy > 50){   
        if(mdx > mdy){
            if(dx > 0){
                check('right');
            } else {
               check('left'); 
            }
        } else{
            if(dy > 0){
                check('down');
            } else {
               check('up'); 
            }
        }
    }
};

document.addEventListener('keydown', (event) => {
    
    if(event.code === 'ArrowUp'){
        check('up');
    }
    if(event.code === 'ArrowRight'){
        check('right');
    }
    if(event.code === 'ArrowDown'){
        check('down');
    }
    if(event.code === 'ArrowLeft'){
        check('left');
    }
    
});

function check(dir){
    if(active === false){
        active = true;
        direction = dir;
        switch(dir){
            case 'up':
                    rotate();
                    sum();
                    move();
                    rotate();
                break;
            case 'right':
                    reverse();
                    sum();
                    move();
                    reverse();
                break;
            case 'down':
                    rotate();
                    reverse();
                    sum();
                    move();
                    reverse();
                    rotate();
                break;
            case 'left':
                    sum();
                    move();
            break;    
        }
    
        update();
    }
};

function reverse (){
    for(let i = 0; i < board.length; i++){
        board[i].reverse();
    }
}

function rotate (){
    let a = [];
    for(let i = 0; i < board.length; i++){
        let _a = [];
        for(let j = 0; j < board.length; j++){
            _a.push(board[j][i]);
        }
        a.push(_a);
    }
    board = a;
}

function sum(){
    let ar;
    for(let r = 0; r < board.length; r++){
        ar = board[r];
        for(let i = 0; i < ar.length; i++){
            if(i <= ar.length){
                _s(i);
            }
        }
    }
    
    function _s(i){
        for (let j = i + 1; j < ar.length; j++) {
            
            if(ar[i].value < ar[j].value || ar[i].value > ar[j].value && ar[j].value !== 0){
                return;
            } else {
                if (ar[i].value === ar[j].value) {
                    let sum = ar[i].value + ar[j].value;
                    score = score + sum;
                    ar[i].value = sum;
                    ar[j].value = 0;
                    return;
                }
            }
        }
    }
}

function move(){
    for(let r = 0; r < board.length; r++){
        let ar = board[r];
        for(let i = ar.length - 1; i >= 0 ; i--){
            for(let j = i; j < ar.length; j++){
                if(ar[j-1]){
                    if(ar[j-1].value === 0){
                        let _t = ar[j-1];
                        ar[j-1] = ar[j];
                        ar[j] = _t;
                    }                    
                }
            }
        }
    }
}

function random(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}



//function checkLeft(){
//    function sum(){
//        for(let i = 0; i < ar.length; i++){
//            console.log('i: ' + i);
//            if(i <= ar.length){
//                _sum(i);
//            }
//        }
//        function _sum(i){
//            for (let j = i + 1; j < ar.length; j++) {
//                console.log('ar[i]: ' + ar[i] + 'ar[j]' + ar[j]);
//                if (ar[i] === ar[j]) {
//                    console.log('Plus' );
//                    ar[i] = ar[i] + ar[j];
//                    ar[j] = 0;
//                    return;
//                }
//            }
//        }
//    }
//
//    sum();
//    move(1);
//};

//function checkRight(){
//    
//    function sum(){
//        
//        for (let i = ar.length; i >= 0; i--) {
//            if (i >= 0) {
//                sumR(i);
//            }
//        }
//        
//    }
//    
//    function _sum(i){
//        
//        for(let j = i-1; j >= 0; j--){
//            if(ar[i] < ar[j]){
//                return;
//            } else {
//                if(ar[i] === ar[j] && ar[_i] !== 0 && ar[j] !== 0){
//                    ar[i] = ar[i] + ar[j];
//                    ar[j] = 0;
//                    return;
//                }
//            }
//        }
//        
//    }
//    
//    
//}

//
//
//
//function move(){
//    console.log('Move');    
//    for(let i = ar.length - 1; i >= 0 ; i--){
//        for(let j = i; j < ar.length; j++){
//            if(ar[j-1] === 0){
//                ar[j-1] = ar[j];
//                ar[j] = 0;
//            }
//        } 
//    }
//}
//

//
//function checkL(){
//    console.log(ar);
//    for(let i = 0; i < 4; i++){
//        if(i < 4){
//            sumL(i);
//        }
//    }
//    moveL();
//    console.log(ar); 
//}
//
//function sumL(_i){
//    for(let j = _i+1; j < 4; j++){
//        if(ar[_i] === ar[j] && ar[_i] !== 0 && ar[j] !== 0){
//            ar[_i] = ar[_i] + ar[j];
//            ar[j] = 0;
//            return;
//        }
//    }
//    
//}
//
//function moveL (){
//    for(let i = 3; i >= 0 ; i--){
//        if(ar[i-1] === 0){
//            ar[i-1] = ar[i];
//            ar[i] = 0;
//        } 
//    }
//}

//
//function checkR(){
//    console.log(ar);
//    for(let i = 3; i >= 0; i--){
//        if(i >= 0){
//            sumR(i);
//        }
//        
////        if(ar[i+1] === 0){
////            ar[i+1] = ar[i];
////            ar[i] = 0;
////        } else {
////           if(ar[i+1] === ar[i]){
////               ar[i+1] = ar[i] + ar[i+1];
////               ar[i] = 0;
////           } 
////        }
//    }
//    moveR();
////    ar[0] = 2;
//    create();
//    console.log(ar);
//    gameover();
//   
//}
//
//function create(){
//    let cells = [];    
//    for(let i = 0; i<4; i++){
//        if(ar[i] == 0){
//            cells.push(i);
//        }
//    }
//    let l = cells.length-1;
//    let r = random(0, l);
//    let n = cells[r];
//    ar[n] = 2;
//    
//}
//
//function gameover(){
//    let r = true;
//    for(let i = 0; i<4; i++){
//        if(ar[i] === 0 || ar[i] === ar[i+1]){
//            r = false;
//        }
//    }
//    if(r === true){
//        console.log('Game Over');
//    }
//}
//
//
//function sumR(_i){
//    for(let j = _i-1; j >= 0; j--){
//        if(ar[_i] < ar[j]){
//            return;
//        } else {
//            if(ar[_i] === ar[j] && ar[_i] !== 0 && ar[j] !== 0){
//                ar[_i] = ar[_i] + ar[j];
//                ar[j] = 0;
//                return;
//            }
//        }
//    }
//}
//
//function moveR(){
//    for(let i = 3; i >= 0 ; i--){
//        for(let j = i; j < 4; j++){
//            if(ar[j+1] === 0){
//                ar[j+1] = ar[j];
//                ar[j] = 0;
//            }
//        } 
//    }
//}
//
//function random(min, max) {
//    let rand = min - 0.5 + Math.random() * (max - min + 1);
//    rand = Math.round(rand);
//    return rand;
//}