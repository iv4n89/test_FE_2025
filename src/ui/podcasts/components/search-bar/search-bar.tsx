import styles from './search-bar.module.css';

interface Props {
  value: string;
  onChange: (newValue: string) => void;
  resultCount: number;
  testid?: string;
}

export const SearchBar = ({ onChange, resultCount, value, testid }: Props) => {
  return (
    <div data-testid={testid} className={styles.search_bar__container}>
      <div className={styles.search_bar__badge}>{resultCount}</div>
      <input
        type="text"
        placeholder="Filter podcasts..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.search_bar__input}
      />
    </div>
  );
};
