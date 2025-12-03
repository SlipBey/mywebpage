import {
  FiYoutube,
  FiBookOpen,
  FiFilm,
  FiMusic,
  FiGithub,
  FiPenTool
} from 'react-icons/fi'

export type FocusKey =
  | 'youtube'
  | 'blog'
  | 'screenplay'
  | 'songwriting'
  | 'openSource'
  | 'productDesign'

export const FOCUS: ReadonlyArray<{ key: FocusKey; icon: any }> = [
  { key: 'youtube', icon: FiYoutube },
  { key: 'blog', icon: FiBookOpen },
  { key: 'screenplay', icon: FiFilm },
  { key: 'songwriting', icon: FiMusic },
  { key: 'openSource', icon: FiGithub },
  { key: 'productDesign', icon: FiPenTool }
] as const
