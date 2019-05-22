// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// The "Vehicle" class

class Vehicle {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 6;
    this.maxspeed = 8;
    this.maxforce = 0.2;
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {

    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    //flee로 만들어주는 거
    //desired.mult(-1);


    // Scale to maximum speed
    desired.setMag(this.maxspeed);
    //이게 검은색 화살 그 화살표 길이를 정해주는 //



    // Steering = Desired minus velocity
    //steering f = desired - vel
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    //파란색 화살표를 짧게 할 지 길게 할 지

    //속도에 속도가 빠지면 가속도가 생기는 거야.  내가 지금 가려는 방향에서 타겟으로 가려고 하면
    //한 벨로시티에서 에서 다른 벨로시티를 틀어주려면 그 화살표는 벡터 계산에서 뺴주는 거지.
    //반대또한 지금 가는 current vel 에서 target을 향하게 되면 똑같이 뺴줘야 해.
    // teer.limit(this.maxforce);가 힘을 틀어주게 해주는 거

    this.applyForce(steer);
  }

  display() {
    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + PI / 2;
    fill(127);
    stroke(200);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}
