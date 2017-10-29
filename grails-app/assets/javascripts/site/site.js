//= require jquery-3.2.1


var cText = {
    '.titleLabel': {
        initial: 2000,
        speed: 35,
        text: [
            { text: "Welcome to " },
            { text: "Aleks Tamarkin", style: { color: "orange" } },
            { text: "'s portfolio." }
        ]
    },
    '.descLabel': {
        initial: 0,
        speed: 8,
        text: [
            {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed mauris non libero aliquam bibendum vestibulum \
            nec dui. In fringilla sagittis mi, eu mollis nibh maximus id. Cras id diam aliquet, fermentum orci eu, venenatis \
            neque. Nulla commodo consectetur ante ac tempor. Maecenas sit amet pulvinar lacus. Donec nec orci sem. Proin \
            aliquam eros ac libero mollis, ac fringilla nisi interdum. Vestibulum tincidunt porta justo rhoncus malesuada. \
            Aenean eu ligula arcu. In a blandit tellus. Aliquam nisl ante, volutpat at imperdiet eu, iaculis et eros. \
            In rutrum risus ut nunc luctus interdum. Pellentesque quis ante ut metus tincidunt vehicula et luctus tellus. \
            Nulla porttitor tincidunt dui non iaculis. Proin rhoncus varius mauris, et fermentum lorem tempor ut. Donec \
            in sapien nec arcu suscipit tristique. Morbi efficitur congue efficitur. Cras mauris felis, aliquam in lorem \
            quis, pellentesque dignissim magna. Donec euismod, diam quis interdum sollicitudin, dolor lectus gravida \
            nunc, quis scelerisque arcu enim in arcu. Pellentesque varius lacinia mauris, eu condimentum lacus. Aliquam \
            bibendum ligula in erat tempus ultrices. Mauris porttitor eros ut consequat bibendum. Orci varius natoque \
            penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent porta porta lectus in blandit.'}
        ]
    }
}



function cpuText(id, cb) {
    var dat = cText[id];
    var widget = $(id);
    var chars = dat.text.reduce(function (a, b) { return a + b.text }, "");
    var blank = $("<label />");
    blank.text(chars);
    blank.css("color", "rgba(0,0,0,0)");

    console.log(widget, blank);
    widget.append(blank);


    var wIdx = 0;
    var cIdx = 0;
    var tIdx = 0
    var start = new Date().getTime();

    var layerDiv = $("<div class='layerDiv'/>");
    widget.append(layerDiv);

    var uLabel = $("<label>_</label>");
    layerDiv.append(uLabel);
    layerDiv.css({
        top: blank.position().top,
        left: blank.position().left,
        width: blank.outerWidth(),
        height: blank.outerHeight()
    });

    var lastLabel;

    var intv = setInterval(function () {
        var time = new Date().getTime() - start;
        if (time < dat.initial) {
            uLabel.css("display", (((time / 300) | 0) % 2) ? "block" : "none");
        } else {
            function setLastLabel(i) {
                lastLabel = $("<label />");
                if (dat.text[i].style) lastLabel.css(dat.text[i].style);
                layerDiv.append(lastLabel);
            }

            if (!lastLabel) {
                setLastLabel(0);
            }
            var tVal = parseInt((time - dat.initial) / dat.speed);
            if (tVal > tIdx) {
                console.log("update", tVal);
                widget.empty();
                var c = 0;
                var quit = true;
                dat.text.forEach(function (ta) {
                    if (c < tVal) {
                        var left = tVal - c;
                        var label = blank = $("<label />");
                        if (ta.style) label.css(ta.style);
                        widget.append(label);
                        if (left >= ta.text.length) {
                            label.text(ta.text);
                            c += ta.text.length;

                            console.log(ta.text);
                        } else {
                            label.text(ta.text.substr(0, left));
                            c += left;

                            var blank = $("<label />");
                            blank.css("color", "rgba(0,0,0,0)");
                            blank.text(ta.text.substr(left));
                            widget.append(blank);
                            quit = false;
                        }
                    } else {
                        var blank = $("<label />");
                        blank.css("color", "rgba(0,0,0,0)");
                        blank.text(ta.text);
                        widget.append(blank);
                        quit = false;
                    }
                });


                tIdx = tVal;

                if (quit) {
                    clearInterval(intv);
                    cb();
                }
            }
        }
    }, 15);

}



$(document).ready(function () {

    console.log("ypp");


    cpuText('.titleLabel', function next() {
        cpuText('.descLabel');
    });
});