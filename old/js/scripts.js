/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

let game = {
    size: 4,
    board: [],
    score: 0,
    active: false,
    dir: 'left',
    
    init: function(){
        this.createBoard();
        this.createCell();
        this.setPosition();
    },
    
    createBoard: function(){
        let number = 0;
        for(let i = 0; i < this.size; i++){
            let r = [];
            for(let j = 0; j < this.size; j++){
                let cell = {};
                number++;
                cell.number = number;
                cell.value = 0;
                r.push(cell);
            }
            this.board.push(r);
        }
    },
    
    createCell: function(){
        let number = this.getNumber();
        let cell = this.getCell();
        if(cell){
            cell.value = number;
            let html = document.createElement('div');
            html.setAttribute('class', 'cell n' + cell.number);
            html.setAttribute('data-color', cell.value);
            html.innerHTML = number;
            document.getElementById('board').appendChild(html);
        } else {
            this.createCell();
        }
    },
    
    getNumber: function (){
        let r = this.random(0,100);
        if (r > 90) {
            return 4;
        }
        return 2;
    },
    
    getCell: function(){
        let i = this.random(0,(this.size-1));
        let j = this.random(0,(this.size-1));
        let cell = this.board[i][j];
        if(cell.value === 0){
            return cell;
        } else {
            this.getCell();
        }
    },
    
    setPosition: function(){
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                let cell = this.board[i][j];

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
                        switch(this.dir){
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
    },
    
    update: function(){
        this.setPosition();
        setTimeout(function(){
            game.createCell();
            game.setPosition();
            game.active = false;
            document.getElementById('score-value').innerHTML = game.score;
            game.gameover();
        },300); 
    },
    
    gameover: function (){
        let result = true;
        for(let i = 0; i < this.size; i++){
            for (let j = 0; j < this.size; j++) {
                if(this.board[i][j].value === 0){
                    result = false;
                }
                if(j < this.size - 1){
                    if (this.board[i][j].value === this.board[i][j + 1].value) {
                        result = false;
                    }
                    if (this.board[j][i].value === this.board[j + 1][i].value) {
                        result = false;
                    }
                }
            }
        }

        if(result === true){
            console.log('GameOver');
            this.active = true;
            document.getElementById('gameover').setAttribute('class','active');
        }
    },
    
    turn: function (d){
        if(this.active === false){
            this.active = true;
            this.dir = d;
            switch(d){
                case 'up':
                        this.rotate();
                        this.sum();
                        this.move();
                        this.rotate();
                    break;
                case 'right':
                        this.reverse();
                        this.sum();
                        this.move();
                        this.reverse();
                    break;
                case 'down':
                        this.rotate();
                        this.reverse();
                        this.sum();
                        this.move();
                        this.reverse();
                        this.rotate();
                    break;
                case 'left':
                        this.sum();
                        this.move();
                break;    
            }

            this.update();
        }
    },
    
    reverse: function (){
        for(let i = 0; i < this.size; i++){
            this.board[i].reverse();
        }
    },

    rotate: function (){
        let a = [];
        for(let i = 0; i < this.size; i++){
            let _a = [];
            for(let j = 0; j < this.size; j++){
                _a.push(this.board[j][i]);
            }
            a.push(_a);
        }
        this.board = a;
    },

    sum: function (){
        let ar;
        for(let r = 0; r < this.size; r++){
            ar = this.board[r];
            for(let i = 0; i < this.size; i++){
                if(i <= this.size){
                    _s(i);
                }
            }
        }

        function _s(i){
            for (let j = i + 1; j < game.size; j++) {
                if(ar[i].value < ar[j].value || ar[i].value > ar[j].value && ar[j].value !== 0){
                    return;
                } else {
                    if (ar[i].value === ar[j].value) {
                        let sum = ar[i].value + ar[j].value;
                        game.score = game.score + sum;
                        ar[i].value = sum;
                        ar[j].value = 0;
                        return;
                    }
                }
            }
        }
    },

    move: function (){
        for(let r = 0; r < this.size; r++){
            let ar = this.board[r];
            for(let i = this.size - 1; i >= 0 ; i--){
                for(let j = i; j < this.size; j++){
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
    },

    random: function (min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    }
};

document.getElementById('btn').onclick = function(e){
    location.reload();
};

let cursor = {};

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
                game.turn('right');
            } else {
               game.turn('left'); 
            }
        } else{
            if(dy > 0){
                game.turn('down');
            } else {
               game.turn('up'); 
            }
        }
    }
};

document.addEventListener('keydown', (event) => {
    
    if(event.code === 'ArrowUp'){
        game.turn('up');
    }
    if(event.code === 'ArrowRight'){
        game.turn('right');
    }
    if(event.code === 'ArrowDown'){
        game.turn('down');
    }
    if(event.code === 'ArrowLeft'){
        game.turn('left');
    }
    
});

game.init();