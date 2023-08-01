import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  addUserEducation,
  deleteUserEducations,
  editUserEducation,
  getUserEducations,
} from '../../api/education';
import { Button, message, Modal, Table } from 'antd';
import { OpenFormType } from '../../utils/enums';
import EducationForm from '../EducationForm';
import { ExclamationCircleFilled } from '@ant-design/icons';

const educationTableColumns = [
  {
    title: 'Sr. No',
    dataIndex: 'serialNo',
    key: 'serialNo',
  },
  {
    title: 'Institute',
    dataIndex: 'institute',
    key: 'institute',
  },
  {
    title: 'Degree/Certificate',
    dataIndex: 'degree',
    key: 'degree',
  },
  {
    title: 'Start Year',
    dataIndex: 'startYear',
    key: 'startYear',
  },
  {
    title: 'End Year',
    dataIndex: 'endYear',
    key: 'endYear',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (val) => {
      return (
        <>
          <Button onClick={() => val.onClickEdit(val)}>Edit</Button>{' '}
          <Button type="primary" danger onClick={() => val.onClickDelete(val)}>
            Delete
          </Button>
        </>
      );
    },
  },
];

const EducationsTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [educations, setEducations] = useState([]);
  const [openFormType, setOpenFormType] = useState(null);
  const [editableData, setEditableData] = useState({});

  const [messageApi, messageContext] = message.useMessage();

  const loadEducationsData = () => {
    setIsLoading(true);
    getUserEducations()
      .then((educationData) => {
        setEducations([...educationData]);
      })
      .catch((e) => {
        messageApi.open({
          type: 'error',
          content: e.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadEducationsData();
  }, []);

  const onDeleteData = async (id) => {
    setIsLoading(true);
    try {
      await deleteUserEducations(id);
      await loadEducationsData();
      messageApi.open({
        type: 'success',
        content: 'Educational record deleted successfully!',
      });
    } catch (e) {
      messageApi.open({
        type: 'error',
        content: e.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onClickDelete = (val) => {
    Modal.confirm({
      title: 'Are you sure delete this record?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onDeleteData(val.id).then(() => {});
      },
      onCancel() {},
    });
  };

  const onClickEdit = (val) => {
    setOpenFormType(OpenFormType.EDIT);
    setEditableData(val);
  };

  const onCloseModal = useCallback(() => {
    setOpenFormType(null);
    setEditableData({});
  }, []);

  const onClickAddNew = () => {
    setOpenFormType(OpenFormType.NEW);
  };

  const onSaveData = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        if (openFormType === OpenFormType.EDIT) {
          setOpenFormType(null);
          await editUserEducation(data, editableData.id);
          setEditableData({});
          await loadEducationsData();
          messageApi.open({
            type: 'success',
            content: 'Educational record edited successfully!',
          });
        } else {
          setOpenFormType(null);
          await addUserEducation(data);
          await loadEducationsData();
          messageApi.open({
            type: 'success',
            content: 'Educational record added successfully!',
          });
        }
      } catch (e) {
        messageApi.open({
          type: 'error',
          content: e.message,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [openFormType]
  );

  const educationsTableData = useMemo(() => {
    return educations.map((education, index) => ({
      ...education,
      serialNo: index + 1,
      key: index + 1,
      onClickDelete,
      onClickEdit,
    }));
  }, [educations]);

  return (
    <>
      {messageContext}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 30,
        }}
      >
        <h3>Educational Records</h3>
        <Button type="primary" onClick={onClickAddNew}>
          Add New
        </Button>
      </div>
      {isLoading ? 'Loading...' : ''}
      {!isLoading && educations.length === 0 ? 'No data to show' : ''}
      {!isLoading && educations.length > 0 ? (
        <Table
          dataSource={educationsTableData}
          columns={educationTableColumns}
          pagination={false}
        />
      ) : (
        ''
      )}
      <Modal
        open={openFormType !== null}
        title={`${
          openFormType === OpenFormType.NEW ? 'Add' : 'Edit'
        } Education`}
        onCancel={onCloseModal}
        footer={null}
        destroyOnClose
        maskClosable={false}
      >
        <EducationForm
          initialValues={editableData}
          formType={openFormType}
          onSave={onSaveData}
          onCancel={onCloseModal}
        />
      </Modal>
    </>
  );
};

export default React.memo(EducationsTable);
