import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponentBlack = (props) => (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="m13.74 6.702-2.642 2.306.791 3.434a.937.937 0 0 1-1.397 1.016L7.498 11.64l-2.989 1.817a.938.938 0 0 1-1.396-1.016l.79-3.43-2.643-2.31a.938.938 0 0 1 .534-1.644l3.484-.302 1.36-3.244a.935.935 0 0 1 1.725 0l1.364 3.244 3.482.302a.937.937 0 0 1 .534 1.644h-.003Z"
    />
  </Svg>
)
export default SvgComponentBlack
