import { AuthAxios } from './axios';
import { EDUCATIONS, INSTITUTES } from './endpoints';

export const getUserEducations = async () => {
  try {
    const response = await AuthAxios.get(EDUCATIONS);
    return response.data.data.educations;
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data.error);
    } else {
      throw new Error('Some unknown error occurred!');
    }
  }
};

export const addUserEducation = async ({
  institute,
  degree,
  startYear,
  endYear,
}) => {
  try {
    await AuthAxios.post(EDUCATIONS, {
      institute,
      degree,
      startYear,
      endYear,
    });
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data.error);
    } else {
      throw new Error('Some unknown error occurred!');
    }
  }
};

export const editUserEducation = async (
  { institute, degree, startYear, endYear },
  educationId
) => {
  try {
    await AuthAxios.put(`${EDUCATIONS}/${educationId}`, {
      institute,
      degree,
      startYear,
      endYear,
    });
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data.error);
    } else {
      throw new Error('Some unknown error occurred!');
    }
  }
};

export const deleteUserEducations = async (educationId) => {
  try {
    await AuthAxios.delete(`${EDUCATIONS}/${educationId}`);
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data.error);
    } else {
      throw new Error('Some unknown error occurred!');
    }
  }
};

export const getInstitutesList = async () => {
  try {
    const response = await AuthAxios.get(INSTITUTES);
    return response.data.data.institutes;
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data.error);
    } else {
      throw new Error('Some unknown error occurred!');
    }
  }
};
