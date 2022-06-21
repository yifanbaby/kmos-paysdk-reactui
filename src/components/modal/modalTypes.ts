import * as React from 'react';
import { NativeProps } from '../../utils/native-props';

export type ModalProps = {
  visible: boolean;
  onClose: () => void;
  header?: React.ReactNode | null;
  children: React.ReactNode;
  bodyStyle?: React.CSSProperties;
  title?: string | React.ReactNode;
  mode?: 'left' | 'bottom';
  mask?: boolean;
  markStyle?: React.CSSProperties;
  markClassName?: string;
  bodyClassName?: string;
  destroyOnClose?: boolean;
  forceRender?: boolean;
} & NativeProps<'--z-index'>;
