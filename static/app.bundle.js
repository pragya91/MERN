webpackJsonp([0],{

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(22);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(8);

var _IssueList = __webpack_require__(75);

var _IssueList2 = _interopRequireDefault(_IssueList);

var _IssueEdit = __webpack_require__(79);

var _IssueEdit2 = _interopRequireDefault(_IssueEdit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contentNode = document.getElementById("content");

var NoMatch = function NoMatch() {
  return _react2.default.createElement(
    'p',
    null,
    'No match found'
  );
};

var App = function App() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'header' },
      _react2.default.createElement(
        'h1',
        null,
        'Issue Tracker'
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'content' },
      _react2.default.createElement(RoutedApp, null)
    ),
    _react2.default.createElement(
      'div',
      { className: 'footer' },
      'Footer goes here.'
    )
  );
};

var RoutedApp = function RoutedApp() {
  return _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', render: function render() {
            return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/issues' });
          } }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/issues/:id', component: _IssueEdit2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/issues', component: _IssueList2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '*', component: NoMatch })
      )
    )
  );
};

_reactDom2.default.render(_react2.default.createElement(App, null), contentNode);

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(8);

var _IssueAdd = __webpack_require__(76);

var _IssueAdd2 = _interopRequireDefault(_IssueAdd);

var _IssueFilter = __webpack_require__(77);

var _IssueFilter2 = _interopRequireDefault(_IssueFilter);

var _Utils = __webpack_require__(81);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//since IssuwRow had only a render funciton and no logic, we moved it to be only a function.
var IssueRow = function IssueRow(props) {
  function onDelete() {
    props.deleteIssue(props.issue._id);
  }

  return _react2.default.createElement(
    'tr',
    null,
    _react2.default.createElement(
      'td',
      null,
      _react2.default.createElement(
        _reactRouterDom.Link,
        { to: '/issues/' + props.issue._id },
        props.issue._id.substr(-4)
      )
    ),
    _react2.default.createElement(
      'td',
      null,
      props.issue.status
    ),
    _react2.default.createElement(
      'td',
      null,
      props.issue.owner
    ),
    _react2.default.createElement(
      'td',
      null,
      new Date(props.issue.created).toDateString()
    ),
    _react2.default.createElement(
      'td',
      null,
      props.issue.effort
    ),
    _react2.default.createElement(
      'td',
      null,
      props.issue.completionDate ? props.issue.completionDate.toDateString() : ''
    ),
    _react2.default.createElement(
      'td',
      null,
      props.issue.title
    ),
    _react2.default.createElement(
      'td',
      null,
      _react2.default.createElement(
        'button',
        { onClick: onDelete },
        'Delete'
      )
    )
  );
};

//since issue table only had a render function and no other logic, we made it a function instead of a class.
function IssueTable(props) {
  var borderStyle = {
    color: 'gray'
  };
  var issueRows = props.issues.map(function (issue) {
    return _react2.default.createElement(IssueRow, { key: issue._id, issue: issue, deleteIssue: props.deleteIssue });
  });
  return _react2.default.createElement(
    'table',
    { className: 'bordered-table', style: borderStyle },
    _react2.default.createElement(
      'thead',
      null,
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'th',
          null,
          'Id'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Status'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Owner'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Created'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Effort'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Completion Date'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Title'
        ),
        _react2.default.createElement('th', null)
      )
    ),
    _react2.default.createElement(
      'tbody',
      null,
      issueRows
    )
  );
}

