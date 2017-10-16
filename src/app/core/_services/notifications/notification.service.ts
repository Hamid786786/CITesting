import SockJS from 'sockjs-client';
// var Stomp = require('@stomp/stompjs/lib/stomp.js').Stomp;

export class NotificationService {
    public notificationCount;
    public interval;
    // constructor() { }
    public subscribeNotification(notifMessageCallback) {
        let SockUrl =  'http://localhost:9999/echo';
        const sock = new SockJS(SockUrl);

        sock.onopen = () => {
            console.log('NOTIFICATION SOCKET opened');
        };

        // On connection close
        sock.onclose = () => {
            console.log('NOTIFICATION SOCKET closed');
        };

        // On receive message from server
        sock.onmessage = (e) => {
            // Get the content
            if (e !== null && e !== undefined) {
                let content = JSON.parse(e.data);
                notifMessageCallback(content);
            } else {
                console.log('THERE IS NO NOTIFICATIONS');
            }
        };

        // Function for sending the message to server
        this.interval = setInterval(() => {
            // Get the content from the textbox
            let username = 'user';

            // post dummy data to server so ite returns notifications
            let send = {
            username
            };
            // Send it now
            sock.send(JSON.stringify(send));
           },
        5000);
    }

}
