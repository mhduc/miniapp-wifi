import { apiWifiMkt } from '../utils/api';
import { useEffect } from "react";

export const data: {
  id: number, name: string, website: string, customer_id: number,
  status: number, bg_color: string, background: string | null, title: string,
  content: string, banner: string | null, form_position: number, btn_color: string,
  options: {}
} = {
  "id": 1,
  "name": "VIVAS",
  "website": "https://zalo.miniapp.vn",
  "customer_id": 205,
  "status": 1,
  "bg_color": "",
  "background": null,
  "title": "<p>K&iacute;nh ch&agrave;o qu&yacute; kh&aacute;ch</p>\r\n",
  "content": "<p>Vui l&ograve;ng điền th&ocirc;ng tin &nbsp;để tham gia chương tr&igrave;nh kh&aacute;ch h&agrave;ng th&acirc;n thiết của Water park</p>\r\n",
  "banner": "",
  "form_position": 0,
  "btn_color": "",
  "options": [
  ],
  "created_by": 1,
  "updated_by": 1,
  "created_at": 1709692543,
  "updated_at": 1709890338,
  "field_name": {
    "name": [
      {
        "id": "1",
        "forms_id": "1",
        "field_label": "Họ tên",
        "type": "1",
        "field_options": null,
        "created_at": "1709692543",
        "updated_at": "1709692543",
        "created_by": "1",
        "updated_by": "1",
        "customer_id": "205",
        "status": "10",
        "isrequired": "1",
        "is_show": "1",
        "order": "2"
      }
    ],
    "sex": [
      {
        "id": "2",
        "forms_id": "1",
        "field_label": "Giới tính",
        "type": "3",
        "field_options": [
          {
            "value": 0,
            "label": "Nam"
          },
          {
            "value": 1,
            "label": "Nữ"
          }
        ],
        "created_at": "1709692543",
        "updated_at": "1709692543",
        "created_by": "1",
        "updated_by": "1",
        "customer_id": "205",
        "status": "10",
        "isrequired": "0",
        "is_show": "1",
        "order": "1"
      }
    ],
    "email": [
      {
        "id": "3",
        "forms_id": "1",
        "field_label": "Email",
        "type": "1",
        "field_options": null,
        "created_at": "1709692543",
        "updated_at": "1709692543",
        "created_by": "1",
        "updated_by": "1",
        "customer_id": "205",
        "status": "10",
        "isrequired": "0",
        "is_show": "1",
        "order": "0"
      }
    ],
    "phone_number": [
      {
        "id": "4",
        "forms_id": "1",
        "field_label": "Số điện thoại",
        "type": "1",
        "field_options": null,
        "created_at": "1709692543",
        "updated_at": "1709692543",
        "created_by": "1",
        "updated_by": "1",
        "customer_id": "205",
        "status": "10",
        "isrequired": "0",
        "is_show": "1",
        "order": "4"
      }
    ],
    "birthday": [
      {
        "id": "5",
        "forms_id": "1",
        "field_label": "Ngày sinh",
        "type": "6",
        "field_options": null,
        "created_at": "1709692543",
        "updated_at": "1709692543",
        "created_by": "1",
        "updated_by": "1",
        "customer_id": "205",
        "status": "10",
        "isrequired": "0",
        "is_show": "1",
        "order": "3"
      }
    ]
  }
}
