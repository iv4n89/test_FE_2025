import Parser from 'rss-parser';
import { fetchWithCors } from '../../fetch-with-cors';

export async function parseRss<T>(
  rssFeedUrl: string,
  mapper?: (feed: Record<string, string> | Record<string, string>[]) => T
): Promise<T | Parser.Output<Record<string, string>>> {
  const xmlText = await fetchWithCors({
    url: rssFeedUrl,
    method: 'GET',
  });

  const parser = new Parser();
  const feed = await parser.parseString(
    typeof xmlText === 'string' ? xmlText : JSON.stringify(xmlText)
  );
  console.log(feed);

  if (mapper) {
    return mapper(feed.items);
  }

  return feed;
}
