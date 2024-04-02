import React, { useState, useEffect } from "react";
import { followOA, openChat, closeApp } from "zmp-sdk/apis";
import { useLocation } from 'react-router-dom';
import {
  List,
  Page,
  Icon,
  Input,
  Button,
  Box,
  Switch,
  Text,
  useSnackbar,
  DatePicker,
  Select,
  Radio,
  Checkbox
} from "zmp-ui";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { constSelector, useRecoilValue } from "recoil";
// import { userInfo } from "../state";
import { useNavigate } from "react-router";
import { apiWifiMkt } from '../utils/api';

import UserCard from "../components/user-card";
import { data as dataDefault } from "../utils/data";
import Banner from "../components/image-banner";

const HomePage: React.FunctionComponent = () => {
  // const user = useRecoilValue(userInfo);
  const { Option } = Select;
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search)
  const param = queryParameters.get("id")
  const arr_param = param && param.split("/")
  const id_page = arr_param && arr_param[0];
  const ap = arr_param && arr_param[1];
  const captivePortalID = arr_param && arr_param[2];
  const [dataApi, setDataApi] = useState({});
  const [follow, setFollow] = useState(1);
  console.log("follow", follow)
  const [formData, setFormData] = useState({
    id: id_page ? id_page : null,
    name: null,
    email: null,
    phone_number: null,
    birthday: null,
    sex: null,
    options: [],
    id_zalo_oa: null,
    follow_OA: follow ? follow : 2,
    access_point_id: ap ? ap : null,
    captive_portal_id: captivePortalID ? captivePortalID : null,
    customer_id: dataApi.customer_id ? dataApi.customer_id : null
  });
  const [accessData, setAccessFormData] = useState({
    id: id_page ? id_page : 4,
    access_point_id: ap ? ap : null,
    captive_portal_id: captivePortalID ? captivePortalID : null,
    customer_id: dataApi.customer_id ? dataApi.customer_id : null
  });
  const [validateDefaul, setValidateDefaul] = useState({
    name: false,
    email: false,
    phone_number: false,
    phone_message: false,
    birthday: false,
    sex: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone_number: '',
    phone_message: '',
    birthday: '',
    sex: '',
    options: ''
  });
  const [errorsOptions, setErrorsOptions] = useState([
    "", "", "", "", ""
  ]);
  const [errorRating, setErrorRating] = useState(false);
  const [errorRadio, setErrorRadio] = useState(false);
  const [errorCheckbox, setErrorCheckbox] = useState(false);
  const [options, setOptions] = useState([]);
  const [optionsData, setOptionsData] = useState([]);
  const [postData, setPostData] = useState();
  const [titlePage, setTitlePage] = useState("");
  const [contentPage, setContentPage] = useState("");
  const [switchChecked, setSwitchChecked] = useState(true);

  let index = 0;
  let arrOption = [];
  let arrOptionData = [];
  let arrOptionErr = [];

  useEffect(() => {
    // set data sau khi load trang
    const fetchData = async () => {
      // const data = await apiWifiMkt.getDataById(id_page);
      const data = await apiWifiMkt.getDataById(id_page)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return error;
        })
      // const result = data.code === 200 ? data.data : dataDefault;
      const result = data.code === 200 ? data.data : {};
      setDataApi(result);

      if (Object.keys(result).length === 0) {
        setTitlePage("404");
        setContentPage("Xin lỗi quý khách app đang tạm dừng");
      }

      const newValidate = {
        name: false,
        email: false,
        phone_number: false,
        phone_message: false,
        birthday: false,
        sex: false,
      };

      result.questions && Array.isArray(result.questions) && result.questions.map((item, key) => {
        if (item.is_default_question == 1 && item.field_name == "name" && item.isrequired == "1" && item.is_show == 1) {
          newValidate.name = true
        }
        else if (item.is_default_question == 1 && item.field_name == "sex" && item.isrequired == "1" && item.is_show == 1) {
          newValidate.sex = true
        }
        else if (item.is_default_question == 1 && item.field_name == "email" && item.isrequired == "1" && item.is_show == 1) {
          newValidate.email = true
        }
        else if (item.is_default_question == 1 && item.field_name == "phone_number" && item.isrequired == "1" && item.is_show == 1) {
          newValidate.phone_number = true
        }
        else if (item.is_default_question == 1 && item.field_name == "birthday" && item.isrequired == "1" && item.is_show == 1) {
          newValidate.birthday = true
        }

        if (item.is_default_question == 0 && item.type == "5" && item.isrequired == "1" && item.is_show == 1) {
          setErrorRating(true);
        }

        if (item.is_default_question == 0 && item.type == "2" && item.isrequired == "1" && item.is_show == 1) {
          setErrorRadio(true);
        }

        if (item.is_default_question == 0 && item.type == "4" && item.isrequired == "1" && item.is_show == 1) {
          setErrorCheckbox(true);
        }

        // thêm data option
        if (item.is_default_question == 0 && item.is_show == 1) {
          arrOptionData.push({ id: item.id, type: item.type, title: item.field_label, value: null });
          arrOption.push(item);
        }
      });
      setOptionsData(arrOptionData);
      setOptions(arrOption);
      setValidateDefaul(newValidate);

      setFormData(prevOptionsData => ({
        ...prevOptionsData,
        customer_id: result.customer_id,
        id_zalo_oa: result.id_zalo_oa
      }))

      // setFormData(prevOptionsData => ({
      //   ...prevOptionsData,
      //   id_zalo_oa: result.id_zalo_oa
      // }))

      // gửi access data kiem tra luot truy cap
      accessData.customer_id = result.customer_id;
      await accessData.customer_id ? apiWifiMkt.postAccespoint(accessData) : null
    };
    // submitAccess();
    fetchData();
  }, []);
  console.log("options", options);
  // lay danh sach form mac dinh
  const orderedFields = dataApi.questions ? dataApi.questions : null;

  const title = dataApi.title || "";
  const content = dataApi.content || "";
  const decodedTitle: string | null = new DOMParser().parseFromString(title, 'text/html').body.textContent || titlePage;
  const decodedContent: string | null = new DOMParser().parseFromString(content, 'text/html').body.textContent || contentPage;

  const backgroundStyle = {
    backgroundColor: dataApi.bg_color ? dataApi.bg_color : "#fff",
    backgroundImage: dataApi.background ? 'url(' + dataApi.background + ')' : 'url("")',
    backgroundSize: 'cover',
    backgroundRepeat: 'none'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleChangeSex = (e) => {
    const value_sex = e
    setFormData({ ...formData, sex: value_sex });
  };

  const handleChangeBirthday = (e) => {
    const value_birthday = document.getElementById('birthday').value;
    setFormData({ ...formData, birthday: value_birthday });
  };

  function setOptionDataForm() {
    setFormData(prevFormData => ({
      ...prevFormData,
      options: optionsData
    }))
  }

  const handleChangeOption = (e) => {
    const input_option = e.target;
    let name_replace = input_option.name.replace(/option_/g, "");
    setOptionsData({ ...optionsData, [name_replace]: { ...optionsData[name_replace], value: input_option.value.trim() } });
  };

  const handleChangeOptionRadio = (item, key) => {
    const input_option = item;
    const arr_select = input_option ? input_option.split("_/") : null;
    if (arr_select) {
      setOptionsData({ ...optionsData, [arr_select[0]]: { ...optionsData[arr_select[0]], value: arr_select[2] } });
      setErrorRadio(false);
    }
  };

  const handleChangeOptionCheckbox = (item) => {
    let valuSelect = [];
    let key_option = 0;
    const input_option = item;
    input_option && Array.isArray(input_option) && input_option.map((item, key) => {
      let arr_select = item ? item.split("_/") : null;
      key_option = arr_select[0]
      if (arr_select && arr_select[2]) {
        valuSelect.push(arr_select[2]);
      }
    });
    if (valuSelect.length > 0) {
      setErrorCheckbox(false);
    }
    setOptionsData({ ...optionsData, [key_option]: { ...optionsData[key_option], value: valuSelect } });
  };

  const validateForm = () => {
    // Kiểm tra điều kiện xác nhận ở đây và cập nhật errors state
    const newErrors = {
      name: '',
      phone_number: '',
      phone_message: '',
      email: '',
      birthday: '',
      sex: '',
      option: ''
    };

    const newErrorsOption = errorsOptions;

    if (validateDefaul.name == true && (formData.name === null || formData.name.trim() === '')) {
      newErrors.name = 'error';
    }
    else {
      newErrors.name = '';
    }

    if (validateDefaul.phone_number == true && (formData.phone_number === null || formData.phone_number.trim() === '')) {
      newErrors.phone_number = 'error';
      newErrors.phone_message = 'Vui lòng nhập số điện thoại';
    }
    else if (!/^\d{10}$/.test(formData.phone_number) && formData.phone_number !== null) {
      newErrors.phone_number = 'error';
      newErrors.phone_message = 'Số điện thoại phải có 10 chữ số';
    }
    else {
      newErrors.phone_number = '';
      newErrors.phone_message = '';
    }

    if (validateDefaul.email == true && (formData.email === null || formData.email.trim() === '')) {
      newErrors.email = 'error';
    }
    else {
      newErrors.email = '';
    }

    if (validateDefaul.birthday == true && (formData.birthday === null || formData.birthday.trim() === '')) {
      newErrors.birthday = 'error';
    }
    else {
      newErrors.birthday = '';
    }

    if (validateDefaul.sex == true && (formData.sex === null || formData.sex.trim() === '')) {
      newErrors.sex = 'error';
    }
    else {
      newErrors.sex = '';
    }

    if (options && options[0] && options[0].isrequired == 1 && options[0].is_show == 1 && optionsData[0].value === null) {
      newErrorsOption[0] = 'error';
    }
    else {
      newErrorsOption[0] = '';
    }
    if (options && options[1] && options[1].isrequired == 1 && options[0].is_show == 1 && optionsData[1].value === null) {
      newErrorsOption[1] = 'error';
    }
    else {
      newErrorsOption[1] = '';
    }
    if (options && options[2] && options[2].isrequired == 1 && options[0].is_show == 1 && optionsData[2].value === null) {
      newErrorsOption[2] = 'error';
    }
    else {
      newErrorsOption[2] = '';
    }
    if (options && options[3] && options[3].isrequired == 1 && options[0].is_show == 1 && optionsData[3].value === null) {
      newErrorsOption[3] = 'error';
    }
    else {
      newErrorsOption[3] = '';
    }
    if (options && options[4] && options[4].isrequired == 1 && options[0].is_show == 1 && optionsData[4].value === null) {
      newErrorsOption[4] = 'error';
    }
    else {
      newErrorsOption[4] = '';
    }

    let rating_error = document.getElementsByClassName('zaui-box rating_error');
    if (rating_error && rating_error[0] && errorRating == true && rating == 0) {
      rating_error[0].style.display = "block";
    }
    else {
      if (rating_error[0]) {
        rating_error[0].style.display = "none";
      }
    }

    let radio_error = document.getElementsByClassName('zaui-box radio_error') || null;
    if (radio_error && radio_error[0] && errorRadio == true) {
      radio_error[0].style.display = "block";
    }
    else {
      if (radio_error && radio_error[0]) {
        radio_error[0].style.display = "none";
      }
    }

    let checkbox_error = document.getElementsByClassName('zaui-box checkbox_error') || null;
    if (checkbox_error && checkbox_error[0] && errorCheckbox == true) {
      checkbox_error[0].style.display = "block";
    }
    else {
      if (checkbox_error && checkbox_error[0]) {
        checkbox_error[0].style.display = "none";
      }
    }

    if (Object.values(newErrorsOption).every((error) => error === '') == true) {
      newErrors.option = ''
    }
    else {
      newErrors.option = 'error'
    }
    setErrorsOptions(newErrorsOption);
    setErrors(newErrors);
    console.log("newErrorsOption", newErrorsOption);
    console.log("newErrors", newErrors)
    return Object.values(newErrors).every((error) => error === '');
  };

  const [rating, setRating] = useState(0);
  const handleRating = (event, newValue) => {
    setRating(newValue);
    const input_option = event.target;
    console.log("input_option", input_option);
    let name_replace = input_option.name.replace(/option_/g, "");
    console.log("name_replace", name_replace);
    setOptionsData({ ...optionsData, [name_replace]: { ...optionsData[name_replace], value: newValue } });
  };

  const handleFollow = (event) => {
    if (follow === 1) {
      setFollow(0);
      setSwitchChecked(false);
      formData.follow_OA = 2;
    } else {
      setFollow(1);
      setSwitchChecked(true);
      formData.follow_OA = 1;
    }
  };

  const urlSuccess = "/success?id=" + dataApi.id_zalo_oa + "/" + (dataApi.btn_color ? dataApi.btn_color.replace("#", "") : "") || "/success";

  // Follow OA
  const actionSubmit = async (item) => {
    try {
      formData.follow_OA = item
      const submitForm = await apiWifiMkt.postData(formData);
      console.log('Response from API:', submitForm);
      await successPage();
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log("error", error);
      await closeMiniApp();
    }
  };

  // Follow OA
  const followZalo = async () => {
    try {
      await followOA({
        id: dataApi.id_zalo_oa ? dataApi.id_zalo_oa : "2950736043434692217",
        success: () => actionSubmit(1),
        // success: () => navigate(urlSuccess)
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log("error", error);
      // await formData.follow_OA == 2;
      await actionSubmit(2);
      // await successPage();
      // await openChatScreen();
    }
  };

  // Open chat
  const openChatScreen = async () => {
    try {
      await openChat({
        type: "oa",
        id: dataApi.id_zalo_oa ? dataApi.id_zalo_oa : "2950736043434692217",
        message: "",
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
      await closeMiniApp();
    }
  };

  const closeMiniApp = async () => {
    try {
      await closeApp({});
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };

  const successPage = () => navigate(urlSuccess);

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.options = optionsData;
    console.log("formData", formData)

    // Kiểm tra điều kiện xác nhận và thực hiện logic submit
    if (validateForm()) {
      try {
        async function runFunctions(): Promise<void> {
          if (follow === 1) {
            await followZalo();
            // await openChatScreen();
          }
          else {
            await actionSubmit(2);
            // await apiWifiMkt.postData(formData);
            // await successPage();
          }
        }
        runFunctions();
        // Xử lý phản hồi từ API ở đây
      } catch (error) {
        console.error('Error submitting form:', error);
        await closeMiniApp();
        // Xử lý lỗi ở đây
      }
      // finally {

      // }
      // Thêm logic xử lý khi form được submit
    } else {
      console.log('Form submission failed. Please check your inputs.');
      return false;
    }
  };

  return (

    <Page className="page page-index">
      {/* <div className="section-container">
        <UserCard user={user.userInfo} />
      </div> */}
      <div className="section-container section-form" style={backgroundStyle}>
        {/* <List>
          <List.Item
            onClick={() => navigate("/about")}
            suffix={<Icon icon="zi-arrow-right" />}
          >
            <div>About</div>
          </List.Item>
          <List.Item
            onClick={() => navigate("/user")}
            suffix={<Icon icon="zi-arrow-right" />}
          >
            <div>User</div>
          </List.Item>
          <List.Item
            onClick={() => navigate("/form")}
            suffix={<Icon icon="zi-arrow-right" />}
          >
            <div>Form</div>
          </List.Item>
        </List> */}
        <Box pb={5}>
          <Text.Title size="large" className="page-title text-center pb-4">
            {decodedTitle}
          </Text.Title>
          <Box className="page-text text-center">
            {decodedContent}
          </Box>
        </Box>
        <Box
          style={{
            marginLeft: "-16px",
            marginRight: "-16px",
            marginBottom: "15px",
          }}
        >
          {dataApi.banner ?
            (<Banner
              src={dataApi.banner}
              alt={dataApi.banner ? "baneer" : ""}
              width={dataApi.banner ? 300 : 0}
              height={dataApi.banner ? 200 : 0}
            />) : null
          }
        </Box>
        <Box className={dataApi.form_position == 0 ? "box-start" : "box-end"}>
          <Box>
            {orderedFields && Array.isArray(orderedFields) && orderedFields.map((item, key) => {
              if (item.is_show == 1) {
                if (item.type == 1 && item.field_name == "name") {
                  return (<Input
                    key={key}
                    type="text"
                    label={<span>{item.field_label} {item.isrequired == "1" ? <span className="lable_required">*</span> : ''}</span>}
                    id={"field_name_" + key}
                    name="name"
                    placeholder=""
                    errorText="Vui lòng nhập họ tên"
                    formNoValidate
                    status={errors.name}
                    // value={formData.name != null ? formData.name : ""}
                    onChange={handleChange}
                  />)
                }
                else if (item.type == 3 && item.field_name == "sex") {
                  return (<Select
                    key={key}
                    label={<span>{item.field_label} {item.isrequired == "1" ? <span className="lable_required">*</span> : ''}</span>}
                    name="sex"
                    id="sex"
                    placeholder=""
                    defaultValue=""
                    status={errors.sex}
                    errorText="Vui lòng chọn giới tính"
                    onChange={handleChangeSex}
                  >
                    <Option value="1" title="Nam" />
                    <Option value="2" title="Nữ" />
                    <Option value="3" title="Không xác định" />
                  </Select>)
                }
                else if (item.type == 1 && item.field_name == "email") {
                  return (<Input
                    key={key}
                    type="text"
                    label={<span>Email {item.isrequired == "1" ? <span className="lable_required">*</span> : ''}</span>}
                    name="email"
                    placeholder=""
                    required
                    errorText="Vui lòng nhập email"
                    formNoValidate
                    status={errors.email}
                    onChange={handleChange}
                  />)
                }
                else if (item.type == 1 && item.field_name == "phone_number") {
                  return (<Input
                    key={key}
                    type="text"
                    label={<span>Số điện thoại {item.isrequired == "1" ? <span className="lable_required">*</span> : ''}</span>}
                    name="phone_number"
                    placeholder=""
                    required
                    errorText={errors.phone_message}
                    formNoValidate
                    status={errors.phone_number}
                    onChange={handleChange}
                  />)
                }
                else if (item.type == 6 && item.field_name == "birthday") {
                  return (<DatePicker
                    key={key}
                    label={<span>Ngày sinh {item.isrequired == "1" ? <span className="lable_required">*</span> : ''}</span>}
                    name="birthday"
                    id="birthday"
                    type="text"
                    placeholder=" "
                    mask
                    maskClosable
                    dateFormat="dd/mm/yyyy"
                    title="Ngày sinh"
                    status={errors.birthday}
                    errorText="Vui lòng nhập ngày sinh"
                    onChange={handleChangeBirthday}
                  />)
                }
                else if (item.is_default_question == 0 && item.type == 1) {
                  index++;
                  return (<Input
                    key={key}
                    type="text"
                    label={<span>{item.field_label} {item.isrequired == 1 ? <span className="lable_required">*</span> : ''}</span>}
                    id={"option_" + key}
                    name={"option_" + (index - 1)}
                    placeholder=""
                    required
                    errorText="Vui lòng nhập câu trả lời"
                    status={errorsOptions[index - 1]}
                    onChange={handleChangeOption}
                  />)
                }
                else if (item.is_default_question == 0 && item.type == 2) {
                  index++;
                  return (<Box key={key}>
                    <Text className='text-color-nl500 label-option'>
                      {<span>{item.field_label} {item.isrequired == "1" ? <span className="lable_required">*</span> : ''}</span>}
                    </Text>
                    <Radio.Group name={"option_" + (index - 1)} onChange={handleChangeOptionRadio}>
                      {item.field_options && Array.isArray(item.field_options) && item.field_options.map((item_2, key_2) => (
                        <Box mt={4} key={key_2}>
                          <Radio key={key_2} name={"option_" + (index - 1)} value={(index - 1) + "_/" + key_2 + "_/" + item_2.label} label={item_2.value} />
                        </Box>
                      ))}
                    </Radio.Group>
                    <Box className={"label_error radio_error label_error_" + (index - 1)} style={{ "display": "none", "fontSize": "13px", "color": "#dc1f18" }}><Icon icon="zi-warning-solid" size={16} /> Vui lòng chọn một câu trả lời</Box>
                  </Box>)
                }
                else if (item.is_default_question == 0 && item.type == 3) {
                  index++;
                  return (<Input.TextArea
                    key={key}
                    type="text"
                    label={<span>{item.field_label} {item.isrequired == "1" ? <span className="lable_required">*</span> : ''}</span>}
                    id={"option_" + key}
                    name={"option_" + (index - 1)}
                    placeholder=""
                    required
                    status={errorsOptions[(index - 1)]}
                    errorText="Vui lòng nhập câu trả lời"
                    onChange={handleChangeOption}
                  />)
                }
                else if (item.is_default_question == 0 && item.type == 4) {
                  index++;
                  return (<Box mt={3} key={key}>
                    <Text className='text-color-nl500 label-option'>
                      {<span>{item.field_label} {item.isrequired == "1" ? <span className="lable_required">*</span> : ''}</span>}
                    </Text>
                    <Checkbox.Group name={"option_" + key} onChange={handleChangeOptionCheckbox}>
                      {item.field_options && Array.isArray(item.field_options) && item.field_options.map((item_2, key_2) => (
                        <Box mt={4} key={key_2}>
                          <Checkbox key={key_2} name={"option_" + (index - 1)} value={(index - 1) + "_/" + key_2 + "_/" + item_2.value} label={item_2.label} />
                        </Box>
                      ))}
                    </Checkbox.Group>
                    <Box className={"label_error checkbox_error label_error_" + (index - 1)} style={{ "display": "none", "fontSize": "13px", "color": "#dc1f18" }}><Icon icon="zi-warning-solid" size={16} /> Vui lòng chọn câu trả lời</Box>
                  </Box>)
                }
                else if (item.is_default_question == 0 && item.type == 5) {
                  index++;
                  return (<Box key={key} mt={3}>
                    <Typography component="legend">
                      {<span>{item.field_label} {item.isrequired == "1" ? <span className="lable_required">*</span> : ''}</span>}
                    </Typography>
                    <Rating
                      key={key}
                      id={"option_" + key}
                      className="rating-form"
                      name={"option_" + (index - 1)}
                      value={rating}
                      onChange={handleRating}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    />
                    <Box className="rating_error" style={{ "display": "none", "fontSize": "13px", "color": "#dc1f18" }}><Icon icon="zi-warning-solid" size={16} /> Vui lòng chọn một đánh giá</Box>
                  </Box>)
                }
              }
            })}

            {Object.keys(dataApi).length > 0 ?
              <Box
                flex={true}
                justifyContent="space-between"
                alignItems="center"
                alignContent="space-between"
                className=""
                my={5}
              >
                <Box mr={5}>
                  <Switch
                    className="sw-follow"
                    name="follow"
                    defaultChecked
                    value="1"
                    wrapperClassName="red"
                    onClick={handleFollow}
                    // style={{ "backgroundColor": dataApi.btn_color ? dataApi.btn_color : "#3758f9" }}
                    style={switchChecked ? { backgroundColor: dataApi.btn_color ? dataApi.btn_color : "#3758f9" } : { backgroundColor: '#b9bdc1' }}
                  />
                </Box>
                <Box>
                  Theo dõi OA {dataApi.name ? dataApi.name : ""} để cập nhật các thông tin khuyến
                  mãi và voucher mới nhất
                </Box>
              </Box>
              : null}
          </Box>
          {Object.keys(dataApi).length > 0 ?
            <Box>
              <Button fullWidth className="btn-submit" onClick={handleSubmit} style={{ "backgroundColor": dataApi.btn_color ? dataApi.btn_color : "#3758f9" }} >
                Xác nhận
              </Button>
            </Box>
            : null}
        </Box>
      </div>
    </Page >
  );
};

export default HomePage;
