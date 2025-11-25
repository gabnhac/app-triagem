import React from 'react'

import * as Icons from '@expo/vector-icons'
import styles from '../../theme'

import { type IconProps } from './index.types'

export function Icon<T extends keyof typeof Icons>({
    iconLib,
    iconName,
    size,
    color,
}: Readonly<IconProps<T>>) {
    const IconLib = Icons[iconLib]

    return (
        <IconLib
            name={iconName}
            size={size ?? 24}
            color={styles.colors?.[color as keyof typeof styles.colors] || color}
        />
    )
}
