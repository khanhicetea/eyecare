var DesktopNotifications = {

	isSupported:function() {
		return (Notification.permission != 'denied')
	},

	requestPermission:function(callbck) {
        Notification.requestPermission();
	},

	doNotify:function(notitification_title,notification_body, notification_icon) {
        if (DesktopNotifications.isSupported()) {
            if (Notification.permission == 'default') {
                DesktopNotifications.requestPermission();
            }

            var noti = new Notification(notitification_title, {
                body: notification_body,
                icon: notification_icon
            })
        }

	}
}

function EyeCare (clock, time_out, time_rest, status_ele) {
    var eyecare = this;

    this.time_out = time_out;
    this.time_rest = time_rest;
    this.status_ele = status_ele;
    this.clock = clock;
    this.i = 0;
    this.first_time = true;

    this.clock.callbacks.interval = function() {
        console.log(eyecare.clock.getTime());
    }

    this.start = function () {
        if (!eyecare.first_time) {
            DesktopNotifications.doNotify('EyeCare', 'OK ! WORK TIME !!!', '/assets/work.png');
        }

        eyecare.first_time = false;
        eyecare.status_ele.text('OK ! WORK TIME !!!');
        eyecare.status_ele.css('color', '#7FFF00');
        eyecare.clock.setTime(this.time_out);
        eyecare.clock.setCountdown(true);
        eyecare.i = this.time_out;
        eyecare.clock.start(function () {
            if (eyecare.i > 1) {
                eyecare.i--;
            } else {
                eyecare.clock.stop(function() {
                    setTimeout(function() { eyecare.rest(); }, 1000);
                });
            }
        });
    };

    this.rest = function() {
        DesktopNotifications.doNotify('EyeCare', 'TAKE A REST PLEASE !!!', '/assets/rest.gif');
        eyecare.status_ele.text('TAKE A REST PLEASE !!!');
        eyecare.status_ele.css('color', '#FF6666');
        eyecare.clock.setTime(this.time_rest);
        eyecare.i = this.time_rest;
        eyecare.clock.start(function () {
            if (eyecare.i > 1) {
                eyecare.i--;
            } else {
                eyecare.clock.stop(function() {
                    setTimeout(function() { eyecare.start(); }, 1000);
                });
            }
        });
    }

    this.stop = function() {
        eyecare.clock.stop(function() {
            eyecare.clock.setTime(0);
        });
    }
}
