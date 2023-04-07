'use client'
import React from 'react'

export default function CommentRef() {
  const messagesEndRef: React.RefObject<HTMLDivElement> = React.useRef(null)

  return <div ref={messagesEndRef} />
}
