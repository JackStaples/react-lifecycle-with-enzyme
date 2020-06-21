/*
Author: Jack Staples
Date: July 21, 2020
About: Exploring the common react lifecycle methods (found here https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/ @version 16.4) 
and how they are used in the various different forms of enzyme rendering, the goal being to get a better understanding of both the react lifecycle
and enzyme testing

*/

import React from "react";
import LifecycleDropdown from "../LifecycleDropdown";
import HockeyService from "../../services/HockeyService";
import { shallow } from "enzyme";

const mockReturn = [
  {
    id: 1,
    name: "New Jersey Devils",
    link: "/api/v1/teams/1",
    venue: {
      name: "Prudential Center",
      link: "/api/v1/venues/null",
      city: "Newark",
      timeZone: {
        id: "America/New_York",
        offset: -4,
        tz: "EDT",
      },
    },
    abbreviation: "NJD",
    teamName: "Devils",
    locationName: "New Jersey",
    firstYearOfPlay: "1982",
    division: {
      id: 18,
      name: "Metropolitan",
      nameShort: "Metro",
      link: "/api/v1/divisions/18",
      abbreviation: "M",
    },
    conference: {
      id: 6,
      name: "Eastern",
      link: "/api/v1/conferences/6",
    },
    franchise: {
      franchiseId: 23,
      teamName: "Devils",
      link: "/api/v1/franchises/23",
    },
    shortName: "New Jersey",
    officialSiteUrl: "http://www.newjerseydevils.com/",
    franchiseId: 23,
    active: true,
  },
  {
    id: 2,
    name: "New York Islanders",
    link: "/api/v1/teams/2",
    venue: {
      id: 5026,
      name: "Barclays Center",
      link: "/api/v1/venues/5026",
      city: "Brooklyn",
      timeZone: {
        id: "America/New_York",
        offset: -4,
        tz: "EDT",
      },
    },
    abbreviation: "NYI",
    teamName: "Islanders",
    locationName: "New York",
    firstYearOfPlay: "1972",
    division: {
      id: 18,
      name: "Metropolitan",
      nameShort: "Metro",
      link: "/api/v1/divisions/18",
      abbreviation: "M",
    },
    conference: {
      id: 6,
      name: "Eastern",
      link: "/api/v1/conferences/6",
    },
    franchise: {
      franchiseId: 22,
      teamName: "Islanders",
      link: "/api/v1/franchises/22",
    },
    shortName: "NY Islanders",
    officialSiteUrl: "http://www.newyorkislanders.com/",
    franchiseId: 22,
    active: true,
  },
];

const mockGetTeams = jest
  .spyOn(HockeyService, "getTeams")
  .mockImplementation(() => Promise.resolve(mockReturn));

const mockOnChange = jest.fn();
const mockCalledInConstructor = jest.fn();
const mockCalledInComponentDidMount = jest.fn();
const mockCalledInComponentDidUpdate = jest.fn();
const mockCalledInComponentWillUnmount = jest.fn();
const mockCalledInRender = jest.fn();

const getJsxComponent = () => {
  return (
    <LifecycleDropdown
      onChange={mockOnChange}
      value=""
      calledInConstructor={mockCalledInConstructor}
      calledInComponentDidMount={mockCalledInComponentDidMount}
      calledInComponentDidUpdate={mockCalledInComponentDidUpdate}
      calledInComponentWillUnmount={mockCalledInComponentWillUnmount}
      calledInRender={mockCalledInRender}
    />
  );
};

beforeEach(() => {
  mockGetTeams.mockClear();
  mockOnChange.mockClear();
  mockCalledInConstructor.mockClear();
  mockCalledInComponentDidMount.mockClear();
  mockCalledInComponentDidUpdate.mockClear();
  mockCalledInComponentWillUnmount.mockClear();
  mockCalledInRender.mockClear();
});

describe("<LifecycleDropdown", () => {
  it("can do a shallow render", () => {
    const wrapper = shallow(getJsxComponent());

    /* A react component mounted with enzymes shallow rendering calls the constructor, render, and componentDidMount */
    expect(mockCalledInConstructor).toHaveBeenCalledTimes(1);
    expect(mockCalledInComponentDidMount).toHaveBeenCalledTimes(1);
    /* Note that the render has only been called once, indicating that the state update in componentDidMount did not happen */
    expect(mockCalledInRender).toHaveBeenCalledTimes(1);

    /* Interestingly, the API call has happened, as can be seen below */
    expect(mockGetTeams).toHaveBeenCalledTimes(1);

    /* We can see that componentDidUpdate has also not been called, so the state most likely is empty */
    expect(mockCalledInComponentDidUpdate).toHaveBeenCalledTimes(0);

    /* This shows that the state update has not been called */
    const { teams } = wrapper.state();
    expect(teams).toEqual(expect.arrayContaining([]));

    /* The component is still mounted, so componentWillUnmount not being called is expected */
    expect(mockCalledInComponentWillUnmount).toHaveBeenCalledTimes(0);

    /* Lets unmount it and see if that calls componentWillUnmount */
    wrapper.unmount();

    /* And now we can see it did fire componentWillUnmount before it was removed from the DOM */
    expect(mockCalledInComponentWillUnmount).toHaveBeenCalledTimes(1);
  });
});