var IssueList = function (_React$Component) {
  _inherits(IssueList, _React$Component);

  function IssueList() {
    _classCallCheck(this, IssueList);

    var _this = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

    _this.state = { issues: [] };
    _this.createIssue = _this.createIssue.bind(_this);
    _this.setFilter = _this.setFilter.bind(_this);
    _this.deleteIssue = _this.deleteIssue.bind(_this);
    return _this;
  }

  _createClass(IssueList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var prevQuery = prevProps.location.search;
      var newQuery = this.props.location.search;

      if (prevQuery == newQuery) {
        return;
      }
      this.loadData();
    }
  }, {
    key: 'setFilter',
    value: function setFilter(filter) {
      this.props.history.push(this.props.location.pathname + filter);
    }
  }, {
    key: 'loadData',
    value: function loadData() {
      var self = this;
      var getIssues = new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', _Utils.URLManager.URL_ISSUES + self.props.location.search, true);
        xhr.onload = function () {
          if (xhr.status == 200 || xhr.status == 304) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(Error(xhr.statusText));
          }
        };
        xhr.onerror = function () {
          reject(Error("Network Error"));
        };
        xhr.send();
      });
      getIssues.then(function (response) {
        response.records.forEach(function (issue) {
          issue.created = new Date(issue.created);
          if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
        });
        self.setState({ issues: response.records });
      }).catch(function (error) {
        console.log("Error in fetching data from server: ", error);
      });
    }
  }, {
    key: 'createIssue',
    value: function createIssue(newIssue) {
      var self = this;
      var createNewIssue = new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', _Utils.URLManager.URL_ISSUES, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(JSON.parse(xhr.response));
          }
        };
        xhr.onerror = function () {
          reject(Error("Network Error"));
        };
        console.log(newIssue);
        xhr.send(JSON.stringify(newIssue));
      });
      createNewIssue.then(function (response) {
        var allIssues = self.state.issues.concat(response);
        self.setState({ issues: allIssues });
      }, function (error) {
        alert(error.message);
      });
    }
  }, {
    key: 'deleteIssue',
    value: function deleteIssue(id) {
      var _this2 = this;

      var deleteThisIssue = new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', _Utils.URLManager.URL_ISSUES + "/" + id, true);
        xhr.onload = function () {
          if (xhr.status == 200) {
            resolve();
          } else {
            reject(JSON.parse(xhr.response));
          }
        };
        xhr.onerror = function () {
          reject(Error("Network Error"));
        };
        xhr.send();
      });
      deleteThisIssue.then(function () {
        _this2.loadData();
      }, function (error) {
        alert("Failed to delete issue:" + error.message);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_IssueFilter2.default, { setFilter: this.setFilter }),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(IssueTable, { issues: this.state.issues, deleteIssue: this.deleteIssue }),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(_IssueAdd2.default, { createIssue: this.createIssue })
      );
    }
  }]);

  return IssueList;
}(_react2.default.Component);

exports.default = (0, _reactRouterDom.withRouter)(IssueList);

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IssueAdd = function (_React$Component) {
  _inherits(IssueAdd, _React$Component);

  function IssueAdd() {
    _classCallCheck(this, IssueAdd);

    var _this = _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).call(this));

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(IssueAdd, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.issueAdd;
      this.props.createIssue({
        owner: form.owner.value,
        title: form.title.value,
        status: 'New'
      });
      form.owner.value = "";
      form.title.value = "";
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { name: 'issueAdd', onSubmit: this.handleSubmit },
        _react2.default.createElement('input', { name: 'owner', placeholder: 'owner' }),
        _react2.default.createElement('input', { name: 'title', placeholder: 'title' }),
        _react2.default.createElement(
          'button',
          { type: 'submit' },
          'Add'
        )
      );
    }
  }]);

  return IssueAdd;
}(_react2.default.Component);

exports.default = IssueAdd;

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(8);

