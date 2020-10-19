var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BH0u7Lwkbi3OIZPP8MfYFr0nYutZf0WXDZ16os0STj-kid5yoedTo7kwTSHYLSMi1iTRfUAlIbvjqOCA3luABQk",
   "privateKey": "Us247fnb8-cpd3Qz-jXHDtx45LXakHYTNEnS68nDDis"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dH_HpRQwu0M:APA91bHVMZcdqXX6JAEZlFsmBltjoCNDWXZq1SE8g9vmiF4WMlfRLcdIbEaRs2Rc9gHb_Y6hjb-82W3owb2djyvGBOtnFBgM0uqar-K-L1Q5P2BRWeyq4vcgMj-GWBNn7XA1pkDFXVM3",
   "keys": {
       "p256dh": "BB609ycC68MUnxFvlqbfP+N+QfNg2o9vcTVQ7ZnpYL1y6b6D9WlxVTUsOdrNodq5l5jQlo/f90wD7X3eYRkfi9E=",
       "auth": "k7EwlWqvnyWoSEmQC8/TDg=="
   }
};
var payload = 'Hello World';
 
var options = {
   gcmAPIKey: '766694989072',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);