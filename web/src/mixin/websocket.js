/* eslint-disable */
const WebSocket = require('websocket').w3cwebsocket;
// util
import { v4 as uuid } from 'uuid';
const config = require('../../config/index');
export const websockets = {
    data() {
        return {
            websocket: null
        };
    },
    created() {
        this.initWebSocket();
    },
    destroyed() {
        this.websocket.close(); //离开路由之后断开websocket连接
        this.websocket = null;
    },
    methods: {
        initWebSocket() {
            //初始化websocket
            const host = process.env.NODE_ENV !== 'development' ? config.build.baseUrl.slice(7) : 'kcpre.rkpcn.com';
            const wsuri = `ws://${host}/mqtt/web/socket?clientId=` + uuid();
            this.websocket = new WebSocket(wsuri);
            this.websocket.onmessage = this.websocketOnMessage;
            this.websocket.onopen = this.websocketOnOpen;
            this.websocket.onerror = this.websocketOnError;
            this.websocket.onclose = this.websocketClose;
        },
        websocketOnOpen() {
            //连接建立之后执行send方法发送数据
            setInterval(() => {
                this.websocketSend({ target: 3, clientId: '', group: 'websocket-heart-beat', msg: '心跳' });
            }, 540000);
        },
        websocketOnError() {
            this.websocket.close();
            //连接建立失败重连
            this.initWebSocket();
            this.areQRCodeExpired();
        },
        websocketOnMessage(e) {
            //数据接收
            console.log(e);
            if (e.data === 'reload') {
                this.load2DCode();
            }
        },
        websocketSend(Data) {
            let actions = JSON.stringify(Data);
            //数据发送
            this.websocket.send(actions);
        },
        websocketClose(e) {
            //关闭
            console.log('断开连接', e);
        }
    }
};
