import { type ReactElement, useEffect, useState } from "react"
import { Modal, Pressable, View } from "react-native"

import Card from "#design/elements/Card"
import TextInput from "#design/elements/TextInput"
import Typography from "#design/elements/Typography"
import { shapes, spacing, type ThemeColors } from "#design/foundations"
import { useThemedStyles } from "#shared/settings"

import {
  DEFAULT_LOCATION_COLOR,
  PRESET_LOCATION_COLORS,
  isValidHexColor,
  normalizeHexColor,
} from "./color"

type ColorPickerModalProps = {
  initialColor?: string
  locationName: string
  onCancel: () => void
  onConfirm: (color: string) => void
  visible: boolean
}

export default function ColorPickerModal({
  initialColor = DEFAULT_LOCATION_COLOR,
  locationName,
  onCancel,
  onConfirm,
  visible,
}: ColorPickerModalProps): ReactElement {
  const styles = useThemedStyles(createStyles)
  const [value, setValue] = useState(initialColor)

  // Reset the field to the current color each time the modal opens.
  useEffect(() => {
    if (visible) setValue(initialColor)
  }, [visible, initialColor])

  const isValid = isValidHexColor(value)
  const normalizedValue = normalizeHexColor(value).toLowerCase()

  return (
    <Modal
      animationType="fade"
      onRequestClose={onCancel}
      transparent
      visible={visible}
    >
      <View style={styles.backdrop}>
        <Card style={styles.card}>
          <Typography variant="large">Pick a color</Typography>
          <Typography style={styles.subtitle} variant="muted">
            {locationName}
          </Typography>

          <View style={styles.swatches}>
            {PRESET_LOCATION_COLORS.map((preset) => {
              const selected = preset.toLowerCase() === normalizedValue
              return (
                <Pressable
                  hitSlop={4}
                  key={preset}
                  onPress={() => {
                    setValue(preset)
                  }}
                  style={[
                    styles.swatch,
                    { backgroundColor: preset },
                    selected && styles.swatchSelected,
                  ]}
                />
              )
            })}
          </View>

          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setValue}
            placeholder="#0f6cbd"
            style={styles.input}
            value={value}
          />

          {!isValid ? (
            <Typography style={styles.error} variant="muted">
              Enter a valid hex color (e.g. #0f6cbd).
            </Typography>
          ) : (
            <View style={[styles.preview, { backgroundColor: value }]} />
          )}

          <View style={styles.actions}>
            <Pressable hitSlop={8} onPress={onCancel} style={styles.action}>
              <Typography variant="label">Cancel</Typography>
            </Pressable>
            <Pressable
              disabled={!isValid}
              hitSlop={8}
              onPress={() => {
                onConfirm(normalizeHexColor(value))
              }}
              style={styles.action}
            >
              <Typography
                style={isValid ? styles.confirm : styles.confirmDisabled}
                variant="label"
              >
                Save
              </Typography>
            </Pressable>
          </View>
        </Card>
      </View>
    </Modal>
  )
}

const createStyles = (colors: ThemeColors) => ({
  backdrop: {
    alignItems: "center" as const,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center" as const,
    paddingHorizontal: spacing.inside,
  },
  card: {
    alignItems: "stretch" as const,
    width: "100%" as const,
  },
  subtitle: {
    marginBottom: spacing.between,
  },
  swatches: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: spacing.sm,
    marginBottom: spacing.between,
  },
  swatch: {
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    height: 32,
    width: 32,
  },
  swatchSelected: {
    borderColor: colors.body,
    borderWidth: 3,
  },
  input: {
    marginBottom: spacing.sm,
  },
  error: {
    color: colors.negative,
    marginBottom: spacing.between,
  },
  preview: {
    borderRadius: shapes.borderRadius,
    height: 24,
    marginBottom: spacing.between,
    width: "100%" as const,
  },
  actions: {
    flexDirection: "row" as const,
    gap: spacing.between,
    justifyContent: "flex-end" as const,
  },
  action: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  confirm: {
    color: colors.brand,
  },
  confirmDisabled: {
    color: colors.muted,
  },
})
