# 🎨 TKA Design System

Sistem desain yang konsisten untuk semua portal TKA dengan fokus pada usability, accessibility, dan modern design principles.

## 🎯 Design Principles

1. **Clarity First**: Interface yang jelas dan mudah dipahami
2. **Efficiency**: Minimize clicks, maximize productivity
3. **Consistency**: Uniform experience across all portals
4. **Accessibility**: WCAG 2.1 AA compliant
5. **Scalability**: Works on all screen sizes
6. **Performance**: Fast loading and smooth interactions

## 🌈 Color Palette

### Primary Colors
```css
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-500: #3b82f6;
--primary-600: #2563eb;
--primary-700: #1d4ed8;
--primary-900: #1e3a8a;
```

### Secondary Colors
```css
--secondary-50: #f8fafc;
--secondary-100: #f1f5f9;
--secondary-500: #64748b;
--secondary-600: #475569;
--secondary-700: #334155;
--secondary-900: #0f172a;
```

### Semantic Colors
```css
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #06b6d4;
```

### Status Colors
```css
--status-active: #10b981;
--status-inactive: #6b7280;
--status-pending: #f59e0b;
--status-completed: #3b82f6;
--status-cancelled: #ef4444;
```

## 📝 Typography

### Font Family
- **Primary**: Inter, system-ui, sans-serif
- **Monospace**: JetBrains Mono, monospace

### Font Sizes
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights
```css
--leading-none: 1;
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

## 📐 Spacing System

### Base Unit: 4px
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

## 🎭 Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

## 🔄 Border Radius

```css
--radius-none: 0;
--radius-sm: 0.125rem;  /* 2px */
--radius: 0.25rem;      /* 4px */
--radius-md: 0.375rem;  /* 6px */
--radius-lg: 0.5rem;    /* 8px */
--radius-xl: 0.75rem;   /* 12px */
--radius-2xl: 1rem;     /* 16px */
--radius-full: 9999px;
```

## 🧩 Component Library

### Buttons

#### Primary Button
```html
<button class="btn-primary">
  Primary Action
</button>
```
```css
.btn-primary {
  background-color: var(--primary-600);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  transition: all 0.2s;
}

.btn-primary:hover {
  background-color: var(--primary-700);
  box-shadow: var(--shadow-md);
}
```

#### Secondary Button
```html
<button class="btn-secondary">
  Secondary Action
</button>
```
```css
.btn-secondary {
  background-color: white;
  color: var(--secondary-700);
  border: 1px solid var(--secondary-300);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  transition: all 0.2s;
}

.btn-secondary:hover {
  background-color: var(--secondary-50);
  border-color: var(--secondary-400);
}
```

### Cards

#### Standard Card
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
  </div>
  <div class="card-body">
    Card content goes here
  </div>
</div>
```
```css
.card {
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.card-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--secondary-200);
}

.card-body {
  padding: var(--space-6);
}
```

### Forms

#### Input Fields
```html
<div class="form-group">
  <label class="form-label">Label</label>
  <input type="text" class="form-input" placeholder="Placeholder">
  <p class="form-help">Help text</p>
</div>
```
```css
.form-group {
  margin-bottom: var(--space-4);
}

.form-label {
  display: block;
  font-weight: var(--font-medium);
  color: var(--secondary-700);
  margin-bottom: var(--space-2);
}

.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--secondary-300);
  border-radius: var(--radius-md);
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

### Tables

#### Data Table
```html
<div class="table-container">
  <table class="data-table">
    <thead>
      <tr>
        <th>Header 1</th>
        <th>Header 2</th>
        <th>Header 3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Data 1</td>
        <td>Data 2</td>
        <td>Data 3</td>
      </tr>
    </tbody>
  </table>
</div>
```
```css
.table-container {
  overflow-x: auto;
  border-radius: var(--radius-lg);
  border: 1px solid var(--secondary-200);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  background-color: var(--secondary-50);
  padding: var(--space-4);
  text-align: left;
  font-weight: var(--font-semibold);
  color: var(--secondary-700);
  border-bottom: 1px solid var(--secondary-200);
}

.data-table td {
  padding: var(--space-4);
  border-bottom: 1px solid var(--secondary-100);
}

.data-table tr:hover {
  background-color: var(--secondary-50);
}
```

## 📱 Responsive Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

## 🎨 Status Indicators

### Exam Status
```css
.status-draft { background-color: var(--secondary-500); }
.status-scheduled { background-color: var(--info); }
.status-active { background-color: var(--success); }
.status-completed { background-color: var(--primary-500); }
.status-cancelled { background-color: var(--error); }
```

### Student Status
```css
.status-not-started { background-color: var(--secondary-400); }
.status-in-progress { background-color: var(--warning); }
.status-completed { background-color: var(--success); }
.status-timeout { background-color: var(--error); }
```

## 🧪 Accessibility Guidelines

### Color Contrast
- **Normal text**: 4.5:1 minimum contrast ratio
- **Large text**: 3:1 minimum contrast ratio
- **Interactive elements**: 3:1 minimum contrast ratio

### Focus Indicators
```css
.focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}
```

### Screen Reader Support
```html
<button aria-label="Close dialog" aria-pressed="false">
  <svg aria-hidden="true"><!-- icon --></svg>
</button>
```

## 🚀 Animation Guidelines

### Duration
```css
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 350ms;
```

### Easing Functions
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

## 📋 Portal-Specific Styles

### Super Admin Portal
- **Primary Color**: Blue (#3b82f6)
- **Accent Color**: Purple (#8b5cf6)
- **Focus**: Administrative functions, system-wide settings

### Disdik Portal
- **Primary Color**: Teal (#14b8a6)
- **Accent Color**: Cyan (#06b6d4)
- **Focus**: Regional management, school oversight

### FKKG Portal
- **Primary Color**: Indigo (#6366f1)
- **Accent Color**: Violet (#8b5cf6)
- **Focus**: Academic content, question management

### School Admin Portal
- **Primary Color**: Green (#10b981)
- **Accent Color**: Emerald (#059669)
- **Focus**: Student management, local exam coordination

## 🎯 Implementation Notes

1. **Use CSS Custom Properties** for easy theming
2. **Mobile-first approach** for responsive design
3. **Component-based architecture** for reusability
4. **Dark mode support** consideration
5. **RTL support** for future internationalization

---

**Design system ini akan digunakan sebagai foundation untuk semua wireframe dan mockup yang akan dibuat.**