
// push 1 every 3 mins
function setupEmerge(_system, _pos){
    this.system = _system;
    this.newMayfly = new Mayfly(_pos);
    this.system.push(this.newMayfly);
}

function drawEmerge(_system){
    for (let m of _system){
        m.edges(center.x, center.y, 450);
        m.update();
        m.display();
    }
}