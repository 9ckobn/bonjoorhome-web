// Utility functions for the application

export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

export const makePhoneCall = (phoneNumber: string) => {
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, '')
  window.location.href = `tel:${cleanNumber}`
}

export const sendEmail = async (toEmail: string, messageData: string) => {
  try {
    // Simulate API call for now - in production you'd use actual email service
    console.log('Sending email to:', toEmail)
    console.log('Message data:', messageData)
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In production, you would make actual API call to your email service
    // const response = await fetch('/api/send-email', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ to: toEmail, data: messageData }),
    // })
    
    // if (!response.ok) {
    //   throw new Error('Ошибка отправки сообщения')
    // }
    
    // return await response.json()
    
    return { success: true, message: 'Email sent successfully' }
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}
