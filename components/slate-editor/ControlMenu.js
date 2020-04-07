import react, { useEffect } from "react";
import { Button } from "reactstrap";

const ControlMenu = (props) => {
  const { isSaving } = props;
  return (
    <div className="control-menu">
      <h1 className="title">Write Your Story...</h1>
      <div className="status-box">{isSaving ? "Saving..." : "Saved"}</div>
      <Button disabled={isSaving} onClick={props.save} color="success">
        Save
      </Button>
    </div>
  );
};

export default ControlMenu;
