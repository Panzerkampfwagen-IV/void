import { useState } from 'react';
import { Bookmark, Clock, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
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
  const [currentUrl, setCurrentUrl] = useState('');
  const [bookmarks] = useState<Bookmark[]>([
    { id: '1', title: 'Example Bookmark', url: 'https://example.com' },
  ]);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    // Simulated search results
    const results = [
      {
        title: 'Google',
        url: 'https://google.com',
        description: 'Search the world\'s information, including webpages, images, videos and more.',
      },
      {
        title: 'GitHub',
        url: 'https://github.com',
        description: 'GitHub is where over 100 million developers shape the future of software.',
      },
      {
        title: 'Stack Overflow',
        url: 'https://stackoverflow.com',
        description: 'Stack Overflow is the largest, most trusted online community for developers.',
      },
    ];
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleVisitSite = (url: string) => {
    // Ensure URL has protocol
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    setCurrentUrl(formattedUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
              <ArrowRight className="h-5 w-5 text-gray-600" />
            </button>
            <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
              <RotateCcw className="h-5 w-5 text-gray-600" />
            </button>
            <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
              <Bookmark className="h-5 w-5 text-gray-600" />
            </button>
            <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
              <Clock className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </header>

        <main className="py-12">
          {currentUrl ? (
            <div className="w-full h-[80vh] rounded-lg overflow-hidden border border-gray-200 bg-white">
              <iframe
                src={currentUrl}
                className="w-full h-full"
                title="Browser Content"
              />
            </div>
          ) : (
            <div className={cn(
              'flex flex-col items-center transition-all duration-500',
              isSearching ? 'translate-y-0' : 'translate-y-32'
            )}>
              <SearchBar onSearch={handleSearch} expanded={isSearching} />
              <SearchResults 
                results={searchResults} 
                isLoading={isSearching} 
                onVisitSite={handleVisitSite}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Browser;