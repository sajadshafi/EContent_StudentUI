import "../../stylesheets/topImage.css";
const TopImage = ({ h1, p }) => {
  return (
    <div className="wm-mini-header">
      <img
        style={{ height: "175px" }}
        src="/images/mini-header.jpg"
        alt="mini-header"
      />
      <div className="container-fluid wm-mini-container">
        <div className="row">
          <div className="col-md-12">
            <div className="wm-mini-title">
              <h1>{h1}</h1>
              <p style={{ color: "#fff", fontSize: "1rem" }}>{p}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopImage;
