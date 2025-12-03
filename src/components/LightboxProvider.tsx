'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'

export type LightboxImage = { src: string; alt?: string }
type Ctx = {
  open: (images: LightboxImage[], startIndex?: number) => void
  close: () => void
}

const LightboxCtx = createContext<Ctx | null>(null)

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<LightboxImage[] | null>(null)
  const [index, setIndex] = useState(0)

  const close = useCallback(() => {
    setImages(null)
    setIndex(0)
    document.body.style.overflow = ''
  }, [])

  const open = useCallback((imgs: LightboxImage[], start = 0) => {
    if (!imgs?.length) return
    setImages(imgs)
    setIndex(Math.min(Math.max(0, start), imgs.length - 1))
    document.body.style.overflow = 'hidden'
  }, [])

  useEffect(() => {
    if (!images) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight')
        setIndex((i) => Math.min(i + 1, images.length - 1))
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [images, close])

  const ctx = useMemo(() => ({ open, close }), [open, close])

  return (
    <LightboxCtx.Provider value={ctx}>
      {children}
      {images && (
        <LightboxModal
          images={images}
          index={index}
          setIndex={setIndex}
          onClose={close}
        />
      )}
    </LightboxCtx.Provider>
  )
}

export function useLightbox() {
  const v = useContext(LightboxCtx)
  if (!v)
    throw new Error('useLightbox must be used within <LightboxProvider />')
  return v
}

function LightboxModal({
  images,
  index,
  setIndex,
  onClose
}: {
  images: LightboxImage[]
  index: number
  setIndex: React.Dispatch<React.SetStateAction<number>>
  onClose: () => void
}) {
  const backdropRef = useRef<HTMLDivElement | null>(null)
  const hasMany = images.length > 1

  const next = () => setIndex((i) => Math.min(i + 1, images.length - 1))
  const prev = () => setIndex((i) => Math.max(i - 1, 0))

  const el = (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-200 bg-black/75 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={(e) => e.target === backdropRef.current && onClose()}
    >
      <div className="relative w-full max-w-360 h-[90vh] rounded-3xl bg-[#0a0f1a] border border-white/10 shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 text-white/80 text-sm">
          <span>
            {index + 1} / {images.length}
          </span>

          <button
            onClick={onClose}
            className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
          >
            <FiX />
          </button>
        </div>

        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full max-h-full flex items-center justify-center p-4">
            <Image
              src={images[index].src}
              alt={images[index].alt || 'image'}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {hasMany && (
            <>
              <button
                onClick={prev}
                disabled={index === 0}
                className="absolute left-6 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center rounded-full
                           bg-black/60 text-white text-xl border border-white/20 hover:bg-black/80 disabled:opacity-40"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={next}
                disabled={index === images.length - 1}
                className="absolute right-6 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center rounded-full
                           bg-black/60 text-white text-xl border border-white/20 hover:bg-black/80 disabled:opacity-40"
              >
                <FiChevronRight />
              </button>
            </>
          )}
        </div>

        {hasMany && (
          <div className="flex items-center justify-center gap-2 py-4 border-t border-white/10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`transition-all rounded-full ${
                  i === index ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )

  if (typeof window === 'undefined') return null
  return createPortal(el, document.body)
}
