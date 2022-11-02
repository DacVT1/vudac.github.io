
export const getHeader = () => {
  const token = localStorage.getItem("auth-token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};
export const getNameCategories = (test) => {
  let name = "";
  switch (test) {
    case 1:
      name = "Góc học tập";
      break;
    case 2:
      name = "Góc hỏi đáp";
      break;
    case 3:
      name = "Góc giải trí";
      break;
    case 4:
      name = "Góc tiếng anh";
      break;
    case 5:
      name = "Khóa học tại CTT";
      break;

    default:
      break;
  }
  return name;
};