var _Utils = __webpack_require__(81);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IssueFilter = function (_React$Component) {
  _inherits(IssueFilter, _React$Component);

  function IssueFilter(props) {
    _classCallCheck(this, IssueFilter);

    var _this = _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).call(this, props));

    var queryStr = props.location.search;
    _this.state = {
      status: _Utils.QueryUtil.getQueryValue(queryStr, 'status') || '',
      effort_gte: _Utils.QueryUtil.getQueryValue(queryStr, 'effort_gte') || '',
      effort_lte: _Utils.QueryUtil.getQueryValue(queryStr, 'effort_lte') || '',
      changed: false
    };

    _this.onChangeStatus = _this.onChangeStatus.bind(_this);
    _this.onChangeEffortGte = _this.onChangeEffortGte.bind(_this);
    _this.onChangeEffortLte = _this.onChangeEffortLte.bind(_this);
    _this.applyFilter = _this.applyFilter.bind(_this);
    _this.clearFilter = _this.clearFilter.bind(_this);
    _this.resetFilter = _this.resetFilter.bind(_this);
    return _this;
  }

  _createClass(IssueFilter, [{
    key: 'onChangeStatus',
    value: function onChangeStatus(e) {
      this.setState({ status: e.target.value, changed: true });
    }
  }, {
    key: 'onChangeEffortGte',
    value: function onChangeEffortGte(e) {
      var effort = e.target.value;
      if (effort.match(/^\d*$/)) this.setState({ effort_gte: effort, changed: true });
    }
  }, {
    key: 'onChangeEffortLte',
    value: function onChangeEffortLte(e) {
      var effort = e.target.value;
      if (effort.match(/^\d*$/)) this.setState({ effort_lte: effort, changed: true });
    }
  }, {
    key: 'applyFilter',
    value: function applyFilter() {
      var queryStr = "";
      if (this.state.status) queryStr = "?status=" + this.state.status;
      if (this.state.effort_gte) queryStr = queryStr.length > 0 ? queryStr + "&effort_gte=" + this.state.effort_gte : "?effort_gte=" + this.state.effort_gte;
      if (this.state.effort_lte) queryStr = queryStr.length > 0 ? queryStr + "&effort_lte=" + this.state.effort_lte : "?effort_lte=" + this.state.effort_lte;

      this.props.setFilter(queryStr);
    }
  }, {
    key: 'clearFilter',
    value: function clearFilter() {
      this.props.setFilter("");
    }
  }, {
    key: 'resetFilter',
    value: function resetFilter() {
      var queryStr = this.props.location.search;
      this.setState({
        status: _Utils.QueryUtil.getQueryValue(queryStr, 'status') || '',
        effort_gte: _Utils.QueryUtil.getQueryValue(queryStr, 'effort_gte') || '',
        effort_lte: _Utils.QueryUtil.getQueryValue(queryStr, 'effort_lte') || '',
        changed: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        'Status:',
        _react2.default.createElement(
          'select',
          { value: this.state.status, onChange: this.onChangeStatus },
          _react2.default.createElement(
            'option',
            { value: '' },
            '(Any)'
          ),
          _react2.default.createElement(
            'option',
            { value: 'New' },
            'New'
          ),
          _react2.default.createElement(
            'option',
            { value: 'Open' },
            'Open'
          ),
          _react2.default.createElement(
            'option',
            { value: 'Assigned' },
            'Assigned'
          ),
          _react2.default.createElement(
            'option',
            { value: 'Fixed' },
            'Fixed'
          ),
          _react2.default.createElement(
            'option',
            { value: 'Verified' },
            'Verified'
          ),
          _react2.default.createElement(
            'option',
            { value: 'Closed' },
            'Closed'
          )
        ),
        '\xA0Effort between:',
        _react2.default.createElement('input', { size: 5, value: this.state.effort_gte, onChange: this.onChangeEffortGte }),
        '\xA0-\xA0',
        _react2.default.createElement('input', { size: 5, value: this.state.effort_lte, onChange: this.onChangeEffortLte }),
        _react2.default.createElement(
          'button',
          { onClick: this.applyFilter },
          'Apply'
        ),
        _react2.default.createElement(
          'button',
          { onClick: this.resetFilter, disabled: !this.state.changed },
          'Reset'
        ),
        _react2.default.createElement(
          'button',
          { onClick: this.clearFilter },
          'Clear'
        )
      );
    }
  }]);

  return IssueFilter;
}(_react2.default.Component);

exports.default = (0, _reactRouterDom.withRouter)(IssueFilter);

/*
render(){
  const Seperator = () => <span> | </span>;
  return (
    <div>
      <Link to="/issues" >All issues</Link>
      <Seperator />
      <Link to={{pathname:"/issues" , search:"?status=Open"}}>Open issues</Link>
      <Seperator />
      <Link to={{pathname:"/issues" , search:"?status=Assigned"}}>Assigned issues</Link>
    </div>
  );
}
*/

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = __webpack_require__(8);

var _Utils = __webpack_require__(81);

