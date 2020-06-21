import React, { Component } from "react";
import HockeyService from "../services/HockeyService";
import { Select, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";

class LifecycleDropdown extends Component {
  constructor(props) {
    super(props);
    const { calledInConstructor } = props;
    calledInConstructor();
    this.state = {
      teams: [],
    };
  }

  componentDidMount() {
    const { calledInComponentDidMount } = this.props;
    calledInComponentDidMount();
    HockeyService.getTeams().then((teams) => {
      this.setState({ teams });
    });
  }

  componentDidUpdate() {
    const { calledInComponentShouldUpdate } = this.props;
    calledInComponentShouldUpdate();
  }

  componentWillUnmount() {
    const { calledInComponentWillUnmount } = this.props;
    calledInComponentWillUnmount();
  }

  render() {
    const { teams } = this.state;
    const { value, onChange, calledInRender } = this.props;
    calledInRender();
    return (
      <Select value={value} onChange={onChange}>
        {teams.map((team) => (
          <MenuItem key={team.id} value={team.id}>{`${team.name}`}</MenuItem>
        ))}
      </Select>
    );
  }
}

LifecycleDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  calledInConstructor: PropTypes.func,
  calledInComponentDidMount: PropTypes.func,
  calledInComponentShouldUpdate: PropTypes.func,
  calledInComponentWillUnmount: PropTypes.func,
  calledInRender: PropTypes.func,
};

LifecycleDropdown.defaultProps = {
  calledInConstructor: () => {},
  calledInComponentDidMount: () => {},
  calledInComponentShouldUpdate: () => {},
  calledInComponentWillUnmount: () => {},
  calledInRender: () => {},
};

export default LifecycleDropdown;
