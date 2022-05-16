import { useState } from "react";
import { useSelector } from "react-redux";

import { Modal, Upload, Form, Typography } from "antd";
import { PlusOutlined, WarningOutlined } from "@ant-design/icons";

import { storage } from "../../helpers";

const AttachmentsModal = ({ good, open, setOpen, onOk }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [attachments, setAttachments] = useState([]);

  const [submitting, setSubmitting] = useState(false);

  const { id } = useSelector((store) => store.client);

  const handleCancel = async () => {
    attachments.forEach(async (a) => {
      const imageRef = storage.ref(`cart_images/${a.name}`);
      await imageRef.delete().catch((err) => console.log(err));
    });
    setFileList([]);
    setAttachments([]);
    setOpen(false);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = async ({ file, fileList }) => {
    setFileList(fileList);

    const fileName = id + file.size + file.name;
    setSubmitting(true);
    if (file.status === "removed") {
      const imageRef = storage.ref(`cart_images/${fileName}`);
      await imageRef.delete().catch((err) => console.log(err));
      setAttachments(attachments.filter((a) => a.name !== fileName));
    } else {
      const snapshot = await storage.ref("cart_images/" + fileName).put(file);
      const url = await snapshot.ref.getDownloadURL();

      const newFile = {
        name: fileName,
        url,
        thumbUrl: url,
      };
      setAttachments((attachments) => {
        const found = attachments.some((a) => a.name === newFile.name);
        return [
          ...attachments,
          ...(!found && !!newFile?.name ? [newFile] : []),
        ];
      });
    }
    setSubmitting(false);
  };

  const handleSubmit = () => {
    onOk(attachments);
  };

  return (
    <Modal
      title={`Прикрепите файл${good?.multiAttach ? "ы" : ""}`}
      visible={open}
      cancelText="Назад"
      okText="Добавить в корзину"
      onOk={handleSubmit}
      okButtonProps={{ disabled: fileList.length < 1, loading: submitting }}
      onCancel={handleCancel}
    >
      <Typography.Paragraph type="warning">
        <WarningOutlined /> Порядок печати будет соответствовать порядку
        загруженных фотографий!
      </Typography.Paragraph>

      <Form.Item name="imgInfo">
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={() => false}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {!good?.multiAttach && fileList.length > 0 ? null : <UploadButton />}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={() => setPreviewVisible(false)}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Form.Item>
    </Modal>
  );
};

export default AttachmentsModal;

const UploadButton = () => {
  return (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Загрузить</div>
    </div>
  );
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
