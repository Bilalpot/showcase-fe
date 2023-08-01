import React, { useEffect, useMemo, useState } from 'react';
import { Button, DatePicker, Form, Input, Select, message } from 'antd';
import dayjs from 'dayjs';
import { getInstitutesList } from '../../api/education';
import { OpenFormType } from '../../utils/enums';

const EducationForm = ({ initialValues, formType, onSave, onCancel }) => {
  const [messageApi, messageContext] = message.useMessage();

  const [institutesOptions, setInstituteOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const initialFormValues = useMemo(() => {
    return formType === OpenFormType.NEW
      ? {}
      : {
          institute: [initialValues.institute],
          yearsRange: [
            dayjs(`${initialValues.startYear}`),
            dayjs(`${initialValues.endYear}`),
          ],
          degree: initialValues.degree,
        };
  }, []);

  const loadInstitutesList = async () => {
    setIsLoading(true);
    try {
      const institutes = await getInstitutesList();
      setInstituteOptions(
        institutes.map((institute) => ({
          label: institute.name,
          value: institute.name,
        }))
      );
      setIsLoading(false);
    } catch (e) {
      messageApi.open({
        type: 'error',
        content: `${e.message} Please, try again!`,
      });
    }
  };

  useEffect(() => {
    loadInstitutesList().then(() => {});
  }, []);

  const [form] = Form.useForm();

  const onSaveForm = (data) => {
    onSave({
      degree: data.degree,
      startYear: data.yearsRange[0].$y,
      endYear: data.yearsRange[1].$y,
      institute: data.institute[0],
    });
  };

  const onChangeInstitute = (data) => {
    if (data.length === 0) return;
    const latestData = data[data.length - 1];
    if (!institutesOptions.find((val) => val.value === latestData)) {
      setInstituteOptions([
        ...institutesOptions,
        { label: latestData, value: latestData },
      ]);
    }
    form.setFieldValue('institute', [latestData]);
  };

  const onFocusInstitute = () => {
    form.setFieldValue('institute', []);
  };

  return (
    <>
      {messageContext}
      <Form
        disabled={isLoading}
        form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={initialFormValues}
        autoComplete="off"
        onFinish={onSaveForm}
      >
        <Form.Item
          label="Degree/Certificate"
          name="degree"
          rules={[
            { required: true, message: 'Degree/Certificate name is required!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Years Range"
          name="yearsRange"
          rules={[{ required: true, message: 'Years range name is required!' }]}
        >
          <DatePicker.RangePicker picker="year" />
        </Form.Item>
        <Form.Item
          label="Institute"
          name="institute"
          rules={[{ required: true, message: 'Years range name is required!' }]}
        >
          <Select
            mode="tags"
            maxTagCount={1}
            onChange={onChangeInstitute}
            onFocus={onFocusInstitute}
            options={institutesOptions}
          />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'end', gap: 10 }}>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
          <Button type="primary" danger htmlType="button" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </>
  );
};

export default React.memo(EducationForm);
