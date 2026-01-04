import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const isProduction = process.env.NODE_ENV === 'production'

// Serve static files in production
if (isProduction) {
  app.use(express.static(path.join(__dirname, 'dist')))
}

app.use(cors())
app.use(express.json())

// ========================================
// Security Helper Functions
// ========================================

function isHoneypotTriggered(honeypotValue) {
  return honeypotValue !== undefined && honeypotValue.trim() !== ''
}

function sanitizeEmail(email) {
  const trimmed = email.trim().toLowerCase()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(trimmed)) {
    return null
  }

  return trimmed.replace(/[<>;"'()]/g, '')
}

function sanitizeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

function containsSuspiciousPatterns(text) {
  const suspiciousPatterns = [
    /(\bOR\b.*=.*|UNION.*SELECT|DROP.*TABLE|INSERT.*INTO|DELETE.*FROM)/i,
    /<script[^>]*>.*?<\/script>/gi,
    /(https?:\/\/[^\s]+.*){4,}/gi,
    /(viagra|cialis|casino|lottery|prize|winner|click here|buy now|limited time)/gi,
    /[!@#$%^&*()]{10,}/,
  ]
  return suspiciousPatterns.some((pattern) => pattern.test(text))
}

function createSecureEmailHtml(name, email, projectType, details) {
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

function createSecureEmailText(name, email, projectType, details) {
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

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, projectType, details, website, formLoadedAt } = req.body

    // ========================================
    // Security Check 1: Honeypot validation
    // ========================================
    if (isHoneypotTriggered(website)) {
      console.warn('[Security] Honeypot triggered - possible bot', {
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
      })
      // Return fake success to confuse bots
      return res.status(200).json({ success: true, message: 'Email enviado com sucesso' })
    }

    // ========================================
    // Security Check 2: Timing validation
    // ========================================
    if (formLoadedAt) {
      const timeTaken = Date.now() - formLoadedAt
      const MIN_TIME_MS = 2000 // 2 seconds minimum

      if (timeTaken < MIN_TIME_MS) {
        console.warn('[Security] Form submitted too fast - possible bot', {
          timeTaken,
          ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        })
        return res.status(200).json({ success: true, message: 'Email enviado com sucesso' })
      }
    }

    // ========================================
    // Security Check 3: Basic validation
    // ========================================
    if (!name || !email || !projectType || !details) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' })
    }

    // ========================================
    // Security Check 4: Length validation
    // ========================================
    const MAX_NAME_LENGTH = 100
    const MAX_EMAIL_LENGTH = 254
    const MAX_MESSAGE_LENGTH = 5000

    if (
      name.length > MAX_NAME_LENGTH ||
      email.length > MAX_EMAIL_LENGTH ||
      details.length > MAX_MESSAGE_LENGTH
    ) {
      return res.status(400).json({
        error: 'Um ou mais campos excedem o tamanho máximo permitido',
      })
    }

    // ========================================
    // Security Check 5: Email validation
    // ========================================
    const sanitizedEmail = sanitizeEmail(email)
    if (!sanitizedEmail) {
      return res.status(400).json({ error: 'Email inválido' })
    }

    // ========================================
    // Security Check 6: Suspicious patterns
    // ========================================
    if (containsSuspiciousPatterns(name) || containsSuspiciousPatterns(details)) {
      console.warn('[Security] Suspicious patterns detected', {
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        name: name.substring(0, 50),
      })
      return res.status(400).json({ error: 'Conteúdo inválido detectado' })
    }

    // ========================================
    // Sanitize inputs for email
    // ========================================
    const safeName = sanitizeHtml(name.trim())
    const safeProjectType = sanitizeHtml(projectType.trim())
    const safeDetails = sanitizeHtml(details.trim())

    // ========================================
    // Send email with sanitized content
    // ========================================
    const mailOptions = {
      from: `"Plann3D Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: sanitizedEmail,
      subject: `Novo Contato - ${safeProjectType}`,
      html: createSecureEmailHtml(safeName, sanitizedEmail, safeProjectType, safeDetails),
      text: createSecureEmailText(safeName, sanitizedEmail, safeProjectType, safeDetails),
    }

    await transporter.sendMail(mailOptions)

    console.log('[Contact] Email sent successfully', {
      from: sanitizedEmail,
      name: safeName.substring(0, 30),
    })

    res.status(200).json({
      success: true,
      message: 'Email enviado com sucesso',
    })
  } catch (error) {
    console.error('[Contact] Error sending email:', error)
    res.status(500).json({
      error: 'Erro ao enviar email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Serve React app for all other routes (only in production)
if (isProduction) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured ✓' : 'NOT configured ✗'}`)
  console.log(`🔧 Environment: ${isProduction ? 'Production' : 'Development'}`)
})
