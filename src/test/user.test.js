import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Users from "./../components/Users/Users.jsx";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-15";
//import "./setupTest";
const mockStore = configureMockStore();
const mockedSetUsers = jest.fn();
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


/*describe("AddInput", () => {
  it("should render input element", () => {
    render(<Users todos={[]} setTodos={mockedSetUsers} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    expect(inputElement).toBeInTheDocument();
  });

  it("should be able to type into input", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, {
      target: { value: "Go Grocery Shopping" },
    });
    expect(inputElement.value).toBe("Go Grocery Shopping");
  });

  it("should be able to type into input", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, {
      target: { value: "Go Grocery Shopping" },
    });
    const buttonElement = screen.getByRole("button", { name: /Add/i });
    fireEvent.click(buttonElement);
    expect(mockedSetTodo).toBeCalled();
  });

  it("should have empty input when add button is cliked", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.change(inputElement, {
      target: { value: "Go Grocery Shopping" },
    });
    const buttonElement = screen.getByRole("button", { name: /Add/i });
    fireEvent.click(buttonElement);
    expect(inputElement.value).toBe("");
  });*/
});