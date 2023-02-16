import Container from '@/components/Container';
import emojis from '@/emojis';
import styles from '@/styles/Home.module.css';
import React, { ChangeEventHandler, MouseEventHandler, useCallback, useRef, useState } from 'react';
import Tooltip from '@/components/Tooltip';
import { Head } from 'next/document';

const categories = [
  "Smileys & People",
  "Animals & Nature",
  "Food & Drink",
  "Activity",
  "Travel & Places",
  "Objects",
  "Symbols",
  "Flags",
];

function searchMatch(search: string, item: string): boolean {
  return search
    .toLowerCase()
    .split(' ')
    .some(word => item.toLowerCase().includes(word));
}

export default function Home() {
  /**
   * States
   */
  const [tooltip, setTooltip] = useState<string | null>();
  const [search, setSearch] = useState<string>('');

  /**
   * Refs
   */
  const copyInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * Callbacks
   */
  const onSearchChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => setSearch(event.target.value), [setSearch]);
  const onMouseMove = useCallback<MouseEventHandler<HTMLSpanElement>>(event => {
    const element: HTMLSpanElement | null = event.nativeEvent.target as unknown as HTMLSpanElement;
    if (element !== null) { setTooltip(element.dataset.label); }
  }, [setTooltip]);
  const onMouseLeave = useCallback<MouseEventHandler<HTMLSpanElement>>(event => {
    setTooltip(null);
  }, [setTooltip]);
  const onClick = useCallback<MouseEventHandler<HTMLSpanElement>>(event => {
    const element: HTMLSpanElement | null = event.nativeEvent.target as unknown as HTMLSpanElement;
    if (copyInputRef.current instanceof HTMLInputElement) {
      navigator
      .clipboard
      .writeText(element.innerHTML)
      .then(() => { setTooltip('Copied'); });
    }
  }, [setTooltip]);

  return (
    <Container className={styles.root}>
      <Tooltip show={!!tooltip}>{tooltip ?? ''}</Tooltip>
      <h1>Emojis</h1>
      <input placeholder="Search..." value={search} onChange={onSearchChange} autoFocus />
      <input ref={copyInputRef} type="hidden" />
      {categories.map(category => (
        <React.Fragment key={category}>
          <h2>{category}</h2>
          <div className={styles.emojis}>
            {emojis[category].map(({ text, label }) => (
              searchMatch(search, label) ? (
                <span
                key={label}
                data-label={label}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                >
                  {text}
                </span>
              ) : null
            ))}
          </div>
        </React.Fragment>
      ))}
    </Container>
  )
}