var _Inputs = __webpack_require__(82);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IssueEdit = function (_React$Component) {
  _inherits(IssueEdit, _React$Component);

  function IssueEdit() {
    _classCallCheck(this, IssueEdit);

    var _this = _possibleConstructorReturn(this, (IssueEdit.__proto__ || Object.getPrototypeOf(IssueEdit)).call(this));

    _this.state = {
      issue: {
        _id: '',
        title: '',
        status: '',
        owner: '',
        effort: '',
        completionDate: '',
        created: ''
      },
      invalidFields: {},
      showInvalidMsg: false
    };
    _this.onChange = _this.onChange.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);
    return _this;
  }

  _createClass(IssueEdit, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadIssueData();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.location != this.props.location) {
        this.loadIssueData();
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(e, convertedValue) {
      var issue = Object.assign({}, this.state.issue);
      issue[e.target.name] = convertedValue != undefined ? convertedValue : e.target.value;
      this.setState({ issue: issue });
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(e) {
      e.preventDefault();
      //let invalidFields = {...this.state.invalidFields};
      var invalidFields = Object.assign({}, this.state.invalidFields);
      this.setState({ showInvalidMsg: false });

      if (this.state.issue.title == '') invalidFields['title'] = true;else delete invalidFields['title'];

      if (this.state.issue.owner == '') invalidFields['owner'] = true;else delete invalidFields['owner'];

      this.setState({ invalidFields: invalidFields });
      if (Object.keys(invalidFields).length != 0) {
        this.setState({ showInvalidMsg: true });
        e.preventDefault();
        return;
      }
      var self = this;
      var updateIssue = new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', _Utils.URLManager.URL_SERVER_PREFIX + self.props.location.pathname, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
          if (xhr.status == 200 || xhr.status == 304) resolve(JSON.parse(xhr.response));else reject(SON.parse(xhr.response));
        };
        xhr.onerror = function () {
          reject(Error("Network Error"));
        };
        var issueToUpdate = Object.assign({}, self.state.issue);
        xhr.send(JSON.stringify(issueToUpdate));
      });
      updateIssue.then(function (response) {
        response.created = _Utils.DateManager.formatDate(new Date(response.created));
        response.completionDate = _Utils.DateManager.formatDate(new Date(response.completionDate));
        self.setState({ issue: response });
        alert("Issue updated successfuly");
      }).catch(function (error) {
        console.log("Error in fetching data from server: ", error);
      });
    }
  }, {
    key: 'loadIssueData',
    value: function loadIssueData() {
      var self = this;
      var getIssue = new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', _Utils.URLManager.URL_SERVER_PREFIX + self.props.location.pathname, true);
        xhr.onload = function () {
          if (xhr.status == 200 || xhr.status == 304) resolve(JSON.parse(xhr.response));else reject(SON.parse(xhr.response));
        };
        xhr.onerror = function () {
          reject(Error("Network Error"));
        };
        xhr.send();
      });
      getIssue.then(function (response) {
        response.created = _Utils.DateManager.formatDate(new Date(response.created));
        response.completionDate = _Utils.DateManager.formatDate(new Date(response.completionDate));
        self.setState({ issue: response });
      }).catch(function (error) {
        console.log("Error in fetching data from server: ", error);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var issue = this.state.issue;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'form',
          null,
          'ID: ',
          issue._id,
          _react2.default.createElement('br', null),
          'Created: ',
          issue.created,
          _react2.default.createElement('br', null),
          'Status:',
          _react2.default.createElement(
            'select',
            { name: 'status', value: issue.status, onChange: this.onChange },
            _react2.default.createElement(
              'option',
              { value: 'New' },
              'New'
            ),
            _react2.default.createElement(
              'option',
              { value: 'Open' },
              'Open'
            ),
            _react2.default.createElement(
              'option',
              { value: 'Assigned' },
              'Assigned'
            ),
            _react2.default.createElement(
              'option',
              { value: 'Fixed' },
              'Fixed'
            ),
            _react2.default.createElement(
              'option',
              { value: 'Verified' },
              'Verified'
            ),
            _react2.default.createElement(
              'option',
              { value: 'Closed' },
              'Closed'
            )
          ),
          _react2.default.createElement('br', null),
          'Owner:',
          _react2.default.createElement('input', { name: 'owner', value: issue.owner, onChange: this.onChange }),
          _react2.default.createElement('br', null),
          'Effort:',
          _react2.default.createElement(_Inputs.NumInput, { name: 'effort', value: issue.effort, onChange: this.onChange }),
          _react2.default.createElement('br', null),
          'Completion Date:',
          _react2.default.createElement('input', { type: 'date', name: 'completionDate', value: issue.completionDate, onChange: this.onChange }),
          _react2.default.createElement('br', null),
          'Title:',
          _react2.default.createElement('input', { name: 'title', value: issue.title, onChange: this.onChange }),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'button',
            { name: 'submit', type: 'submit', onClick: this.onSubmit },
            'Submit'
          ),
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/issues' },
            'Back to issues list'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'error ' + (this.state.showInvalidMsg == true ? 'show' : 'hide') },
          ' Please correct these fields: ',
          Object.keys(this.state.invalidFields)
        )
      );
    }
  }]);

  return IssueEdit;
}(_react2.default.Component);

