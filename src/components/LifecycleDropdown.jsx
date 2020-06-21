import React, { Component } from "react";
import HockeyService from "../services/HockeyService";
import { Select, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";

class LifecycleDropdown extends Component {
  constructor(props) {
    super(props);
    const { calledInConstructor } = props;
    console.log(calledInConstructor);
    calledInConstructor();
    this.state = {
      teams: [],
    };
  }

  componentDidMount() {
    HockeyService.getTeams().then((teams) => {
      this.setState({ teams });
    });
  }

  render() {
    const { teams } = this.state;
    const { value, onChange } = this.props;
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
};

LifecycleDropdown.defaultProps = {
  calledInConstructor: () => {
    return true;
  },
};

export default LifecycleDropdown;
