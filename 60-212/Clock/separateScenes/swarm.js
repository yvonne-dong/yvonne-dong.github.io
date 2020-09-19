function drawSwarm(_system){
    // console.log("swarm stage")
    for (let m of _system){
        m.edges(center.x, center.y, 450);
        
        // start with 0.0, 0.0, 2.0
        // m.swarm(_system, 1.5, 1.5, 2.0);
        m.swarm(_system, 0.0, 0.0, 2.0);
        m.update();
        m.display();
        
    }
}