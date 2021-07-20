import http from "./HttpService";
const UploadFile = async (e) => {
  const formData = new FormData();
  formData.append("description", e.description);
  formData.append("formFile", e.formFile);
  try {
    const response = await http.post("upload-file", formData, http.config());
    return response.data;
  } catch (error) {
    throw error;
  }
};

const SaveContent = async (data) => {
  try {
    const response = await http.post("save-content", data, http.config());
    return response.data;
  } catch (error) {
    throw error;
  }
};

const GetContent = async () => {
  try {
    const response = await http.get("get-content", http.config());
    return response.data;
  } catch (error) {
    throw error;
  }
};

const DeleteContent = async (Id) => {
  try {
    const response = await http.post(
      "delete-content?id=" + Id,
      {},
      http.config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const SearchContent = async (
  unit = 1,
  PageNumber = 1,
  PageSize = 10,
  CourseId = "",
  SubjectId = ""
) => {
  try {
    let url =
      "search-content?unit=" +
      unit +
      "&PageNumber=" +
      PageNumber +
      "&PageSize=" +
      PageSize +
      "&CourseId=" +
      CourseId +
      "&SubjectId=" +
      SubjectId;
    const response = await http.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const ContentService = {
  UploadFile,
  SaveContent,
  GetContent,
  DeleteContent,
  SearchContent,
};
export default ContentService;
