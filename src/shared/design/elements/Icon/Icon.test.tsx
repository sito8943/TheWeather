import { render } from "@testing-library/react-native"

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => {
    const { Text } = jest.requireActual("react-native")
    const { createElement } = jest.requireActual("react")

    return createElement(Text, null, "Icon")
  },
}))

import Icon from "./Icon"

describe("Design > Elements > Icon", () => {
  it("works", () => {
    const { getByText } = render(<Icon icon="search" />)

    getByText("Icon")
  })
})
