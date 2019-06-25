/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import getAuthToken from './get_auth_token';
import BASE_URL from './base_url';

const getDefaultAxiosConfig = () => {
  const authToken = getAuthToken();

  return {
    headers: {
      Authorization: authToken,
    },
  };
};

export const login = ({ email, password }) => (
  axios({
    ...getDefaultAxiosConfig(),
    method: 'POST',
    url: `${BASE_URL}/authenticate`,
    data: {
      email,
      password,
    },
  })
    .then((response) => {
      const authToken = response.data.auth_token;
      localStorage.setItem('Authorization', authToken);
      return authToken;
    })
);

export const fetchCurrentEmployee = () => (
  axios({
    ...getDefaultAxiosConfig(),
    method: 'GET',
    url: `${BASE_URL}/employees/current_employee`,
  })
    .then(response => response.data)
);

export const adminFetchEmployee = employeeId => (
  axios({
    ...getDefaultAxiosConfig(),
    method: 'GET',
    url: `${BASE_URL}/admin/employees/${employeeId}`,
  })
    .then(response => response.data)
);

export const adminFetchEmployees = () => (
  axios({
    ...getDefaultAxiosConfig(),
    method: 'GET',
    url: `${BASE_URL}/admin/employees`,
  })
    .then(response => response.data)
);

export const adminCreateEmployee = employeeData => (
  axios({
    ...getDefaultAxiosConfig(),
    method: 'POST',
    url: `${BASE_URL}/admin/employees`,
    data: {
      employee: employeeData,
    },
  })
    .then(response => response.data)
);

export const adminDeleteEmployee = employeeId => (
  axios({
    ...getDefaultAxiosConfig(),
    method: 'DELETE',
    url: `${BASE_URL}/admin/employees/${employeeId}`,
  })
);

export const adminFetchFeedbacksPerPerformanceReview = performanceReviewId => (
  axios({
    ...getDefaultAxiosConfig(),
    method: 'GET',
    url: `${BASE_URL}/admin/performance_reviews/${performanceReviewId}/feedbacks`,
  })
    .then(response => response.data)
);

export const adminCreatePerformanceReview = (employeeId, performanceReviewData) => (
  axios({
    ...getDefaultAxiosConfig(),
    method: 'POST',
    url: `${BASE_URL}/admin/employees/${employeeId}/performance_reviews`,
    data: {
      performance_review: performanceReviewData,
    },
  })
    .then(response => response.data)
);

export const fetchFeedbacks = () => (
  axios({
    ...getDefaultAxiosConfig(),
    method: 'GET',
    url: `${BASE_URL}/feedbacks`,
  })
    .then(response => response.data)
);

export const adminUpdateEmployee = (employeeId, employeeData) => (
  axios({
    ...getDefaultAxiosConfig(),
    method: 'PATCH',
    url: `${BASE_URL}/admin/employees/${employeeId}`,
    data: {
      employee: employeeData,
    },
  })
    .then(response => response.data)
);

export const adminCreateFeedbacksPerPerformanceReview = (performanceReviewId, feedbacksData) => (
  axios({
    ...getDefaultAxiosConfig(),
    method: 'POST',
    url: `${BASE_URL}/admin/performance_reviews/${performanceReviewId}/feedbacks/create_many`,
    data: feedbacksData,
  })
    .then(response => response.data)
);

export const updateFeedback = (feedbackId, feedbackData) => (
  axios({
    ...getDefaultAxiosConfig(),
    method: 'PATCH',
    url: `${BASE_URL}/feedbacks/${feedbackId}`,
    data: {
      feedback: feedbackData,
    },
  })
    .then(response => response.data)
);
