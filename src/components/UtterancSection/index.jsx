import React, { createRef, useLayoutEffect } from 'react'

const src = 'https://utteranc.es/client.js'

const UtterancSection = React.memo(({ repo }) => {
  const containerRef = createRef()

  useLayoutEffect(() => {
    // eslint-disable-next-line no-undef
    const utterances = document.createElement('script')

    const attributes = {
      src,
      repo: 'jinhokong/jinho.dev',
      'issue-term': 'pathname',
      label: 'comment',
      theme: 'github-light',
      crossOrigin: 'anonymous',
      async: 'true',
    }

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value)
    })

    containerRef.current.appendChild(utterances)
  }, [repo])

  return <div ref={containerRef} />
})

UtterancSection.displayName = 'Utterances'

export default UtterancSection
