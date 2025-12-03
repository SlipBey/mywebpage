'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { useI18n } from '@/lib/i18n/I18nProvider'
import instance from '@/lib/api'

type SubjectOpt = { value: string; label: string }

export default function ContactForm({
  subjectOptions
}: {
  subjectOptions: SubjectOpt[]
}) {
  const { t } = useI18n()
  const [pending, setPending] = useState(false)

  const [contact, setContact] = useState({
    fullName: '',
    subject: subjectOptions?.[0]?.value ?? 'general',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target as any
    if (name === 'phone') {
      const raw = value.replace(/\D/g, '').slice(0, 10)
      const formatted = raw
        .replace(/^(\d{3})(\d{3})(\d{0,4})$/, '($1) $2 $3')
        .trim()
      setContact((prev) => ({ ...prev, phone: formatted }))
    } else {
      setContact((prev) => ({ ...prev, [name]: value }))
    }
  }

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (pending) return
    setPending(true)

    const payload = {
      name: contact.fullName,
      email: contact.email,
      subject: contact.subject,
      phone: contact.phone.replace(/\D/g, ''),
      message: contact.message,
      channel: 'slipbey'
    }

    try {
      const res = await instance.post('/api/contact', payload)
      toast.success(res?.data?.message ?? t('contact.success'))
      setContact({
        fullName: '',
        subject: subjectOptions?.[0]?.value ?? 'general',
        email: '',
        phone: '',
        message: ''
      })
    } catch (err: any) {
      const msg =
        err?.response?.data?.error ??
        err.response.data.message ??
        t('contact.error')
      toast.error(msg)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">{t('contact.formTitle')}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {t('contact.formDescription')}
        </p>
      </div>

      <form onSubmit={onSave} className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-slate-800 dark:text-slate-100"
          >
            {t('contact.name.label')} <span className="text-red-500">*</span>
          </label>
          <input
            name="fullName"
            id="fullName"
            value={contact.fullName}
            onChange={handleChange}
            placeholder={t('contact.name.placeholder')}
            required
            className="w-full rounded-xl border border-slate-200/80 dark:border-white/10
                       bg-white/80 dark:bg-white/5 px-3 py-2.5 text-sm
                       text-slate-900 dark:text-slate-100
                       shadow-sm focus-visible:outline-none
                       focus-visible:ring-2 focus-visible:ring-[#68a4a0] focus-visible:ring-offset-0"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="subject"
            className="text-sm font-medium text-slate-800 dark:text-slate-100"
          >
            {t('contact.subjects.label')}
          </label>
          <select
            id="subject"
            name="subject"
            value={contact.subject}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200/80 dark:border-white/10
                       bg-white/80 dark:bg-white/5 px-3 py-2.5 text-sm
                       text-slate-900 dark:text-slate-100
                       shadow-sm focus-visible:outline-none
                       focus-visible:ring-2 focus-visible:ring-[#68a4a0] focus-visible:ring-offset-0"
          >
            {subjectOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-800 dark:text-slate-100"
            >
              {t('contact.mail.label')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={contact.email}
              onChange={handleChange}
              placeholder={t('contact.mail.placeholder')}
              required
              className="w-full rounded-xl border border-slate-200/80 dark:border-white/10
                         bg-white/80 dark:bg-white/5 px-3 py-2.5 text-sm
                         text-slate-900 dark:text-slate-100
                         shadow-sm focus-visible:outline-none
                         focus-visible:ring-2 focus-visible:ring-[#68a4a0] focus-visible:ring-offset-0"
            />
          </div>

          <div className="flex-1 space-y-1.5">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-slate-800 dark:text-slate-100"
            >
              {t('contact.phone.label')}
            </label>
            <input
              name="phone"
              id="phone"
              inputMode="tel"
              value={contact.phone}
              onChange={handleChange}
              placeholder="5xx xxx xxxx"
              className="w-full rounded-xl border border-slate-200/80 dark:border-white/10
                         bg-white/80 dark:bg-white/5 px-3 py-2.5 text-sm
                         text-slate-900 dark:text-slate-100
                         shadow-sm focus-visible:outline-none
                         focus-visible:ring-2 focus-visible:ring-[#68a4a0] focus-visible:ring-offset-0"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="message"
            className="text-sm font-medium text-slate-800 dark:text-slate-100"
          >
            {t('contact.message.label')} <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            id="message"
            rows={4}
            value={contact.message}
            onChange={handleChange}
            placeholder={t('contact.message.placeholder')}
            required
            className="w-full rounded-xl border border-slate-200/80 dark:border-white/10
                       bg-white/80 dark:bg-white/5 px-3 py-2.5 text-sm
                       text-slate-900 dark:text-slate-100
                       shadow-sm focus-visible:outline-none
                       focus-visible:ring-2 focus-visible:ring-[#68a4a0] focus-visible:ring-offset-0
                       resize-none"
          />
        </div>

        <div className="pt-1">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold
                       text-white bg-linear-to-r from-[#68a4a0] to-[#4f8f8b]
                       shadow-sm hover:opacity-95 focus-visible:outline-none
                       focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#68a4a0]
                       disabled:opacity-60 disabled:cursor-not-allowed w-full"
          >
            {pending ? t('contact.sending') : t('contact.button')}
          </button>
        </div>
      </form>
    </div>
  )
}
