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
      comment: '',
    };
    this.inputNodeDOM = null;
    this.commentNode = null;
    this.tmpListContainer = null;
    this.redirectWithMaliciousQuery = this._redirectWithMaliciousQuery.bind(this);
    this.createLink = this._createLink.bind(this);
    this.createList = this._createList.bind(this);
  }

  _redirectWithMaliciousQuery() {
    const { history } = this.props;
    history.push(`/xss-demo?page=${maliciousSriptDemo}`);
  }

  _createLink() {
    const { value } = this.commentNode;
    this.setState({
      comment: value,
    });
    this.commentNode.value = '';
  }

  _createList() {
    if (this.tmpListContainer && this.inputNodeDOM) {
      const { value } = this.inputNodeDOM;
      const divElement = document.createElement('div');
      divElement.innerHTML = value;
      const listElement = document.createElement('li');
      listElement.appendChild(divElement);
      this.tmpListContainer.appendChild(listElement);
      this.inputNodeDOM.value = '';
    }
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
          <div className={styles.indicator}>Concept</div>
          <div>Malicious script should be part of request payload. It will flow to application through server response.</div>
        </div>
        <div>
          <div className={styles.indicator}>Overview</div>
          <div>Say, hacker tricks you to click on an Malicious Image through social engineering. Then you browse the website with following query. The malicious script will be injected into app thorugh query string</div>
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
    const { comment } = this.state;

    // const ListOfLink = list.map((link, index) => {
    //   return (
    //     <li>
    //       <a href={link}>
    //         {link}
    //       </a>
    //     </li>
    //   );
    // });
    const Comment = <div className={styles.comment} dangerouslySetInnerHTML={{__html: comment}} />

    return (
      <div className={styles.section}>
        <h2>Stored XSS</h2>
        <div>
          <div className={styles.indicator}>Concept</div>
          <div>Inject malicious script into database</div>
        </div>
        <div>
          <div className={styles.indicator}>Overview</div>
          <div>
            In this example, I only store comment in react state obejct, which is a way to skip the back-end API implementation. To fullfill the Stored XSS requirement, I should store those data in database and request the page again.
            <br/>
            The horrendous consquence is that if the malicious script is injected into database, every user who request the comments from databse will be hacked.
          </div>
        </div>
        <div>
          <div className={styles.indicator}>
            Malicious Input Value
          </div>
          <div className={styles.dataBox}>
            {`<a href="javascript:document.cookie=&quot;sessionId=DF2dfr34GG5ds246&quot;; alert(document.cookie);">thie is malicious link</a>`}
          </div>
        </div>
        <div>
          <div className={styles.indicator}>Vulnerability: </div>
          <div className={styles.dataBox}>
            {`dangerouslySetInnerHTML`}
          </div>
        </div>
        <div>
          <div className={styles.indicator}>Comment: </div>
          <ul>
            {Comment}
          </ul>
        </div>
        <div>
          <div className={styles.indicator}>
            Type whatever you want to create a comment
          </div>
          <div className={styles.input}>
            <input
              type="text"
              ref={(node) => {
                if (!this.commentNode) {
                  this.commentNode = node;
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

  _renderDOMBased() {
    return (
      <div className={styles.section}>
        <h2>DOMBased</h2>
        <div>
          <div className={styles.indicator}>Concept</div>
          <div>Malicious script is injected through DOM manipulation</div>
        </div>
        <div>
          <div className={styles.indicator}>Overview</div>
          <div>N/A</div>
        </div>
        <div>
          <div className={styles.indicator}>Malicious Script</div>
          <div className={styles.dataBox}>{`<a href="javascript:document.cookie=&quot;sessionId=DF2dfr34GG5ds246&quot;; alert(document.cookie);">xyz</a>`}</div>
        </div>
        <div>
          <div className={styles.indicator}>Vulnerability</div>
          <ul>
            <li><div className={styles.dataBox}>{`document.appendChild`}</div></li>
            <li><div className={styles.dataBox}>{`document.createElement('div').innerHTML = maclicious script`}</div></li>
          </ul>
        </div>
        <div>
          <div className={styles.indicator}>Todo List:</div>
          <ul
            ref={(node) => {
              if (!this.tmpListContainer) {
                this.tmpListContainer = node;
              }
            }}
          />
        </div>
        <div>
          <div className={styles.indicator}>
            Type whatever you want to create a Todo list
          </div>
          <div className={styles.input}>
            <input
              type="text"
              ref={(node) => {
                if (!this.inputNodeDOM) {
                  this.inputNodeDOM = node;
                }
              }}
            />
          </div>
          <div
            className={styles.button}
            onClick={this.createList}
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
        {this._renderStored()}
        {this._renderReflected()}
        {this._renderDOMBased()}
        <div>Icons made by <a href="https://www.flaticon.com/authors/vitaly-gorbachev" title="Vitaly Gorbachev">Vitaly Gorbachev</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </div>
    );
  }
}

export default withStyles(styles)(XSSDemo);
