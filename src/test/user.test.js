import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Users from "./../components/Users/Users.jsx";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-15";
//import "./setupTest";
const mockStore = configureMockStore();
const store = mockStore({});
configure({ adapter: new Adapter() });
describe("First React component test with Enzyme", () => {
  it("renders without crashing", () => {
    <Provider store={store}>
      <Users />
    </Provider>;
  });
});
//callback function
it("renders learn react link", () => {
  render(<Users title="Users" />);
  const headingElement = screen.getAllByText(/Users/i);
  //const { getByText } = render(<Users />);
  const linkElement = screen.expect(headingElement).toBeInTheDocument();
});
