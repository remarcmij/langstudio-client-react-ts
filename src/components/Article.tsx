import * as React from 'react'
import Paper from 'material-ui/Paper'

import ChildAppBar from './ChildAppBar'
import NetworkError from './NetworkError'
import './Article.css'

interface ArticleProps {
  article: ArticleTopic | null
  error: Error | null
  onBackClick: () => void
  onSearchClick: () => void
  onRetryClick: () => void
  handleSpeech: (text: string, lang: string) => void
}

const noop = () => undefined

function Article(props: ArticleProps) {
  const {
    article,
    error,
    onBackClick = noop,
    onSearchClick = noop,
    onRetryClick = noop,
    handleSpeech = noop
  } = props

  const onTextClick = (ev: React.SyntheticEvent<HTMLElement>) => {
    const elem = ev.target as HTMLElement
    if (article && elem.tagName === 'SPAN') {
      ev.preventDefault()
      ev.stopPropagation()
      const text = elem.innerText.trim()
      const { targetLang } = article._topic
      handleSpeech(text, targetLang)
    }
  }

  const getDir = ({_topic}: ArticleTopic) => {
    const { baseLang, targetLang } = _topic
    return baseLang.startsWith('ar') || targetLang.startsWith('ar') ? 'rtl' : 'ltr'
  }

  const renderArticleContent = () => {
    if (error) {
      return <NetworkError error={error} onRetryClick={onRetryClick} />
    }

    if (!article) {
      return null
    }

    const { body } = article
    return (
      <div className="article">
        <Paper zDepth={2}>
          <article
            className="markdown-body"
            dir={getDir(article)}
            onClick={onTextClick}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </Paper>
      </div>
    )
  }

  return (
    <div>
      <ChildAppBar
        title={article ? article.title : ''}
        onBackClick={onBackClick}
        onSearchClick={onSearchClick}
      />
      {renderArticleContent()}
    </div>
  )
}

export default Article
