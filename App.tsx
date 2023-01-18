/**
 * Please, improve this component and fix all problems.
 *
 * What is important:
 * - design (extensibility, testability)
 * - code cleanliness, following best practices
 * - bugs
 * - consistency
 * - naming
 * - formatting
 *
 * Write your perfect code!
 */

import * as React from 'react';
import { useEffect, useState } from 'react';

function Card({
  title,
  text,
  target,
  linkTitle,
  href,
  rel,
  onClick,
  linkClassName,
}) {
  return (
    <div className="card">
      <div className="card__title">{title}</div>

      <div className="card__text">{text}</div>
      <a
        className={`default-link card__link ${linkClassName}`}
        target={target}
        rel={rel}
        href={href}
        onClick={onClick}
      >
        {linkTitle}
      </a>
    </div>
  );
}

export default function Page() {
  const [cards, setCards] = useState([]);
  const getData = async () => {
    var data = await fetch(
      'https://my-json-server.typicode.com/savayer/demo/posts'
    );
    let json = await data.json();

    let newData = [];
    json.forEach((item) => {
      newData.push({
        ...item,
        text: item.body == null ? '' : item.body.en.substr(0, 50) + '...',
      });
    });

    setCards(newData);
  };

  useEffect(() => {
    getData();
  }, []);

  function analyticsTrackClick(url) {
    // sending clicked link url to analytics
    console.log(url);
  }

  return (
    <div>
      {cards &&
        cards.map(function (item) {
          return (
            <Card
              {...item}
              title={item.title.en}
              linkTitle={item.link_title}
              href={item.link}
              text={item.text}
              linkClassName={item.id == 1 ? 'card__link--red' : ''}
              target={item.id == 1 ? '_blank' : ''}
              onClick={analyticsTrackClick(item.link)}
            ></Card>
          );
        })}
    </div>
  );
}
