class Network {
    constructor(socket) {
        this.socket = socket;
    }

    setMotorsSpeeds(arr) {
        this.socket.emit("setMotorsSpeeds", arr);
        console.log("hmm");
    }
}