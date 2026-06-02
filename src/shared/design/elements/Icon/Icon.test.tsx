import { render } from "@testing-library/react-native"

import Icon from "./Icon"

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: jest.fn(() => null),
}))

describe("Design > Elements > Icon", () => {
  it("works", () => {
    expect(() => render(<Icon icon="search" />)).not.toThrow()
  })
})
