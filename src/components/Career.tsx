import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Financial Analyst</h4>
                <h5>Shanti Enterprise</h5>
              </div>
              <h3>2021</h3>
            </div>
            <p>
              Led due diligence on 20+ acquisition and growth-financing
              targets; built integrated three-statement models and
              valuation analyses.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Quantitative Research Analyst</h4>
                <h5>Bombay Stock Exchange</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Owned fundamental and quantitative research on 30+ companies
              and automated research and surveillance workflows in Python.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Investment Banking Analyst</h4>
                <h5>TechMentee, Inc.</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Owned sourcing and evaluation of early-stage opportunities
              across tech, industrial, and consumer sectors; built DCF and
              comps models for senior stakeholder decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
