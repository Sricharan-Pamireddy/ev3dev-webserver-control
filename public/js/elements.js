class Elements {
    constructor(list) {
        this.elements = {};
        for (var i in list) {
            var name = i;
            var min = list[i].min;
            var max = list[i].max;

            var div = document.createElement("div");
            div.className = "slideContainer";

            var input = document.createElement("input");
            input.type = "range";
            input.min = min;
            input.max = max;
            input.value = (min + max)/2;
            input.className = "slider";

            let obj = {};
            obj.name = name;
            obj.value = input.value;
            input.oninput = function() {
                obj.value = this.value;
            }
            div.appendChild(input);
            obj.element = div;
            this.elements[name] = obj;
        }
    }

    get(name) {
        return this.elements[name].element;
    }

    value(name) {
        return this.elements[name].value;
    }
}