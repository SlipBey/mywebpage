import {
  FiCpu,
  FiSmartphone,
  FiLayout,
  FiCloud,
  FiZap,
  FiCpu as FiAi,
  FiServer,
  FiCamera
} from 'react-icons/fi'

export type DomainItem = {
  key: string
  chipKey: string
  Icon: React.ComponentType<{ className?: string }>
}

export const DOMAIN_ITEMS: DomainItem[] = [
  { key: 'software', Icon: FiCpu, chipKey: 'about.domains.items.software' },
  { key: 'mobile', Icon: FiSmartphone, chipKey: 'about.domains.items.mobile' },
  { key: 'design', Icon: FiLayout, chipKey: 'about.domains.items.design' },
  { key: 'cloud', Icon: FiCloud, chipKey: 'about.domains.items.cloud' },
  { key: 'systems', Icon: FiServer, chipKey: 'about.domains.items.systems' },
  { key: 'ai', Icon: FiAi, chipKey: 'about.domains.items.ai' },
  { key: 'automation', Icon: FiZap, chipKey: 'about.domains.items.automation' },
  { key: 'media', Icon: FiCamera, chipKey: 'about.domains.items.media' }
]
