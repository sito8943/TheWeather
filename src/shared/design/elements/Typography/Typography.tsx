import { Link, type LinkProps } from "expo-router"
import { type ReactElement, type ReactNode } from "react"
import {
  StyleSheet,
  Text,
  type StyleProp,
  type TextStyle,
} from "react-native"

import { typography } from "#design/foundations"

type TypographyBaseProps = {
  children: ReactNode
  style?: StyleProp<TextStyle>
  variant?: keyof typeof typography
}

type TypographyLinkProps = Pick<LinkProps, "href" | "push" | "replace">

type TypographyProps =
  | (TypographyBaseProps & { href?: never; push?: never; replace?: never })
  | (TypographyBaseProps & TypographyLinkProps)

export default function Typography(props: TypographyProps): ReactElement {
  const {
    children,
    style,
    variant = "bodyText",
  } = props

  if ("href" in props && props.href !== undefined) {
    const { href, push, replace } = props

    return (
      <Link href={href} push={push} replace={replace} style={[styles[variant], style]}>
        {children}
      </Link>
    )
  }

  return <Text style={[styles[variant], style]}>{children}</Text>
}

const styles = StyleSheet.create(typography)
