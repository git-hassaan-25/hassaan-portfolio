import type { ComponentType } from 'react';
import type { ProjectId } from '@/types';
import { JosoorPreview } from './JosoorPreview';
import { MarsEditorPreview } from './MarsEditorPreview';
import { DevFlowPreview } from './DevFlowPreview';
import { TrueLeadsPreview } from './TrueLeadsPreview';
import { ParkerAuctionPreview } from './ParkerAuctionPreview';
import type { PreviewProps } from './types';

interface PreviewMeta {
  Component: ComponentType<PreviewProps>;
  /** Display-only URL in the frame's chrome bar. */
  url: string;
}

export const previewRegistry: Record<ProjectId, PreviewMeta> = {
  josoor: { Component: JosoorPreview, url: 'josoor — marketplace' },
  'mars-editor': { Component: MarsEditorPreview, url: 'mars editor — workspace' },
  devflow: { Component: DevFlowPreview, url: 'devflow — board' },
  trueleads: { Component: TrueLeadsPreview, url: 'trueleads — workflow' },
  'parker-auction': { Component: ParkerAuctionPreview, url: 'parker — live auction' },
};

export type { PreviewProps };
