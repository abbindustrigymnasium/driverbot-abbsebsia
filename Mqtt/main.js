// Called after form input is processed
var socket = io()
var speed = 0;
var turning = 0;
var oldTurning = 0;
var oldSpeed = 0;

function Drive(){
    
        socket.emit("data", {speed: speed, turning: turning});
}
function ActivateButton(i,color){
    var y = document.getElementById("DriverText");
    y.innerHTML = ' ';
    document.getElementById("driverButton" + i).style.backgroundColor = color;
    y.innerHTML += 'Speed:' + ' ' + speed + '   ' + 'Turning:' + ' ' + turning*90 +'°';
}

function StartDriver(){
    var x = document.getElementById("buttons");
    var y = document.getElementById("DriverText");
 
    x.style.display = "block";
    y.style.display = "block";
    
    y.innerHTML += 'Driverbot STARTED';
 
  
};

window.addEventListener("keydown", (event) => {
    //console.log(event.key);
    if(event.key === "ArrowLeft"){
        if(oldTurning != 1) {
            turning = 1; 
            Drive();
            ActivateButton(1, 'red')  
            oldTurning = turning;
        }
    }else if(event.key === "ArrowRight") {
        if(oldTurning != 2){
            turning = 2;
            Drive();
            ActivateButton(4, 'red') 
            oldTurning = turning;
        }
        
    }else if(event.key === "ArrowUp") {
        if(oldSpeed != 800){
            speed = 800;
            Drive();
            ActivateButton(3, 'red')  
            oldSpeed = speed;
        }
     
    }else if(event.key === "ArrowDown") {
        if(oldSpeed != -800){
        speed = -800;
        ActivateButton(2, 'red') ;
        Drive(); 
        oldSpeed = speed;
        }
        
    }

   
    
    
});
window.addEventListener("keyup", (event) => {
    //console.log(event.key);
    if(event.key === "ArrowLeft"){
        turning = 0;
        oldTurning = 0;
        ActivateButton(1, '#44c767')
        Drive();
    }else if(event.key === "ArrowRight") {
        turning = 0;
        oldTurning = 0;
        ActivateButton(4, '#44c767')
        Drive();
    }else if(event.key === "ArrowUp") {
        speed = 0;
        oldSpeed = 0;
        ActivateButton(3, '#44c767')
        Drive();
    }else if(event.key === "ArrowDown") {
        speed = 0;
        oldSpeed = 0;
        ActivateButton(2, '#44c767')
        Drive();
    }

    
    
});


   



   