import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const ContentDetail = ({ detail, backHandler }) => {
  const RenderFiles = (files) => {
    if (files.length > 0) {
      return (
        <ul>
          {files.map((file, index) => {
            return (
              <li key={index}>
                <a
                  className="downloadLink"
                  target="_blank"
                  href={
                    process.env.REACT_APP_API_ENDPOINT +
                    "download-file?FileName=" +
                    file.filePath
                  }
                >
                  {file.description}
                </a>
              </li>
            );
          })}
        </ul>
      );
    } else {
      return <h6 className="text-danger">No files found</h6>;
    }
  };
  return (
    <div className="container filter-wrapper">
      <div className="card-body">
        <button onClick={backHandler} className="btn btn-info">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to List
        </button>
        <h4 className="mt-2">{detail.title}</h4>
        <div className="row content-detail-top">
          <div className="col-md-1">
            <h6>{detail.unitName}</h6>
          </div>
          <div className="col-md-2">
            <h6>Course : {detail.courseName}</h6>
          </div>
          <div className="col-md-3">
            <h6>Subject : {detail.subjectNameCode}</h6>
          </div>
          <div className="col-md-2">
            <h6>Semester No. : {detail.semesterNo}</h6>
          </div>
          <div className="col-md-2">
            <h6>Upload Date : {detail.createdDate}</h6>
          </div>
          <div className="col-md-2">
            <h6>Upload By : Prof.{detail.nameOfUser}</h6>
          </div>
        </div>
        <div
          className="content-html mt-2"
          dangerouslySetInnerHTML={{ __html: detail.content }}
        />

        <div className="files mt-2">
          <h5>Download files below :</h5>
          {RenderFiles(detail.eFileVMs)}
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;
