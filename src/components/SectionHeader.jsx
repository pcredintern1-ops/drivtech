/**
 * Shared section typography & spacing — single source of truth sitewide.
 */

/** Section padding tokens — keep aligned across all pages */
export const SECTION_PT = 'pt-28 sm:pt-36 md:pt-40 lg:pt-36'
export const SECTION_PB = 'pb-12 md:pb-20 lg:pb-24'
export const SECTION_GAP = 'pt-10 md:pt-12 lg:pt-14'
export const CONTAINER_GAP = SECTION_GAP
export const SECTION_PT_CONT = SECTION_GAP
export const SECTION_SHELL = `relative ${SECTION_PT} ${SECTION_PB} overflow-x-clip section-sep`
export const SECTION_SHELL_CONT = `relative pt-0 ${SECTION_PB} overflow-x-clip section-sep`
export const SECTION_CONTAINER = 'relative w-full mx-auto px-4 sm:px-8 lg:px-12 2xl:px-24'
export const BAND_PY = 'py-12 md:py-16 lg:py-20'
export const BAND_SHELL_CONT = 'pt-0 pb-12 md:pb-16 lg:pb-20'
export const SECTION_HEADER_MB = 'mb-6 md:mb-8 lg:mb-10'
export const SECTION_LABEL_MB = 'mb-5 md:mb-6 lg:mb-8'

export function SectionLabel({ children, className = '', onDark = false }) {
  return (
    <span
      className={`flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-[0.3em] mb-3 md:mb-4 ${
        onDark ? 'text-[#A3E635]' : 'text-[#65a30d]'
      } ${className}`}
    >
      <span className="w-8 h-px bg-[#A3E635]/60" />
      <span className="w-2 h-2 rounded-full bg-[#A3E635]" />
      {children}
      <span className="w-2 h-2 rounded-full bg-[#A3E635]" />
      <span className="w-8 h-px bg-[#A3E635]/60" />
    </span>
  )
}

export function SectionTitle({
  children,
  as: Tag = 'h2',
  className = '',
  onDark = false,
  align = 'center',
  ...props
}) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center'
  return (
    <Tag
      className={`font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-[3.4rem] leading-[1.08] mb-3 md:mb-4 ${alignClass} ${
        onDark ? 'text-white' : 'text-gray-900'
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function SectionDescription({
  children,
  className = '',
  maxWidth = 'max-w-2xl',
  align = 'center',
}) {
  const alignClass = align === 'left' ? 'text-left mx-0' : 'text-center mx-auto'
  return (
    <p
      className={`text-black text-base sm:text-lg ${maxWidth} leading-relaxed mt-2 md:mt-3 ${alignClass} ${className}`}
    >
      {children}
    </p>
  )
}

export function SectionHeader({
  label,
  title,
  description,
  titleAs = 'h2',
  onDark = false,
  className = '',
  titleAlign,
  descMaxWidth,
  children,
  compact = false,
}) {
  const headerMb = compact ? SECTION_LABEL_MB : SECTION_HEADER_MB
  return (
    <div className={`text-center ${headerMb} ${className}`}>
      {label && <SectionLabel onDark={onDark}>{label}</SectionLabel>}
      {title && (
        <div className="w-fit mx-auto">
          <SectionTitle as={titleAs} onDark={onDark} align={titleAlign}>
            {title}
          </SectionTitle>
        </div>
      )}
      {description && (
        <SectionDescription maxWidth={descMaxWidth} align={titleAlign}>
          {description}
        </SectionDescription>
      )}
      {children}
    </div>
  )
}
