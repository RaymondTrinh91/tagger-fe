import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { changeIsLoaded } from "../../actions/inboxActions"

class FullheightIframe extends Component {
  constructor() {
    super();
    this.state = {
      iFrameHeight: "0px",
    };
  }
  

  render() {
   const iframeLoaded = () => {
      this.props.changeIsLoaded(true)
    }
    console.log(this.props)
    return (
      <iframe
        title="iframe"
        style={{
          width: "100%",
          height: this.state.iFrameHeight,
          overflow: "visible", 

        }}
        onLoad={() => {
          const obj = ReactDOM.findDOMNode(this);
          this.setState({
            iFrameHeight:
              obj.contentWindow.document.body.scrollHeight + 10 + "px", 
          });
          iframeLoaded()
        }}
        ref="iframe"
        srcDoc={this.props.src}
        width="100%"
        height={this.state.iFrameHeight}
        scrolling="no"
        frameBorder="0"
      />
    );
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    changeIsLoaded
  },
  dispatch
)
const mapStateToProps = ({inbox}) => ({
  isLoaded: inbox.isIframeLoaded
})
export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(FullheightIframe)