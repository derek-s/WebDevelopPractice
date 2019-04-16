window.onload = function () {
    //自调用函数
    (function () {
        var elements=[];
        //食物构造函数
        function Food(x, y, width, height, color){
            this.x = x||0;
            this.y = y||0;
            this.width = width||20;
            this.height = height||20;
            this.color = color||"Red";
        }

        //添加初始化方法
        Food.prototype.init = function (map) {
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
            this.x = parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
            this.y = parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
            div.style.left = this.x + "px";
            div.style.top = this.y + "px";
        };

        //将Food构造函数暴露给全局
        window.Food = Food;
    }());

    var food = new Food();
    console.log(document.getElementById("map"));
    food.init(document.getElementById("map"));
};