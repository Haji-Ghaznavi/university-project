import moment from 'moment'

// 👉 Columns that should never appear in a printed record
const EXCLUDED_KEYS = ['actions', 'profile', 'avatar', 'image']

// 👉 Escape any user/record value so it can't break the generated markup
const escapeHtml = value => {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// 👉 Turn a raw cell value into something printable
const formatValue = value => {
  if (value === null || value === undefined || value === '')
    return '—'

  if (Array.isArray(value))
    return value.map(formatValue).join('، ')

  if (typeof value === 'object') {
    // Common relational shapes: { name } / { title } / { id }
    return escapeHtml(value.name ?? value.title ?? value.label ?? value.id ?? JSON.stringify(value))
  }

  return escapeHtml(value)
}

/**
 * Print a single table record as a nicely designed, RTL, A4 document.
 * The browser print dialog lets the user "Save as PDF" or send it to a printer.
 *
 * @param {Object}  options
 * @param {Object}  options.record   The row/record to print.
 * @param {Array}   options.headers  Page-config headers ([{ title, key }]).
 * @param {String}  options.title    Document title (entity name in Persian).
 * @param {Object}  options.formatters  Optional map of { columnKey: (value, record) => label }
 *                                       to print a Persian label instead of a raw value.
 */
export const printRecord = ({ record, headers = [], title = 'سند', formatters = {} }) => {
  if (!record)
    return

  const printedAt = moment().format('YYYY/MM/DD - HH:mm')

  const rows = headers
    .filter(header => !EXCLUDED_KEYS.includes(header.key))
    .map(header => {
      // A column can supply a formatter to map its raw value (e.g. an English
      // enum like "paid") to a display label (e.g. the Persian "پرداخت").
      const value = formatters[header.key]
        ? formatters[header.key](record[header.key], record)
        : record[header.key]

      return `
        <tr>
          <td class="label">${escapeHtml(header.title)}</td>
          <td class="value">${formatValue(value)}</td>
        </tr>`
    })
    .join('')

  const html = `
    <!DOCTYPE html>
    <html lang="fa" dir="rtl">
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(title)}</title>
        <style>
          @page { size: A4; margin: 16mm; }

          * { box-sizing: border-box; }

          body {
            font-family: 'Vazirmatn', 'IRANSans', 'Tahoma', 'Segoe UI', sans-serif;
            color: #2e2e3a;
            margin: 0;
            padding: 16px 0px;
            background: #fff;
          }

          .sheet { max-width: 760px; margin: 0 auto; }

          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 22px 26px;
            background: #2e2e48;
            border-radius: 12px;
            color: #fff;
          }

          .brand { display: flex; flex-direction: column; gap: 4px; }

          .brand .name {
            font-size: 26px;
            font-weight: 700;
            letter-spacing: 1px;
            color: #ddd942;
          }

          .brand .tagline { font-size: 13px; color: #c7c7d6; }

          .doc-meta { text-align: left; font-size: 12px; line-height: 1.9; color: #e4e4ee; }

          .doc-title {
            margin: 28px 0 14px;
            padding-inline-start: 12px;
            border-inline-start: 5px solid #ddd942;
            font-size: 20px;
            font-weight: 700;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #e3e3ed;
            border-radius: 10px;
            overflow: hidden;
          }

          td { padding: 12px 16px; font-size: 14px; vertical-align: top; }

          td.label {
            width: 34%;
            background: #f4f4fa;
            font-weight: 700;
            color: #50506a;
            border-bottom: 1px solid #e6e6f0;
            white-space: nowrap;
          }

          td.value {
            color: #2e2e3a;
            border-bottom: 1px solid #e6e6f0;
            word-break: break-word;
          }

          tr:last-child td { border-bottom: none; }

          .footer {
            margin-top: 26px;
            padding-top: 12px;
            border-top: 1px dashed #cfcfe0;
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            color: #9a9ab0;
          }

          @media print {
            .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            td.label { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <div class="sheet">
          <div class="header">
            <div class="brand">
              <span class="name">Ahmad Shah</span>
              <span class="tagline">سیستم مدیریت شرکت</span>
            </div>
            <div class="doc-meta">
              <div>تاریخ چاپ: ${escapeHtml(printedAt)}</div>
              ${record.id ? `<div>شماره سند: ${escapeHtml(record.id)}</div>` : ''}
            </div>
          </div>

          <h2 class="doc-title">${escapeHtml(title)}</h2>

          <table>
            <tbody>
              ${rows}
            </tbody>
          </table>

          <div class="footer">
            <span>این سند توسط سیستم مدیریت شرکت Ahmad Shah تولید شده است.</span>
            <span>${escapeHtml(printedAt)}</span>
          </div>
        </div>
      </body>
    </html>`

  // Render into a hidden iframe so the current page/app state is untouched
  const iframe = document.createElement('iframe')
  iframe.style.position = 'fixed'
  iframe.style.right = '0'
  iframe.style.bottom = '0'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = '0'
  document.body.appendChild(iframe)

  const doc = iframe.contentWindow.document
  doc.open()
  doc.write(html)
  doc.close()

  const triggerPrint = () => {
    iframe.contentWindow.focus()
    iframe.contentWindow.print()

    // Clean up after the dialog closes
    setTimeout(() => document.body.removeChild(iframe), 1000)
  }

  // Give the iframe a tick to lay out before printing
  if (iframe.contentWindow.document.readyState === 'complete')
    setTimeout(triggerPrint, 250)
  else
    iframe.onload = () => setTimeout(triggerPrint, 250)
}

export default printRecord
