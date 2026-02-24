import type { ReactNode } from 'react'

export interface SectionCardProps {
  title: string
  description?: string
  children?: ReactNode
}

export function SectionCard({
  title,
  description,
  children,
}: SectionCardProps): JSX.Element {
  return (
    <section
      style={{
        border: '1px solid #cbd5e1',
        borderRadius: '12px',
        padding: '16px',
        backgroundColor: '#ffffff',
      }}
    >
      <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>{title}</h3>
      {description ? (
        <p style={{ marginTop: '8px', color: '#475569' }}>{description}</p>
      ) : null}
      {children ? <div style={{ marginTop: '12px' }}>{children}</div> : null}
    </section>
  )
}
