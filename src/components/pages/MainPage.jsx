import React from "react";
import Filter from "../common/Filter";
import "../../stylesheets/mainPage.css";
import InstituteService from "../../services/InstituteService";
import ContentService from "../../services/ContentService";
import moment from "moment";
import PageLoader from "../common/PageLoader";
import ErrorBox from "../common/ErrorBox";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import TabContent from "../common/TabContent";
import ContentDetail from "./ContentDetail";
class MainPage extends React.Component {
  state = {
    eventKey: 1,
    PageLoading: true,
    showErrorBox: false,
    spin: false,
    SubjectList: [],
    SubjectCategoryList: [],
    DepartmentList: [],
    CourseCategoryList: [],
    CourseList: [],
    semesterData: [],
    contentData: [],
    unit: 1,
    PageNumber: 1,
    TabLoader: false,
    filteredSemester: 0,
    filteredSubjectCategoryId: "",
    filteredDepartmentId: "",
    filteredCourseCategoryId: "",
    filteredCourseId: "",
    filteredSubjectId: "",
    disabled: false,
    message: "",
    filterMessage: "",
    showContentDetail: false,
    contentDetail: {},
  };
  backHandler = () => {
    this.setState({
      showContentDetail: false,
    });
  };
  viewContentDetail = (item) => {
    this.setState({
      contentDetail: item,
    });
    this.setState({
      showContentDetail: true,
    });
  };
  filterSemesterData = (e) => {
    this.setState({
      filteredSemester: e.currentTarget.value ? e.currentTarget.value : 0,
    });
    this.getSubjectList(
      this.state.filteredSubjectCategoryId,
      this.state.filteredDepartmentId,
      e.currentTarget.value ? e.currentTarget.value : 0
    );
  };
  filterSubjectCategoryList = (e) => {
    this.setState({ filteredSubjectCategoryId: e.currentTarget.value });
    this.getSubjectList(
      e.currentTarget.value,
      this.state.filteredDepartmentId,
      this.state.filteredSemester
    );
  };
  filterDepartmentList = (e) => {
    this.setState({ filteredDepartmentId: e.currentTarget.value });
    this.getSubjectList(
      this.state.filteredSubjectCategoryId,
      e.currentTarget.value,
      this.state.filteredSemester
    );
  };
  filterCourseCategoryList = (e) => {
    this.setState({ filteredCourseCategoryId: e.currentTarget.value });
    this.getCourseList(e.currentTarget.value);
  };
  filterCourseList = (e) => {
    this.setState({ filteredCourseId: e.currentTarget.value });
  };
  filterSubjectLists = (e) => {
    this.setState({ filteredSubjectId: e.currentTarget.value });
  };
  searchHandler = () => {
    if (
      this.state.filteredCourseId === "" ||
      this.state.filteredSubjectId === ""
    ) {
      this.setState({
        filterMessage: "Course selection and Subject selection is Mandatory",
      });
    } else {
      this.setState({
        PageLoading: true,
        disabled: true,
        filterMessage: "",
        contentData: [],
      });
      this.getContentData();
    }
  };
  componentDidMount() {
    this.getSubjectCategoryList();
    this.getCourseCategoryList();
    this.getCourseList();
    this.getDepartmentList();
    this.setSemesterData();
    this.getSubjectList();
    this.getContentData();
  }
  getContentData = (
    unit = 1,
    PageNumber = 1,
    PageSize = 10,
    tabloader = false
  ) => {
    if (!tabloader) {
      this.setState({
        PageLoading: true,
      });
    }
    ContentService.SearchContent(
      unit,
      PageNumber,
      PageSize,
      this.state.filteredCourseId,
      this.state.filteredSubjectId
    )
      .then((response) => {
        if (response.success) {
          if (response.data) {
            let modifiedData = response.data.map((item) => {
              const dataItem = { ...item };
              let today = moment(
                moment(new Date()).format("DD/MM/YYYY"),
                "DD/MM/YYYY"
              );
              let dataValue = moment(
                moment(dataItem.createdDate).format("DD/MM/YYYY"),
                "DD/MM/YYYY"
              );
              if (today.diff(dataValue, "days") <= 3) {
                dataItem.isNew = true;
              } else {
                dataItem.isNew = false;
              }
              dataItem.createdDate = moment(dataItem.createdDate).format("LL");
              return dataItem;
            });
            this.setState({
              contentData: modifiedData,
            });
          } else {
            console.log("TEST FOR FALSE");
            this.setState({
              contentData: [],
              message: response.message,
            });
          }
        } else {
          this.setState({ showErrorBox: true });
        }
        this.setState({
          PageLoading: false,
          inlineSpin: false,
          TabLoader: false,
          eventKey: parseInt(unit),
          disabled: false,
        });
      })
      .catch((error) => {
        this.setState({
          PageLoading: false,
          TabLoader: false,
          showErrorBox: true,
          inlineSpin: false,
          eventKey: parseInt(unit),
        });
      });
  };
  getCourseCategoryList = () => {
    InstituteService.getCourseCategoryList().then((response) => {
      if (response.success) {
        if (response.data) {
          this.setState({
            CourseCategoryList: response.data,
          });
        }
      }
    });
  };
  getCourseList = (courseCategoryId = null) => {
    InstituteService.getCourseList(courseCategoryId)
      .then((response) => {
        if (response.success) {
          if (response.data) {
            this.setState({
              CourseList: response.data,
            });
          } else {
            this.setState({
              CourseList: [],
            });
          }
        } else {
          this.setState({ showErrorBox: true });
        }
        this.setState({
          inlineSpin: false,
        });
      })
      .catch((error) => {
        this.setState({
          showErrorBox: true,
          inlineSpin: false,
        });
      });
  };
  setSemesterData = () => {
    let semesterData = [];
    for (let i = 1; i <= 10; i++) {
      let obj = { text: "Semester " + i, id: i };
      semesterData.push(obj);
    }
    this.setState({
      semesterData: semesterData,
    });
  };
  getSubjectCategoryList = () => {
    InstituteService.getSubjectCategoryList().then((response) => {
      if (response.success) {
        if (response.data) {
          this.setState({
            SubjectCategoryList: response.data,
          });
        }
      }
    });
  };
  getDepartmentList = () => {
    InstituteService.getDepartmentList().then((response) => {
      if (response.success) {
        if (response.data) {
          this.setState({
            DepartmentList: response.data,
          });
        }
      }
    });
  };
  getSubjectList = (CategoryId = "", DepartmentId = "", semesterNo = 0) => {
    InstituteService.getSubjectList(CategoryId, DepartmentId, semesterNo)
      .then((response) => {
        if (response.success) {
          if (response.data) {
            let modifiedData = response.data.map((item) => {
              const subject = { ...item };
              subject.subjectNameCode =
                subject.subjectName + " (" + subject.subjectCode + ")";
              return subject;
            });
            this.setState({
              SubjectList: modifiedData,
            });
          } else {
            this.setState({
              SubjectList: [],
            });
          }
        } else {
          this.setState({ showErrorBox: true });
        }
        this.setState({
          inlineSpin: false,
        });
      })
      .catch((error) => {
        this.setState({
          showErrorBox: true,
          inlineSpin: false,
        });
      });
  };
  selectKey = (k) => {
    this.setState({
      TabLoader: true,
      unit: k,
    });
    this.getContentData(k, 1, 10, true);
  };
  render() {
    if (this.state.showContentDetail) {
      return (
        <ContentDetail
          detail={this.state.contentDetail}
          backHandler={this.backHandler}
        />
      );
    } else {
      return (
        <>
          <Filter
            validationMessage={this.state.filterMessage}
            filterSemesterData={this.filterSemesterData}
            filterSubjectCategoryList={this.filterSubjectCategoryList}
            filterDepartmentList={this.filterDepartmentList}
            filterCourseCategoryList={this.filterCourseCategoryList}
            filterCourseList={this.filterCourseList}
            filterSubjectLists={this.filterSubjectLists}
            semesterData={this.state.semesterData}
            CourseList={this.state.CourseList}
            CourseCategoryList={this.state.CourseCategoryList}
            SubjectList={this.state.SubjectList}
            SubjectCategoryList={this.state.SubjectCategoryList}
            DepartmentList={this.state.DepartmentList}
            disabled={this.state.disabled}
            searchHandler={this.searchHandler}
          />
          {this.state.PageLoading ? (
            <div className="container loading-wrapper">
              <div className="loaderWrapper">
                <PageLoader />
              </div>
            </div>
          ) : this.state.showErrorBox ? (
            <div className="card-body mt-2">
              <ErrorBox text="Content loading failed" url="" />
            </div>
          ) : (
            <>
              <div className="container filter-wrapper mt-2">
                <Tabs
                  onSelect={(k) => this.selectKey(k)}
                  defaultActiveKey={this.state.eventKey}
                  id="uncontrolled-tab-example"
                >
                  <Tab eventKey="1" title="Unit 1">
                    <TabContent
                      viewContentDetail={this.viewContentDetail}
                      tabLoader={this.state.TabLoader}
                      message={this.state.message}
                      tabData={
                        this.state.eventKey === 1 ? this.state.contentData : []
                      }
                    />
                  </Tab>
                  <Tab eventKey="2" title="Unit 2">
                    <TabContent
                      viewContentDetail={this.viewContentDetail}
                      tabLoader={this.state.TabLoader}
                      message={this.state.message}
                      tabData={
                        this.state.eventKey === 2 ? this.state.contentData : []
                      }
                    />
                  </Tab>
                  <Tab eventKey="3" title="Unit 3">
                    <TabContent
                      tabLoader={this.state.TabLoader}
                      message={this.state.message}
                      tabData={
                        this.state.eventKey === 3 ? this.state.contentData : []
                      }
                    />
                  </Tab>
                  <Tab eventKey="4" title="Unit 4">
                    <TabContent
                      tabLoader={this.state.TabLoader}
                      message={this.state.message}
                      tabData={
                        this.state.eventKey === 4 ? this.state.contentData : []
                      }
                    />
                  </Tab>
                  <Tab eventKey="5" title="Unit 5">
                    <TabContent
                      tabLoader={this.state.TabLoader}
                      message={this.state.message}
                      tabData={
                        this.state.eventKey === 5 ? this.state.contentData : []
                      }
                    />
                  </Tab>
                  <Tab eventKey="0" title="General">
                    <TabContent
                      tabLoader={this.state.TabLoader}
                      message={this.state.message}
                      tabData={
                        this.state.eventKey === 0 ? this.state.contentData : []
                      }
                    />
                  </Tab>
                </Tabs>
              </div>
            </>
          )}
        </>
      );
    }
  }
}

export default MainPage;
