class Keybinds {
    constructor(actions, keybinds) {
        this.actions = actions;
        this.keybinds = keybinds;

        this.down = {};
        this.up = {};
        this.state = {};

        for (var i in this.keybinds.keydown) {
            var obj = this.keybinds.keydown[i];
            for (var j in obj.keycodes) {
                this.down[obj.keycodes[j]] = obj.action;
                this.state[obj.keycodes[j]] = false;
            }
        }

        for (var i in this.keybinds.keyup) {
            var obj = this.keybinds.keyup[i];
            for (var j in obj.keycodes) {
                this.up[obj.keycodes[j]] = obj.action;
                this.state[obj.keycodes[j]] = false;
            }
        }

        document.addEventListener("keydown", (key) => {
            if (!this.state[key.code]) {
                this.key(key.code, this.down);
                this.state[key.code] = true;
            }
        });

        document.addEventListener("keyup", (key) => {
            this.key(key.code, this.up);
            this.state[key.code] = false;
        });
    }

    key(keyCode, actionList) {
        this.actions.do(actionList[keyCode]);
    }
}