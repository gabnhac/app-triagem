import { type ComponentProps } from 'react';

import type * as Icons from '@expo/vector-icons';

export type IconProps<T extends keyof typeof Icons> = {
    iconLib: T;
    iconName: ComponentProps<(typeof Icons)[T]>['name'];
    color: string;
    size: number;
};
