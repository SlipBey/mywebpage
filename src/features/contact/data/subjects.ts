export type ContactSubject = {
  value: string
  labelKey: string
}

export const CONTACT_SUBJECTS: ContactSubject[] = [
  {
    value: 'general',
    labelKey: 'contact.subjects.options.general'
  },
  {
    value: 'project',
    labelKey: 'contact.subjects.options.project'
  },
  {
    value: 'collab',
    labelKey: 'contact.subjects.options.collab'
  },
  {
    value: 'media',
    labelKey: 'contact.subjects.options.media'
  }
]
