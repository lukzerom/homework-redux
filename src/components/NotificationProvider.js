import React, { useCallback } from "react";
import { getNotification } from "../selectors/homeworkSelectors";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { clearNotification } from "../actions/homeworkActions";
import PropTypes from "prop-types";

const NotificationProvider = ({
  notification,
  handleClearNorification,
  children,
}) => {
  const handleClose = useCallback(() => {
    handleClearNorification();
  }, [handleClearNorification]);
  return (
    <div>
      {children}

      <Snackbar open={Boolean(notification.message)} onClose={handleClose}>
        <Alert severity="success" sx={{ width: "100%" }} onClose={handleClose}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notification: getNotification(state),
});

const mapDispatchToProps = {
  handleClearNorification: clearNotification,
};

NotificationProvider.propTypes = {
  notification: PropTypes.object,
  handleClearNorification: PropTypes.func,
  children: PropTypes.node,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationProvider);
