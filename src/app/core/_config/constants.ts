export const GLOBAL = {
  constants: {
    DASHBOARD: '1',
    COMMUNICATION: '2',
    MODULES: '3',
    PROFILE_PIC_ALLOWEDEXTENSIONS: ['png', 'jpg', 'jpeg'],
    AGM_KEY: '',
    ADMIN_ROLE: 'Administrator',
    USER_ROLE: 'Employee',
    DURATION: 6000,
    MAX_NOTIFICATION_COUNT: 99,
    MAX_NOTIFICATION_EXCEED: '99+',
    NOTIFICATION_SOUND: '../../../assets/audio/notification.mp3',
    CREATE_WIDGET_CONST: {
      id: -1,
      type: 'create-widget',
      title: '',
      w: 1,
      h: 1,
      content: {},
      dragAndDrop: false,
      resizable: false
    }
  }
};

export const RESOLUTION = {
  TINY : 320,
  SMALL : 576,
  MEDIUM : 768,
  LARGE : 1024,
  XLARGE: 1800
};

export const COMPONENTKEYS = {
  LIST: 'moduleHeaderList',
  MAP: 'moduleHeaderMap',
  GRAPH: 'moduleHeaderGraph'
};
