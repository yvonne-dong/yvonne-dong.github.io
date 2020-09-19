function drawMate(_system){
    for (let m of _system){
        m.edges(center.x, center.y, 450);

        // start with 0.0, 0.0, 2.0
        // m.swarm(_system, 2.0, 2.0, 2.0);
        m.swarm(_system, 2.0, 1.8, 2.0);
        m.update();
        m.display();
        // console.log(_system.length);
    }
}