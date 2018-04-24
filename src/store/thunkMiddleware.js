export default function(_ref) {
  let dispatch = _ref.dispatch;
  let getState = _ref.getState;

  return function(next) {
    return function(action) {
      return typeof action === 'function' ? action(dispatch, getState) : next(action);
    };
  };
}







