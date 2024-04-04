class Actions {
    constructor(list, motors, sliders, network) {
        this.sliders = sliders;
        this.network = network;
        this.actions = {};
        for (var i in list) {
            var name = i;
            var obj = list[i];
            for (var j in obj) {
                obj[j].port = motors.get(obj[j].motor);
                this.actions[name] = obj;
            }
        }
    }

    do(name) {
        var arr = [];
        var action = this.actions[name];
        for (var i in action) {
            var speed = action[i].speed;
            if (typeof speed == "string") speed = this.sliders.value(speed);
            if (action[i].inverted) speed = -speed;
            arr.push([action[i].port, speed]);
        }
        this.network.setMotorsSpeeds(arr);
    }
}