import React, { useState, useEffect } from "react";
import { Page, Text, Box } from "zmp-ui";
import { openChat, closeApp } from "zmp-sdk/apis";
const AboutPage: React.FunctionComponent = (props, initialTime) => {
  const queryParameters = new URLSearchParams(window.location.search)
  const param = queryParameters.get("id")
  const arr_param = param && param.split("/")
  const id_oa = arr_param && arr_param[0];
  const color_btn = arr_param && arr_param[1];
  const [timeLeft, setTimeLeft] = useState(5);
  console.log("param", param);
  console.log("id_oa", id_oa);
  console.log("arr_param", arr_param);
  console.log("color_btn", color_btn);

  const openChatScreen = async () => {
    try {
      await openChat({
        type: "oa",
        id: id_oa ? id_oa : "2950736043434692217",
        message: "",
        success: closeMiniApp,
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
      await closeMiniApp();
    }
  };

  const closeMiniApp = async () => {
    try {
      console.log("close", "close")
      await closeApp({});
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      return; // Dừng lại nếu thời gian đã đạt đến 0
    }
    // Cập nhật thời gian mỗi giây
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    // Xóa timer khi component unmount
    return () => clearInterval(timer);
  }, [timeLeft]); // Sử dụng mảng rỗng để chỉ chạy một lần sau khi component mount

  if (timeLeft === 0) {
    console.log(123);
    openChatScreen();
  }

  const seconds = timeLeft % 60;
  console.log("seconds", seconds)
  const [actionSheetOpened, setActionSheetOpened] = React.useState(false);
  return (
    <Page className="page">
      <div className="section-container" style={{ "height": "100%" }}>
        <Box className="inner_succes">
          <Box className="box_succes">
            <Text.Title style={{ "textAlign": "center" }} className="pb-2">Xin cảm ơn !</Text.Title>
            <Text className="text-center">Thông tin của bạn đã được ghi lại</Text>
            <Box className="hightlight_succes text-center" mt={4} style={{ "backgroundColor": color_btn ? "#" + color_btn : "#3758f9" }}> <Text>App tự động đóng sau {seconds}s</Text></Box>
          </Box>
        </Box>
      </div>
    </Page>
  );
};

export default AboutPage;
