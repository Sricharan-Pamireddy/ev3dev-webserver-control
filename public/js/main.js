var socket = io();

var config, motors, elements, actions;

(async () => {
    config = (await fetch('./webConfig.json'));
    config = await config.json();
    console.log(config);

    motors = new Motors(config.motors);
    elements = new Elements(config.sliders);

    actions = new Actions(config.actions, motors, elements);
})();
