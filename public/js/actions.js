class Actions {
    constructor(list, motors, sliders) {
        this.sliders = sliders;
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
            var speed = this.sliders.value(action[i].speed);
            if (action[i].inverted) speed = -speed;
            arr.push([action[i].port, speed]);
        }

        console.log(arr);
    }
}