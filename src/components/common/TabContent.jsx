import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageLoader from "../common/PageLoader";
import {
  faCalendarAlt,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
class TabContent extends Component {
  render() {
    if (this.props.tabLoader) {
      return (
        <div className="container loading-wrapper">
          <div className="loaderWrapper">
            <PageLoader />
          </div>
        </div>
      );
    } else {
      if (this.props.tabData && this.props.tabData.length > 0) {
        return (
          <>
            {this.props.tabData.map((item, index) => {
              return (
                <div key={index} className="container item-wrapper mt-1">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="content p-1">
                        <a
                          href="#"
                          onClick={() => this.props.viewContentDetail(item)}
                        >
                          <p>
                            {item.title}
                            {item.isNew ? (
                              <img
                                src="/images/hot.gif"
                                alt="CodeMites Images"
                              />
                            ) : (
                              ""
                            )}
                          </p>
                        </a>

                        <div className="row text-center">
                          <div className="col-md-4 col-12">
                            <span
                              style={{ fontWeight: "bold" }}
                              className="text-warning"
                            >
                              Subject : {item.subjectNameCode} / (
                              {item.courseName})
                            </span>
                          </div>
                          <div className="col-md-4 col-12">
                            <span>
                              <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                              {item.createdDate}
                            </span>{" "}
                            ,{" "}
                            <span>
                              <FontAwesomeIcon icon={faChalkboardTeacher} />{" "}
                              Prof. {item.nameOfUser}
                            </span>
                          </div>
                          <div className="col-md-4 text-right">
                            <button
                              onClick={() => this.props.viewContentDetail(item)}
                              className="btn btn-info float-right"
                            >
                              View More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="container pagination mt-2"></div>
          </>
        );
      } else {
        return (
          <div className="container item-wrapper mt-1">
            <div className="alert alert-info mt-2">
              <h6>{this.props.message}</h6>
            </div>
          </div>
        );
      }
    }
  }
}

export default TabContent;
