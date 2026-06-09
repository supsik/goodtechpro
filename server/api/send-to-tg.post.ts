import { defineEventHandler, readBody, createError } from 'h3'

interface QuestionnaireAnswer {
  question: string
  answer: string | null
}

interface SubmissionData {
  contact: {
    name: string
    email: string | null
    phone: string | null
    message: string
  }
  questionnaire?: {
    answers: QuestionnaireAnswer[]
    estimatedPrice: {
      min: number
      max: number
      average: number
    } | null
  }
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event) as SubmissionData
    
    if (!body.contact.name || (!body.contact.email && !body.contact.phone)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Пожалуйста, укажите имя и хотя бы один способ связи (email или телефон)'
      })
    }
    
    const botToken = process.env.TG_BOT_TOKEN
    const chatId   = process.env.TG_CHAT_ID
    
    if (!botToken || !chatId) {
      console.error('Telegram configuration missing')
      throw createError({
        statusCode: 500,
        statusMessage: 'Ошибка конфигурации сервера'
      })
    }
    
    let telegramMessage = `
📬 *НОВАЯ ЗАЯВКА С САЙТА*

👤 *Контактные данные:*
• Имя: ${body.contact.name}
• Email: ${body.contact.email || '❌ Не указан'}
• Телефон: ${body.contact.phone || '❌ Не указан'}

💬 *Дополнительная информация:*
${body.contact.message || '❌ Не указана'}
    `.trim()
    
    if (body.questionnaire && body.questionnaire.answers.length > 0) {
      telegramMessage += `\n\n📊 *РЕЗУЛЬТАТЫ ОПРОСА:*\n`
      
      body.questionnaire.answers.forEach((item, index) => {
        if (item.answer) {
          telegramMessage += `\n${index + 1}. *${item.question}*\n   ➜ ${item.answer}`
        }
      })
      
      if (body.questionnaire.estimatedPrice) {
        const price = body.questionnaire.estimatedPrice
        telegramMessage += `\n\n💰 *ПРЕДВАРИТЕЛЬНАЯ СТОИМОСТЬ:*\n`
        telegramMessage += `   ${price.min.toLocaleString()} - ${price.max.toLocaleString()} ₽`
        telegramMessage += `\n   (средняя: ${price.average.toLocaleString()} ₽)`
      }
    }
    
    telegramMessage += `\n\n🕐 *Дата и время:* ${new Date().toLocaleString('ru-RU')}`
    
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'Markdown',
        disable_web_page_preview: true
      })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      console.error('Telegram API error:', result)
      throw createError({
        statusCode: 500,
        statusMessage: 'Ошибка отправки в Telegram'
      })
    }
    
    return {
      success: true,
      message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
    }
    
  } catch (error: any) {
    console.error('API Error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Внутренняя ошибка сервера'
    })
  }
})