class Motors {
    constructor(motors) {
        this.motors = motors;
    }

    get(name) {
        return this.motors[name];
    }
}