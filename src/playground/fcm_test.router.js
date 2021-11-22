import express from "express";
const router = express.Router();
/**
 *
 *
 * Chi tiết về cách send message tới 1 device, multiple devices, những devices đã subscribe vào 1 topic nhất định,...
 *  xem docs https://firebase.google.com/docs/cloud-messaging/send-message#send-messages-to-specific-devices
 */
const getInstance = (firebaseAdmin) => {
  const messaging = firebaseAdmin.messaging();
  router.post("/fcm_test", async (req, res) => {
    //Để devicetoken đưỢc print ra dưới console của app FE bỏ vào đây để test
    const testDeviceToken =
      "czDylhyfSvu8fBasbCa2Y3:APA91bEIey97Lm7YvfNzz6dXNYzuHWE_gcWl93t4oJ9yC3hnE5AYSu8z7btTpY1nmT5qFRdbGcToA-ATL8EqzuprpWZqBOV2EGNeLBxSvVCBYjpWg6F_cUcNpZvNU4exct8TLeV_Rou6";
    const message = {
      data: {
        title: "This is a test title",
        body: "This is a test body",
        extraData1: "This is a test extra data 1",
        extraData2: "This is a test extra data 2",
      },
      // Không thêm field notification vì trên app sẽ bị duplicate notification
      //   notification: {
      //     title: "This is a test title",
      //     body: "This is a test body",
      //   },
      token: testDeviceToken,
    };
    try {
      await messaging
        .send(message)
        .then((response) => {
          console.log("Successfully sent message:", response);
        })
        .catch((error) => {
          console.log("Error sending message:", error);
        });
      res.send("Success");
    } catch (e) {
      res.status(400).send(e);
    }
  });

  return router;
};

export default { getInstance };
