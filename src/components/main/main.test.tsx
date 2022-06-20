import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Main from "./main";

describe("Main", () => {
  // when user enters correct username
  test("user enters correct username and user profile data is displaying on screen + if user clicks search again app displays form", () => {
    const { getByPlaceholderText, getByRole, findByText } = render(<Main />);

    expect(getByPlaceholderText("Type Username")).toBeInTheDocument();

    const usernameInput = getByPlaceholderText("Type Username");
    userEvent.type(usernameInput, "serhatpolat");
    expect(usernameInput).toHaveValue("serhatpolat");

    setTimeout(() => {
      const searchBtn = getByRole("button", { name: "Search" });
      userEvent.click(searchBtn);
      expect(findByText("Serhat Polat")).toBeInTheDocument();

      const searchAgainBtn = getByRole("button", { name: "Search Again" });
      userEvent.click(searchAgainBtn);
      expect(getByPlaceholderText("Type Username")).toBeInTheDocument();
    }, 3000);
  });

  // when user enters invalid username
  test("user enters invalid username and required message is displaying on screen + if user clicks search again app displays form", () => {
    const { getByPlaceholderText, getByRole, findByText } = render(<Main />);

    expect(getByPlaceholderText("Type Username")).toBeInTheDocument();

    const usernameInput = getByPlaceholderText("Type Username");
    userEvent.type(usernameInput, "kjfdghsklgnjsktnhklsnhslkmhwşlh");
    expect(usernameInput).toHaveValue("kjfdghsklgnjsktnhklsnhslkmhwşlh");

    setTimeout(() => {
      const searchBtn = getByRole("button", { name: "Search" });
      userEvent.click(searchBtn);
      expect(findByText("I can't found this user :(")).toBeInTheDocument();

      const searchAgainBtn = getByRole("button", { name: "Search Again" });
      userEvent.click(searchAgainBtn);
      expect(getByPlaceholderText("Type Username")).toBeInTheDocument();
    }, 3000);
  });
});
