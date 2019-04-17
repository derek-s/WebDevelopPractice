window.onload = function () {
    //食物 自调用函数
    (function () {
        var elements = [];

        //食物构造函数
        function Food(x, y, width, height, color) {
            this.x = x || 0;
            this.y = y || 0;
            this.width = width || 20;
            this.height = height || 20;
            this.color = color || "Red";
        }

        //初始化方法
        Food.prototype.init = function (map) {
            //保证每一次只产生一个食物
            removeFood();
            //创建食物用DIV
            var div = document.createElement("div");
            //加入地图
            map.appendChild(div);

            //设置样式
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.backgroundColor = this.color;
            div.style.position = "absolute";
            //坐标
            this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
            this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
            div.style.left = this.x + "px";
            div.style.top = this.y + "px";

            //食物加入数组
            elements.push(div);
        };

        //删除食物
        function removeFood() {
            for (var i = 0; i < elements.length; i++) {
                var ele = elements[i];
                //从地图中删除
                ele.parentNode.removeChild(ele);
                //从数组中删除
                elements.splice(i, 1);
            }
        }

        //将Food构造函数暴露给全局
        window.Food = Food;
    }());

    //蛇 自调用函数
    (function () {
        var elements=[];
        function Snake(width, height, direction){
            //样式
            this.width=width||20;
            this.height=height||20;
            this.direction=direction||"right";
            this.body=[
                {x:3,y:2,color:"darkgreen"},
                {x:2,y:2,color:"lightgreen"},
                {x:1,y:2,color:"lightgreen"}
            ];
        }
        //初始化方法
        Snake.prototype.init=function(map) {
            remove();
            for(var i =0;i<this.body.length; i++){
                var obj = this.body[i];
                var div = document.createElement("div");
                map.appendChild(div);
                div.style.position="absolute";
                div.style.width=this.width + "px";
                div.style.height=this.height + "px";
                div.style.left=obj.x * this.width + "px";
                div.style.top=obj.y * this.height + "px";
                div.style.backgroundColor=obj.color;
                elements.push(div);
            }
        };

        //移动方法
        Snake.prototype.move=function(food, map){
          var i = this.body.length - 1;
          for(; i>0; i--){
              this.body[i].x = this.body[i-1].x;
              this.body[i].y = this.body[i-1].y;
          }
          switch (this.direction){
              case "right": this.body[0].x += 1; break;
              case "left": this.body[0].x -= 1; break;
              case "top": this.body[0].y -= 1; break;
              case "bottom": this.body[0].y += 1; break;
          }
        };

        function remove() {
            var i = elements.length - 1;
            for(;i>=0;i--){
                var ele = elements[i];
                ele.parentNode.removeChild(ele);
                elements.splice(i, 1);
            }
        }

        window.Snake=Snake;
    }());

    //游戏 自调用函数
    (function(){
        var that = null;
        function Game(map) {
            this.food = new Food;
            this.snake = new Snake;
            this.map = map;
            that = this;
        }
        //游戏初始化方法
        Game.prototype.init = function () {
            this.food.init(this.map);
            this.snake.init(this.map);
            this.run(this.food, this.map);
        };

        Game.prototype.run = function (food, map) {
            var timeId = setInterval(function () {
                this.snake.move(food, map);
                this.snake.init(map);

                var maxX = map.offsetWidth / this.snake.width;
                var maxY = map.offsetHeight / this.snake.height;
                var snakeHeadX = this.snake.body[0].x;
                var snakeHeadY = this.snake.body[0].y;

                if(snakeHeadX<0 || snakeHeadX >= maxX){
                    clearInterval(timeId);
                    alert("GG");
                }
                if(snakeHeadY<0 || snakeHeadY >= maxY){
                    clearInterval(timeId);
                    alert("GG");
                }
            }.bind(that), 150);


        };
        window.Game = Game;
    }());

    var map = document.getElementById("map");
    var game = new Game(map);
    game.init();

};