import authSocket from "../middleware/auth_socket.js";
const initHandler = async (io) => {
  io.use(authSocket);
  /**
   * connection: Event xảy ra khi có client mới connect đến socket có namespace tương ứng
   * Ví dụ ở đây là namespace /comments
   */
  io.on("connection", async (socket) => {
    console.log(`${socket.id} Connected`);
    /**
     * on event "skipCount"
     * Xảy ra khi client emit event "skipCount"
     * data: data gửi từ client, thường là dạng Map<String,dynamic>
     */
    socket.on("skipCount", (data, callback) => {
      console.log(`${socket.id} Skipped ${data["skip"]}`);

      count += data["skip"];
      callback({
        message: "Receive this event at",
        receivedAt: Date.now(),
      });
    });
    /**
     * disconnect xảy ra khi client disconnect
     */
    socket.on("disconnect", (reason) => {
      console.log(`${socket.id} Disconected`);

      isConnected = false;
    });
    let isConnected = false;
    isConnected = true;
    let count = 0;
    while (isConnected) {
      await timeout(2000);
      const data = {
        text: `This is a sample data ${count}`,
        createdAt: Date.now(),
      };
      console.log("emitted", data);
      /**
       * Emit event "test" đến client,
       * Nếu client có subscribe event này bằng socket.on("test") thì sẽ nhận được data
       */
      io.emit("test", data);
      count++;
    }
  });
};

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default initHandler;
