import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";

const PortfolioModal = props => {
  const {
    className,
    isOpen,
    toggle,
    portfolio: {
      title,
      description,
      position,
      location,
      company,
      startDate,
      endDate
    }
  } = props;

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          <b>{title}</b>
        </ModalHeader>
        <ModalBody>
          <p className="portfolio-modal-description">
            <b>Description: </b>
            <br />
            {description}
          </p>
          <p className="portfolio-modal-company">
            <b>Company: </b>
            <br />
            {company}
          </p>
          <p className="portfolio-modal-position">
            <b>Position: </b>
            <br />
            {position}
          </p>
          <p className="portfolio-modal-location">
            <b>City: </b>
            <br />
            {location}
          </p>
          <p className="portfolio-modal-startDate">
            <b>Started at: </b>
            <br />
            {moment(startDate).format("MM/YYYY")}
          </p>

          <p className="portfolio-modal-endDate">
            <b>Ended at: </b>
            <br />
            {endDate ? moment(endDate).format("MM/YYYY") : "still working here"}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export { PortfolioModal };
