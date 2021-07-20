import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/parts/Header";
import TopImage from "./components/common/TopImage";
import Footer from "./components/parts/Footer";
import PageLoader from "./components/common/PageLoader";
import MainPage from "./components/pages/MainPage";
class App extends React.Component {
  state = {
    isLoaded: true,
  };
  componentDidMount() {}

  render() {
    return (
      <Router>
        <div className="container-fluid-custom">
          <Header
            isLoggedIn={this.state.isLoggedIn}
            currentUser={this.state.currentUser}
          />
          {this.state.isLoaded ? (
            <>
              <TopImage
                h1="eContent & eResources"
                p="Latest eContent of various courses uploaded by Honorable
                Professors."
              />
              <div className="content-wrapper">
                <div className="main-content container-fluid">
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={(props) => {
                        return <MainPage />;
                      }}
                    />
                  </Switch>
                </div>
              </div>
            </>
          ) : (
            <div className="content-wrapper">
              <div className="main-content">
                <PageLoader />
              </div>
            </div>
          )}
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
