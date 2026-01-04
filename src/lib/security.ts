/**
 * Security utilities for contact form validation and sanitization
 */

/**
 * Check if honeypot field is triggered (bot detection)
 */
export function isHoneypotTriggered(honeypotValue?: string): boolean {
  return honeypotValue !== undefined && honeypotValue.trim() !== ''
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string | null {
  const trimmed = email.trim().toLowerCase()

  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(trimmed)) {
    return null
  }

  // Remove any potential injection attempts
  const cleaned = trimmed.replace(/[<>;"'()]/g, '')

  return cleaned
}

/**
 * Sanitize HTML to prevent XSS attacks
 */
export function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Check for suspicious patterns (spam, SQL injection, etc.)
 */
export function containsSuspiciousPatterns(text: string): boolean {
  const suspiciousPatterns = [
    // SQL injection attempts
    /(\bOR\b.*=.*|UNION.*SELECT|DROP.*TABLE|INSERT.*INTO|DELETE.*FROM)/i,
    // Script injection
    /<script[^>]*>.*?<\/script>/gi,
    // Excessive URLs (spam indicator)
    /(https?:\/\/[^\s]+.*){4,}/gi,
    // Common spam keywords in sequence
    /(viagra|cialis|casino|lottery|prize|winner|click here|buy now|limited time)/gi,
    // Excessive special characters
    /[!@#$%^&*()]{10,}/,
  ]

  return suspiciousPatterns.some((pattern) => pattern.test(text))
}

/**
 * Create secure email HTML template
 */
export function createSecureEmailHtml(
  name: string,
  email: string,
  projectType: string,
  details: string,
): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
      <div style="border-bottom: 3px solid #0066cc; padding-bottom: 20px; margin-bottom: 30px;">
        <h2 style="color: #1a1a1a; margin: 0; font-size: 24px; font-weight: 600;">
          Novo Contato - Plann3D
        </h2>
      </div>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 15px 0; color: #333; font-size: 16px; font-weight: 600;">
          Informações do Contato
        </h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; font-weight: 500; width: 140px;">Nome:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666; font-weight: 500;">Email:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">
              <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666; font-weight: 500;">Tipo de Projeto:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">${projectType}</td>
          </tr>
        </table>
      </div>
      
      <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 15px 0; color: #333; font-size: 16px; font-weight: 600;">
          Detalhes do Projeto
        </h3>
        <p style="margin: 0; color: #1a1a1a; line-height: 1.6; white-space: pre-wrap;">${details}</p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
        <p style="margin: 0; color: #999; font-size: 12px;">
          Este email foi enviado através do formulário de contato do site Plann3D<br>
          Data: ${new Date().toLocaleString('pt-BR')}
        </p>
      </div>
    </div>
  `
}

/**
 * Create secure email plain text template
 */
export function createSecureEmailText(
  name: string,
  email: string,
  projectType: string,
  details: string,
): string {
  return `
NOVO CONTATO - PLANN3D
${'='.repeat(50)}

INFORMAÇÕES DO CONTATO:
Nome: ${name}
Email: ${email}
Tipo de Projeto: ${projectType}

DETALHES DO PROJETO:
${details}

${'='.repeat(50)}
Este email foi enviado através do formulário de contato do site Plann3D
Data: ${new Date().toLocaleString('pt-BR')}
  `.trim()
}

/**
 * Validate form timing (anti-bot)
 */
export function isFormFilledTooFast(formLoadedAt: number, minTimeMs = 2000): boolean {
  const timeTaken = Date.now() - formLoadedAt
  return timeTaken < minTimeMs
}

/**
 * Validate field lengths
 */
export function validateFieldLengths(data: { name: string; email: string; details: string }): {
  valid: boolean
  error?: string
} {
  const MAX_NAME_LENGTH = 100
  const MAX_EMAIL_LENGTH = 254
  const MAX_MESSAGE_LENGTH = 5000

  if (data.name.length > MAX_NAME_LENGTH) {
    return { valid: false, error: 'Nome muito longo' }
  }

  if (data.email.length > MAX_EMAIL_LENGTH) {
    return { valid: false, error: 'Email muito longo' }
  }

  if (data.details.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: 'Mensagem muito longa' }
  }

  return { valid: true }
}
