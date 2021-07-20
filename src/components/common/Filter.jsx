import "../../stylesheets/filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import DropdownList from "./DropdownList";
const Filter = ({
  semesterData,
  CourseList,
  CourseCategoryList,
  SubjectList,
  SubjectCategoryList,
  DepartmentList,
  filterSemesterData,
  filterSubjectCategoryList,
  filterDepartmentList,
  filterCourseCategoryList,
  filterCourseList,
  filterSubjectLists,
  disabled,
  searchHandler,
  validationMessage,
}) => {
  const filterRef = React.useRef(null);
  const [filterFlag, setFilterFlag] = React.useState(false);
  const showFilter = (e) => {
    if (!filterFlag) {
      filterRef.current.classList.remove("desktop-card");
      setFilterFlag(true);
    } else {
      filterRef.current.classList.add("desktop-card");
      setFilterFlag(false);
    }
  };
  return (
    <div className="container filter-wrapper">
      <div className="card-body mobile-card">
        <h6>
          Apply filters
          <FontAwesomeIcon
            onClick={showFilter}
            style={{ float: "right" }}
            icon={faBars}
          />
        </h6>
      </div>
      <div ref={filterRef} className="card-body desktop-card">
        <h3>Filter eContent</h3>
        {validationMessage !== "" ? (
          <p className="text-danger font-weight-bold">* {validationMessage}</p>
        ) : (
          ""
        )}
        <div className="row">
          <div className="col-md-4">
            <DropdownList
              textField="name"
              list={SubjectCategoryList}
              label="By Subject Category"
              onchangeHandler={filterSubjectCategoryList}
            />
          </div>
          <div className="col-md-4">
            <DropdownList
              textField="departmentName"
              list={DepartmentList}
              label="By Department"
              onchangeHandler={filterDepartmentList}
            />
          </div>
          <div className="col-md-4">
            <DropdownList
              textField="text"
              list={semesterData}
              label="By Semester"
              onchangeHandler={filterSemesterData}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <DropdownList
              textField="name"
              list={CourseCategoryList}
              label="By Course Category"
              onchangeHandler={filterCourseCategoryList}
            />
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <DropdownList
                textField="courseName"
                list={CourseList}
                label="By Course Name"
                onchangeHandler={filterCourseList}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <DropdownList
                textField="subjectNameCode"
                list={SubjectList}
                label="By Subject"
                onchangeHandler={filterSubjectLists}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <button
              disabled={disabled}
              onClick={searchHandler}
              className="btn btn-primary btn-primary float-right"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
