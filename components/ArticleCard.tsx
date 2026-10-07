import { article } from "../lib/article";
import { TextLink } from "./Shared";

export function ArticleCard() {
  return <article className="ea-card article-card">
    <div className="article-card-meta"><span className="tag">HR:n opas</span><time dateTime={article.datePublished}>7.10.2026</time></div>
    <h2 className="ea-h3">{article.title}</h2>
    <p>{article.excerpt}</p>
    <TextLink href={article.path}>Lue opas Kela-korvauksesta</TextLink>
  </article>;
}
