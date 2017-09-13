'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _components = require('@patternplate/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Select;


function Select(props) {
  var className = (0, _classnames2.default)('select', props.className);

  return _react2.default.createElement(
    'label',
    { className: className },
    _react2.default.createElement(
      'select',
      {
        className: 'select__native',
        onChange: props.onChange,
        value: props.value.value
      },
      props.options.map(function (_ref) {
        var value = _ref.value,
            name = _ref.name;

        return _react2.default.createElement(
          'option',
          { key: value, value: value },
          name
        );
      })
    ),
    _react2.default.createElement(
      'span',
      { className: 'select__label' },
      props.label
    ),
    _react2.default.createElement(
      'div',
      { className: 'select__body' },
      _react2.default.createElement(
        'span',
        { className: 'select__value' },
        props.value.name
      ),
      _react2.default.createElement(_components.Icon, {
        base: props.base,
        className: 'select__icon',
        symbol: 'arrow-right'
      })
    )
  );
}