import React, { Component } from 'react';
import _get from 'lodash/get';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './XSSDemo.scss';


const _ = {
  get: _get,
};

const maliciousSriptDemo = `<img onerror='document.cookie="sessionId=fbgf1334rf;"; localStorage.setItem("JWT", "DS5YHF34TGFD"); alert(document.cookie); alert("localStorage - JWT: " %2B localStorage.getItem("JWT"));' src='invalid-image' />`;


class XSSDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    this.inputNode = null;
    this.redirectWithMaliciousQuery = this._redirectWithMaliciousQuery.bind(this);
    this.createLink = this._createLink.bind(this);
  }

  _redirectWithMaliciousQuery() {
    const { history } = this.props;
    history.push(`/xss-demo?page=${maliciousSriptDemo}`);
  }

  _createLink() {
    const { value } = this.inputNode;
    this.setState({
      list: [...this.state.list, value],
    });
    this.inputNode.value = '';
  }

  _renderReflected() {
    const { location } = this.props;
    const search = _.get(location, 'search');
    const params = new URLSearchParams(search);
    const maliciousQueryString = params.get('page');
    return (
      <div className={styles.section}>
        <h2>Reflected XSS</h2>
        <div>
          <div className={styles.indicator}>Overview</div>
          <div>Say, hacker tricks you to click on an Malicious Image through social engineering. Then you browse the website with following query string</div>
        </div>
        <div>
          <div className={styles.indicator}>Malicious Query String: </div>
          <div className={styles.dataBox}>
            {maliciousSriptDemo}
          </div>
        </div>
        <div>
          <div className={styles.indicator}>Vulnerability: </div>
          <div className={styles.dataBox}>
            dangerouslySetInnerHTML
          </div>
        </div>
        <div>
          <div className={styles.indicator}>Click the following button to demo Reflected XSS</div>
          <div
            className={styles.button}
            role="button"
            tabIndex={0}
            onClick={this.redirectWithMaliciousQuery}
            onKeyDown={() => {}}
          >
            Click
          </div>
        </div>
        {maliciousQueryString && <div dangerouslySetInnerHTML={{__html: maliciousQueryString}} />}
      </div>
    )
  }

  _renderStored() {
    const { list } = this.state;

    const ListOfLink = list.map((link, index) => {
      return (
        <li>
          <a href={link}>
            {link}
          </a>
        </li>
      );
    });

    return (
      <div className={styles.section}>
        <h2>Stored XSS</h2>
        <div>
          <div className={styles.indicator}>Overview</div>
          <div>In this example, I only store links in react state obejct, which is a way to skip the back-end API implementation. To fullfill the Stored XSS requirement, I should store those data in database and request the page again.</div>
        </div>
        <div>
          <div className={styles.indicator}>List of Link: </div>
          <ul>
            {ListOfLink}
          </ul>
        </div>
        <div>
          <div className={styles.indicator}>
            Malicious Input Value
          </div>
          <div className={styles.dataBox}>
            {`javascript:document.cookie="sessionId=DF2dfr34GG5ds246"; alert(document.cookie);`}
          </div>
        </div>
        <div>
          <div className={styles.indicator}>Vulnerability: </div>
          <div className={styles.dataBox}>
            {`<a href={javascript:alert('hack!!!!')}>xyz</a>`}
          </div>
        </div>
        <div>
          <div className={styles.indicator}>
            Type whatever you want to create a link then click on the link
          </div>
          <div className={styles.input}>
            <input
              type="text"
              ref={(node) => {
                if (!this.inputNode) {
                  this.inputNode = node;
                }
              }}
            />
          </div>
          <div
            className={styles.button}
            onClick={this.createLink}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
          >
            Create
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>XSS Demo</h1>
        {this._renderReflected()}
        {this._renderStored()}
        <div>Icons made by <a href="https://www.flaticon.com/authors/vitaly-gorbachev" title="Vitaly Gorbachev">Vitaly Gorbachev</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </div>
    );
  }
}

export default withStyles(styles)(XSSDemo);
