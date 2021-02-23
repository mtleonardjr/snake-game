canv=document.getElementById("canvas");
ctx=canv.getContext("2d");
document.addEventListener("keydown",keyPush);

//Position of snake starting position
px=py=10;

//Grid size/tile count
gs=tc=20;

//Apple starting position
ax=ay=15;

//Snake starting velocity
xv=yv=0;

//Starting tail and fps values
trail=[];
tail = 5;
fps = 10;

//Determines how many trail elements are added each time an apple is eaten
tailIncrease = 3;

//Determines by how much the fps is increased each time an apple is eaten
fpsIncrease = 1;

//Input functionality
function keyPush(e) {
    console.log(e)
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        xv = 1;
        yv = 0;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        xv = -1;
        yv = 0;
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        xv = 0;
        yv = -1;
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        xv = 0;
        yv = 1;
    }
}

function game() {
    setTimeout(function(){

        //update the snake position based on velocity
        px+=xv;
        py+=yv;

        //update the snake position if the snake has gone off the screen
        if(px<0) {
            px= tc-1;
        }
        if(px>tc-1) {
            px= 0;
        }
        if(py<0) {
            py= tc-1;
        }
        if(py>tc-1) {
            py= 0;
        }

        //animate the background
        ctx.fillStyle="black";
        ctx.fillRect(0,0,canv.width,canv.height);
    
        
        //     1. animates each element in the trail
        //     2. resets the tail length to 5 and fps to 10 if the trail element is equal to the snake's position
        //     3. addes the current position to the trail
        //     4. deletes the first element(s) in the trail so the trail matches the tail        
        ctx.fillStyle="lime";
        for(var i=0;i<trail.length;i++) {
            ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
            if(trail[i].x==px && trail[i].y==py) {
                tail = 5;
                fps = 10;
            }
        }
        trail.push({x:px,y:py});
        while(trail.length>tail) {
        trail.shift();
        }
    
        //If the snake and the apple arew in the same position
        //      1. the tail is increaed
        //      2. a new apple position is randomly created
        //      3. fps is increased
        if(ax==px && ay==py) {
            fps = fps + fpsIncrease;
            tail = tail + tailIncrease;
            ax=Math.floor(Math.random()*tc);
            ay=Math.floor(Math.random()*tc);
        }
        ctx.fillStyle="red";
        ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);

        requestAnimationFrame(game);

    },1000/fps) 
}

game();

