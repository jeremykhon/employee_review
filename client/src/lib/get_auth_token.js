const getAuthToken = () => (
  localStorage.getItem('Authorization')
);

export default getAuthToken;
