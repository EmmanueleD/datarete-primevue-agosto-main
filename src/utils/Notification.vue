<script>
// import { onBackgroundMessage } from "firebase/messaging/sw";
import { onMessage } from "firebase/messaging";
import { getToken } from 'firebase/messaging'

// import NotificationModal from '../../components/NotificationModal.vue'
import AxiosService from "@/axiosServices/AxiosService";







export default {
  name: 'NotificationService',
  data() {
    return {}
  },
  mounted() {
    this.setNotificationToken()
    // this.$messaging.onBackgroundMessageHandler = (message) => {
    //   console.log('background push', message);
    // };
    // this.$messaging.onMessageHandler = (message) => {
    //   console.log('foreground push', message);
    // };

    onMessage(this.$messaging, (payload) => {
      console.log('frontend push', payload);
      // this.openModal(payload);
      // return modal.present();
    });
    // onBackgroundMessage(this.$messaging, (payload) => {
    //   console.log('foreground push', payload);
    // });

    /*
    
    {
    titolo (string),
    testo (string),
    img_Big (string),
    img_Small (string),
    id_campagna (long),
    tipo_azione (ranking,badge,classroom,ticket) (string),
    url (string)
    }
    
     */
    // const payload = {"from":"992781005473","collapseKey":"do_not_collapse","notification":{"title":"Hello","body":"Yellow"}};
    // this.openModal(payload);


    //
  },
  methods: {
    // async openModal(notification) {

    //   const dataRemap = {
    //     titolo: 'title',
    //     testo: 'body',
    //     img_Big: 'img_big',
    //     img_Small: 'img_small',
    //     id_campagna: 'campaign_id',
    //     tipo_azione: 'action_type',
    //     url: 'action_url',
    //   };
    //   if (typeof notification.notification.body === 'string' || notification.notification.body instanceof String) {
    //     notification.notification.body = JSON.parse(notification.notification.body);
    //   }
    //   for (let i in notification.notification.body) {
    //     // notification.notification.body[i] = (await new IonicSafeString(notification.notification.body[i])).value;
    //     if (dataRemap[i]) {
    //       notification.notification.body[dataRemap[i]] = notification.notification.body[i];
    //     }
    //   }
    //   const modal = await modalController
    //     .create({
    //       component: NotificationModal,
    //       cssClass: 'push-notification-modal',
    //       componentProps: {
    //         data: notification.notification.body
    //       },
    //     })
    //   return modal.present();
    // },
    async setNotificationToken() {
      Notification.requestPermission().then((getperm) => {
        if (getperm === "granted") {
          console.log('Notification permission granted.');

          // Get Token
          getToken(this.$messaging, { vapidKey: 'BCxatz4Zy-TaaDye5SNc6YWi-2TFweOk2em_LvI6RWqnDu2iMN_VHnxTmdrVJaFlh-2tbnD_XBYZ8nGZDh0X-v4' })
            .then((currentToken) => {

              console.log('current tocken , ', currentToken)

              if (currentToken) {
                console.log('current token for client: ', currentToken);

                localStorage.setItem('DR_P-FCMToken', currentToken.toString());

                const service = new AxiosService('')
                service.updateWithoutId('Notifications/SetUserToken/',
                  {
                    token: currentToken.toString()
                  }
                ).then((res) => {
                  console.log('res set user token, ', res)
                  // const data = res.data;
                });

                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
              } else {
                console.log('No registration token available. Request permission to generate one.');

                // shows on the UI that permission is required
              }
            }).catch((err) => {
              console.log('An error occurred while retrieving token. ', err);
              // catch error while creating client token
            });
        } else {
          console.log('Permission to notify not granted');
        }
      }).catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
    }
  }
};
</script>