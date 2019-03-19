function elementGoTarget( element, target ){
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var current = element.offsetLeft;
        var step = 10;
        step = current < target ? step : -step;
        current += step;
        if(Math.abs(current - target) > Math.abs(step)) {
            element.style.left = current + "px";
        }else{
            element.style.left = target + "px";
        }
    }, 20);
}