exports.default = IssueEdit;

/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QueryUtil = exports.QueryUtil = function () {
  function QueryUtil() {
    _classCallCheck(this, QueryUtil);
  }

  _createClass(QueryUtil, null, [{
    key: "getQueryValue",
    value: function getQueryValue(queryStr, key) {
      if (!queryStr || queryStr.length == 0) return false;
      if (queryStr[0] == "?") queryStr = queryStr.substr(queryStr.length - 2);

      var keyVals = queryStr.split("&");
      keyVals = keyVals.map(function (cur) {
        var curKeyVal = [];
        curKeyVal = cur.split("=");
        var curObj = {};
        curObj[curKeyVal[0]] = curKeyVal[1];
        return curObj;
      });
      var queryObj = Object.assign.apply(Object, [{}].concat(_toConsumableArray(keyVals)));
      return queryObj[key];
    }
  }]);

  return QueryUtil;
}();

var URLManager = exports.URLManager = function () {
  function URLManager() {
    _classCallCheck(this, URLManager);
  }

  _createClass(URLManager, null, [{
    key: "URL_SERVER_PREFIX",
    get: function get() {
      return "http://localhost:3000/api";
    }
  }, {
    key: "URL_ISSUES",
    get: function get() {
      return "http://localhost:3000/api/issues";
    }
  }]);

  return URLManager;
}();

var DateManager = exports.DateManager = function () {
  function DateManager() {
    _classCallCheck(this, DateManager);
  }

  _createClass(DateManager, null, [{
    key: "formatDate",
    value: function formatDate(d) {
      console.log("oooooooo" + d.getDate());
      var datestring = d.getFullYear() + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2);
      return datestring;
    }
  }]);

  return DateManager;
}();

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumInput = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumInput = exports.NumInput = function (_React$Component) {
  _inherits(NumInput, _React$Component);

  function NumInput(props) {
    _classCallCheck(this, NumInput);

    var _this = _possibleConstructorReturn(this, (NumInput.__proto__ || Object.getPrototypeOf(NumInput)).call(this, props));

    _this.state = { value: _this.format(props.value) };
    _this.onBlur = _this.onBlur.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  //to change the input value into a string value


  _createClass(NumInput, [{
    key: 'format',
    value: function format(num) {
      return num != null ? num.toString() : '';
    }

    //to change string value to num value

  }, {
    key: 'unformat',
    value: function unformat(str) {
      var val = parseInt(str, 10);
      return isNaN(val) ? null : val;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.setState({ value: this.format(newProps.value) });
    }
  }, {
    key: 'onBlur',
    value: function onBlur(e) {
      this.props.onChange(e, this.unformat(this.state.value));
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      if (e.target.value.match(/^\d*$/)) this.setState({ value: e.target.value });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('input', _extends({ type: 'text' }, this.props, { value: this.state.value, onBlur: this.onBlur, onChange: this.onChange }));
    }
  }]);

  return NumInput;
}(_react2.default.Component);

/*
export class DateInput extends React.Component{
  constructor(){
    super();
    this.onBlur = this.onBlur.bind(this);
  }
  onBlur(e){
    const value = e.target.value;
    if(value==undefined || value==''){
      this.props.onValidityChange(e, false);
      return;
    }
    const date = value.split('-');
    if(date.length!=3){
      this.props.onValidityChange(e, false);
    }else{
      this.props.onValidityChange(e, true);
      this.props.onChange(e, new Date(date[2],date[0],date[1]));
    }
  }
  render(){
    return (
      <input name='date' placeholder='mm-dd-yyyy' onBlur = {this.onBlur} />
    );
  }
}
*/

/***/ })

},[36]);
//# sourceMappingURL=app.bundle.js.map