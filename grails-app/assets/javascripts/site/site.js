//= require jquery-3.2.1


function showDialog(text, cb) {
    var modal = $("#modal");
    var modalRoot = $("#modal-root");
    modal.css("visibility", "visible");
    modalRoot.empty();

    var pane = $("<div style='position: relative; max-width: 700px; padding: 20px' />");
    var label = $("<label class='modal-label' />");
    pane.append(label);
    var close = $("<input type='button' value='close' class='modal-button-close'  style='left: 50%; transform: translate(-50%); position: relative; display: block' />");
    close.click(function () {
        pane.remove();
        modal.css("visibility", "hidden");
        if (cb) cb();
    });
    pane.append(close);

    label.text(text);
    modalRoot.append(pane);
}

function showPopup(page, cb) {
    var modal = $("#modal");
    var modalRoot = $("#modal-root");
    modal.css("visibility", "visible");
    modalRoot.empty();

    var pane = $("<div style='position: relative; max-width: 700px; padding: 20px' />");

    pane.load(page);

    var close = $("<input type='button' value='close' class='modal-button-close'  style='left: 50%; transform: translate(-50%); position: relative; display: block' />");

    close.click(function () {
        pane.remove();
        modal.css("visibility", "hidden");
        if (cb) cb();
    });
    pane.append(close);

    modalRoot.append(pane);
}

var cText = {
    '.titleLabel': {
        initial: 2000,
        speed: 35,
        text: [
            {text: "Welcome to "},
            {text: "Aleks Tamarkin", style: {color: "orange"}},
            {text: "'s portfolio."}
        ]
    },
    '.contactLabel': {
        initial: 0,
        speed: 10,
        text: [
            {text: "Email: "},
            {text: "aibolit@live.com", href: "mailto:aibolit@live.com"},
            {br: true},
            {text: "Github: "},
            {text: "https://github.com/aibolit", href: "https://github.com/aibolit"},
            {br: true},
            {text: "LinkedIn: "},
            {text: "https://linkedin.com/in/aibolit", href: "https://linkedin.com/in/aibolit"}
        ]
    },
    '.descLabel': {
        initial: 0,
        speed: 8,
        text: [
            {
                text: 'I started making Starcraft mods when I was in middle school. \
                Since then, my passion for coding has only grown and much of what I build is still somehow related to gaming, although most of it today is about teaching through making games. \
                what I love about code is the problem solving. It\'s doing the research to figure out what pieces you need, and then spending the time piecing them together like a puzzle. \
                 '
            }
        ]
    }
}



function cpuText(id, cb) {
    var dat = cText[id];
    var widget = $(id);
    var chars = dat.text.reduce(function (a, b) {return a + b.text}, "");
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
                    if (ta.br) {
                        widget.append($("<br/>"));
                    } else if (c < tVal) {
                        var left = tVal - c;
                        var label = ta.href ? $("<a target='_blank' />") : $("<label />");
                        if (ta.href) label.attr("href", ta.href);
                        if (ta.style) label.css(ta.style);
                        widget.append(label);
                        if (left >= ta.text.length) {
                            label.text(ta.text);
                            c += ta.text.length;
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

var projects = [
    {page: "assets/battlecode.html"},
    {page: "assets/exchange.html"},
    {page: "assets/base.html"},
    {page: "assets/clip.html"},
    {page: "assets/boss.html"},
    {page: "assets/puzzlehunt.html"},
    {page: "assets/peri.html"},
    {page: "assets/this.html"},
]

$(document).ready(function () {
    console.log("ypp");


    $("#modal-shade").click(function () {
        $("#modal").css("visibility", "hidden");
        $("#modal-root").empty();

    });

    cpuText('.titleLabel', function () {
        cpuText(".contactLabel", function () {
            cpuText('.descLabel', function () {
                projects.forEach(function (project) {
                    var pDiv = $("<div class='projectDiv' />");
                    pDiv.attr("root", project.root);

                    $(".projectsDiv").append(pDiv);
                    pDiv.click(function () {
                        showPopup(project.page);
                    });
                });
            });
        });
    });
});