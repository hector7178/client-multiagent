'use client'

import { useState } from 'react'
import './faq.css'

export default function Faq (params) {
  const [faqs, setFaqs] = useState([
    {
      question: 'Lorem, ipsum dolor sit amet consectetur?',
      answer:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra lorem eu dolor rhoncus, at scelerisque ligula gravida. Sed porta id mi sit amet convallis. Etiam iaculis massa sit amet lacus blandit sodales. Nulla ultrices velit a diam placerat congue.',
      open: false
    },
    {
      question: 'Lorem, ipsum dolor sit?',
      answer: 'You! The viewer!',
      open: false
    },
    {
      question:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit?',
      answer: 'This many!',
      open: false
    }
  ])
  const toggleFAQ = index => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq?.open
        } else {
          faq.open = false
        }

        return faq
      })
    )
  }

  return (

 <div className="faqs d-flex flex-column h-75">
 {faqs?.map((faq, index) => (
    <div
    className={'faq ' + (faq?.open ? 'open' : '')}
    key={index}
    onClick={() => toggleFAQ(index)}
  >
    <div className="col faq-question text-white">{faq?.question}</div>
    <div className="col faq-answer text-white">{faq?.answer}</div>
  </div>
 ))}
</div>
  )
};
