import { useState } from 'react';
import { Bookmark, Clock, Star } from 'lucide-react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { cn } from '@/lib/utils';

interface Bookmark {
  id: string;
  title: string;
  url: string;
}

const Browser = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [bookmarks] = useState<Bookmark[]>([
    { id: '1', title: 'Example Bookmark', url: 'https://example.com' },
  ]);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    // Simulated search results
    const results = [
      {
        title: 'Example Search Result',
        url: 'https://example.com',
        description: 'This is an example search result description that would appear in a real search engine.',
      },
      {
        title: 'Another Search Result',
        url: 'https://example.org',
        description: 'Here is another example of what a search result might look like in our browser interface.',
      },
    ];
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSearchResults(results);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
              <Bookmark className="h-5 w-5 text-gray-600" />
            </button>
            <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
              <Clock className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </header>

        <main className="py-12">
          <div className={cn(
            'flex flex-col items-center transition-all duration-500',
            isSearching ? 'translate-y-0' : 'translate-y-32'
          )}>
            <SearchBar onSearch={handleSearch} expanded={isSearching} />
            <SearchResults results={searchResults} isLoading={isSearching} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Browser;